"use client";
import { useState, useEffect } from 'react';
import { FaUsers, FaUser, FaEnvelope, FaPhone, FaCheckCircle, FaClock } from 'react-icons/fa';
import { MdVerified, MdPending } from 'react-icons/md';

export default function ReferralsList({ memberId }) {
    const [referrals, setReferrals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (memberId) {
            fetchReferrals();
        }
    }, [memberId]);

    const fetchReferrals = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/member/referrals?memberId=${memberId}`);
            
            if (response.ok) {
                const data = await response.json();
                setReferrals(data.referrals || []);
            } else {
                setError('Failed to fetch referrals');
            }
        } catch (error) {
            console.error('Error fetching referrals:', error);
            setError('Error loading referrals');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600">{error}</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {referrals.length === 0 ? (
                <div className="text-center py-8">
                    <div className="text-6xl mb-4 text-gray-300">
                        <FaUsers className="mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Referrals Yet</h3>
                    <p className="text-gray-500">
                        Start referring friends and family to grow our foundation family!
                    </p>
                </div>
            ) : (
                <>
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-blue-900">Total Referrals</h3>
                                <p className="text-blue-700">You have successfully referred {referrals.length} member{referrals.length !== 1 ? 's' : ''}</p>
                            </div>
                            <div className="text-3xl text-blue-600">
                                {referrals.length}
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-4">
                        {referrals.map((referral, index) => (
                            <div 
                                key={referral._id || index} 
                                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                                            <FaUser className="text-xl text-blue-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">{referral.fullName}</h4>
                                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                <span className="flex items-center space-x-1">
                                                    <FaEnvelope className="text-xs" />
                                                    <span>{referral.email}</span>
                                                </span>
                                                <span className="flex items-center space-x-1">
                                                    <FaPhone className="text-xs" />
                                                    <span>{referral.phone}</span>
                                                </span>
                                            </div>
                                            <div className="text-sm text-gray-400 mt-1">
                                                Member ID: {referral.memberId}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            referral.isVerified 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {referral.isVerified ? (
                                                <>
                                                    <FaCheckCircle />
                                                    <span>Verified</span>
                                                </>
                                            ) : (
                                                <>
                                                    <FaClock />
                                                    <span>Pending</span>
                                                </>
                                            )}
                                        </div>
                                        <div className="text-sm text-gray-500 mt-1">
                                            {new Date(referral.registrationDate).toLocaleDateString('en-IN', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </div>
                                    </div>
                                </div>
                                
                                {referral.address && (
                                    <div className="mt-3 text-sm text-gray-600">
                                        <span className="font-medium">Address:</span> {referral.address}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
