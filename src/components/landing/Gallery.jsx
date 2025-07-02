import { EyeIcon, ImageIcon, LotusIcon, OmIcon } from '../icons';

export default function Gallery() {
    const galleryImages = [
        {
            src: "/images/2.jpg",
            alt: "Education program in action",
            category: "Education Program"
        },
        {
            src: "/images/2.jpg",
            alt: "Healthcare services",
            category: "Healthcare Services"
        },
        {
            src: "/images/2.jpg",
            alt: "Community development",
            category: "Community Development"
        },
        {
            src: "/images/2.jpg",
            alt: "Volunteer activities",
            category: "Volunteer Activities"
        },
        {
            src: "/images/2.jpg",
            alt: "Community outreach",
            category: "Community Outreach"
        },
        {
            src: "/images/2.jpg",
            alt: "Training programs",
            category: "Training Programs"
        },
        {
            src: "/images/2.jpg",
            alt: "Food distribution",
            category: "Food Distribution"
        },
        {
            src: "/images/2.jpg",
            alt: "Infrastructure projects",
            category: "Infrastructure Projects"
        }
    ];

    return (
        <section className="relative py-16 bg-gradient-to-br from-orange-50 via-white to-green-50 overflow-hidden">
            {/* Traditional Indian Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <svg className="w-full h-full" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="galleryPattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                            <circle cx="40" cy="40" r="15" fill="none" stroke="#ff6b35" strokeWidth="1" />
                            <path d="M25,25 Q40,15 55,25 Q40,35 25,25" fill="#138808" opacity="0.3" />
                            <path d="M25,55 Q40,65 55,55 Q40,45 25,55" fill="#138808" opacity="0.3" />
                            <circle cx="40" cy="40" r="3" fill="#ff6b35" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#galleryPattern)" />
                </svg>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-8 left-8 opacity-10">
                <OmIcon className="w-24 h-24 text-orange-600" />
            </div>
            <div className="absolute bottom-8 right-8 opacity-10">
                <LotusIcon className="w-28 h-28 text-green-600" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 via-red-500 to-green-600 bg-clip-text text-transparent mb-4">
                        Our Work in Action
                    </h2>
                    <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                        See how we're making a difference in communities through our various programs and initiatives across India.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {galleryImages.map((image, index) => (
                        <div key={index} className="relative group overflow-hidden rounded-xl aspect-square cursor-pointer border-2 border-orange-200 hover:border-green-400 transition-all duration-300">
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-600/40 to-green-600/40 group-hover:from-orange-600/60 group-hover:to-green-600/60 transition-all duration-300"></div>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="text-white text-center">
                                    <EyeIcon className="w-8 h-8 mx-auto mb-2" />
                                    <p className="text-sm font-medium px-2">{image.category}</p>
                                </div>
                            </div>

                            {/* Decorative Corner Elements */}
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-30 transition-opacity duration-300">
                                <LotusIcon className="w-4 h-4 text-white" />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <button className="bg-gradient-to-r from-orange-500 to-green-500 text-white px-8 py-3 rounded-xl hover:from-orange-600 hover:to-green-600 transition-all duration-300 font-medium inline-flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        <ImageIcon className="w-5 h-5" />
                        <span>View Full Gallery</span>
                    </button>
                </div>

                {/* Decorative Border */}
                <div className="mt-8 text-center">
                    <div className="flex items-center justify-center space-x-4">
                        <div className="h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent flex-1"></div>
                        <div className="flex space-x-2">
                            <LotusIcon className="w-4 h-4 text-orange-500" />
                            <OmIcon className="w-4 h-4 text-green-500" />
                            <LotusIcon className="w-4 h-4 text-orange-500" />
                        </div>
                        <div className="h-px bg-gradient-to-r from-transparent via-green-400 to-transparent flex-1"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
