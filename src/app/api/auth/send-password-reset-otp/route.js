import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Member from '@/models/Member';
import OTP from '@/models/OTP';
import { sendEmail } from '@/lib/emailService';

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Check if member exists
    const member = await Member.findOne({ email: email.toLowerCase() });
    if (!member) {
      return NextResponse.json(
        { error: 'No account found with this email address' },
        { status: 404 }
      );
    }

    // Check if member is active (can't reset password for suspended members)
    if (member.status === 'suspended') {
      return NextResponse.json(
        { error: 'Account is suspended. Please contact support.' },
        { status: 403 }
      );
    }

    // Generate 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Delete any existing password reset OTPs for this email
    await OTP.deleteMany({ 
      email: email.toLowerCase(), 
      purpose: 'password_reset' 
    });

    // Create new OTP
    const otp = new OTP({
      email: email.toLowerCase(),
      otp: otpCode,
      purpose: 'password_reset',
      expiresAt: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
    });

    await otp.save();

    // Send password reset email
    const emailSubject = 'Password Reset OTP - Welfare Foundation';
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset OTP</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px;">
          <!-- Header -->
          <div style="text-align: center; padding: 20px 0; border-bottom: 2px solid #ff6b35;">
            <h1 style="color: #ff6b35; margin: 0; font-size: 28px;">Welfare Foundation</h1>
            <p style="color: #666; margin: 5px 0 0 0;">Serving Humanity with Compassion</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 30px 20px;">
            <h2 style="color: #333; margin-bottom: 20px;">Password Reset Request</h2>
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              Hello <strong>${member.fullName}</strong>,
            </p>
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              We received a request to reset your password for your Welfare Foundation account. 
              Use the OTP below to proceed with resetting your password:
            </p>
            
            <!-- OTP Display -->
            <div style="background-color: #f8f9fa; border: 2px dashed #ff6b35; border-radius: 8px; padding: 20px; text-align: center; margin: 30px 0;">
              <p style="color: #333; margin: 0 0 10px 0; font-size: 16px;">Your Password Reset OTP:</p>
              <div style="font-size: 32px; font-weight: bold; color: #ff6b35; letter-spacing: 4px; font-family: monospace;">
                ${otpCode}
              </div>
              <p style="color: #999; margin: 10px 0 0 0; font-size: 14px;">
                Valid for 10 minutes
              </p>
            </div>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              <strong>Important:</strong> This OTP will expire in 10 minutes. If you didn't request this password reset, 
              please ignore this email or contact our support team.
            </p>
            
            <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0;">
              <p style="color: #856404; margin: 0; font-size: 14px;">
                <strong>Security Tip:</strong> Never share your OTP with anyone. Our team will never ask for your OTP over phone or email.
              </p>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="border-top: 1px solid #eee; padding: 20px; text-align: center; background-color: #f8f9fa;">
            <p style="color: #999; margin: 0; font-size: 14px;">
              This is an automated message from Welfare Foundation. Please do not reply to this email.
            </p>
            <p style="color: #999; margin: 10px 0 0 0; font-size: 12px;">
              © 2025 Welfare Foundation. All rights reserved.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    await sendEmail(email, emailSubject, emailHtml);

    return NextResponse.json({
      message: 'Password reset OTP sent successfully',
      email: email.toLowerCase()
    });

  } catch (error) {
    console.error('Send password reset OTP error:', error);
    return NextResponse.json(
      { error: 'Failed to send password reset OTP. Please try again.' },
      { status: 500 }
    );
  }
}
