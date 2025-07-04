"use client";
import { useState } from "react";

function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export default function OtpVerification({ target, onVerified }) {
    const [otp, setOtp] = useState("");
    const [sentOtp, setSentOtp] = useState(generateOtp());
    const [error, setError] = useState("");
    const [resent, setResent] = useState(false);

    // Simulate sending OTP (in real app, call backend)
    const handleResend = () => {
        setSentOtp(generateOtp());
        setResent(true);
        setTimeout(() => setResent(false), 2000);
    };

    const handleChange = (e) => {
        setOtp(e.target.value);
        setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (otp === sentOtp) {
            onVerified();
        } else {
            setError("Invalid OTP. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-8 text-center space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Verify OTP</h2>
            <p className="text-gray-600 mb-4">
                Enter the 6-digit OTP sent to <span className="font-medium text-orange-600">{target}</span>.<br />
                <span className="text-xs text-gray-400">(Demo: OTP is <b>{sentOtp}</b>)</span>
            </p>
            <input
                type="text"
                value={otp}
                onChange={handleChange}
                maxLength={6}
                className="w-40 text-center border rounded px-4 py-2 text-lg tracking-widest"
                placeholder="------"
            />
            {error && <p className="text-xs text-red-600">{error}</p>}
            <button type="submit" className="w-full py-3 rounded bg-orange-500 text-white font-semibold hover:bg-orange-600 mt-4">Verify</button>
            <div className="pt-2">
                <button type="button" onClick={handleResend} className="text-sm text-orange-600 hover:underline" disabled={resent}>
                    {resent ? "OTP Sent!" : "Resend OTP"}
                </button>
            </div>
        </form>
    );
}
