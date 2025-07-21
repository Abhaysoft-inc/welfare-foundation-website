import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Member from '@/models/Member';
import cloudinary from '@/lib/cloudinary';
import { sendWelcomeEmail } from '@/lib/emailService';
import bcrypt from 'bcryptjs';

export async function POST(request) {
    try {
        // Connect to database
        await dbConnect();

        // Parse form data
        const formData = await request.formData();

        // Extract form fields
        const memberData = {
            memberName: formData.get('memberName'),
            services: formData.get('services') || '',
            address: formData.get('address'),
            mobile: formData.get('mobile'),
            email: formData.get('email'),
            password: formData.get('password'),
            referredBy: formData.get('referredBy') || null,
        };

        const photoFile = formData.get('photo');

        // Validation
        const requiredFields = ['memberName', 'address', 'mobile', 'email', 'password'];
        for (const field of requiredFields) {
            if (!memberData[field] || !memberData[field].trim()) {
                return NextResponse.json(
                    { error: `${field} is required` },
                    { status: 400 }
                );
            }
        }

        // Validate password
        if (memberData.password.length < 6) {
            return NextResponse.json(
                { error: 'Password must be at least 6 characters' },
                { status: 400 }
            );
        }

        // Validate mobile number
        if (!/^\d{10}$/.test(memberData.mobile)) {
            return NextResponse.json(
                { error: 'Mobile number must be 10 digits' },
                { status: 400 }
            );
        }

        // Validate email
        if (!/\S+@\S+\.\S+/.test(memberData.email)) {
            return NextResponse.json(
                { error: 'Please enter a valid email' },
                { status: 400 }
            );
        }

        // Check if photo is provided
        if (!photoFile || photoFile.size === 0) {
            return NextResponse.json(
                { error: 'Photo is required' },
                { status: 400 }
            );
        }

        // Check if member already exists
        const existingMember = await Member.findOne({
            $or: [
                { email: memberData.email },
                { mobile: memberData.mobile }
            ]
        });

        if (existingMember) {
            let errorMessage = 'Member already exists with this ';
            if (existingMember.email === memberData.email) {
                errorMessage += 'email address';
            } else if (existingMember.mobile === memberData.mobile) {
                errorMessage += 'mobile number';
            }

            return NextResponse.json(
                {
                    error: errorMessage,
                    action: existingMember.isVerified ? 'login' : 'verify_otp',
                    email: existingMember.email
                },
                { status: 409 }
            );
        }

        // Convert file to buffer for Cloudinary upload
        const bytes = await photoFile.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Upload photo to Cloudinary
        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    resource_type: 'image',
                    folder: 'welfare-foundation/members',
                    transformation: [
                        { width: 400, height: 400, crop: 'fill' },
                        { quality: 'auto' }
                    ]
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            ).end(buffer);
        });

        // Generate unique membership ID
        const generateMembershipId = () => {
            const year = new Date().getFullYear();
            const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
            return `PSWF${year}${randomNum}`;
        };

        let membershipId = generateMembershipId();

        // Ensure unique membership ID
        let existingIdCheck = await Member.findOne({ membershipId });
        while (existingIdCheck) {
            membershipId = generateMembershipId();
            existingIdCheck = await Member.findOne({ membershipId });
        }

        // Hash password
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(memberData.password, saltRounds);

        // Handle referral logic
        let referrerMember = null;
        if (memberData.referredBy) {
            // Find the referrer by membership ID
            referrerMember = await Member.findOne({ membershipId: memberData.referredBy });
            if (!referrerMember) {
                return NextResponse.json(
                    { error: 'Invalid referrer Member ID. Please check and try again.' },
                    { status: 400 }
                );
            }
        }

        // Create new member with photo URL and membership ID
        const newMember = new Member({
            ...memberData,
            password: hashedPassword,
            photoUrl: uploadResult.secure_url,
            photoPublicId: uploadResult.public_id,
            membershipId,
            // Add referral information
            referredBy: referrerMember ? referrerMember._id : null,
            referredByMembershipId: referrerMember ? referrerMember.membershipId : null
        });

        // Save to database
        await newMember.save();

        // Update referrer's referral count if exists
        if (referrerMember) {
            await Member.updateReferralCount(referrerMember._id);
        }

        console.log('Member registered successfully:', {
            membershipId: newMember.membershipId,
            email: newMember.email,
            mobile: newMember.mobile
        });

        // Send welcome email
        try {
            await sendWelcomeEmail(newMember.email, {
                memberName: newMember.memberName,
                membershipId: newMember.membershipId,
                email: newMember.email,
                registrationDate: newMember.registrationDate
            });
        } catch (emailError) {
            console.error('Welcome email failed:', emailError);
            // Don't fail the registration if email fails
        }

        // Return success response with member data (excluding sensitive info)
        const responseData = {
            _id: newMember._id,
            membershipId: newMember.membershipId,
            memberName: newMember.memberName,
            services: newMember.services,
            address: newMember.address,
            mobile: newMember.mobile,
            email: newMember.email,
            photoUrl: newMember.photoUrl,
            registrationDate: newMember.registrationDate
        };

        return NextResponse.json({
            success: true,
            message: 'Member registered successfully',
            member: responseData
        }, { status: 201 });

    } catch (error) {
        console.error('Member registration error:', error);

        // If there was a photo uploaded but registration failed, clean up Cloudinary
        if (error.photoPublicId) {
            try {
                await cloudinary.uploader.destroy(error.photoPublicId);
            } catch (cleanupError) {
                console.error('Error cleaning up photo:', cleanupError);
            }
        }

        return NextResponse.json(
            { error: 'Internal server error. Please try again.' },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json(
        { message: 'Member registration API endpoint' },
        { status: 200 }
    );
}
