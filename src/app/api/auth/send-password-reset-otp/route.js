import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Member from '@/models/Member';
import OTP from '@/models/OTP';
import { sendPasswordResetEmail } from '@/lib/emailService';

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Check if member exists
    const member = await Member.findOne({ email: email.toLowerCase() });
    if (!member) {
      return NextResponse.json(
        { error: 'No account found with this email address' },
        { status: 404 }
      );
    }

    // Check if member is active (can't reset password for suspended members)
    if (member.memberStatus === 'suspended') {
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
    await sendPasswordResetEmail(email, otpCode, member.memberName);

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
