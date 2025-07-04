"use client"
import React, { useState, useEffect } from 'react'
import { Inter } from 'next/font/google'
import {
    PhoneIcon,
    EmailIcon,
    FacebookIcon,
    TwitterIcon,
    PinterestIcon,
    InstagramIcon,
    LinkedInIcon,
    HeartIcon,
    UsersIcon,
    ArrowRightIcon
} from '../icons'

const inter = Inter({ subsets: ['latin'] });

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navigationItems = [
        { name: 'Home', href: '#' },
        { name: 'About', href: '#about' },
        { name: 'Programs', href: '#programs' },
        { name: 'Gallery', href: '#gallery' },
        { name: 'News', href: '#news' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <>
            {/* Enhanced Top Bar */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 text-sm relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
                    }}></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
                        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-8">
                            <div className="flex items-center space-x-2 group">
                                <div className="p-1 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                                    <PhoneIcon className="w-3.5 h-3.5" />
                                </div>
                                <span className="font-medium">+91 9415432141</span>
                            </div>
                            <div className="flex items-center space-x-2 group">
                                <div className="p-1 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                                    <EmailIcon className="w-3.5 h-3.5" />
                                </div>
                                <span className="font-medium">sn1984.pandey@gmail.com</span>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
                            <span className="text-xs font-medium opacity-90">Follow us:</span>
                            <div className="flex space-x-3">
                                <a href="#" className="group">
                                    <div className="p-1.5 rounded-full bg-white/10 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-200">
                                        <FacebookIcon className="w-3.5 h-3.5" />
                                    </div>
                                </a>
                                <a href="#" className="group">
                                    <div className="p-1.5 rounded-full bg-white/10 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-200">
                                        <TwitterIcon className="w-3.5 h-3.5" />
                                    </div>
                                </a>
                                <a href="#" className="group">
                                    <div className="p-1.5 rounded-full bg-white/10 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-200">
                                        <PinterestIcon className="w-3.5 h-3.5" />
                                    </div>
                                </a>
                                <a href="#" className="group">
                                    <div className="p-1.5 rounded-full bg-white/10 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-200">
                                        <InstagramIcon className="w-3.5 h-3.5" />
                                    </div>
                                </a>
                                <a href="#" className="group">
                                    <div className="p-1.5 rounded-full bg-white/10 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-200">
                                        <LinkedInIcon className="w-3.5 h-3.5" />
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced Main Navbar */}
            <nav className={`${inter.className} sticky top-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-white/95 backdrop-blur-md shadow-xl border-b border-gray-100'
                : 'bg-white shadow-lg'
                }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Enhanced Logo */}
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="flex items-center space-x-3 group">
                                    {/* Enhanced Logo Icon */}
                                    <div className="relative">
                                        <div className="w-14 h-14 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                                            <HeartIcon className="w-8 h-8 text-white" strokeWidth={2} />
                                            {/* Subtle shine effect */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                                        </div>
                                        {/* Floating notification dot */}
                                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
                                            <span className="text-xs text-white font-bold">!</span>
                                        </div>
                                    </div>
                                    {/* Enhanced Foundation Name */}
                                    <div>
                                        <h1 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                                            Pandit Sachidanand
                                        </h1>
                                        <p className="text-sm text-blue-600 font-semibold">Welfare Foundation</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Enhanced Desktop Navigation */}
                        <div className="hidden lg:block">
                            <div className="ml-10 flex items-center space-x-1">
                                {navigationItems.map((item, index) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="relative px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 rounded-lg hover:bg-blue-50 group"
                                    >
                                        {item.name}
                                        <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded-full"></span>
                                        {/* Active indicator for home */}
                                        {index === 0 && (
                                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange-400 rounded-full"></span>
                                        )}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Enhanced Desktop CTA Buttons */}
                        <div className="hidden lg:flex items-center space-x-3">
                            {/* Donate Button */}
                            <button className="relative bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                                <span className="flex items-center space-x-2">
                                    <HeartIcon className="w-4 h-4" strokeWidth={2} />
                                    <span>Donate Now</span>
                                </span>
                            </button>

                            {/* Join Us Button */}
                            <button className="relative border-2 border-blue-600 text-blue-600 px-4 py-2 rounded-xl font-medium hover:bg-blue-600 hover:text-white transition-all duration-200 hover:shadow-md">
                                <span className="flex items-center space-x-2">
                                    <UsersIcon className="w-4 h-4" strokeWidth={2} />
                                    <span>Join Us</span>
                                </span>
                            </button>
                        </div>

                        {/* Enhanced Mobile menu button - Fixed positioning */}
                        <div className="lg:hidden flex items-center">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="relative inline-flex items-center justify-center p-3 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-all duration-200"
                                aria-label={isMobileMenuOpen ? 'Close main menu' : 'Open main menu'}
                            >
                                <div className="relative w-6 h-6">
                                    {/* Top line */}
                                    <span className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${isMobileMenuOpen
                                            ? 'rotate-45 top-1/2 -translate-y-1/2'
                                            : 'top-1'
                                        }`}></span>
                                    {/* Middle line */}
                                    <span className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out top-1/2 -translate-y-1/2 ${isMobileMenuOpen
                                            ? 'opacity-0 scale-0'
                                            : 'opacity-100 scale-100'
                                        }`}></span>
                                    {/* Bottom line */}
                                    <span className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${isMobileMenuOpen
                                            ? '-rotate-45 top-1/2 -translate-y-1/2'
                                            : 'bottom-1'
                                        }`}></span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Enhanced Mobile menu */}
                <div className={`lg:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen
                    ? 'max-h-screen opacity-100'
                    : 'max-h-0 opacity-0'
                    } overflow-hidden`}>
                    <div className="px-4 pt-4 pb-6 space-y-2 bg-white border-t border-gray-100 shadow-lg">
                        {navigationItems.map((item, index) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="group block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl font-medium transition-all duration-200"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <div className="flex items-center justify-between">
                                    <span>{item.name}</span>
                                    <ArrowRightIcon className="w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" strokeWidth={2} />
                                </div>
                            </a>
                        ))}

                        {/* Mobile CTA Buttons */}
                        <div className="pt-6 space-y-3 border-t border-gray-100">
                            <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200">
                                <span className="flex items-center justify-center space-x-2">
                                    <HeartIcon className="w-4 h-4" strokeWidth={2} />
                                    <span>Donate Now</span>
                                </span>
                            </button>
                            <button className="w-full border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-200">
                                <span className="flex items-center justify-center space-x-2">
                                    <UsersIcon className="w-4 h-4" strokeWidth={2} />
                                    <span>Join Our Team</span>
                                </span>
                            </button>

                            {/* Mobile Social Links */}
                            <div className="pt-4">
                                <p className="text-sm text-gray-600 mb-3 text-center">Follow us</p>
                                <div className="flex justify-center space-x-4">
                                    <a href="#" className="p-2 bg-blue-50 rounded-full text-blue-600 hover:bg-blue-100 transition-colors">
                                        <TwitterIcon className="w-4 h-4" />
                                    </a>
                                    <a href="#" className="p-2 bg-blue-50 rounded-full text-blue-600 hover:bg-blue-100 transition-colors">
                                        <InstagramIcon className="w-4 h-4" />
                                    </a>
                                    <a href="#" className="p-2 bg-blue-50 rounded-full text-blue-600 hover:bg-blue-100 transition-colors">
                                        <LinkedInIcon className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
