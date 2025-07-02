import { LotusIcon, HeartIcon, UsersIcon } from '../icons'

export default function Programs() {
    const programs = [
        {
            icon: <LotusIcon className="w-8 h-8 text-orange-600" />,
            iconBg: "from-orange-100 to-orange-200",
            borderColor: "border-orange-200",
            title: "Education Support",
            description: "Providing scholarships, school supplies, and educational resources to children from low-income families. We also run adult literacy programs and vocational training courses.",
            features: [
                { text: "School fee assistance", color: "bg-orange-600" },
                { text: "Learning materials", color: "bg-orange-600" },
                { text: "Skill development", color: "bg-orange-600" }
            ]
        },
        {
            icon: <HeartIcon className="w-8 h-8 text-green-600" strokeWidth={2} />,
            iconBg: "from-green-100 to-green-200",
            borderColor: "border-green-200",
            title: "Healthcare Services",
            description: "Free medical camps, health screenings, and basic healthcare services for remote communities. We focus on preventive care and health education.",
            features: [
                { text: "Free medical camps", color: "bg-green-600" },
                { text: "Health screenings", color: "bg-green-600" },
                { text: "Medicine distribution", color: "bg-green-600" }
            ]
        },
        {
            icon: <UsersIcon className="w-8 h-8 text-blue-600" strokeWidth={2} />,
            iconBg: "from-blue-100 to-blue-200",
            borderColor: "border-blue-200",
            title: "Community Development",
            description: "Building sustainable infrastructure, clean water projects, and empowering local communities through capacity building and leadership training programs.",
            features: [
                { text: "Infrastructure projects", color: "bg-blue-600" },
                { text: "Clean water access", color: "bg-blue-600" },
                { text: "Leadership training", color: "bg-blue-600" }
            ]
        }
    ];

    return (
        <section className="py-16 bg-gradient-to-br from-orange-50 via-white to-green-50 relative overflow-hidden">
            {/* Indian pattern background */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ff6b35' fill-opacity='0.1'%3E%3Cpath d='M30 30l15-15-15-15-15 15 15 15zm0 0l15 15-15 15-15-15 15-15z'/%3E%3C/g%3E%3C/svg%3E")`,
                }}></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-orange-600 via-gray-800 to-green-600 bg-clip-text text-transparent">
                            Our Programs
                        </span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        We offer comprehensive programs designed to address the most pressing needs of underserved communities
                        with the spirit of <span className="text-orange-600 font-semibold">seva</span> and compassion.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {programs.map((program, index) => (
                        <div key={index} className={`bg-white rounded-xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 ${program.borderColor} relative overflow-hidden`}>
                            {/* Decorative corner pattern */}
                            <div className="absolute top-0 right-0 w-16 h-16 opacity-10">
                                <div className={`w-full h-full bg-gradient-to-br ${program.iconBg} transform rotate-45 translate-x-8 -translate-y-8`}></div>
                            </div>

                            <div className={`w-16 h-16 bg-gradient-to-br ${program.iconBg} rounded-xl flex items-center justify-center mb-6 border-2 ${program.borderColor} shadow-lg`}>
                                {program.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">{program.title}</h3>
                            <p className="text-gray-600 mb-6 relative z-10">
                                {program.description}
                            </p>
                            <ul className="text-sm text-gray-600 space-y-3 relative z-10">
                                {program.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-center">
                                        <span className={`w-3 h-3 ${feature.color} rounded-full mr-3 flex-shrink-0`}></span>
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
