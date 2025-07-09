import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import OTP from '@/models/OTP';

export async function POST(request) {
    try {
        await dbConnect();

        const { email, otp } = await request.json();

        // Validation
        if (!email || !otp) {
            return NextResponse.json(
                { error: 'Email and OTP are required' },
                { status: 400 }
            );
        }

        // Find the OTP record
        const otpRecord = await OTP.findOne({
            email: email.toLowerCase(),
            purpose: 'member_registration',
            isUsed: false
        }).sort({ createdAt: -1 }); // Get the latest OTP

        if (!otpRecord) {
            return NextResponse.json(
                { error: 'No valid OTP found. Please request a new one.' },
                { status: 400 }
            );
        }

        // Check if OTP is expired
        if (new Date() > otpRecord.expiresAt) {
            await OTP.deleteOne({ _id: otpRecord._id });
            return NextResponse.json(
                { error: 'OTP has expired. Please request a new one.' },
                { status: 400 }
            );
        }

        // Check attempt limit
        if (otpRecord.attempts >= 3) {
            await OTP.deleteOne({ _id: otpRecord._id });
            return NextResponse.json(
                { error: 'Too many failed attempts. Please request a new OTP.' },
                { status: 400 }
            );
        }

        // Verify OTP
        if (otpRecord.otp !== otp.toString()) {
            // Increment attempts
            otpRecord.attempts += 1;
            await otpRecord.save();

            const remainingAttempts = 3 - otpRecord.attempts;
            return NextResponse.json(
                {
                    error: `Invalid OTP. ${remainingAttempts} attempts remaining.`
                },
                { status: 400 }
            );
        }

        // OTP is valid - mark as used
        otpRecord.isUsed = true;
        await otpRecord.save();

        // Clean up - delete the used OTP
        await OTP.deleteOne({ _id: otpRecord._id });

        return NextResponse.json({
            success: true,
            message: 'Email verified successfully'
        });

    } catch (error) {
        console.error('Verify OTP error:', error);
        return NextResponse.json(
            { error: 'Failed to verify OTP. Please try again.' },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json(
        { message: 'OTP verification API endpoint' },
        { status: 200 }
    );
}
