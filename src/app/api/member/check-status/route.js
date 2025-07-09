import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Member from '@/models/Member';

export async function POST(request) {
    try {
        await dbConnect();

        const { email } = await request.json();

        // Validation
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            return NextResponse.json(
                { error: 'Valid email is required' },
                { status: 400 }
            );
        }

        // Check if member exists
        const member = await Member.findOne({
            email: email.toLowerCase()
        }).select('email memberName memberStatus isVerified membershipId');

        if (!member) {
            return NextResponse.json({
                exists: false,
                action: 'register',
                message: 'Email not registered. Please register as a new member.'
            });
        }

        // Member exists - check status
        if (!member.isVerified && member.memberStatus === 'pending_verification') {
            return NextResponse.json({
                exists: true,
                action: 'verify_otp',
                message: 'Account exists but email not verified. Please verify your email.',
                member: {
                    email: member.email,
                    memberName: member.memberName,
                    membershipId: member.membershipId
                }
            });
        }

        if (member.isVerified && member.memberStatus === 'verified') {
            return NextResponse.json({
                exists: true,
                action: 'login',
                message: 'Account exists and verified. Please login.',
                member: {
                    email: member.email,
                    memberName: member.memberName,
                    membershipId: member.membershipId
                }
            });
        }

        if (member.memberStatus === 'suspended') {
            return NextResponse.json({
                exists: true,
                action: 'contact_admin',
                message: 'Account has been suspended. Please contact administration.',
                member: {
                    email: member.email,
                    memberName: member.memberName
                }
            });
        }

        // Default response
        return NextResponse.json({
            exists: true,
            action: 'login',
            message: 'Please login to continue.',
            member: {
                email: member.email,
                memberName: member.memberName
            }
        });

    } catch (error) {
        console.error('Member status check error:', error);
        return NextResponse.json(
            { error: 'Failed to check member status. Please try again.' },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json(
        { message: 'Member status check API endpoint' },
        { status: 200 }
    );
}
