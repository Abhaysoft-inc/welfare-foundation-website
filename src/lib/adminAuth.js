// Client-side admin authentication helper (synchronous, less secure)
export const isAdminSync = (memberData) => {
    if (!memberData) return false;
    
    return (
        memberData.role === 'admin' ||
        memberData.role === 'super_admin' ||
        memberData.isAdmin === true
    );
};

// Server-side admin authentication helper using database
export const checkAdminAuth = async (memberData) => {
    if (!memberData) return false;
    
    try {
        // Import database connection only on server-side
        const dbConnect = (await import('./mongodb')).default;
        const Member = (await import('@/models/Member')).default;
        
        await dbConnect();
        
        // Find member in database and check admin status
        const member = await Member.findById(memberData._id || memberData.id);
        if (!member) return false;
        
        return (
            member.role === 'admin' ||
            member.role === 'super_admin' ||
            member.isAdmin === true
        );
    } catch (error) {
        console.error('Error checking admin status:', error);
        return false;
    }
};

// Verify admin access from localStorage (client-side)
export const verifyAdminAccess = () => {
    try {
        const memberData = localStorage.getItem('memberData');
        if (!memberData) return false;
        
        const member = JSON.parse(memberData);
        return isAdminSync(member);
    } catch (error) {
        return false;
    }
};
