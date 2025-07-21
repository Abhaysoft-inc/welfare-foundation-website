"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export default function DonationsHistory() {
    const router = useRouter();
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [authLoading, setAuthLoading] = useState(true);
    const [filters, setFilters] = useState({
        startDate: '',
        endDate: '',
        purpose: '',
        minAmount: '',
        maxAmount: ''
    });

    useEffect(() => {
        // Check if user is admin
        checkAdminAuth();
    }, []);

    useEffect(() => {
        if (isAdmin) {
            fetchAllDonations();
        }
    }, [isAdmin]);

    const checkAdminAuth = async () => {
        // Check if user is logged in as admin
        const memberData = localStorage.getItem('memberData');
        if (!memberData) {
            router.push('/member/login');
            return;
        }

        try {
            const member = JSON.parse(memberData);

            // Check admin status using client-side verification first
            if (member.role === 'admin' || member.role === 'super_admin' || member.isAdmin === true) {
                setIsAdmin(true);
            } else {
                // Redirect non-admin users
                alert('Access denied. This page is only accessible to administrators.');
                router.push('/member/dashboard');
                return;
            }
        } catch (error) {
            router.push('/member/login');
            return;
        }

        setAuthLoading(false);
    };

    const fetchAllDonations = async () => {
        try {
            // Get member data for admin verification
            const memberData = localStorage.getItem('memberData');
            const headers = {
                'Content-Type': 'application/json'
            };

            if (memberData) {
                const member = JSON.parse(memberData);
                headers['x-member-id'] = member._id || member.id;
            }

            const response = await fetch('/api/donations/all', { headers });
            if (response.ok) {
                const data = await response.json();
                setDonations(data.donations || []);
            } else if (response.status === 403 || response.status === 401) {
                alert('Access denied. You do not have permission to view all donations.');
                router.push('/member/dashboard');
            }
        } catch (error) {
            console.error('Error fetching donations:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredDonations = donations.filter(donation => {
        const donationDate = new Date(donation.donationDate);
        const startDate = filters.startDate ? new Date(filters.startDate) : null;
        const endDate = filters.endDate ? new Date(filters.endDate) : null;

        if (startDate && donationDate < startDate) return false;
        if (endDate && donationDate > endDate) return false;
        if (filters.purpose && !donation.purpose.toLowerCase().includes(filters.purpose.toLowerCase())) return false;
        if (filters.minAmount && donation.amount < parseInt(filters.minAmount)) return false;
        if (filters.maxAmount && donation.amount > parseInt(filters.maxAmount)) return false;

        return true;
    });

    const totalAmount = filteredDonations.reduce((sum, donation) => sum + donation.amount, 0);

    // Show loading or unauthorized access
    if (authLoading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Checking permissions...</p>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    if (!isAdmin) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                        <div className="text-6xl mb-4">🚫</div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
                        <p className="text-gray-600 mb-4">This page is only accessible to administrators.</p>
                        <button
                            onClick={() => router.push('/member/dashboard')}
                            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                        >
                            Go to Dashboard
                        </button>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">All Donations</h1>
                                <p className="text-gray-600">View and track all donations made to the foundation</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-500">Total Donations</p>
                                <p className="text-2xl font-bold text-green-600">₹{totalAmount.toLocaleString('en-IN')}</p>
                                <p className="text-sm text-gray-500">{filteredDonations.length} donations</p>
                            </div>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter Donations</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                                <input
                                    type="date"
                                    value={filters.startDate}
                                    onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                                <input
                                    type="date"
                                    value={filters.endDate}
                                    onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Purpose</label>
                                <input
                                    type="text"
                                    placeholder="Search purpose..."
                                    value={filters.purpose}
                                    onChange={(e) => setFilters({ ...filters, purpose: e.target.value })}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Min Amount</label>
                                <input
                                    type="number"
                                    placeholder="₹ 0"
                                    value={filters.minAmount}
                                    onChange={(e) => setFilters({ ...filters, minAmount: e.target.value })}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Max Amount</label>
                                <input
                                    type="number"
                                    placeholder="₹ 100000"
                                    value={filters.maxAmount}
                                    onChange={(e) => setFilters({ ...filters, maxAmount: e.target.value })}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                                />
                            </div>
                        </div>
                        <div className="mt-4 flex space-x-2">
                            <button
                                onClick={() => setFilters({ startDate: '', endDate: '', purpose: '', minAmount: '', maxAmount: '' })}
                                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>

                    {/* Donations Table */}
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        {loading ? (
                            <div className="text-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
                                <p className="mt-4 text-gray-600">Loading donations...</p>
                            </div>
                        ) : filteredDonations.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">💝</div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No donations found</h3>
                                <p className="text-gray-500">Try adjusting your filters or check back later.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Donor
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Amount
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Purpose
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Payment Method
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredDonations.map((donation) => (
                                            <tr key={donation._id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {donation.donorName}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {donation.donorEmail}
                                                        </div>
                                                        {donation.donorPhone && (
                                                            <div className="text-sm text-gray-500">
                                                                {donation.donorPhone}
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-green-600">
                                                        ₹{donation.amount.toLocaleString('en-IN')}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-900 max-w-xs truncate">
                                                        {donation.purpose}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{donation.paymentMode}</div>
                                                    {donation.transactionId && (
                                                        <div className="text-xs text-gray-500 font-mono">
                                                            {donation.transactionId}
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(donation.donationDate).toLocaleDateString('en-IN', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${donation.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                            donation.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                                donation.status === 'Failed' ? 'bg-red-100 text-red-800' :
                                                                    'bg-gray-100 text-gray-800'
                                                        }`}>
                                                        {donation.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
