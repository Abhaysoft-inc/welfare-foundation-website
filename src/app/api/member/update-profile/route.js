import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Member from '@/models/Member';
import bcrypt from 'bcryptjs';
import { sendEmail } from '@/lib/emailService';

export async function POST(request) {
    try {
        await connectDB();

        const body = await request.json();
        const {
            memberId,
            name,
            email,
            mobile,
            address,
            currentPassword,
            newPassword,
            profilePhoto
        } = body;

        if (!memberId) {
            return NextResponse.json({ error: 'Member ID is required' }, { status: 400 });
        }

        // Find the member
        const member = await Member.findById(memberId);
        if (!member) {
            return NextResponse.json({ error: 'Member not found' }, { status: 404 });
        }

        // Prepare update object
        const updateData = {};
        let emailChanged = false;
        let mobileChanged = false;

        // Update basic information
        if (name && name !== member.name) {
            updateData.name = name;
        }

        if (email && email !== member.email) {
            // Check if email already exists
            const existingMemberWithEmail = await Member.findOne({ email, _id: { $ne: memberId } });
            if (existingMemberWithEmail) {
                return NextResponse.json({ error: 'Email already registered with another account' }, { status: 400 });
            }
            updateData.email = email;
            updateData.emailVerified = false; // Reset email verification
            emailChanged = true;
        }

        if (mobile && mobile !== member.mobile) {
            // Check if mobile already exists
            const existingMemberWithMobile = await Member.findOne({ mobile, _id: { $ne: memberId } });
            if (existingMemberWithMobile) {
                return NextResponse.json({ error: 'Mobile number already registered with another account' }, { status: 400 });
            }
            updateData.mobile = mobile;
            updateData.mobileVerified = false; // Reset mobile verification
            mobileChanged = true;
        }

        if (address && address !== member.address) {
            updateData.address = address;
        }

        if (profilePhoto) {
            updateData.profilePhoto = profilePhoto;
        }

        // Handle password change
        if (currentPassword && newPassword) {
            // Verify current password
            const isValidPassword = await bcrypt.compare(currentPassword, member.password);
            if (!isValidPassword) {
                return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 });
            }

            // Validate new password
            if (newPassword.length < 8) {
                return NextResponse.json({ error: 'New password must be at least 8 characters long' }, { status: 400 });
            }

            // Hash new password
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(newPassword, salt);
        }

        // Update the member
        const updatedMember = await Member.findByIdAndUpdate(
            memberId,
            updateData,
            { new: true, runValidators: true }
        );

        // Send verification emails if email or mobile changed
        if (emailChanged) {
            try {
                await sendEmail({
                    to: email,
                    subject: 'Email Verification Required - Profile Updated',
                    html: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                            <h2 style="color: #ff6b35;">Email Verification Required</h2>
                            <p>Dear ${name || member.name},</p>
                            <p>Your email address has been updated in your member profile. Please verify your new email address to continue accessing all features.</p>
                            <p>If you did not make this change, please contact us immediately.</p>
                            <div style="margin: 20px 0; padding: 20px; background-color: #f5f5f5; border-radius: 5px;">
                                <p><strong>Member ID:</strong> ${member.memberId}</p>
                                <p><strong>New Email:</strong> ${email}</p>
                            </div>
                            <p>Best regards,<br>Welfare Foundation Team</p>
                        </div>
                    `
                });
            } catch (emailError) {
                console.error('Failed to send email verification:', emailError);
            }
        }

        // Return updated member data (without password)
        const memberResponse = {
            _id: updatedMember._id,
            memberId: updatedMember.memberId,
            name: updatedMember.name,
            email: updatedMember.email,
            mobile: updatedMember.mobile,
            address: updatedMember.address,
            profilePhoto: updatedMember.profilePhoto,
            emailVerified: updatedMember.emailVerified,
            mobileVerified: updatedMember.mobileVerified,
            membershipDate: updatedMember.membershipDate,
            status: updatedMember.status
        };

        return NextResponse.json({
            message: 'Profile updated successfully',
            member: memberResponse,
            warnings: {
                emailChanged,
                mobileChanged
            }
        });

    } catch (error) {
        console.error('Profile update error:', error);
        return NextResponse.json({
            error: 'Failed to update profile'
        }, { status: 500 });
    }
}
