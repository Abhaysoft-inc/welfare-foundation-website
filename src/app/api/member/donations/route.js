import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Donation from '@/models/Donation';

export async function GET(request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const memberId = searchParams.get('memberId');

        if (!memberId) {
            return NextResponse.json({ error: 'Member ID is required' }, { status: 400 });
        }

        // Get donations for the member
        const donations = await Donation.getByMemberId(memberId, {
            limit: 100,
            sort: { donationDate: -1 }
        });

        // If no donations found, return mock data for demo purposes
        if (donations.length === 0) {
            const mockDonations = [
                {
                    _id: 'mock1',
                    donationId: 'DON-2025-001',
                    amount: 5000,
                    purpose: 'Education Support',
                    paymentMode: 'UPI',
                    transactionId: 'TXN123456789',
                    status: 'Completed',
                    donationDate: new Date('2025-01-15'),
                    receiptGenerated: true,
                    taxBenefit: true
                },
                {
                    _id: 'mock2',
                    donationId: 'DON-2025-002',
                    amount: 2500,
                    purpose: 'Medical Aid',
                    paymentMode: 'Credit Card',
                    transactionId: 'TXN987654321',
                    status: 'Completed',
                    donationDate: new Date('2025-02-10'),
                    receiptGenerated: true,
                    taxBenefit: true
                },
                {
                    _id: 'mock3',
                    donationId: 'DON-2024-015',
                    amount: 1000,
                    purpose: 'Food Distribution',
                    paymentMode: 'Net Banking',
                    transactionId: 'TXN456789123',
                    status: 'Completed',
                    donationDate: new Date('2024-12-20'),
                    receiptGenerated: true,
                    taxBenefit: true
                }
            ];

            return NextResponse.json({ donations: mockDonations });
        }

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
