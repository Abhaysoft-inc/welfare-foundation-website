import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Member from '@/models/Member';

export async function POST(request) {
    try {
        await dbConnect();

        const { email } = await request.json();

        // Validation
        if (!email) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            );
        }

        // Find and update the member
        const member = await Member.findOneAndUpdate(
            { email: email.toLowerCase() },
            {
                isVerified: true,
                memberStatus: 'verified'
            },
            { new: true }
        );

        if (!member) {
            return NextResponse.json(
                { error: 'Member not found' },
                { status: 404 }
            );
        }

        console.log(`Member verified: ${member.email} (${member.membershipId})`);

        return NextResponse.json({
            success: true,
            message: 'Member verified successfully',
            member: {
                membershipId: member.membershipId,
                memberName: member.memberName,
                email: member.email,
                isVerified: member.isVerified
            }
        });

    } catch (error) {
        console.error('Member verification error:', error);
        return NextResponse.json(
            { error: 'Failed to verify member. Please try again.' },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json(
        { message: 'Member verification API endpoint' },
        { status: 200 }
    );
}
