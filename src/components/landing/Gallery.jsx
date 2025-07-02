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
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Our Work in Action
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        See how we're making a difference in communities through our various programs and initiatives.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {galleryImages.map((image, index) => (
                        <div key={index} className="relative group overflow-hidden rounded-lg aspect-square cursor-pointer">
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition-opacity duration-300"></div>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="text-white text-center">
                                    <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    <p className="text-sm font-medium">{image.category}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium inline-flex items-center space-x-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>View Full Gallery</span>
                    </button>
                </div>
            </div>
        </section>
    );
}
