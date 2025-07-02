export default function Impact() {
    const impactStats = [
        {
            number: "10,000+",
            label: "Lives Impacted"
        },
        {
            number: "50+",
            label: "Communities Served"
        },
        {
            number: "25",
            label: "Active Programs"
        },
        {
            number: "15+",
            label: "Years of Service"
        }
    ];

    return (
        <section className="py-16 bg-blue-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Our Impact in Numbers
                    </h2>
                    <p className="text-lg text-blue-100 max-w-3xl mx-auto">
                        Every number represents a life touched, a community empowered, and hope restored.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {impactStats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
                            <div className="text-blue-100 font-medium">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
