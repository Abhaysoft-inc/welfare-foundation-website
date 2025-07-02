"use client"
import { useState, useEffect } from "react";

export default function Carousel() {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Add your images here - you can add more images to the array
    const images = [
        {
            src: "/images/2.jpg",
            title: "Welcome to Our Foundation",
            subtitle: "Making a difference in communities worldwide"
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
        <div className="relative w-full h-80 overflow-hidden">
            {/* Images */}
            <div
                className="flex transition-transform duration-500 ease-in-out h-full"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {images.map((slide, index) => (
                    <div key={index} className="relative w-full h-full flex-shrink-0">
                        <img
                            src={slide.src}
                            className="w-full h-80 object-cover"
                            alt={`Slide ${index + 1}`}
                        />
                        <div className="absolute inset-0 bg-blue-600 opacity-30"></div>

                        {/* Text Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center text-white px-6">
                                <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                                    {slide.title}
                                </h1>
                                <p className="text-lg md:text-xl font-medium drop-shadow-md max-w-2xl">
                                    {slide.subtitle}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-1.5 shadow-lg transition-all duration-200"
            >
                <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-1.5 shadow-lg transition-all duration-200"
            >
                <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-200 ${currentSlide === index
                                ? 'bg-white'
                                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
