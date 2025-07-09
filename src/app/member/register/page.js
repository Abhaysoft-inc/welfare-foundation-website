"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import MemberRegistrationForm from "@/components/member/MemberRegistrationForm";
import OtpVerification from "@/components/member/OtpVerification";
import MemberCertificate from "@/components/member/MemberCertificate";

export default function RegisterPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [memberData, setMemberData] = useState(null);
    const [otpTarget, setOtpTarget] = useState("");

    const handleFormSubmit = async (data) => {
        // Check if this is an existing member trying to register again
        if (data.action === 'verify_otp') {
            // Existing unverified member - go to OTP verification
            setMemberData({ memberName: data.memberName, email: data.email });
            setOtpTarget(data.email);
            setStep(2);
            return;
        }
        
        if (data.action === 'login') {
            // Existing verified member - redirect to login
            router.push(`/member/login?email=${encodeURIComponent(data.email)}&message=already_registered`);
            return;
        }

        // New registration successful
        setMemberData(data);
        setOtpTarget(data.email);
        setStep(2);
    };

    const handleOtpVerified = () => {
        setStep(3);
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
                <div className={step === 3 ? "max-w-4xl mx-auto px-4 py-12" : "max-w-2xl mx-auto px-4 py-12"}>
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-orange-600 mb-2">Member Registration</h1>
                        <p className="text-gray-600">Join the Pandit Sachidanand Welfare Foundation as a member.</p>
                    </div>
                    
                    <div className="bg-white shadow-xl rounded-lg border border-orange-100">
                        <div className="h-2 bg-gradient-to-r from-orange-500 via-white to-green-500"></div>
                        
                        {step === 1 && (
                            <MemberRegistrationForm onSubmit={handleFormSubmit} />
                        )}
                        {step === 2 && (
                            <OtpVerification target={otpTarget} memberData={memberData} onVerified={handleOtpVerified} />
                        )}
                        {step === 3 && (
                            <>
                                <div className="p-8 text-center">
                                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                        <span className="text-3xl text-green-600">✔️</span>
                                    </div>
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Registration Complete!</h2>
                                    <p className="text-gray-600 mb-6">
                                        Congratulations! Your membership has been successfully registered.
                                        You can download your membership certificate below.
                                    </p>
                                </div>
                                <MemberCertificate member={memberData} />
                                <div className="p-6 text-center border-t border-gray-200">
                                    <a href="/member/login" className="inline-block px-6 py-3 rounded bg-orange-600 text-white font-medium hover:bg-orange-700 mr-4">
                                        Go to Login
                                    </a>
                                    <a href="/" className="inline-block px-6 py-3 rounded bg-gray-600 text-white font-medium hover:bg-gray-700">
                                        Return to Homepage
                                    </a>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
