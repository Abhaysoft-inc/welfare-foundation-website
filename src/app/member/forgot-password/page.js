"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [step, setStep] = useState(1); // 1: Email input, 2: OTP verification, 3: Reset password
    const [form, setForm] = useState({
        email: "",
        otp: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
    const [verificationToken, setVerificationToken] = useState(null);

    // Timer countdown for OTP
    useEffect(() => {
        if (step === 2 && timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [timeLeft, step]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const sendPasswordResetOTP = async (email) => {
        const response = await fetch('/api/auth/send-password-reset-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email })
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Failed to send OTP');
        }

        return data;
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();

        if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) {
            setErrors({ email: "Please enter a valid email address" });
            return;
        }

        setLoading(true);
        setErrors({});

        try {
            const data = await sendPasswordResetOTP(form.email);
            setSuccessMessage(`OTP sent successfully to ${form.email}`);
            setStep(2);
            setTimeLeft(600); // Reset timer
        } catch (error) {
            setErrors({ email: error.message });
        } finally {
            setLoading(false);
        }
    };

    const handleOTPSubmit = async (e) => {
        e.preventDefault();

        if (!form.otp.trim() || form.otp.length !== 6) {
            setErrors({ otp: "Please enter a 6-digit OTP" });
            return;
        }

        setLoading(true);
        setErrors({});

        try {
            const response = await fetch('/api/auth/verify-password-reset-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: form.email,
                    otp: form.otp
                })
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'OTP verification failed');
            }

            // Store the verification token for password reset
            setVerificationToken(data.token);
            setSuccessMessage('OTP verified! Now set your new password.');
            setStep(3);
        } catch (error) {
            setErrors({ otp: error.message });
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!form.newPassword.trim() || form.newPassword.length < 8) {
            newErrors.newPassword = "Password must be at least 8 characters";
        }
        if (form.newPassword !== form.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        if (Object.keys(newErrors).length) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        setErrors({});

        try {
            const response = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: form.email,
                    password: form.newPassword,
                    token: verificationToken
                })
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Password reset failed');
            }

            // Success - redirect to login
            router.push('/member/login?message=password_reset&email=' + encodeURIComponent(form.email));
        } catch (error) {
            setErrors({ submit: error.message });
        } finally {
            setLoading(false);
        }
    };

    const handleResendOTP = async () => {
        try {
            await sendPasswordResetOTP(form.email);
            setSuccessMessage('OTP sent again successfully!');
            setTimeLeft(600); // Reset timer
        } catch (error) {
            setErrors({ resend: error.message });
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
                <div className="max-w-md mx-auto px-4 py-12">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-orange-600 mb-2">Reset Password</h1>
                        <p className="text-gray-600">
                            {step === 1 && "Enter your email to receive a password reset OTP"}
                            {step === 2 && "Enter the OTP sent to your email"}
                            {step === 3 && "Set your new password"}
                        </p>
                    </div>

                    <div className="bg-white shadow-xl rounded-lg border border-orange-100">
                        <div className="h-2 bg-gradient-to-r from-orange-500 via-white to-green-500"></div>

                        {/* Step 1: Email Input */}
                        {step === 1 && (
                            <form onSubmit={handleEmailSubmit} className="p-6 space-y-5">
                                <div className="text-center mb-6">
                                    <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                                        <span className="text-2xl">🔑</span>
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-800">Find Your Account</h2>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email Address *</label>
                                    <input
                                        name="email"
                                        type="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
                                        placeholder="Enter your registered email"
                                    />
                                    {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3 rounded-md bg-orange-500 text-white font-semibold hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                                >
                                    {loading ? 'Sending OTP...' : 'Send Reset OTP'}
                                </button>

                                <div className="text-center pt-4">
                                    <a href="/member/login" className="text-sm text-orange-600 hover:underline">
                                        Remember your password? Sign in
                                    </a>
                                </div>
                            </form>
                        )}

                        {/* Step 2: OTP Verification */}
                        {step === 2 && (
                            <form onSubmit={handleOTPSubmit} className="p-6 space-y-5">
                                <div className="text-center mb-6">
                                    <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                                        <span className="text-2xl">📧</span>
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-800">Verify OTP</h2>
                                    <p className="text-sm text-gray-600 mt-2">
                                        We've sent a 6-digit code to<br />
                                        <span className="font-medium text-orange-600">{form.email}</span>
                                    </p>
                                </div>

                                {successMessage && (
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                                        <p className="text-sm text-green-700">{successMessage}</p>
                                    </div>
                                )}

                                <div>
                                    <input
                                        name="otp"
                                        type="text"
                                        maxLength={6}
                                        value={form.otp}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, '');
                                            setForm({ ...form, otp: value });
                                            setErrors({ ...errors, otp: "" });
                                        }}
                                        className="block w-full text-center border-2 border-gray-300 rounded-lg px-4 py-3 text-xl tracking-widest font-mono focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                                        placeholder="000000"
                                    />
                                    {errors.otp && <p className="text-xs text-red-600 mt-1">{errors.otp}</p>}
                                </div>

                                {timeLeft > 0 && (
                                    <p className="text-sm text-gray-500 text-center">
                                        ⏰ OTP expires in: <span className="font-mono font-medium">{formatTime(timeLeft)}</span>
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading || form.otp.length !== 6 || timeLeft === 0}
                                    className="w-full py-3 rounded-md bg-orange-500 text-white font-semibold hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                                >
                                    {loading ? 'Verifying...' : 'Verify OTP'}
                                </button>

                                <div className="text-center pt-4">
                                    <button
                                        type="button"
                                        onClick={handleResendOTP}
                                        disabled={timeLeft > 540} // Allow resend after 1 minute
                                        className="text-sm text-orange-600 hover:underline disabled:text-gray-400 disabled:no-underline"
                                    >
                                        {timeLeft > 540 ? `Resend in ${formatTime(timeLeft - 540)}` : 'Resend OTP'}
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* Step 3: Reset Password */}
                        {step === 3 && (
                            <form onSubmit={handlePasswordReset} className="p-6 space-y-5">
                                <div className="text-center mb-6">
                                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                        <span className="text-2xl">🔒</span>
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-800">Set New Password</h2>
                                    <p className="text-sm text-gray-600 mt-2">
                                        Choose a strong password for your account
                                    </p>
                                </div>

                                {successMessage && (
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                                        <p className="text-sm text-green-700">{successMessage}</p>
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">New Password *</label>
                                    <input
                                        name="newPassword"
                                        type="password"
                                        value={form.newPassword}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
                                        placeholder="At least 8 characters"
                                    />
                                    {errors.newPassword && <p className="text-xs text-red-600 mt-1">{errors.newPassword}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Confirm New Password *</label>
                                    <input
                                        name="confirmPassword"
                                        type="password"
                                        value={form.confirmPassword}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
                                        placeholder="Re-enter new password"
                                    />
                                    {errors.confirmPassword && <p className="text-xs text-red-600 mt-1">{errors.confirmPassword}</p>}
                                </div>

                                {errors.submit && (
                                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                        <p className="text-sm text-red-600">{errors.submit}</p>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3 rounded-md bg-orange-500 text-white font-semibold hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                                >
                                    {loading ? 'Resetting Password...' : 'Reset Password'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
