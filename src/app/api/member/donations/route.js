import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Donation from '@/models/Donation';
import Member from '@/models/Member';
import mongoose from 'mongoose';

export async function GET(request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const memberId = searchParams.get('memberId');

        if (!memberId) {
            return NextResponse.json({ error: 'Member ID is required' }, { status: 400 });
        }

        let actualMemberId = memberId;

        // Check if memberId is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(memberId)) {
            // If not a valid ObjectId, assume it's a membershipId and look up the member
            const member = await Member.findOne({ membershipId: memberId }).select('_id');

            if (!member) {
                return NextResponse.json({ error: 'Member not found' }, { status: 404 });
            }

            actualMemberId = member._id;
        }

        // Get donations for the member
        const donations = await Donation.getByMemberId(actualMemberId, {
            limit: 100,
            sort: { donationDate: -1 }
        });

        return NextResponse.json({ donations });

        return NextResponse.json({ donations });

    } catch (error) {
        console.error('Donations fetch error:', error);
        return NextResponse.json({
            error: 'Failed to fetch donations'
        }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await connectDB();

        const body = await request.json();
        const {
            memberId,
            amount,
            purpose,
            paymentMode,
            transactionId
        } = body;

        if (!memberId || !amount || !purpose || !paymentMode || !transactionId) {
            return NextResponse.json({
                error: 'Missing required fields'
            }, { status: 400 });
        }

        // Generate donation ID
        const donationId = await Donation.generateDonationId();

        // Create new donation
        const donation = new Donation({
            memberId,
            donationId,
            amount,
            purpose,
            paymentMode,
            transactionId,
            status: 'Completed' // In real app, this would be determined by payment gateway
        });

        await donation.save();

        return NextResponse.json({
            message: 'Donation recorded successfully',
            donation
        });

    } catch (error) {
        console.error('Donation creation error:', error);
        return NextResponse.json({
            error: 'Failed to record donation'
        }, { status: 500 });
    }
}
