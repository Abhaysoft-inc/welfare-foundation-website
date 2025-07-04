"use client"
import React, { useState, useEffect } from 'react'
import { Inter } from 'next/font/google'
import {
    PhoneIcon,
    EmailIcon,
    ClockIcon,
    FacebookIcon,
    TwitterIcon,
    PinterestIcon,
    InstagramIcon,
    LinkedInIcon,
    HeartIcon,
    UsersIcon,
    ArrowRightIcon,
    LotusIcon,
    OmIcon
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
        // { name: 'News', href: '#news' },
        { name: 'Contact', href: '#contact' },
        // { name: 'Donate', href: '/donate' },
        // { name: 'Register', href: '/register' },
    ];

    return (
        <>
            {/* Minimal Top Bar with Indian Touch */}
            <div className="bg-gradient-to-r from-orange-300 via-white to-green-400 text-gray-800 py-1.5 text-xs relative overflow-hidden border-b border-orange-300">
                {/* Subtle background pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ff9933' fill-opacity='0.1'%3E%3Ccircle cx='20' cy='20' r='8'/%3E%3C/g%3E%3C/svg%3E")`,
                    }}></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex justify-between items-center">
                        {/* Contact Info - Simplified */}
                        <div className="hidden sm:flex items-center space-x-6">
                            <div className="flex items-center space-x-1.5">
                                <PhoneIcon className="w-3 h-3 text-orange-700" />
                                <span className="font-medium text-gray-800">+91 9415432141</span>
                            </div>
                            <div className="flex items-center space-x-1.5">
                                <EmailIcon className="w-3 h-3 text-green-700" />
                                <span className="font-medium text-gray-800">sn1984.pandey@gmail.com</span>
                            </div>
                            <div className="flex items-center space-x-1.5">
                                <ClockIcon className="w-3 h-3 text-blue-700" />
                                <span className="font-medium text-gray-800">Mon - Fri: 9:00 AM - 6:00 PM</span>
                            </div>
                        </div>

                        {/* Company Registration and CIN Info - Desktop Only */}
                        <div className="hidden sm:flex flex-1 justify-center items-center">
                            <span className="font-bold text-gray-900 mr-8">Company Registration No : 210627</span>
                            <span className="font-bold text-gray-900">CIN : U88900UP2024NPL21627</span>
                        </div>

                        {/* Mobile - Show only phone */}
                        <div className="sm:hidden flex items-center space-x-1.5">
                            <PhoneIcon className="w-3 h-3 text-orange-700" />
                            <span className="font-medium text-gray-800">+91 9415432141</span>
                        </div>

                        {/* Social Links - Minimal */}
                        <div className="flex items-center space-x-1">
                            <span className="text-xs font-medium text-gray-700 mr-2 hidden sm:inline">Follow Us</span>
                            <div className="flex space-x-1">
                                <a href="#" className="p-1 rounded-full bg-orange-100 hover:bg-orange-200 transition-colors">
                                    <FacebookIcon className="w-3 h-3 text-orange-700" />
                                </a>
                                <a href="#" className="p-1 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors">
                                    <TwitterIcon className="w-3 h-3 text-blue-700" />
                                </a>
                                <a href="#" className="p-1 rounded-full bg-green-100 hover:bg-green-200 transition-colors">
                                    <InstagramIcon className="w-3 h-3 text-green-700" />
                                </a>
                                <a href="#" className="p-1 rounded-full bg-red-100 hover:bg-red-200 transition-colors">
                                    <LinkedInIcon className="w-3 h-3 text-red-700" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced Main Navbar with Indian Touch */}
            <nav className={`${inter.className} sticky top-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-white/95 backdrop-blur-md shadow-xl border-b-2 border-orange-200'
                : 'bg-white shadow-lg border-b-2 border-orange-200'
                }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Enhanced Logo with Indian Touch */}
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="flex items-center space-x-3 group">
                                    {/* Enhanced Logo Icon with Indian Colors */}
                                    <div className="relative">
                                        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 via-white to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 border-2 border-orange-300">
                                            <div className="relative">
                                                <LotusIcon className="w-10 h-10 text-orange-600" />
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <OmIcon className="w-4 h-4 text-green-700" />
                                                </div>
                                            </div>
                                            {/* Subtle shine effect with Indian pattern */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-200/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                                        </div>
                                        {/* Indian flag colored notification dot */}
                                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-orange-500 via-white to-green-500 rounded-full flex items-center justify-center border border-orange-400">
                                            <span className="text-xs text-orange-700 font-bold">॥</span>
                                        </div>
                                    </div>
                                    {/* Enhanced Foundation Name with Hindi */}
                                    <div>
                                        <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 via-gray-500 to-green-600 bg-clip-text text-transparent group-hover:from-orange-700 group-hover:to-green-700 transition-all duration-300">
                                            Pandit Sachidanand
                                        </h1>
                                        <p className="text-sm font-semibold bg-gradient-to-r from-orange-500 to-green-500 bg-clip-text text-transparent">
                                            Welfare Foundation
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Enhanced Desktop Navigation with Indian Touch */}
                        <div className="hidden lg:block">
                            <div className="ml-10 flex items-center space-x-1">
                                {navigationItems.map((item, index) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="relative px-4 py-2 text-gray-700 hover:text-orange-600 font-medium transition-all duration-200 rounded-lg hover:bg-orange-50 group"
                                    >
                                        {item.name}
                                        <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-orange-500 to-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded-full"></span>
                                        {/* Active indicator for home with Indian colors */}
                                        {/* {index === 0 && (
                                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-orange-400 to-green-400 rounded-full animate-pulse"></span>
                                        )} */}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Enhanced Desktop CTA Buttons with Indian Touch */}
                        <div className="hidden lg:flex items-center space-x-3">
                            {/* Donate Button with Indian styling */}
                            <a href="/donate" className="relative bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:via-orange-700 hover:to-red-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 border border-orange-400">
                                <span className="flex items-center space-x-2">
                                    <HeartIcon className="w-4 h-4" strokeWidth={2} />
                                    <span>Donate Now</span>
                                </span>
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-200"></div>
                            </a>

                            {/* Join Us Button with Indian styling */}
                            <button className="relative border-2 border-green-600 bg-gradient-to-r from-green-50 to-green-100 text-green-700 px-5 py-2.5 rounded-xl font-semibold hover:bg-gradient-to-r hover:from-green-600 hover:to-green-700 hover:text-white transition-all duration-200 hover:shadow-md">
                                <span className="flex items-center space-x-2">
                                    <UsersIcon className="w-4 h-4" strokeWidth={2} />
                                    <span>Join Us</span>
                                </span>
                            </button>
                        </div>

                        {/* Enhanced Mobile menu button with Indian Touch */}
                        <div className="lg:hidden flex items-center">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="relative inline-flex items-center justify-center p-3 rounded-xl text-gray-700 hover:text-orange-600 hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500 transition-all duration-200 border border-orange-200"
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

                {/* Enhanced Mobile menu with Indian Touch */}
                <div className={`lg:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen
                    ? 'max-h-screen opacity-100'
                    : 'max-h-0 opacity-0'
                    } overflow-hidden`}>
                    <div className="px-4 pt-4 pb-6 space-y-2 bg-gradient-to-b from-orange-50 to-green-50 border-t-2 border-orange-200 shadow-lg">
                        {navigationItems.map((item, index) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="group block px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-100 rounded-xl font-medium transition-all duration-200 border border-transparent hover:border-orange-200"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <div className="flex items-center justify-between">
                                    <span>{item.name}</span>
                                    <ArrowRightIcon className="w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" strokeWidth={2} />
                                </div>
                            </a>
                        ))}

                        {/* Mobile CTA Buttons with Indian Touch */}
                        <div className="pt-6 space-y-3 border-t-2 border-orange-200">
                            <a href="/donate" className="block w-full bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200 border border-orange-400">
                                <span className="flex items-center justify-center space-x-2">
                                    <HeartIcon className="w-4 h-4" strokeWidth={2} />
                                    <span>Donate Now</span>
                                </span>
                            </a>
                            <button className="w-full border-2 border-green-600 bg-gradient-to-r from-green-50 to-green-100 text-green-700 px-6 py-3 rounded-xl font-semibold hover:bg-gradient-to-r hover:from-green-600 hover:to-green-700 hover:text-white transition-all duration-200">
                                <span className="flex items-center justify-center space-x-2">
                                    <UsersIcon className="w-4 h-4" strokeWidth={2} />
                                    <span>Join Our Team</span>
                                </span>
                            </button>

                            {/* Mobile Social Links with Indian Touch */}
                            <div className="pt-4">
                                <div className="flex items-center justify-center space-x-2 mb-3">
                                    <OmIcon className="w-4 h-4 text-orange-600" />
                                    <p className="text-sm font-semibold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">Follow us</p>
                                </div>
                                <div className="flex justify-center space-x-4">
                                    <a href="#" className="p-2 bg-gradient-to-r from-orange-100 to-orange-200 rounded-full text-orange-600 hover:from-orange-200 hover:to-orange-300 transition-all duration-200 border border-orange-300">
                                        <TwitterIcon className="w-4 h-4" />
                                    </a>
                                    <a href="#" className="p-2 bg-gradient-to-r from-green-100 to-green-200 rounded-full text-green-600 hover:from-green-200 hover:to-green-300 transition-all duration-200 border border-green-300">
                                        <InstagramIcon className="w-4 h-4" />
                                    </a>
                                    <a href="#" className="p-2 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full text-blue-600 hover:from-blue-200 hover:to-blue-300 transition-all duration-200 border border-blue-300">
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
