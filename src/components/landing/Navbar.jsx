"use client"
import React, { useState, useEffect } from 'react'
import { Inter } from 'next/font/google'

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
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <span className="font-medium">+91 8948041722</span>
                            </div>
                            <div className="flex items-center space-x-2 group">
                                <div className="p-1 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <span className="font-medium">abhayofc@yahoo.com</span>
                            </div>
                            <div className="flex items-center space-x-2 group">
                                <div className="p-1 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <span className="font-medium">Mon - Fri: 9:00 AM - 6:00 PM</span>
                            </div>
                        </div>

                        <div className="flex items-center space-x-6">
                            {/* Quick Links */}
                            <div className="hidden md:flex items-center space-x-4 text-xs">
                                <a href="#volunteer" className="hover:text-blue-200 transition-colors font-medium">
                                    Join Us
                                </a>
                                <span className="text-white/40">|</span>
                                <a href="#impact" className="hover:text-blue-200 transition-colors font-medium">
                                    Our Impact
                                </a>
                                <span className="text-white/40">|</span>
                                <a href="#news" className="hover:text-blue-200 transition-colors font-medium">
                                    News
                                </a>
                            </div>

                            {/* Social Media Icons */}
                            <div className="flex space-x-3">
                                <a href="#" className="group">
                                    <div className="p-1.5 rounded-full bg-white/10 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-200">
                                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                        </svg>
                                    </div>
                                </a>
                                <a href="#" className="group">
                                    <div className="p-1.5 rounded-full bg-white/10 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-200">
                                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                                        </svg>
                                    </div>
                                </a>
                                <a href="#" className="group">
                                    <div className="p-1.5 rounded-full bg-white/10 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-200">
                                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.719-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.758-1.378l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z" />
                                        </svg>
                                    </div>
                                </a>
                                <a href="#" className="group">
                                    <div className="p-1.5 rounded-full bg-white/10 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-200">
                                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                        </svg>
                                    </div>
                                </a>
                                <a href="#" className="group">
                                    <div className="p-1.5 rounded-full bg-white/10 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-200">
                                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
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
                                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
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
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                    <span>Donate Now</span>
                                </span>
                            </button>

                            {/* Join Us Button */}
                            <button className="relative border-2 border-blue-600 text-blue-600 px-4 py-2 rounded-xl font-medium hover:bg-blue-600 hover:text-white transition-all duration-200 hover:shadow-md">
                                <span className="flex items-center space-x-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
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
                                    <span className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
                                        isMobileMenuOpen 
                                            ? 'rotate-45 top-1/2 -translate-y-1/2' 
                                            : 'top-1'
                                    }`}></span>
                                    {/* Middle line */}
                                    <span className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out top-1/2 -translate-y-1/2 ${
                                        isMobileMenuOpen 
                                            ? 'opacity-0 scale-0' 
                                            : 'opacity-100 scale-100'
                                    }`}></span>
                                    {/* Bottom line */}
                                    <span className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
                                        isMobileMenuOpen 
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
                                    <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </a>
                        ))}

                        {/* Mobile CTA Buttons */}
                        <div className="pt-6 space-y-3 border-t border-gray-100">

                            <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200">
                                <span className="flex items-center justify-center space-x-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                    <span>Donate Now</span>
                                </span>
                            </button>
                            <button className="w-full border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-200">
                                <span className="flex items-center justify-center space-x-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <span>Join Our Team</span>
                                </span>
                            </button>

                            {/* Mobile Social Links */}
                            <div className="pt-4">
                                <p className="text-sm text-gray-600 mb-3 text-center">Follow us</p>
                                <div className="flex justify-center space-x-4">
                                    <a href="#" className="p-2 bg-blue-50 rounded-full text-blue-600 hover:bg-blue-100 transition-colors">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                        </svg>
                                    </a>
                                    <a href="#" className="p-2 bg-blue-50 rounded-full text-blue-600 hover:bg-blue-100 transition-colors">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                        </svg>
                                    </a>
                                    <a href="#" className="p-2 bg-blue-50 rounded-full text-blue-600 hover:bg-blue-100 transition-colors">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
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