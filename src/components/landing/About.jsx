import { HeartIcon, UsersIcon, LotusIcon } from '../icons'

export default function About() {
    const values = [
        {
            icon: <HeartIcon className="w-6 h-6" strokeWidth={2} />,
            title: "Compassion",
            description: "We approach every situation with empathy and understanding, following the ancient principle of 'Seva'"
        },
        {
            icon: <UsersIcon className="w-6 h-6" strokeWidth={2} />,
            title: "Community",
            description: "Building stronger communities through collaboration and unity - Vasudhaiva Kutumbakam"
        },
        {
            icon: <LotusIcon className="w-6 h-6" />,
            title: "Impact",
            description: "Creating measurable, lasting change in people's lives through dharmic action"
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-orange-50 via-white to-green-50 relative overflow-hidden">
            {/* Indian-inspired Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-orange-400 to-red-400 rounded-full -translate-x-32 -translate-y-32"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-green-400 to-blue-400 rounded-full translate-x-48 translate-y-48"></div>
                {/* Traditional patterns */}
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ff6b35' fill-opacity='0.05'%3E%3Cpath d='M40 40l20-20-20-20-20 20 20 20zm0 0l20 20-20 20-20-20 20-20z'/%3E%3C/g%3E%3C/svg%3E")`,
                }}></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Header Section with Indian Touch */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-100 to-green-100 rounded-full mb-6 border-2 border-orange-200">
                        <LotusIcon className="w-10 h-10 text-orange-600" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-orange-600 via-gray-800 to-green-600 bg-clip-text text-transparent">
                            About Our Foundation
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        For over 15 years, we've been dedicated to creating positive change in communities through
                        education, healthcare, and social welfare programs that transform lives with the spirit of
                        <span className="text-orange-600 font-semibold"> selfless service</span>.
                    </p>
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
                    {/* Left Column - Mission & Vision */}
                    <div className="space-y-8">
                        {/* Mission */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
                            </div>
                            <p className="text-gray-600 leading-relaxed">
                                We strive to empower underprivileged communities by providing access to quality education,
                                healthcare services, and sustainable livelihood opportunities. Our goal is to create lasting
                                change that transforms lives and builds stronger, more resilient communities.
                            </p>
                        </div>

                        {/* Vision */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
                            </div>
                            <p className="text-gray-600 leading-relaxed">
                                A world where every individual has equal opportunities to thrive, regardless of their
                                background or circumstances. We envision communities that are self-reliant, educated,
                                and empowered to create their own success stories.
                            </p>
                        </div>
                    </div>

                    {/* Right Column - Image with Stats */}
                    <div className="relative">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src="/images/2.jpg"
                                alt="Our team helping communities"
                                className="w-full h-96 object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent"></div>

                            {/* Floating Stats */}
                            <div className="absolute bottom-6 left-6 right-6">
                                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6">
                                    <div className="grid grid-cols-2 gap-4 text-center">
                                        <div>
                                            <div className="text-2xl font-bold text-gray-900">15+</div>
                                            <div className="text-sm text-gray-600">Years Experience</div>
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-gray-900">50+</div>
                                            <div className="text-sm text-gray-600">Communities</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Values Section with Indian Touch */}
                <div>
                    <h3 className="text-3xl font-bold text-center mb-12">
                        <span className="bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                            Our Core Values
                        </span>
                    </h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        {values.map((value, index) => {
                            const colors = [
                                { bg: 'from-orange-100 to-orange-200', icon: 'text-orange-600', border: 'border-orange-200' },
                                { bg: 'from-green-100 to-green-200', icon: 'text-green-600', border: 'border-green-200' },
                                { bg: 'from-blue-100 to-blue-200', icon: 'text-blue-600', border: 'border-blue-200' }
                            ][index];

                            return (
                                <div
                                    key={index}
                                    className={`bg-white rounded-xl p-8 text-center shadow-lg ${colors.border} border-2 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden`}
                                >
                                    {/* Indian pattern overlay */}
                                    <div className="absolute top-0 right-0 w-20 h-20 opacity-5">
                                        <div className="w-full h-full bg-gradient-to-br from-orange-400 to-green-400 rounded-full transform translate-x-8 -translate-y-8"></div>
                                    </div>
                                    <div className={`w-16 h-16 bg-gradient-to-br ${colors.bg} rounded-full flex items-center justify-center mx-auto mb-6 ${colors.icon} border-2 ${colors.border}`}>
                                        {value.icon}
                                    </div>
                                    <h4 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h4>
                                    <p className="text-gray-600 relative z-10">{value.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Call to Action with Indian Touch */}
                <div className="text-center mt-16">
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-white px-8 py-4 rounded-xl hover:from-orange-600 hover:via-orange-700 hover:to-red-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 border border-orange-400">
                            Learn More About Us
                        </button>
                        <button className="border-2 border-green-600 bg-gradient-to-r from-green-50 to-green-100 text-green-600 px-8 py-4 rounded-xl hover:bg-gradient-to-r hover:from-green-600 hover:to-green-700 hover:text-white transition-all duration-300 font-semibold shadow-lg hover:shadow-xl">
                            View Our Programs
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
