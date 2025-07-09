"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const verified = searchParams.get('verified');
        const email = searchParams.get('email');
        const message = searchParams.get('message');
        
        if (verified === 'true') {
            setSuccessMessage('Email verified successfully! You can now login.');
        }
        
        if (message === 'already_registered') {
            setSuccessMessage('You are already registered! Please login with your credentials.');
        }
        
        if (message === 'password_reset') {
            setSuccessMessage('Password reset successfully! You can now login with your new password.');
        }
        
        if (email) {
            setForm(prev => ({ ...prev, email }));
        }
    }, [searchParams]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const validate = () => {
        const newErrors = {};
        if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = "Valid email is required";
        }
        if (!form.password.trim()) {
            newErrors.password = "Password is required";
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) {
            setErrors(errs);
            return;
        }

        setLoading(true);
        
        try {
            const response = await fetch('/api/member/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form)
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.action === 'verify_otp') {
                    // Redirect to OTP verification
                    router.push(`/member/verify-otp?email=${encodeURIComponent(data.email)}&name=${encodeURIComponent(data.memberName || '')}`);
                    return;
                }
                throw new Error(data.error || 'Login failed');
            }

            // Login successful - redirect to dashboard or home
            localStorage.setItem('memberData', JSON.stringify(data.member));
            router.push('/member/dashboard');

        } catch (error) {
            console.error('Login error:', error);
            setErrors({ submit: error.message || 'Login failed. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = () => {
        router.push('/member/forgot-password');
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
                <div className="max-w-md mx-auto px-4 py-12">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-orange-600 mb-2">Member Login</h1>
                        <p className="text-gray-600">Sign in to your Pandit Sachidanand Welfare Foundation account</p>
                    </div>
                    
                    <div className="bg-white shadow-xl rounded-lg border border-orange-100">
                        <div className="h-2 bg-gradient-to-r from-orange-500 via-white to-green-500"></div>
                        
                        <form onSubmit={handleSubmit} className="p-6 space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email Address *</label>
                                <input 
                                    name="email" 
                                    type="email"
                                    value={form.email} 
                                    onChange={handleChange} 
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-orange-500 focus:border-orange-500" 
                                    placeholder="Enter your email"
                                />
                                {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Password *</label>
                                <input 
                                    name="password" 
                                    type="password"
                                    value={form.password} 
                                    onChange={handleChange} 
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-orange-500 focus:border-orange-500" 
                                    placeholder="Enter your password"
                                />
                                {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password}</p>}
                            </div>

                            {successMessage && (
                                <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                                    <p className="text-sm text-green-600">{successMessage}</p>
                                </div>
                            )}

                            {errors.submit && (
                                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                                    <p className="text-sm text-red-600">{errors.submit}</p>
                                </div>
                            )}

                            <button 
                                type="submit" 
                                disabled={loading}
                                className="w-full py-3 rounded-md bg-orange-500 text-white font-semibold hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Signing In...
                                    </span>
                                ) : 'Sign In'}
                            </button>

                            <div className="flex items-center justify-between pt-4">
                                <button 
                                    type="button" 
                                    onClick={handleForgotPassword}
                                    className="text-sm text-orange-600 hover:underline"
                                >
                                    Forgot Password?
                                </button>
                                <a 
                                    href="/member/register" 
                                    className="text-sm text-orange-600 hover:underline"
                                >
                                    Create Account
                                </a>
                            </div>
                        </form>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-500">
                            Need help? Contact us at{' '}
                            <a href="mailto:support@pswf.org" className="text-orange-600 hover:underline">
                                support@pswf.org
                            </a>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
