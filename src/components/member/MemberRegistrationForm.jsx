"use client";
import { useState } from "react";

export default function MemberRegistrationForm({ onSubmit }) {
    const [form, setForm] = useState({
        memberName: "",
        fatherOrHusbandName: "",
        services: "",
        presentAddress: "",
        permanentAddress: "",
        mobile: "",
        aadhar: "",
        email: "",
        photo: null
    });
    const [errors, setErrors] = useState({});
    const [photoPreview, setPhotoPreview] = useState(null);

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
        if (!form.fatherOrHusbandName.trim()) newErrors.fatherOrHusbandName = "Required";
        if (!form.presentAddress.trim()) newErrors.presentAddress = "Required";
        if (!form.permanentAddress.trim()) newErrors.permanentAddress = "Required";
        if (!form.mobile.trim() || !/^\d{10}$/.test(form.mobile)) newErrors.mobile = "Valid 10-digit mobile required";
        if (!form.aadhar.trim() || !/^\d{12}$/.test(form.aadhar)) newErrors.aadhar = "Valid 12-digit Aadhar required";
        if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Valid email required";
        if (!form.photo) newErrors.photo = "Please upload your photo";
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) {
            setErrors(errs);
            return;
        }
        onSubmit(form);
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div>
                <label className="block text-sm font-medium text-gray-700">Member Name *</label>
                <input name="memberName" value={form.memberName} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
                {errors.memberName && <p className="text-xs text-red-600">{errors.memberName}</p>}
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Father's Name / Husband Name *</label>
                <input name="fatherOrHusbandName" value={form.fatherOrHusbandName} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
                {errors.fatherOrHusbandName && <p className="text-xs text-red-600">{errors.fatherOrHusbandName}</p>}
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Services / Business</label>
                <input name="services" value={form.services} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Present Address *</label>
                <input name="presentAddress" value={form.presentAddress} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
                {errors.presentAddress && <p className="text-xs text-red-600">{errors.presentAddress}</p>}
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Permanent Address *</label>
                <input name="permanentAddress" value={form.permanentAddress} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
                {errors.permanentAddress && <p className="text-xs text-red-600">{errors.permanentAddress}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Mobile No *</label>
                    <input name="mobile" value={form.mobile} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" maxLength={10} />
                    {errors.mobile && <p className="text-xs text-red-600">{errors.mobile}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Aadhar No *</label>
                    <input name="aadhar" value={form.aadhar} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" maxLength={12} />
                    {errors.aadhar && <p className="text-xs text-red-600">{errors.aadhar}</p>}
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Email *</label>
                <input name="email" value={form.email} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
                {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
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
            <button type="submit" className="w-full py-3 rounded bg-orange-500 text-white font-semibold hover:bg-orange-600">Continue</button>
        </form>
    );
}
