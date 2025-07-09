"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import OtpVerification from "@/components/member/OtpVerification";

export default function VerifyOtpPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [email, setEmail] = useState("");
    const [memberName, setMemberName] = useState("");

    useEffect(() => {
        const emailParam = searchParams.get('email');
        const nameParam = searchParams.get('name');

        if (!emailParam) {
            router.push('/member/login');
            return;
        }

        setEmail(emailParam);
        setMemberName(nameParam || '');
    }, [searchParams, router]);

    const handleOtpVerified = () => {
        // After OTP verification, redirect to login
        router.push('/member/login?verified=true');
    };

    if (!email) {
        return null; // Loading or redirecting
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
                <div className="max-w-2xl mx-auto px-4 py-12">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-orange-600 mb-2">Email Verification</h1>
                        <p className="text-gray-600">Complete your account verification to continue</p>
                    </div>

                    <div className="bg-white shadow-xl rounded-lg border border-orange-100">
                        <div className="h-2 bg-gradient-to-r from-orange-500 via-white to-green-500"></div>
                        <OtpVerification
                            target={email}
                            memberData={{ memberName }}
                            onVerified={handleOtpVerified}
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
