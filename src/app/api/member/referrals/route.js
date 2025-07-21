import { connectDB } from '@/lib/mongodb';
import { Member } from '@/models/Member';

export async function GET(request) {
    try {
        await connectDB();
        
        const { searchParams } = new URL(request.url);
        const memberId = searchParams.get('memberId');
        
        if (!memberId) {
            return Response.json({ error: 'Member ID is required' }, { status: 400 });
        }

        // Find the member and populate their referrals
        const member = await Member.findById(memberId).populate('referredMembers');
        
        if (!member) {
            return Response.json({ error: 'Member not found' }, { status: 404 });
        }

        return Response.json({ 
            success: true, 
            referrals: member.referredMembers || [] 
        });

    } catch (error) {
        console.error('Error fetching referrals:', error);
        return Response.json({ 
            error: 'Failed to fetch referrals' 
        }, { status: 500 });
    }
}
