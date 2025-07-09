import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Member from '@/models/Member';
import OTP from '@/models/OTP';
import bcrypt from 'bcryptjs';
import { sendEmail } from '@/lib/emailService';

export async function POST(request) {
  try {
    const { email, password, token } = await request.json();

    if (!email || !password || !token) {
      return NextResponse.json(
        { error: 'Email, password, and verification token are required' },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Verify the token (OTP record ID) and ensure it's verified
    const otpRecord = await OTP.findById(token);
    if (!otpRecord || 
        otpRecord.email !== email.toLowerCase() || 
        otpRecord.purpose !== 'password_reset' || 
        !otpRecord.verified) {
      return NextResponse.json(
        { error: 'Invalid or expired verification token' },
        { status: 400 }
      );
    }

    // Check if OTP record has expired (even though it's verified)
    if (otpRecord.expiresAt < new Date()) {
      await OTP.deleteOne({ _id: otpRecord._id });
      return NextResponse.json(
        { error: 'Verification token has expired. Please start over.' },
        { status: 400 }
      );
    }

    // Find the member
    const member = await Member.findOne({ email: email.toLowerCase() });
    if (!member) {
      return NextResponse.json(
        { error: 'Member not found' },
        { status: 404 }
      );
    }

    // Hash the new password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Update member's password
    member.password = hashedPassword;
    member.lastLogin = new Date(); // Update last login since they'll likely login after reset
    await member.save();

    // Delete the used OTP record
    await OTP.deleteOne({ _id: otpRecord._id });

    // Send password reset confirmation email
    const emailSubject = 'Password Reset Successful - Welfare Foundation';
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset Successful</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px;">
          <!-- Header -->
          <div style="text-align: center; padding: 20px 0; border-bottom: 2px solid #28a745;">
            <h1 style="color: #28a745; margin: 0; font-size: 28px;">Welfare Foundation</h1>
            <p style="color: #666; margin: 5px 0 0 0;">Serving Humanity with Compassion</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 30px 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <div style="width: 60px; height: 60px; background-color: #28a745; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                <span style="color: white; font-size: 24px;">✓</span>
              </div>
              <h2 style="color: #28a745; margin: 0; font-size: 24px;">Password Reset Successful!</h2>
            </div>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              Hello <strong>${member.fullName}</strong>,
            </p>
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              Your password has been successfully reset for your Welfare Foundation account. 
              You can now log in using your new password.
            </p>
            
            <div style="background-color: #d4edda; border: 1px solid #c3e6cb; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <p style="color: #155724; margin: 0; font-size: 14px;">
                <strong>Security Reminder:</strong> Keep your password secure and don't share it with anyone. 
                If you didn't make this change, please contact our support team immediately.
              </p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/member/login" 
                 style="background-color: #28a745; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                Log In to Your Account
              </a>
            </div>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              Thank you for being a valued member of our welfare foundation. Together, we continue to make a positive impact in our community.
            </p>
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

    try {
      await sendEmail(email, emailSubject, emailHtml);
    } catch (emailError) {
      console.error('Failed to send password reset confirmation email:', emailError);
      // Don't fail the password reset if email fails
    }

    return NextResponse.json({
      message: 'Password reset successfully',
      success: true
    });

  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { error: 'Failed to reset password. Please try again.' },
      { status: 500 }
    );
  }
}
