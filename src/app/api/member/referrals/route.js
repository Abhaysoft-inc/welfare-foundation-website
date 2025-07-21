import dbConnect from '@/lib/mongodb';
import Member from '@/models/Member';

export async function GET(request) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const memberId = searchParams.get('memberId');

        if (!memberId) {
            return Response.json({ error: 'Member ID is required' }, { status: 400 });
        }

        // Check if member exists
        const member = await Member.findById(memberId);
        if (!member) {
            return Response.json({ error: 'Member not found' }, { status: 404 });
        }

        // Get referred members using static method
        const referredMembers = await Member.getReferredMembers(memberId);

        return Response.json({
            success: true,
            referrals: referredMembers || []
        });

    } catch (error) {
        console.error('Error fetching referrals:', error);
        return Response.json({
            error: 'Failed to fetch referrals'
        }, { status: 500 });
    }
}
