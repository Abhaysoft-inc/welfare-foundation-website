"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import MemberCertificate from "@/components/member/MemberCertificate";

export default function MemberDashboard() {
    const router = useRouter();
    const [memberData, setMemberData] = useState(null);
    const [loading, setLoading] = useState(true);

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
        } catch (error) {
            console.error('Error parsing member data:', error);
            router.push('/member/login');
            return;
        }
        
        setLoading(false);
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('memberData');
        router.push('/');
    };

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
                <div className="max-w-6xl mx-auto px-4 py-12">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-3xl font-bold text-orange-600 mb-2">
                                    Welcome, {memberData.memberName}!
                                </h1>
                                <p className="text-gray-600">Member ID: {memberData.membershipId}</p>
                            </div>
                            <button 
                                onClick={handleLogout}
                                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    </div>

                    {/* Member Info Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                    <span className="text-2xl">✅</span>
                                </div>
                                <div className="ml-4">
                                    <h3 className="font-semibold text-gray-800">Account Status</h3>
                                    <p className="text-sm text-green-600">
                                        {memberData.isVerified ? 'Verified' : 'Pending Verification'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                    <span className="text-2xl">📅</span>
                                </div>
                                <div className="ml-4">
                                    <h3 className="font-semibold text-gray-800">Member Since</h3>
                                    <p className="text-sm text-gray-600">
                                        {new Date(memberData.registrationDate).toLocaleDateString('en-IN')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                                    <span className="text-2xl">🏆</span>
                                </div>
                                <div className="ml-4">
                                    <h3 className="font-semibold text-gray-800">Member Type</h3>
                                    <p className="text-sm text-gray-600">Active Member</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Member Details */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Personal Information */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>
                            <div className="space-y-3">
                                <div className="flex">
                                    <span className="w-32 text-sm font-medium text-gray-600">Full Name:</span>
                                    <span className="text-sm text-gray-800">{memberData.memberName}</span>
                                </div>
                                <div className="flex">
                                    <span className="w-32 text-sm font-medium text-gray-600">Services:</span>
                                    <span className="text-sm text-gray-800">{memberData.services || 'N/A'}</span>
                                </div>
                                <div className="flex">
                                    <span className="w-32 text-sm font-medium text-gray-600">Mobile:</span>
                                    <span className="text-sm text-gray-800">{memberData.mobile}</span>
                                </div>
                                <div className="flex">
                                    <span className="w-32 text-sm font-medium text-gray-600">Email:</span>
                                    <span className="text-sm text-gray-800">{memberData.email}</span>
                                </div>
                            </div>
                        </div>

                        {/* Address Information */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Address Information</h2>
                            <div className="space-y-3">
                                <div>
                                    <span className="block text-sm font-medium text-gray-600">Address:</span>
                                    <span className="text-sm text-gray-800">{memberData.address}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Membership Certificate */}
                    <div className="mt-8">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Membership Certificate</h2>
                            <p className="text-gray-600 mb-6">
                                Download or print your official membership certificate.
                            </p>
                            <MemberCertificate member={memberData} />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
