"use client";
import { useState, useEffect } from "react";

export default function OtpVerification({ target, memberData, onVerified }) {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
    const [otpSent, setOtpSent] = useState(false);

    // Timer countdown
    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [timeLeft]);

    // Send OTP when component mounts
    useEffect(() => {
        sendOTP();
    }, []);

    const sendOTP = async () => {
        setResending(true);
        setError("");

        try {
            const response = await fetch('/api/auth/send-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: target,
                    memberName: memberData?.memberName || ''
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send OTP');
            }

            setOtpSent(true);
            setTimeLeft(600); // Reset timer
        } catch (error) {
            console.error('Send OTP error:', error);
            setError(error.message || 'Failed to send OTP. Please try again.');
        } finally {
            setResending(false);
        }
    };

    const handleChange = (e) => {
        const value = e.target.value.replace(/\D/g, ''); // Only digits
        if (value.length <= 6) {
            setOtp(value);
            setError("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (otp.length !== 6) {
            setError("Please enter a 6-digit OTP");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch('/api/auth/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: target,
                    otp
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'OTP verification failed');
            }

            // OTP verified successfully - now verify the member
            try {
                const verifyResponse = await fetch('/api/member/verify', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: target })
                });

                if (!verifyResponse.ok) {
                    console.error('Member verification failed, but OTP was valid');
                }
            } catch (verifyError) {
                console.error('Member verification error:', verifyError);
                // Don't fail the flow if member verification fails
            }

            // Proceed to next step
            onVerified();
        } catch (error) {
            console.error('Verify OTP error:', error);
            setError(error.message || 'OTP verification failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <form onSubmit={handleSubmit} className="p-8 text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">📧</span>
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mb-2">Verify Your Email</h2>

            <p className="text-gray-600 mb-4">
                We've sent a 6-digit OTP to<br />
                <span className="font-medium text-orange-600">{target}</span>
            </p>

            {otpSent && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                    <p className="text-sm text-green-700">
                        ✅ OTP sent successfully! Check your email inbox.
                    </p>
                </div>
            )}

            <div className="space-y-4">
                <input
                    type="text"
                    value={otp}
                    onChange={handleChange}
                    maxLength={6}
                    className="w-48 text-center border-2 border-gray-300 rounded-lg px-4 py-3 text-xl tracking-widest font-mono focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                    placeholder="000000"
                    disabled={loading}
                />

                {timeLeft > 0 && (
                    <p className="text-sm text-gray-500">
                        ⏰ OTP expires in: <span className="font-mono font-medium">{formatTime(timeLeft)}</span>
                    </p>
                )}

                {timeLeft === 0 && (
                    <p className="text-sm text-red-600">
                        ⚠️ OTP has expired. Please request a new one.
                    </p>
                )}

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <p className="text-sm text-red-600">{error}</p>
                    </div>
                )}
            </div>

            <button
                type="submit"
                disabled={loading || otp.length !== 6 || timeLeft === 0}
                className="w-full py-3 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
                {loading ? (
                    <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Verifying...
                    </span>
                ) : 'Verify OTP'}
            </button>

            <div className="pt-2 space-y-2">
                <p className="text-sm text-gray-500">Didn't receive the email?</p>
                <button
                    type="button"
                    onClick={sendOTP}
                    disabled={resending || timeLeft > 540} // Allow resend after 1 minute
                    className="text-sm text-orange-600 hover:underline disabled:text-gray-400 disabled:no-underline"
                >
                    {resending ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-orange-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                        </span>
                    ) : timeLeft > 540 ? `Resend in ${formatTime(timeLeft - 540)}` : 'Resend OTP'}
                </button>

                <p className="text-xs text-gray-400 mt-2">
                    💡 Check your spam folder if you don't see the email
                </p>
            </div>
        </form>
    );
}
