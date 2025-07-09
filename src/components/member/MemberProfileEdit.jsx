"use client";
import React, { useState } from 'react';

export default function MemberProfileEdit({ memberData, onUpdate }) {
    const [formData, setFormData] = useState({
        name: memberData?.name || '',
        address: memberData?.address || '',
        mobile: memberData?.mobile || '',
        email: memberData?.email || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPasswordChange, setShowPasswordChange] = useState(false);
    const [photoFile, setPhotoFile] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(memberData?.photoUrl || '');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setErrors(prev => ({
                    ...prev,
                    photo: 'Photo should be less than 5MB'
                }));
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result);
                setPhotoFile(file);
                setErrors(prev => ({
                    ...prev,
                    photo: ''
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Basic info validation
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.address.trim()) {
            newErrors.address = 'Address is required';
        }

        if (!formData.mobile.trim()) {
            newErrors.mobile = 'Mobile number is required';
        } else if (!/^\d{10}$/.test(formData.mobile)) {
            newErrors.mobile = 'Mobile number must be 10 digits';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        // Password validation (only if password change is requested)
        if (showPasswordChange) {
            if (!formData.currentPassword) {
                newErrors.currentPassword = 'Current password is required';
            }

            if (!formData.newPassword) {
                newErrors.newPassword = 'New password is required';
            } else if (formData.newPassword.length < 6) {
                newErrors.newPassword = 'Password must be at least 6 characters';
            }

            if (formData.newPassword !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Prepare data for API call
            const submitData = {
                memberId: memberData._id,
                name: formData.name,
                address: formData.address,
                mobile: formData.mobile,
                email: formData.email
            };

            if (showPasswordChange) {
                submitData.currentPassword = formData.currentPassword;
                submitData.newPassword = formData.newPassword;
            }

            if (photoFile) {
                // Convert photo to base64 for now
                const reader = new FileReader();
                reader.onloadend = async () => {
                    submitData.profilePhoto = reader.result;
                    await sendUpdateRequest(submitData);
                };
                reader.readAsDataURL(photoFile);
                return;
            }

            await sendUpdateRequest(submitData);
        } catch (error) {
            console.error('Profile update error:', error);
            setErrors({ submit: error.message || 'Update failed. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const sendUpdateRequest = async (submitData) => {
        const response = await fetch('/api/member/update-profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(submitData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Update failed');
        }

        // Update parent component with new data
        onUpdate(data.member);

        // Reset password fields
        setFormData(prev => ({
            ...prev,
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        }));
        setShowPasswordChange(false);
        setPhotoFile(null);

        alert('Profile updated successfully!');
    };

    return (
        <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Photo Upload */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Profile Photo</h4>
                    <div className="flex items-center space-x-6">
                        <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50">
                            {photoPreview ? (
                                <img src={photoPreview} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-2xl text-gray-400">👤</span>
                            )}
                        </div>
                        <div className="flex-1">
                            <input
                                type="file"
                                id="photo"
                                accept="image/*"
                                onChange={handlePhotoChange}
                                className="sr-only"
                            />
                            <label
                                htmlFor="photo"
                                className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Change Photo
                            </label>
                            <p className="mt-1 text-xs text-gray-500">JPG, PNG, or GIF up to 5MB</p>
                            {errors.photo && <p className="mt-1 text-xs text-red-600">{errors.photo}</p>}
                        </div>
                    </div>
                </div>

                {/* Basic Information */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name *
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 ${errors.name ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                placeholder="Enter your full name"
                            />
                            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                        </div>

                        <div className="md:col-span-2">
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                                Address *
                            </label>
                            <textarea
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                rows={3}
                                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 ${errors.address ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                placeholder="Enter your complete address"
                            />
                            {errors.address && <p className="mt-1 text-xs text-red-600">{errors.address}</p>}
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
                                maxLength={10}
                                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 ${errors.mobile ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                placeholder="10-digit mobile number"
                            />
                            {errors.mobile && <p className="mt-1 text-xs text-red-600">{errors.mobile}</p>}
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
                                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 ${errors.email ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                placeholder="Enter your email address"
                            />
                            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                        </div>
                    </div>
                </div>

                {/* Password Change Section */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-gray-800">Password</h4>
                        <button
                            type="button"
                            onClick={() => {
                                setShowPasswordChange(!showPasswordChange);
                                if (showPasswordChange) {
                                    // Clear password fields when hiding
                                    setFormData(prev => ({
                                        ...prev,
                                        currentPassword: '',
                                        newPassword: '',
                                        confirmPassword: ''
                                    }));
                                    setErrors(prev => {
                                        const { currentPassword, newPassword, confirmPassword, ...rest } = prev;
                                        return rest;
                                    });
                                }
                            }}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${showPasswordChange
                                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                    : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                                }`}
                        >
                            {showPasswordChange ? 'Cancel' : 'Change Password'}
                        </button>
                    </div>

                    {showPasswordChange && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                    Current Password *
                                </label>
                                <input
                                    type="password"
                                    id="currentPassword"
                                    name="currentPassword"
                                    value={formData.currentPassword}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 ${errors.currentPassword ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                    placeholder="Enter current password"
                                />
                                {errors.currentPassword && <p className="mt-1 text-xs text-red-600">{errors.currentPassword}</p>}
                            </div>

                            <div>
                                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                    New Password *
                                </label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 ${errors.newPassword ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                    placeholder="Enter new password"
                                />
                                {errors.newPassword && <p className="mt-1 text-xs text-red-600">{errors.newPassword}</p>}
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                    Confirm Password *
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                    placeholder="Confirm new password"
                                />
                                {errors.confirmPassword && <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>}
                            </div>
                        </div>
                    )}
                </div>

                {/* Error Message */}
                {errors.submit && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-sm text-red-600">{errors.submit}</p>
                    </div>
                )}

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-3 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 focus:ring-4 focus:ring-orange-200 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                        {isSubmitting ? (
                            <span className="flex items-center">
                                <svg className="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Updating...
                            </span>
                        ) : (
                            'Update Profile'
                        )}
                    </button>
                </div>
            </form>

            {/* Information Note */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h5 className="font-semibold text-blue-800 mb-2">📋 Profile Update Information</h5>
                <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Changes to email or mobile number may require re-verification</li>
                    <li>• Profile photo should be clear and professional</li>
                    <li>• Password must be at least 6 characters long</li>
                    <li>• All required fields must be filled before updating</li>
                </ul>
            </div>
        </div>
    );
}
