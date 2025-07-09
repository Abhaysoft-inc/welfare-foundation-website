import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import OTP from '@/models/OTP';
import { sendOTPEmail } from '@/lib/emailService';

export async function POST(request) {
    try {
        await dbConnect();

        const { email, memberName } = await request.json();

        // Validation
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            return NextResponse.json(
                { error: 'Valid email is required' },
                { status: 400 }
            );
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Delete any existing OTPs for this email and purpose
        await OTP.deleteMany({ 
            email: email.toLowerCase(), 
            purpose: 'member_registration' 
        });

        // Create new OTP record
        const otpRecord = new OTP({
            email: email.toLowerCase(),
            otp,
            purpose: 'member_registration'
        });

        await otpRecord.save();

        // Send OTP email
        await sendOTPEmail(email, otp, memberName);

        console.log(`OTP sent to ${email}: ${otp}`); // Remove in production

        return NextResponse.json({
            success: true,
            message: 'OTP sent successfully to your email'
        });

    } catch (error) {
        console.error('Send OTP error:', error);
        return NextResponse.json(
            { error: 'Failed to send OTP. Please try again.' },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json(
        { message: 'OTP sending API endpoint' },
        { status: 200 }
    );
}
