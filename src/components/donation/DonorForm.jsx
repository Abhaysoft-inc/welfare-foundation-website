"use client"
import { useState, useEffect } from 'react';
import {
    UserIcon,
    EmailIcon,
    PhoneIcon,
    IndianRupeeIcon,
    HeartIcon,
    ArrowRightIcon
} from '../icons';

export default function DonorForm({ onSubmit, isLoggedIn = false, memberData = null }) {
    const [formData, setFormData] = useState({
        // Common fields for both guest and logged-in users
        panCard: '',
        aadharCard: '',
        donationAmount: '',
        donationPurpose: 'General',
        paymentType: 'one-time',

        // Fields only for guest users
        fullName: '',
        email: '',
        mobile: '',
        address: '',
        city: '',
        state: '',
        pincode: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Pre-fill data for logged-in members
    useEffect(() => {
        if (isLoggedIn && memberData) {
            setFormData(prev => ({
                ...prev,
                fullName: memberData.fullName || '',
                email: memberData.email || '',
                mobile: memberData.mobile || '',
                address: memberData.address || '',
                city: memberData.city || '',
                state: memberData.state || '',
                pincode: memberData.pincode || ''
            }));
        }
    }, [isLoggedIn, memberData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let processedValue = value;

        // Format specific fields
        if (name === 'panCard') {
            processedValue = value.toUpperCase().replace(/[^A-Z0-9]/g, '').substring(0, 10);
        } else if (name === 'aadharCard') {
            processedValue = value.replace(/[^0-9]/g, '').substring(0, 12);
        } else if (name === 'mobile') {
            processedValue = value.replace(/[^0-9]/g, '').substring(0, 10);
        } else if (name === 'pincode') {
            processedValue = value.replace(/[^0-9]/g, '').substring(0, 6);
        } else if (name === 'donationAmount') {
            processedValue = value.replace(/[^0-9]/g, '');
        }

        setFormData(prev => ({
            ...prev,
            [name]: processedValue
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Common validations for both guest and logged-in users
        if (!formData.donationAmount || formData.donationAmount < 1) {
            newErrors.donationAmount = 'Please enter a valid donation amount';
        } else if (formData.donationAmount < 100) {
            newErrors.donationAmount = 'Minimum donation amount is ₹100';
        }

        if (!formData.panCard) {
            newErrors.panCard = 'PAN Card is required';
        } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panCard)) {
            newErrors.panCard = 'Please enter a valid PAN Card (e.g., ABCDE1234F)';
        }

        if (!formData.aadharCard) {
            newErrors.aadharCard = 'Aadhar Card is required';
        } else if (formData.aadharCard.length !== 12) {
            newErrors.aadharCard = 'Aadhar Card must be 12 digits';
        }

        // Additional validations for guest users
        if (!isLoggedIn) {
            if (!formData.fullName.trim()) {
                newErrors.fullName = 'Full name is required';
            }

            if (!formData.email.trim()) {
                newErrors.email = 'Email is required';
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                newErrors.email = 'Please enter a valid email address';
            }

            if (!formData.mobile) {
                newErrors.mobile = 'Mobile number is required';
            } else if (formData.mobile.length !== 10) {
                newErrors.mobile = 'Mobile number must be 10 digits';
            }

            if (!formData.address.trim()) {
                newErrors.address = 'Address is required';
            }

            if (!formData.city.trim()) {
                newErrors.city = 'City is required';
            }

            if (!formData.state.trim()) {
                newErrors.state = 'State is required';
            }

            if (!formData.pincode) {
                newErrors.pincode = 'Pincode is required';
            } else if (formData.pincode.length !== 6) {
                newErrors.pincode = 'Pincode must be 6 digits';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            setIsSubmitting(true);
            try {
                await onSubmit(formData);
            } catch (error) {
                console.error('Form submission error:', error);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const predefinedAmounts = [500, 1000, 2500, 5000, 10000];

    const donationPurposes = [
        'General',
        'Education Support',
        'Healthcare',
        'Food Distribution',
        'Emergency Relief',
        'Infrastructure Development',
        'Environmental Initiatives'
    ];

    const indianStates = [
        'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
        'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
        'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
        'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
        'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
        'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Puducherry', 'Chandigarh',
        'Andaman and Nicobar Islands', 'Dadra and Nagar Haveli and Daman and Diu',
        'Lakshadweep'
    ];

    return (
        <div className="p-6 md:p-8">
            <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                    <HeartIcon className="w-6 h-6 mr-2 text-orange-500" />
                    {isLoggedIn ? 'Make a Donation' : 'Donor Information'}
                </h2>
                <p className="text-gray-600 mt-2">
                    {isLoggedIn
                        ? 'As a registered member, we only need a few additional details for your donation.'
                        : 'Please provide your details to proceed with the donation. A member account will be created for you.'
                    }
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information - Only for guest users */}
                {!isLoggedIn && (
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                            <UserIcon className="w-5 h-5 mr-2 text-orange-500" />
                            Personal Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    className={`block w-full px-3 py-2 border ${errors.fullName ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500`}
                                    placeholder="Enter your full name"
                                />
                                {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={`block w-full px-3 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500`}
                                    placeholder="Enter your email"
                                />
                                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                            </div>

                            <div>
                                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                                    Mobile Number *
                                </label>
                                <input
                                    type="tel"
                                    id="mobile"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleInputChange}
                                    className={`block w-full px-3 py-2 border ${errors.mobile ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500`}
                                    placeholder="10-digit mobile number"
                                />
                                {errors.mobile && <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>}
                            </div>

                            <div className="md:col-span-2">
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                                    Address *
                                </label>
                                <textarea
                                    id="address"
                                    name="address"
                                    rows={3}
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className={`block w-full px-3 py-2 border ${errors.address ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500`}
                                    placeholder="Enter your complete address"
                                />
                                {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                            </div>

                            <div>
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                                    City *
                                </label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    className={`block w-full px-3 py-2 border ${errors.city ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500`}
                                    placeholder="Enter your city"
                                />
                                {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                            </div>

                            <div>
                                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                                    State *
                                </label>
                                <select
                                    id="state"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleInputChange}
                                    className={`block w-full px-3 py-2 border ${errors.state ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500`}
                                >
                                    <option value="">Select State</option>
                                    {indianStates.map(state => (
                                        <option key={state} value={state}>{state}</option>
                                    ))}
                                </select>
                                {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
                            </div>

                            <div>
                                <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">
                                    Pincode *
                                </label>
                                <input
                                    type="text"
                                    id="pincode"
                                    name="pincode"
                                    value={formData.pincode}
                                    onChange={handleInputChange}
                                    className={`block w-full px-3 py-2 border ${errors.pincode ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500`}
                                    placeholder="6-digit pincode"
                                />
                                {errors.pincode && <p className="mt-1 text-sm text-red-600">{errors.pincode}</p>}
                            </div>
                        </div>
                    </div>
                )}

                {/* Member Information Display - Only for logged-in users */}
                {isLoggedIn && memberData && (
                    <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                        <h3 className="text-lg font-medium text-green-800 mb-4 flex items-center">
                            <UserIcon className="w-5 h-5 mr-2 text-green-600" />
                            Donor Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="font-medium text-gray-700">Name:</span>
                                <span className="ml-2 text-gray-600">{memberData.fullName}</span>
                            </div>
                            <div>
                                <span className="font-medium text-gray-700">Email:</span>
                                <span className="ml-2 text-gray-600">{memberData.email}</span>
                            </div>
                            <div>
                                <span className="font-medium text-gray-700">Mobile:</span>
                                <span className="ml-2 text-gray-600">{memberData.mobile}</span>
                            </div>
                            <div>
                                <span className="font-medium text-gray-700">Member ID:</span>
                                <span className="ml-2 text-gray-600">{memberData.memberId}</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tax Information */}
                <div className="bg-orange-50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Tax Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="panCard" className="block text-sm font-medium text-gray-700 mb-1">
                                PAN Card Number *
                            </label>
                            <input
                                type="text"
                                id="panCard"
                                name="panCard"
                                value={formData.panCard}
                                onChange={handleInputChange}
                                className={`block w-full px-3 py-2 border ${errors.panCard ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500`}
                                placeholder="ABCDE1234F"
                                maxLength={10}
                            />
                            {errors.panCard && <p className="mt-1 text-sm text-red-600">{errors.panCard}</p>}
                            <p className="mt-1 text-xs text-gray-500">Required for tax exemption certificate</p>
                        </div>

                        <div>
                            <label htmlFor="aadharCard" className="block text-sm font-medium text-gray-700 mb-1">
                                Aadhar Card Number *
                            </label>
                            <input
                                type="text"
                                id="aadharCard"
                                name="aadharCard"
                                value={formData.aadharCard}
                                onChange={handleInputChange}
                                className={`block w-full px-3 py-2 border ${errors.aadharCard ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500`}
                                placeholder="123456789012"
                                maxLength={12}
                            />
                            {errors.aadharCard && <p className="mt-1 text-sm text-red-600">{errors.aadharCard}</p>}
                            <p className="mt-1 text-xs text-gray-500">Your Aadhar information is kept secure</p>
                        </div>
                    </div>
                </div>

                {/* Donation Details */}
                <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                        <IndianRupeeIcon className="w-5 h-5 mr-2 text-blue-600" />
                        Donation Details
                    </h3>

                    <div className="space-y-4">
                        {/* Donation Amount */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Donation Amount *
                            </label>

                            {/* Predefined amounts */}
                            <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mb-3">
                                {predefinedAmounts.map(amount => (
                                    <button
                                        key={amount}
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, donationAmount: amount.toString() }))}
                                        className={`py-2 px-3 text-sm border rounded-md transition-colors ${formData.donationAmount === amount.toString()
                                                ? 'bg-orange-500 text-white border-orange-500'
                                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                            }`}
                                    >
                                        ₹{amount.toLocaleString('en-IN')}
                                    </button>
                                ))}
                            </div>

                            {/* Custom amount input */}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <IndianRupeeIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    name="donationAmount"
                                    value={formData.donationAmount}
                                    onChange={handleInputChange}
                                    className={`block w-full pl-10 pr-3 py-2 border ${errors.donationAmount ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500`}
                                    placeholder="Enter custom amount"
                                />
                            </div>
                            {errors.donationAmount && <p className="mt-1 text-sm text-red-600">{errors.donationAmount}</p>}
                        </div>

                        {/* Donation Purpose */}
                        <div>
                            <label htmlFor="donationPurpose" className="block text-sm font-medium text-gray-700 mb-1">
                                Donation Purpose
                            </label>
                            <select
                                id="donationPurpose"
                                name="donationPurpose"
                                value={formData.donationPurpose}
                                onChange={handleInputChange}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                            >
                                {donationPurposes.map(purpose => (
                                    <option key={purpose} value={purpose}>{purpose}</option>
                                ))}
                            </select>
                        </div>

                        {/* Payment Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Payment Type
                            </label>
                            <div className="flex space-x-4">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="paymentType"
                                        value="one-time"
                                        checked={formData.paymentType === 'one-time'}
                                        onChange={handleInputChange}
                                        className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">One-time Donation</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="paymentType"
                                        value="monthly"
                                        checked={formData.paymentType === 'monthly'}
                                        onChange={handleInputChange}
                                        className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">Monthly Recurring</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Terms and Conditions */}
                <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">
                        <p className="mb-2">
                            <strong>Important Information:</strong>
                        </p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>All donations are tax-deductible under Section 80G</li>
                            <li>You will receive a donation receipt via email</li>
                            {!isLoggedIn && <li>A member account will be created automatically for future donations</li>}
                            <li>Your personal information is kept secure and confidential</li>
                        </ul>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isSubmitting
                                ? 'bg-orange-400 cursor-not-allowed'
                                : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700'
                            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500`}
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </>
                        ) : (
                            <>
                                Proceed to Payment
                                <ArrowRightIcon className="ml-2 h-4 w-4" />
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
