"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import MemberCertificate from "@/components/member/MemberCertificate";
import MemberIdCard from "@/components/member/MemberIdCard";
import DonationHistory from "@/components/member/DonationHistory";
import MemberProfileEdit from "@/components/member/MemberProfileEdit";

export default function MemberDashboard() {
    const router = useRouter();
    const [memberData, setMemberData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [donations, setDonations] = useState([]);

    useEffect(() => {
        // Get member data from localStorage
        const storedData = localStorage.getItem('memberData');
        if (!storedData) {
            router.push('/member/login');
            return;
        }

        try {
            const member = JSON.parse(storedData);
            setMemberData(member);

            // Load donation history from API
            fetchDonations(member._id);
        } catch (error) {
            console.error('Error parsing member data:', error);
            router.push('/member/login');
            return;
        }

        setLoading(false);
    }, [router]);

    const fetchDonations = async (memberId) => {
        try {
            const response = await fetch(`/api/member/donations?memberId=${memberId}`);
            if (response.ok) {
                const data = await response.json();
                setDonations(data.donations || []);
            } else {
                console.error('Failed to fetch donations');
                // Fallback to empty array
                setDonations([]);
            }
        } catch (error) {
            console.error('Error fetching donations:', error);
            setDonations([]);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('memberData');
        router.push('/');
    };

    const handleProfileUpdate = (updatedData) => {
        setMemberData(updatedData);
        localStorage.setItem('memberData', JSON.stringify(updatedData));
    };

    const refreshDonations = () => {
        if (memberData?._id) {
            fetchDonations(memberData._id);
        }
    };

    const tabs = [
        { id: 'overview', label: 'Overview', icon: '🏠' },
        { id: 'certificate', label: 'Certificate', icon: '📜' },
        { id: 'idcard', label: 'ID Card', icon: '🆔' },
        { id: 'donations', label: 'Donations', icon: '💝' },
        { id: 'profile', label: 'Edit Profile', icon: '⚙️' }
    ];

    if (loading || !memberData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    {/* Header */}
                    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                            <div className="flex items-center space-x-4 mb-4 md:mb-0">
                                <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center overflow-hidden">
                                    {memberData.photoUrl ? (
                                        <img src={memberData.photoUrl} alt={memberData.memberName} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-2xl">👤</span>
                                    )}
                                </div>
                                <div>
                                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                                        Welcome, {memberData.memberName}!
                                    </h1>
                                    <p className="text-gray-600">Member ID: {memberData.membershipId}</p>
                                    <div className="flex items-center mt-1">
                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${memberData.isVerified
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {memberData.isVerified ? '✅ Verified' : '⏳ Pending Verification'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="text-right hidden md:block">
                                    <p className="text-sm text-gray-500">Member Since</p>
                                    <p className="font-medium">{new Date(memberData.registrationDate).toLocaleDateString('en-IN')}</p>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="bg-white rounded-xl shadow-lg mb-8">
                        <div className="flex flex-wrap border-b border-gray-200">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-colors ${activeTab === tab.id
                                            ? 'border-b-2 border-orange-500 text-orange-600 bg-orange-50'
                                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    <span className="text-lg">{tab.icon}</span>
                                    <span className="hidden sm:inline">{tab.label}</span>
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="p-6">
                            {activeTab === 'overview' && (
                                <div className="space-y-6">
                                    {/* Quick Stats */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                                            <div className="flex items-center">
                                                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                                                    <span className="text-2xl text-white">✅</span>
                                                </div>
                                                <div className="ml-4">
                                                    <h3 className="font-semibold text-gray-800">Account Status</h3>
                                                    <p className="text-sm text-green-600">
                                                        {memberData.isVerified ? 'Verified Member' : 'Pending Verification'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                                            <div className="flex items-center">
                                                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                                                    <span className="text-2xl text-white">💝</span>
                                                </div>
                                                <div className="ml-4">
                                                    <h3 className="font-semibold text-gray-800">Total Donations</h3>
                                                    <p className="text-sm text-blue-600">
                                                        ₹{donations.reduce((sum, donation) => sum + donation.amount, 0).toLocaleString('en-IN')}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
                                            <div className="flex items-center">
                                                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                                                    <span className="text-2xl text-white">📅</span>
                                                </div>
                                                <div className="ml-4">
                                                    <h3 className="font-semibold text-gray-800">Member Since</h3>
                                                    <p className="text-sm text-orange-600">
                                                        {new Date(memberData.registrationDate).toLocaleDateString('en-IN')}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quick Actions */}
                                    <div className="bg-gray-50 rounded-lg p-6">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <button
                                                onClick={() => setActiveTab('certificate')}
                                                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
                                            >
                                                <div className="text-2xl mb-2">📜</div>
                                                <div className="text-sm font-medium">Download Certificate</div>
                                            </button>
                                            <button
                                                onClick={() => setActiveTab('idcard')}
                                                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
                                            >
                                                <div className="text-2xl mb-2">🆔</div>
                                                <div className="text-sm font-medium">Download ID Card</div>
                                            </button>
                                            <button
                                                onClick={() => setActiveTab('donations')}
                                                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
                                            >
                                                <div className="text-2xl mb-2">💝</div>
                                                <div className="text-sm font-medium">View Donations</div>
                                            </button>
                                            <button
                                                onClick={() => setActiveTab('profile')}
                                                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
                                            >
                                                <div className="text-2xl mb-2">⚙️</div>
                                                <div className="text-sm font-medium">Edit Profile</div>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Recent Activity */}
                                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
                                        <div className="space-y-3">
                                            {donations.slice(0, 3).map((donation) => (
                                                <div key={donation.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                                            <span className="text-sm">💝</span>
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-gray-800">Donation - {donation.purpose}</p>
                                                            <p className="text-sm text-gray-500">{new Date(donation.date).toLocaleDateString('en-IN')}</p>
                                                        </div>
                                                    </div>
                                                    <span className="font-semibold text-green-600">₹{donation.amount.toLocaleString('en-IN')}</span>
                                                </div>
                                            ))}
                                            {donations.length === 0 && (
                                                <p className="text-gray-500 text-center py-4">No recent activity</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'certificate' && (
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Membership Certificate</h3>
                                    <p className="text-gray-600 mb-6">
                                        Download your official membership certificate for Pandit Sachidanand Welfare Foundation.
                                    </p>
                                    <MemberCertificate member={memberData} />
                                </div>
                            )}

                            {activeTab === 'idcard' && (
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Member ID Card</h3>
                                    <p className="text-gray-600 mb-6">
                                        Download your member ID card in standard ID card dimensions.
                                    </p>
                                    <MemberIdCard member={memberData} />
                                </div>
                            )}

                            {activeTab === 'donations' && (
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Donation History</h3>
                                    <p className="text-gray-600 mb-6">
                                        View all your donations and download invoices.
                                    </p>
                                    <DonationHistory
                                        donations={donations}
                                        memberData={memberData}
                                        onRefresh={refreshDonations}
                                    />
                                </div>
                            )}

                            {activeTab === 'profile' && (
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Edit Profile</h3>
                                    <p className="text-gray-600 mb-6">
                                        Update your personal information and contact details.
                                    </p>
                                    <MemberProfileEdit
                                        memberData={memberData}
                                        onUpdate={handleProfileUpdate}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
