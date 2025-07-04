"use client";
import { useState } from 'react';
import { PhoneIcon, EmailIcon, LotusIcon } from '../icons';

export default function ReachUs() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitStatus('success');
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });

            // Clear success message after 3 seconds
            setTimeout(() => setSubmitStatus(null), 3000);
        }, 1000);
    };

    const contactInfo = [
        {
            icon: <PhoneIcon className="w-6 h-6" />,
            title: "Phone",
            details: ["+91 9415432141"],
            color: "orange"
        },
        {
            icon: <EmailIcon className="w-6 h-6" />,
            title: "Email",
            details: ["sn1984.pandey@gmail.com"],
            color: "green"
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            title: "Address",
            details: [
                "H/o Manoj Kumar, Kurmauta",
                "Manjharia, Manjha, Natwalia",
                "Kushinagar, Kasia",
                "Uttar Pradesh, India - 274402"
            ],
            color: "blue"
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: "Office Hours",
            details: [
                "Monday - Friday: 9:00 AM - 6:00 PM",
                "Saturday: 10:00 AM - 4:00 PM",
                "Sunday: Closed"
            ],
            color: "purple"
        }
    ];

    return (
        <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 via-white to-orange-50 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-orange-400 to-red-400 rounded-full"></div>
                <div className="absolute bottom-10 left-10 w-40 h-40 bg-gradient-to-br from-green-400 to-blue-400 rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <LotusIcon className="w-96 h-96 text-orange-300" />
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-orange-600 to-orange-600 bg-clip-text text-transparent">
                            Reach Us
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Get in touch with us to learn more about our programs, volunteer opportunities,
                        or to discuss how we can work together to make a difference.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Left Column - Contact Information */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            Contact Information
                        </h3>

                        <div className="space-y-6">
                            {contactInfo.map((info, index) => {
                                const colorClasses = {
                                    orange: 'bg-orange-100 text-orange-600',
                                    green: 'bg-green-100 text-green-600',
                                    blue: 'bg-blue-100 text-blue-600',
                                    purple: 'bg-purple-100 text-purple-600'
                                };

                                return (
                                    <div key={index} className="flex items-start space-x-4">
                                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${colorClasses[info.color]}`}>
                                            {info.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-1">{info.title}</h4>
                                            <div className="text-gray-600 space-y-1">
                                                {info.details.map((detail, idx) => (
                                                    <p key={idx}>{detail}</p>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Column - Google Maps */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                        <div className="p-6 border-b border-gray-100">
                            <h3 className="text-xl font-bold text-gray-900 flex items-center">
                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
                                    </svg>
                                </div>
                                Find Us Here
                            </h3>
                        </div>
                        <div className="h-96">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3590.2755995896!2d83.89567!3d26.7409!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDQ0JzI3LjIiTiA4M8KwNTMnNDQuNCJF!5e0!3m2!1sen!2sin!4v1609459200000!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Pandit Sachidanand Welfare Foundation Location"
                            ></iframe>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center mt-16">
                    <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 rounded-2xl p-8 text-white">
                        <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Make a Difference?</h3>
                        <p className="text-lg mb-6 opacity-90">
                            Join us in our mission to create positive change in communities across India.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg">
                                Become a Volunteer
                            </button>
                            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors">
                                Make a Donation
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
