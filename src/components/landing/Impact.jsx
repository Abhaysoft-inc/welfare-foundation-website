import { StarIcon, LotusIcon } from '../icons';

export default function Impact() {
    const impactStats = [
        {
            number: "10,000+",
            label: "Lives Impacted",
            icon: StarIcon
        },
        {
            number: "50+",
            label: "Communities Served",
            icon: LotusIcon
        },
        {
            number: "25",
            label: "Active Programs",
            icon: StarIcon
        },
        {
            number: "15+",
            label: "Years of Service",
            icon: LotusIcon
        }
    ];

    return (
        <section className="relative py-16 bg-gradient-to-br from-orange-500 via-white to-green-500 overflow-hidden">
            {/* Traditional Indian Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="indianPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                            <circle cx="50" cy="50" r="20" fill="none" stroke="#ff6b35" strokeWidth="2" />
                            <circle cx="50" cy="50" r="10" fill="#ff6b35" opacity="0.3" />
                            <path d="M30,30 Q50,10 70,30 Q50,50 30,30" fill="#138808" opacity="0.4" />
                            <path d="M30,70 Q50,90 70,70 Q50,50 30,70" fill="#138808" opacity="0.4" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#indianPattern)" />
                </svg>
            </div>

            {/* Decorative Lotus Elements */}
            <div className="absolute top-10 left-10 opacity-20">
                <LotusIcon className="w-16 h-16 text-orange-600" />
            </div>
            <div className="absolute bottom-10 right-10 opacity-20">
                <LotusIcon className="w-20 h-20 text-green-600" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 via-red-500 to-green-600 bg-clip-text text-transparent mb-4">
                        Our Impact in Numbers
                    </h2>
                    <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                        Every number represents a life touched, a community empowered, and hope restored across India.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {impactStats.map((stat, index) => {
                        const IconComponent = stat.icon;
                        return (
                            <div key={index} className="text-center group">
                                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-orange-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                                    <div className="flex justify-center mb-3">
                                        <IconComponent className="w-8 h-8 text-orange-600 group-hover:text-green-600 transition-colors duration-300" />
                                    </div>
                                    <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent mb-2">
                                        {stat.number}
                                    </div>
                                    <div className="text-gray-700 font-medium">
                                        {stat.label}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Decorative Border */}
                <div className="mt-12 text-center">
                    <div className="flex items-center justify-center space-x-4">
                        <div className="h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent flex-1"></div>
                        <LotusIcon className="w-6 h-6 text-orange-500" />
                        <div className="h-px bg-gradient-to-r from-transparent via-green-400 to-transparent flex-1"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
