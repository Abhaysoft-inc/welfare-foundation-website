import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Donation from '@/models/Donation';
import { checkAdminAuth } from '@/lib/adminAuth';

export async function GET(request) {
    try {
        await dbConnect();

        // Check for admin authentication using proper database verification
        const authHeader = request.headers.get('authorization');
        const memberIdHeader = request.headers.get('x-member-id');

        if (!memberIdHeader) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Authentication required',
                    message: 'Member ID is required for admin verification'
                },
                { status: 401 }
            );
        }

        try {
            // Verify admin status from database
            const memberData = { _id: memberIdHeader };
            const isAdmin = await checkAdminAuth(memberData);
            if (!isAdmin) {
                throw new Error('Not authorized');
            }
        } catch (adminError) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Admin access required',
                    message: 'Only administrators can view all donations'
                },
                { status: 403 }
            );
        }

        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '50');
        const sortBy = searchParams.get('sortBy') || 'donationDate';
        const sortOrder = searchParams.get('sortOrder') || 'desc';
        const status = searchParams.get('status');

        // Build query
        const query = {};
        if (status) {
            query.status = status;
        }

        // Calculate pagination
        const skip = (page - 1) * limit;

        // Build sort object
        const sort = {};
        sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

        // Fetch donations with pagination
        const donations = await Donation.find(query)
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .select('-gatewaySignature -notes') // Exclude sensitive fields
            .lean();

        // Get total count for pagination
        const totalDonations = await Donation.countDocuments(query);
        const totalPages = Math.ceil(totalDonations / limit);

        // Calculate summary statistics
        const stats = await Donation.aggregate([
            { $match: query },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: '$amount' },
                    totalDonations: { $sum: 1 },
                    avgDonation: { $avg: '$amount' },
                    statusBreakdown: {
                        $push: '$status'
                    }
                }
            }
        ]);

        // Count by status
        const statusCounts = await Donation.aggregate([
            { $match: query },
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 },
                    totalAmount: { $sum: '$amount' }
                }
            }
        ]);

        return NextResponse.json({
            success: true,
            donations,
            pagination: {
                currentPage: page,
                totalPages,
                totalDonations,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1,
                limit
            },
            statistics: {
                total: stats[0] || { totalAmount: 0, totalDonations: 0, avgDonation: 0 },
                statusBreakdown: statusCounts
            }
        });

    } catch (error) {
        console.error('Error fetching donations:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch donations',
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            },
            { status: 500 }
        );
    }
}
