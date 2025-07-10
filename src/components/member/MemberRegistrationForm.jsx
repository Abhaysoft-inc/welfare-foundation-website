"use client";
import { useState } from "react";

export default function MemberRegistrationForm({ onSubmit }) {
    const [form, setForm] = useState({
        memberName: "",
        services: "",
        address: "",
        mobile: "",
        email: "",
        password: "",
        confirmPassword: "",
        photo: null
    });
    const [errors, setErrors] = useState({});
    const [photoPreview, setPhotoPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setErrors({ ...errors, photo: "Photo should be less than 5MB" });
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result);
                setForm({ ...form, photo: file });
                setErrors({ ...errors, photo: "" });
            };
            reader.readAsDataURL(file);
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!form.memberName.trim()) newErrors.memberName = "Required";
        if (!form.address.trim()) newErrors.address = "Required";
        if (!form.mobile.trim() || !/^\d{10}$/.test(form.mobile)) newErrors.mobile = "Valid 10-digit mobile required";
        if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Valid email required";
        if (!form.password.trim() || form.password.length < 6) newErrors.password = "Password must be at least 6 characters";
        if (form.password !== form.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
        if (!form.photo) newErrors.photo = "Please upload your photo";
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
            // Create FormData for file upload
            const formData = new FormData();
            formData.append('memberName', form.memberName);
            formData.append('services', form.services);
            formData.append('address', form.address);
            formData.append('mobile', form.mobile);
            formData.append('email', form.email);
            formData.append('password', form.password);
            formData.append('photo', form.photo);

            const response = await fetch('/api/member/register', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (!response.ok) {
                // Handle specific conflict cases
                if (response.status === 409 && data.action) {
                    // Pass the action to parent component to handle redirection
                    onSubmit({
                        action: data.action,
                        email: data.email || form.email,
                        memberName: form.memberName,
                        error: data.error
                    });
                    return;
                }
                throw new Error(data.error || 'Registration failed');
            }

            // Pass the registered member data to parent component
            onSubmit(data.member);
        } catch (error) {
            console.error('Registration error:', error);
            setErrors({ submit: error.message || 'Registration failed. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div>
                <label className="block text-sm font-medium text-gray-700">Member Name *</label>
                <input name="memberName" value={form.memberName} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
                {errors.memberName && <p className="text-xs text-red-600">{errors.memberName}</p>}
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Services / Business</label>
                <input name="services" value={form.services} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Address *</label>
                <textarea name="address" value={form.address} onChange={handleChange} rows={3} className="mt-1 block w-full border rounded px-3 py-2" />
                {errors.address && <p className="text-xs text-red-600">{errors.address}</p>}
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Mobile No *</label>
                <input name="mobile" value={form.mobile} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" maxLength={10} />
                {errors.mobile && <p className="text-xs text-red-600">{errors.mobile}</p>}
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Email *</label>
                <input name="email" value={form.email} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
                {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Password *</label>
                    <input name="password" type="password" value={form.password} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" placeholder="At least 6 characters" />
                    {errors.password && <p className="text-xs text-red-600">{errors.password}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Confirm Password *</label>
                    <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" placeholder="Re-enter password" />
                    {errors.confirmPassword && <p className="text-xs text-red-600">{errors.confirmPassword}</p>}
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Photo *</label>
                <div className="mt-1 flex items-center space-x-4">
                    <div className="flex-shrink-0">
                        <div className="h-24 w-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50">
                            {photoPreview ? (
                                <img src={photoPreview} alt="Preview" className="h-full w-full object-cover" />
                            ) : (
                                <span className="text-gray-400 text-xs text-center">No photo selected</span>
                            )}
                        </div>
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
                            className="cursor-pointer py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                            Select Photo
                        </label>
                        <p className="mt-1 text-xs text-gray-500">JPG, PNG, or GIF up to 5MB</p>
                        {errors.photo && <p className="text-xs text-red-600">{errors.photo}</p>}
                    </div>
                </div>
            </div>
            {errors.submit && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-600">{errors.submit}</p>
                </div>
            )}
            <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded bg-orange-500 text-white font-semibold hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                {loading ? 'Registering...' : 'Continue'}
            </button>

            {/* Login Link */}
            <div className="text-center pt-4 border-t border-gray-200 mt-6">
                <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <a
                        href="/member/login"
                        className="text-orange-600 hover:text-orange-700 font-medium hover:underline"
                    >
                        Login here
                    </a>
                </p>
            </div>
        </form>
    );
}
