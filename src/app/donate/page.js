"use client"
import { useState, useEffect } from 'react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import DonorForm from '@/components/donation/DonorForm';
import PaymentScreen from '@/components/donation/PaymentScreen';
import { LotusIcon, HeartIcon } from '@/components/icons';

export default function DonatePage() {
    const [step, setStep] = useState(1); // 1 for donor form, 2 for payment
    const [donorData, setDonorData] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [memberData, setMemberData] = useState(null);

    useEffect(() => {
        // Check if user is logged in
        const storedMemberData = localStorage.getItem('memberData');
        if (storedMemberData) {
            try {
                const member = JSON.parse(storedMemberData);
                setMemberData(member);
                setIsLoggedIn(true);
            } catch (error) {
                console.error('Error parsing member data:', error);
                localStorage.removeItem('memberData');
            }
        }
    }, []);

    const handleDonorSubmit = (data) => {
        setDonorData(data);
        setStep(2);
    };

    const handleBackToDonorForm = () => {
        setStep(1);
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    {/* Header section with Indian-inspired design */}
                    <div className="text-center mb-12 relative">
                        <div className="absolute inset-0 flex items-center justify-center opacity-5 -z-10">
                            <LotusIcon className="w-96 h-96 text-orange-500" />
                        </div>
                        <div className="inline-flex items-center justify-center mb-4">
                            <HeartIcon className="w-8 h-8 text-orange-500 mr-2" />
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-red-500 to-orange-400 inline-block text-transparent bg-clip-text">
                                Support Our Cause
                            </h1>
                            <HeartIcon className="w-8 h-8 text-orange-500 ml-2" />
                        </div>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Your contribution helps us continue our mission of serving communities in need.
                            Every donation makes a meaningful impact in changing lives.
                        </p>

                        {/* Step indicator */}
                        <div className="mt-8 flex justify-center">
                            <div className="flex items-center">
                                <div className={`rounded-full h-10 w-10 flex items-center justify-center ${step === 1 ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-500'
                                    }`}>
                                    1
                                </div>
                                <div className={`h-1 w-16 ${step === 2 ? 'bg-orange-500' : 'bg-orange-100'}`}></div>
                                <div className={`rounded-full h-10 w-10 flex items-center justify-center ${step === 2 ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-500'
                                    }`}>
                                    2
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main content area */}
                    <div className="max-w-3xl mx-auto">
                        <div className="bg-white shadow-xl rounded-lg overflow-hidden border border-orange-100">
                            {/* Decorative top border with Indian tricolor gradient */}
                            <div className="h-2 bg-gradient-to-r from-orange-500 via-white to-green-500"></div>

                            {step === 1 ? (
                                <DonorForm 
                                    onSubmit={handleDonorSubmit} 
                                    isLoggedIn={isLoggedIn}
                                    memberData={memberData}
                                />
                            ) : (
                                <PaymentScreen
                                    donorData={donorData}
                                    onBack={handleBackToDonorForm}
                                    isLoggedIn={isLoggedIn}
                                    memberData={memberData}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
