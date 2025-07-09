import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Member from '@/models/Member';

export async function GET() {
    try {
        await dbConnect();

        const members = await Member.find({})
            .select('memberName email membershipId registrationDate')
            .sort({ registrationDate: -1 })
            .limit(10);

        return NextResponse.json({
            success: true,
            count: members.length,
            members
        });

    } catch (error) {
        console.error('Error fetching members:', error);
        return NextResponse.json(
            { error: 'Failed to fetch members' },
            { status: 500 }
        );
    }
}
