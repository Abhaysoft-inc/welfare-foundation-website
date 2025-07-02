"use client"
import { useState, useEffect } from "react";
import { ArrowLeftIcon, ArrowRightIcon, LotusIcon, OmIcon } from '../icons';

export default function Carousel() {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Add your images here - you can add more images to the array
    const images = [
        {
            src: "/images/2.jpg",
            title: "Welcome to Our Foundation",
            subtitle: "Making a difference in communities across India"
        },
        {
            src: "/images/2.jpg", // Replace with actual image path
            title: "Our Mission",
            subtitle: "Empowering lives through education and support"
        },
        {
            src: "/images/2.jpg", // Replace with actual image path
            title: "Join Our Cause",
            subtitle: "Together we can create lasting change"
        }
    ];

    // Auto-advance carousel every 5 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % images.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [images.length]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const goToPrevious = () => {
        setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
    };

    const goToNext = () => {
        setCurrentSlide((prev) => (prev + 1) % images.length);
    };

    return (
        <div className="relative w-full h-96 md:h-[500px] overflow-hidden rounded-2xl shadow-2xl">
            {/* Elegant overlay with subtle Indian pattern */}
            <div className="absolute inset-0 z-10 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="elegantPattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                            <circle cx="25" cy="25" r="8" fill="none" stroke="#ff6b35" strokeWidth="0.5" opacity="0.7" />
                            <circle cx="25" cy="25" r="3" fill="#138808" opacity="0.4" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#elegantPattern)" />
                </svg>
            </div>

            {/* Images */}
            <div
                className="flex transition-transform duration-700 ease-in-out h-full"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {images.map((slide, index) => (
                    <div key={index} className="relative w-full h-full flex-shrink-0">
                        <img
                            src={slide.src}
                            className="w-full h-full object-cover"
                            alt={`Slide ${index + 1}`}
                        />
                        {/* Refined gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/40 via-transparent to-green-900/40"></div>
                        <div className="absolute inset-0 bg-black/20"></div>

                        {/* Subtle decorative elements */}
                        <div className="absolute top-6 left-6 z-20 opacity-40">
                            <LotusIcon className="w-6 h-6 text-orange-300" />
                        </div>
                        <div className="absolute top-6 right-6 z-20 opacity-40">
                            <OmIcon className="w-6 h-6 text-green-300" />
                        </div>

                        {/* Enhanced text overlay */}
                        <div className="absolute inset-0 flex items-center justify-center z-20">
                            <div className="text-center text-white px-6 max-w-4xl">
                                <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg leading-tight">
                                    <span className="bg-gradient-to-r from-orange-200 via-white to-green-200 bg-clip-text text-transparent">
                                        {slide.title}
                                    </span>
                                </h1>
                                <p className="text-lg md:text-2xl font-medium drop-shadow-md text-white/95 leading-relaxed">
                                    {slide.subtitle}
                                </p>

                                {/* Elegant decorative line */}
                                <div className="mt-8 flex items-center justify-center">
                                    <div className="flex items-center space-x-4">
                                        <div className="h-px bg-gradient-to-r from-transparent via-orange-300 to-transparent w-20"></div>
                                        <LotusIcon className="w-5 h-5 text-orange-300" />
                                        <div className="h-px bg-gradient-to-r from-transparent via-green-300 to-transparent w-20"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Refined navigation arrows */}
            <button
                onClick={goToPrevious}
                className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 z-30 backdrop-blur-sm border border-orange-200"
            >
                <ArrowLeftIcon className="w-5 h-5" />
            </button>

            <button
                onClick={goToNext}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 z-30 backdrop-blur-sm border border-green-200"
            >
                <ArrowRightIcon className="w-5 h-5" />
            </button>

            {/* Enhanced dots indicator */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30">
                <div className="flex space-x-3 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index
                                    ? 'bg-white scale-125 shadow-lg'
                                    : 'bg-white/50 hover:bg-white/75'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
