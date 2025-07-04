"use client"
import { useState } from 'react';
import {
    UserIcon,
    EmailIcon,
    PhoneIcon,
    BuildingIcon,
    HeartIcon,
    RupeeIcon
} from '../icons';

export default function DonorForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        donationAmount: 1000,
        customAmount: '',
        paymentType: 'one-time'
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Clear error when user types
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const handleAmountSelection = (amount) => {
        setFormData({
            ...formData,
            donationAmount: amount,
            customAmount: ''
        });
    };

    const handleCustomAmountChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        setFormData({
            ...formData,
            donationAmount: 'custom',
            customAmount: value
        });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
            newErrors.phone = 'Phone number should be 10 digits';
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

        if (!formData.pincode.trim()) {
            newErrors.pincode = 'PIN code is required';
        } else if (!/^\d{6}$/.test(formData.pincode.replace(/[^0-9]/g, ''))) {
            newErrors.pincode = 'PIN code should be 6 digits';
        }

        if (formData.donationAmount === 'custom' && (!formData.customAmount || parseInt(formData.customAmount) < 100)) {
            newErrors.customAmount = 'Please enter an amount of at least ₹100';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Calculate final amount
            const finalAmount = formData.donationAmount === 'custom'
                ? parseInt(formData.customAmount)
                : formData.donationAmount;

            onSubmit({
                ...formData,
                donationAmount: finalAmount
            });
        }
    };

    return (
        <div className="p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <UserIcon className="w-6 h-6 mr-2 text-orange-500" />
                Donor Information
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Full Name *
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className={`block w-full pl-10 pr-3 py-2 border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500`}
                                />
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <UserIcon className="h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email *
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={`block w-full pl-10 pr-3 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500`}
                                />
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <EmailIcon className="h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                            Phone Number *
                        </label>
                        <div className="mt-1 relative">
                            <input
                                type="tel"
                                name="phone"
                                id="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className={`block w-full pl-10 pr-3 py-2 border ${errors.phone ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500`}
                                placeholder="10-digit mobile number"
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <PhoneIcon className="h-5 w-5 text-gray-400" />
                            </div>
                        </div>
                        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                    </div>
                </div>

                {/* Address */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-800 flex items-center">
                        <BuildingIcon className="w-5 h-5 mr-2 text-orange-500" />
                        Address Information
                    </h3>

                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                            Address *
                        </label>
                        <div className="mt-1">
                            <input
                                type="text"
                                name="address"
                                id="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                className={`block w-full px-3 py-2 border ${errors.address ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500`}
                            />
                        </div>
                        {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                City *
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="city"
                                    id="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    className={`block w-full px-3 py-2 border ${errors.city ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500`}
                                />
                            </div>
                            {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                        </div>

                        <div>
                            <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                                State *
                            </label>
                            <div className="mt-1">
                                <select
                                    name="state"
                                    id="state"
                                    value={formData.state}
                                    onChange={handleInputChange}
                                    className={`block w-full px-3 py-2 border ${errors.state ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500`}
                                >
                                    <option value="">Select State</option>
                                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                    <option value="Assam">Assam</option>
                                    <option value="Bihar">Bihar</option>
                                    <option value="Chhattisgarh">Chhattisgarh</option>
                                    <option value="Goa">Goa</option>
                                    <option value="Gujarat">Gujarat</option>
                                    <option value="Haryana">Haryana</option>
                                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                                    <option value="Jharkhand">Jharkhand</option>
                                    <option value="Karnataka">Karnataka</option>
                                    <option value="Kerala">Kerala</option>
                                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                                    <option value="Maharashtra">Maharashtra</option>
                                    <option value="Manipur">Manipur</option>
                                    <option value="Meghalaya">Meghalaya</option>
                                    <option value="Mizoram">Mizoram</option>
                                    <option value="Nagaland">Nagaland</option>
                                    <option value="Odisha">Odisha</option>
                                    <option value="Punjab">Punjab</option>
                                    <option value="Rajasthan">Rajasthan</option>
                                    <option value="Sikkim">Sikkim</option>
                                    <option value="Tamil Nadu">Tamil Nadu</option>
                                    <option value="Telangana">Telangana</option>
                                    <option value="Tripura">Tripura</option>
                                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                                    <option value="Uttarakhand">Uttarakhand</option>
                                    <option value="West Bengal">West Bengal</option>
                                    <option value="Delhi">Delhi</option>
                                </select>
                            </div>
                            {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
                        </div>

                        <div>
                            <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
                                PIN Code *
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="pincode"
                                    id="pincode"
                                    value={formData.pincode}
                                    onChange={handleInputChange}
                                    className={`block w-full px-3 py-2 border ${errors.pincode ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500`}
                                    maxLength="6"
                                    placeholder="6-digit PIN code"
                                />
                            </div>
                            {errors.pincode && <p className="mt-1 text-sm text-red-600">{errors.pincode}</p>}
                        </div>
                    </div>
                </div>

                {/* Donation Amount */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-800 flex items-center">
                        <HeartIcon className="w-5 h-5 mr-2 text-orange-500" />
                        Donation Details
                    </h3>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select Donation Amount *
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {[500, 1000, 2500, 5000].map((amount) => (
                                <button
                                    key={amount}
                                    type="button"
                                    onClick={() => handleAmountSelection(amount)}
                                    className={`flex items-center justify-center px-4 py-2 border ${formData.donationAmount === amount
                                            ? 'border-orange-500 bg-orange-50 text-orange-700'
                                            : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                                        } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500`}
                                >
                                    <RupeeIcon className="h-4 w-4 mr-1" />
                                    {amount.toLocaleString('en-IN')}
                                </button>
                            ))}
                        </div>

                        <div className="mt-3">
                            <label htmlFor="customAmount" className="block text-sm font-medium text-gray-700">
                                Or enter custom amount (minimum ₹100)
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-gray-500">₹</span>
                                </div>
                                <input
                                    type="text"
                                    name="customAmount"
                                    id="customAmount"
                                    value={formData.customAmount}
                                    onChange={handleCustomAmountChange}
                                    placeholder="Enter amount"
                                    className={`block w-full pl-8 pr-3 py-2 border ${errors.customAmount ? 'border-red-300' : 'border-gray-300'
                                        } rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500`}
                                />
                            </div>
                            {errors.customAmount && (
                                <p className="mt-1 text-sm text-red-600">{errors.customAmount}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Donation Frequency
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
                                <span className="ml-2 text-sm text-gray-700">One-time</span>
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
                                <span className="ml-2 text-sm text-gray-700">Monthly</span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Submit button */}
                <div className="pt-5">
                    <button
                        type="submit"
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    >
                        Proceed to Payment
                    </button>
                </div>

                <div className="text-center text-xs text-gray-500 pt-2">
                    All fields marked with * are required
                </div>
            </form>
        </div>
    );
}
