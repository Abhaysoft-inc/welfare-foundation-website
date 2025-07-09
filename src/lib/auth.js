/**
 * Authentication utility functions
 */

export const isAuthenticated = () => {
    if (typeof window === 'undefined') return false;

    const memberData = localStorage.getItem('memberData');
    return !!memberData;
};

export const getMemberData = () => {
    if (typeof window === 'undefined') return null;

    const memberData = localStorage.getItem('memberData');
    if (!memberData) return null;

    try {
        return JSON.parse(memberData);
    } catch (error) {
        console.error('Error parsing member data:', error);
        return null;
    }
};

export const logout = () => {
    if (typeof window === 'undefined') return;

    localStorage.removeItem('memberData');
    window.location.href = '/';
};

export const getProfileImageUrl = (member) => {
    // Check for different possible field names
    const imageUrl = member?.photoUrl || member?.profileImage;
    if (!imageUrl) return null;

    // If it's already a full URL, return as is
    if (imageUrl.startsWith('http') || imageUrl.startsWith('data:')) {
        return imageUrl;
    }

    // If it's a relative path, prepend with base URL
    return `/uploads/${imageUrl}`;
};

export const getInitials = (member) => {
    if (!member) return 'U';

    // Try different possible name fields
    const fullName = member.memberName || member.name || member.firstName;
    if (!fullName) return 'U';

    const nameParts = fullName.trim().split(' ');
    const firstInitial = nameParts[0]?.charAt(0).toUpperCase() || 'U';
    const lastInitial = nameParts[1]?.charAt(0).toUpperCase() || '';

    return firstInitial + lastInitial;
};

export const getMemberDisplayName = (member) => {
    if (!member) return 'User';

    // Try different possible name fields
    return member.memberName || member.name || member.firstName || 'User';
};

export const getMemberId = (member) => {
    if (!member) return null;

    // Prefer MongoDB _id if available, otherwise use membershipId
    // The API will handle both cases
    return member._id || member.id || member.membershipId || null;
};
