export default function Programs() {
    const programs = [
        {
            icon: (
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            ),
            iconBg: "bg-blue-100",
            title: "Education Support",
            description: "Providing scholarships, school supplies, and educational resources to children from low-income families. We also run adult literacy programs and vocational training courses.",
            features: [
                { text: "School fee assistance", color: "bg-blue-600" },
                { text: "Learning materials", color: "bg-blue-600" },
                { text: "Skill development", color: "bg-blue-600" }
            ]
        },
        {
            icon: (
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            ),
            iconBg: "bg-green-100",
            title: "Healthcare Services",
            description: "Free medical camps, health screenings, and basic healthcare services for remote communities. We focus on preventive care and health education.",
            features: [
                { text: "Free medical camps", color: "bg-green-600" },
                { text: "Health screenings", color: "bg-green-600" },
                { text: "Medicine distribution", color: "bg-green-600" }
            ]
        },
        {
            icon: (
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            iconBg: "bg-purple-100",
            title: "Community Development",
            description: "Building sustainable infrastructure, clean water projects, and empowering local communities through capacity building and leadership training programs.",
            features: [
                { text: "Infrastructure projects", color: "bg-purple-600" },
                { text: "Clean water access", color: "bg-purple-600" },
                { text: "Leadership training", color: "bg-purple-600" }
            ]
        }
    ];

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Our Programs
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        We offer comprehensive programs designed to address the most pressing needs of underserved communities.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {programs.map((program, index) => (
                        <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
                            <div className={`w-16 h-16 ${program.iconBg} rounded-lg flex items-center justify-center mb-6`}>
                                {program.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">{program.title}</h3>
                            <p className="text-gray-600 mb-6">
                                {program.description}
                            </p>
                            <ul className="text-sm text-gray-600 space-y-2">
                                {program.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-center">
                                        <span className={`w-2 h-2 ${feature.color} rounded-full mr-3`}></span>
                                        {feature.text}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                        View All Programs
                    </button>
                </div>
            </div>
        </section>
    );
}
