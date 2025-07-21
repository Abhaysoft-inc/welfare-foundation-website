import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Member from '@/models/Member';

export async function GET(request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const memberId = searchParams.get('memberId');

        if (!memberId) {
            return NextResponse.json({ error: 'Member ID is required' }, { status: 400 });
        }

        // Find the member to get their _id
        let actualMemberId = memberId;

        // If memberId is not a valid ObjectId, assume it's a membershipId
        if (!memberId.match(/^[0-9a-fA-F]{24}$/)) {
            const member = await Member.findOne({ membershipId: memberId }).select('_id');
            if (!member) {
                return NextResponse.json({ error: 'Member not found' }, { status: 404 });
            }
            actualMemberId = member._id;
        }

        // Get all members referred by this member
        const referredMembers = await Member.getReferredMembers(actualMemberId);

        return NextResponse.json({
            referredMembers,
            totalReferred: referredMembers.length
        });

    } catch (error) {
        console.error('Get referred members error:', error);
        return NextResponse.json({
            error: 'Failed to fetch referred members',
            details: error.message
        }, { status: 500 });
    }
}
