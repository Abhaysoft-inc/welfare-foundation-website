"use client"
import React from 'react'
import { LotusIcon, OmIcon, HeartIcon } from '../icons'

const IndianHeroSection = () => {
    return (
        <section className="relative min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 overflow-hidden">
            {/* Traditional Indian Pattern Background */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff9933' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}></div>
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23138808' fill-opacity='0.08'%3E%3Cpath d='M40 40l20-20-20-20-20 20 20 20zm0 0l20 20-20 20-20-20 20-20z'/%3E%3C/g%3E%3C/svg%3E")`,
                }}></div>
            </div>

            {/* Floating Lotus Petals */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 animate-pulse">
                    <LotusIcon className="w-8 h-8 text-orange-300 opacity-60" />
                </div>
                <div className="absolute top-40 right-20 animate-bounce" style={{ animationDelay: '1s' }}>
                    <LotusIcon className="w-6 h-6 text-green-300 opacity-50" />
                </div>
                <div className="absolute bottom-40 left-20 animate-pulse" style={{ animationDelay: '2s' }}>
                    <OmIcon className="w-10 h-10 text-orange-400 opacity-40" />
                </div>
                <div className="absolute bottom-20 right-10 animate-bounce" style={{ animationDelay: '0.5s' }}>
                    <LotusIcon className="w-7 h-7 text-green-400 opacity-50" />
                </div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                <div className="text-center">
                    {/* Traditional Indian Greeting */}
                    <div className="flex justify-center items-center space-x-3 mb-4">
                        <OmIcon className="w-6 h-6 text-orange-600" />
                        <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                            Welcome • स्वागतम्
                        </h1>
                        <OmIcon className="w-6 h-6 text-green-600" />
                    </div>

                    {/* Main Heading with Indian Typography */}
                    <h2 className="text-4xl lg:text-6xl font-bold mb-4 leading-tight">
                        <span className="block bg-gradient-to-r from-orange-600 via-red-500 to-orange-600 bg-clip-text text-transparent">
                            Service Above Self
                        </span>
                        <span className="block text-2xl lg:text-3xl mt-1 text-gray-700 font-semibold">
                            सेवा परमो धर्मः
                        </span>
                    </h2>

                    {/* Subheading with Cultural Message */}
                    <p className="text-lg lg:text-xl text-gray-600 mb-6 max-w-4xl mx-auto leading-relaxed">
                        <span className="block text-gray-800 font-semibold mb-1">
                            "The World is One Family" - Vasudhaiva Kutumbakam
                        </span>
                        Join us in our mission to serve humanity with the ancient values of
                        <span className="text-orange-600 font-semibold"> compassion, unity, and selfless service</span>.
                    </p>

                    {/* Indian-styled CTA Buttons */}
                    <div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-6 mb-8">
                        <button className="group relative bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-white px-8 py-3 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border-2 border-orange-400">
                            <span className="flex items-center space-x-3">
                                <HeartIcon className="w-5 h-5" strokeWidth={2} />
                                <span>Start Giving • दान करें</span>
                            </span>
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>

                        <button className="group relative border-3 border-green-600 bg-gradient-to-r from-green-50 to-green-100 text-green-700 px-8 py-3 rounded-2xl font-bold text-lg hover:bg-gradient-to-r hover:from-green-600 hover:to-green-700 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl">
                            <span className="flex items-center space-x-3">
                                <LotusIcon className="w-5 h-5" />
                                <span>Join Mission • सेवा करें</span>
                            </span>
                        </button>
                    </div>

                    {/* Compact Indian Cultural Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                        <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-orange-200 shadow-lg">
                            <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
                                <HeartIcon className="w-6 h-6 text-white" strokeWidth={2} />
                            </div>
                            <h3 className="text-2xl font-bold text-orange-600 mb-1">10,000+</h3>
                            <p className="text-gray-700 font-semibold text-sm">Lives Touched</p>
                        </div>

                        <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-green-200 shadow-lg">
                            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                                <LotusIcon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-green-600 mb-1">25+</h3>
                            <p className="text-gray-700 font-semibold text-sm">Years of Service</p>
                        </div>

                        <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-blue-200 shadow-lg">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                                <OmIcon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-blue-600 mb-1">100+</h3>
                            <p className="text-gray-700 font-semibold text-sm">Villages Served</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom decorative wave with Indian flag colors */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1200 120" fill="none" className="w-full h-auto">
                    <path d="M0,120 L0,60 Q300,0 600,60 T1200,60 L1200,120 Z" fill="url(#indianGradient)" />
                    <defs>
                        <linearGradient id="indianGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#ff9933" stopOpacity="0.3" />
                            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#138808" stopOpacity="0.3" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </section>
    )
}

export default IndianHeroSection
