import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Member from '@/models/Member';
import Donation from '@/models/Donation';
import bcrypt from 'bcryptjs';
import { sendEmail } from '@/lib/emailService';

export async function POST(request) {
    try {
        await connectDB();
        
        const body = await request.json();
        const { 
            donorData, 
            paymentData, 
            isLoggedIn, 
            memberId 
        } = body;

        let member = null;
        let isNewMember = false;
        let generatedPassword = null;

        // Handle member logic
        if (isLoggedIn && memberId) {
            // Logged-in user - find existing member
            member = await Member.findById(memberId);
            if (!member) {
                return NextResponse.json({ error: 'Member not found' }, { status: 404 });
            }
        } else {
            // Guest user - check if account exists or create new one
            const existingMember = await Member.findOne({ 
                $or: [
                    { email: donorData.email },
                    { mobile: donorData.mobile }
                ]
            });

            if (existingMember) {
                // Account exists - use existing account
                member = existingMember;
            } else {
                // Create new member account
                isNewMember = true;
                generatedPassword = Math.random().toString(36).slice(-8) + 'A1!'; // Random password with required chars
                
                // Generate member ID
                const memberCount = await Member.countDocuments();
                const newMemberId = `PSWF${new Date().getFullYear()}${String(memberCount + 1).padStart(4, '0')}`;

                // Hash the generated password
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(generatedPassword, salt);

                member = new Member({
                    memberId: newMemberId,
                    fullName: donorData.fullName,
                    email: donorData.email,
                    mobile: donorData.mobile,
                    address: donorData.address,
                    city: donorData.city,
                    state: donorData.state,
                    pincode: donorData.pincode,
                    password: hashedPassword,
                    membershipDate: new Date(),
                    status: 'active',
                    emailVerified: false,
                    mobileVerified: false
                });

                await member.save();

                // Send welcome email with login credentials
                try {
                    await sendEmail({
                        to: donorData.email,
                        subject: 'Welcome to Pandit Sachidanand Welfare Foundation - Account Created',
                        html: `
                            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                                <h2 style="color: #ff6b35;">🙏 Welcome to Our Foundation Family!</h2>
                                <p>Dear ${donorData.fullName},</p>
                                
                                <p>Thank you for your generous donation! We have automatically created a member account for you to track your donations and stay connected with our activities.</p>
                                
                                <div style="background-color: #f8f9fa; border: 1px solid #dee2e6; border-radius: 8px; padding: 20px; margin: 20px 0;">
                                    <h3 style="color: #495057; margin-top: 0;">Your Account Details:</h3>
                                    <p><strong>Member ID:</strong> ${newMemberId}</p>
                                    <p><strong>Email:</strong> ${donorData.email}</p>
                                    <p><strong>Temporary Password:</strong> <code style="background-color: #e9ecef; padding: 2px 4px; border-radius: 4px;">${generatedPassword}</code></p>
                                </div>
                                
                                <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 15px; margin: 20px 0;">
                                    <p style="margin: 0; color: #856404;"><strong>⚠️ Important:</strong> Please change your password after logging in for security reasons.</p>
                                </div>
                                
                                <p>You can now:</p>
                                <ul>
                                    <li>✅ Track all your donations</li>
                                    <li>📜 Download donation certificates and receipts</li>
                                    <li>🆔 Generate your member ID card</li>
                                    <li>📧 Receive updates about our activities</li>
                                </ul>
                                
                                <div style="text-align: center; margin: 30px 0;">
                                    <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/member/login" 
                                       style="background-color: #ff6b35; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                                        Login to Your Account
                                    </a>
                                </div>
                                
                                <p>Thank you for being part of our mission to serve humanity with compassion.</p>
                                
                                <p>With gratitude,<br>
                                <strong>Pandit Sachidanand Welfare Foundation</strong><br>
                                सेवा परमो धर्मः</p>
                                
                                <hr style="border: none; border-top: 1px solid #dee2e6; margin: 30px 0;">
                                <p style="font-size: 12px; color: #6c757d;">
                                    If you have any questions, please contact us at sn1984.pandey@gmail.com
                                </p>
                            </div>
                        `
                    });
                } catch (emailError) {
                    console.error('Failed to send welcome email:', emailError);
                }
            }
        }

        // Generate donation ID
        const donationId = await Donation.generateDonationId();

        // Create donation record
        const donation = new Donation({
            memberId: member._id,
            donationId,
            amount: donorData.donationAmount,
            purpose: donorData.donationPurpose,
            paymentMode: paymentData.paymentMode || 'Online',
            transactionId: paymentData.transactionId,
            status: paymentData.status || 'Completed',
            donationDate: new Date(),
            receiptGenerated: false,
            taxBenefit: true,
            gatewayOrderId: paymentData.orderId,
            gatewayPaymentId: paymentData.paymentId,
            gatewaySignature: paymentData.signature,
            campaign: donorData.donationPurpose,
            donorInfo: {
                name: donorData.fullName || member.fullName,
                email: donorData.email || member.email,
                mobile: donorData.mobile || member.mobile,
                address: donorData.address || member.address,
                panNumber: donorData.panCard || '',
                aadharNumber: donorData.aadharCard || ''
            }
        });

        await donation.save();

        // Send donation confirmation email
        try {
            await sendEmail({
                to: donorData.email,
                subject: `Donation Confirmation - ${donationId}`,
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #28a745;">🙏 Thank You for Your Generous Donation!</h2>
                        <p>Dear ${donorData.fullName || member.fullName},</p>
                        
                        <p>We have successfully received your donation. May your generosity bring you abundant blessings.</p>
                        
                        <div style="background-color: #f8f9fa; border: 1px solid #dee2e6; border-radius: 8px; padding: 20px; margin: 20px 0;">
                            <h3 style="color: #495057; margin-top: 0;">Donation Details:</h3>
                            <p><strong>Donation ID:</strong> ${donationId}</p>
                            <p><strong>Amount:</strong> ₹${donorData.donationAmount.toLocaleString('en-IN')}</p>
                            <p><strong>Purpose:</strong> ${donorData.donationPurpose}</p>
                            <p><strong>Date:</strong> ${new Date().toLocaleDateString('en-IN')}</p>
                            <p><strong>Transaction ID:</strong> ${paymentData.transactionId}</p>
                        </div>
                        
                        ${donorData.panCard ? `
                            <div style="background-color: #d1ecf1; border: 1px solid #bee5eb; border-radius: 8px; padding: 15px; margin: 20px 0;">
                                <p style="margin: 0; color: #0c5460;"><strong>📋 Tax Benefit:</strong> Your donation may be eligible for tax deduction under Section 80G. Please consult your tax advisor.</p>
                            </div>
                        ` : ''}
                        
                        <p>You can download your donation receipt anytime from your member dashboard.</p>
                        
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/member/dashboard" 
                               style="background-color: #ff6b35; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                                View Dashboard
                            </a>
                        </div>
                        
                        <p>Your contribution will help us continue our mission of serving those in need. Together, we are making a positive impact on countless lives.</p>
                        
                        <p>With heartfelt gratitude,<br>
                        <strong>Pandit Sachidanand Welfare Foundation</strong><br>
                        सेवा परमो धर्मः</p>
                        
                        <hr style="border: none; border-top: 1px solid #dee2e6; margin: 30px 0;">
                        <p style="font-size: 12px; color: #6c757d;">
                            For any queries, contact us at sn1984.pandey@gmail.com or +91 9415432141
                        </p>
                    </div>
                `
            });
        } catch (emailError) {
            console.error('Failed to send donation confirmation email:', emailError);
        }

        // Response data
        const responseData = {
            success: true,
            donation: {
                donationId: donation.donationId,
                amount: donation.amount,
                purpose: donation.purpose,
                transactionId: donation.transactionId,
                status: donation.status
            },
            member: {
                _id: member._id,
                memberId: member.memberId,
                fullName: member.fullName,
                email: member.email
            }
        };

        if (isNewMember) {
            responseData.newMember = true;
            responseData.temporaryPassword = generatedPassword;
            responseData.message = 'Donation successful! A member account has been created for you. Please check your email for login credentials.';
        } else {
            responseData.message = 'Donation successful! Thank you for your generosity.';
        }

        return NextResponse.json(responseData);

    } catch (error) {
        console.error('Donation processing error:', error);
        return NextResponse.json({ 
            error: 'Failed to process donation',
            details: error.message 
        }, { status: 500 });
    }
}
