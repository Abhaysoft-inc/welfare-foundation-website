import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import OTP from '@/models/OTP';

export async function POST(request) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { error: 'Email and OTP are required' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Find the OTP record
    const otpRecord = await OTP.findOne({
      email: email.toLowerCase(),
      otp: otp.toString(),
      purpose: 'password_reset'
    });

    if (!otpRecord) {
      return NextResponse.json(
        { error: 'Invalid OTP. Please check and try again.' },
        { status: 400 }
      );
    }

    // Check if OTP has expired
    if (otpRecord.expiresAt < new Date()) {
      // Delete expired OTP
      await OTP.deleteOne({ _id: otpRecord._id });
      return NextResponse.json(
        { error: 'OTP has expired. Please request a new one.' },
        { status: 400 }
      );
    }

    // OTP is valid - mark it as verified but don't delete yet
    // We'll delete it when password is actually reset
    otpRecord.verified = true;
    otpRecord.verifiedAt = new Date();
    await otpRecord.save();

    return NextResponse.json({
      message: 'OTP verified successfully',
      email: email.toLowerCase(),
      token: otpRecord._id.toString() // Return OTP record ID as a token
    });

  } catch (error) {
    console.error('Verify password reset OTP error:', error);
    return NextResponse.json(
      { error: 'Failed to verify OTP. Please try again.' },
      { status: 500 }
    );
  }
}
