import { 
    PhoneIcon, 
    EmailIcon, 
    FacebookIcon, 
    TwitterIcon, 
    InstagramIcon, 
    LinkedInIcon, 
    LotusIcon, 
    OmIcon, 
    HeartIcon,
    ArrowRightIcon 
} from '../icons';

export default function Footer() {
    const quickLinks = [
        { name: 'About Us', href: '#about' },
        { name: 'Our Programs', href: '#programs' },
        { name: 'Gallery', href: '#gallery' },
        { name: 'News & Events', href: '#news' },
        { name: 'Contact', href: '#contact' },
        { name: 'Volunteer', href: '#volunteer' }
    ];

    const programs = [
        { name: 'Education Support', href: '#education' },
        { name: 'Healthcare Services', href: '#healthcare' },
        { name: 'Community Development', href: '#community' },
        { name: 'Women Empowerment', href: '#women' },
        { name: 'Elder Care', href: '#eldercare' },
        { name: 'Disaster Relief', href: '#relief' }
    ];

    return (
        <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
            {/* Traditional Indian Pattern Background */}
            <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="footerPattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                            <circle cx="40" cy="40" r="15" fill="none" stroke="#ff6b35" strokeWidth="1" opacity="0.3"/>
                            <path d="M25,25 Q40,15 55,25 Q40,35 25,25" fill="#138808" opacity="0.2"/>
                            <path d="M25,55 Q40,65 55,55 Q40,45 25,55" fill="#138808" opacity="0.2"/>
                            <circle cx="40" cy="40" r="3" fill="#ff6b35" opacity="0.4"/>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#footerPattern)"/>
                </svg>
            </div>

            {/* Decorative Top Wave */}
            <div className="absolute top-0 left-0 right-0">
                <svg viewBox="0 0 1200 120" fill="none" className="w-full h-auto">
                    <path d="M0,0 L0,60 Q300,120 600,60 T1200,60 L1200,0 Z" fill="url(#footerGradient)" />
                    <defs>
                        <linearGradient id="footerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#ff9933" stopOpacity="0.1" />
                            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.05" />
                            <stop offset="100%" stopColor="#138808" stopOpacity="0.1" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            {/* Floating Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 opacity-20">
                    <LotusIcon className="w-16 h-16 text-orange-400" />
                </div>
                <div className="absolute top-40 right-20 opacity-15">
                    <OmIcon className="w-20 h-20 text-green-400" />
                </div>
                <div className="absolute bottom-20 left-1/4 opacity-10">
                    <LotusIcon className="w-12 h-12 text-orange-300" />
                </div>
                <div className="absolute bottom-40 right-1/3 opacity-20">
                    <OmIcon className="w-14 h-14 text-green-300" />
                </div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    
                    {/* Foundation Info */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 via-white to-green-600 rounded-xl flex items-center justify-center">
                                <LotusIcon className="w-8 h-8 text-orange-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold bg-gradient-to-r from-orange-400 to-green-400 bg-clip-text text-transparent">
                                    Pandit Sachidanand
                                </h3>
                                <p className="text-sm text-orange-300">Welfare Foundation</p>
                            </div>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed mb-6">
                            Dedicated to serving humanity with the ancient values of compassion, unity, and selfless service. 
                            <span className="text-orange-300 font-medium"> "सेवा परमो धर्मः"</span>
                        </p>
                        
                        {/* Social Links */}
                        <div className="flex space-x-3">
                            <a href="#" className="group">
                                <div className="p-2 bg-gradient-to-r from-orange-600/20 to-orange-500/20 rounded-lg border border-orange-500/30 group-hover:border-orange-400 group-hover:bg-gradient-to-r group-hover:from-orange-600/30 group-hover:to-orange-500/30 transition-all duration-200">
                                    <FacebookIcon className="w-4 h-4 text-orange-300 group-hover:text-orange-200" />
                                </div>
                            </a>
                            <a href="#" className="group">
                                <div className="p-2 bg-gradient-to-r from-blue-600/20 to-blue-500/20 rounded-lg border border-blue-500/30 group-hover:border-blue-400 group-hover:bg-gradient-to-r group-hover:from-blue-600/30 group-hover:to-blue-500/30 transition-all duration-200">
                                    <TwitterIcon className="w-4 h-4 text-blue-300 group-hover:text-blue-200" />
                                </div>
                            </a>
                            <a href="#" className="group">
                                <div className="p-2 bg-gradient-to-r from-green-600/20 to-green-500/20 rounded-lg border border-green-500/30 group-hover:border-green-400 group-hover:bg-gradient-to-r group-hover:from-green-600/30 group-hover:to-green-500/30 transition-all duration-200">
                                    <InstagramIcon className="w-4 h-4 text-green-300 group-hover:text-green-200" />
                                </div>
                            </a>
                            <a href="#" className="group">
                                <div className="p-2 bg-gradient-to-r from-red-600/20 to-red-500/20 rounded-lg border border-red-500/30 group-hover:border-red-400 group-hover:bg-gradient-to-r group-hover:from-red-600/30 group-hover:to-red-500/30 transition-all duration-200">
                                    <LinkedInIcon className="w-4 h-4 text-red-300 group-hover:text-red-200" />
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-6 flex items-center">
                            <OmIcon className="w-5 h-5 text-orange-400 mr-2" />
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <a href={link.href} className="group flex items-center text-gray-300 hover:text-orange-300 transition-colors duration-200">
                                        <ArrowRightIcon className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
                                        <span className="text-sm">{link.name}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Our Programs */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-6 flex items-center">
                            <HeartIcon className="w-5 h-5 text-green-400 mr-2" />
                            Our Programs
                        </h3>
                        <ul className="space-y-3">
                            {programs.map((program, index) => (
                                <li key={index}>
                                    <a href={program.href} className="group flex items-center text-gray-300 hover:text-green-300 transition-colors duration-200">
                                        <ArrowRightIcon className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
                                        <span className="text-sm">{program.name}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-6 flex items-center">
                            <LotusIcon className="w-5 h-5 text-blue-400 mr-2" />
                            Contact Us
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-orange-600/20 rounded-lg border border-orange-500/30">
                                    <PhoneIcon className="w-4 h-4 text-orange-300" />
                                </div>
                                <div>
                                    <p className="text-gray-300 text-sm">Call Us</p>
                                    <p className="text-white font-medium">+91 8948041722</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-green-600/20 rounded-lg border border-green-500/30">
                                    <EmailIcon className="w-4 h-4 text-green-300" />
                                </div>
                                <div>
                                    <p className="text-gray-300 text-sm">Email Us</p>
                                    <p className="text-white font-medium">psf.welfare@gmail.com</p>
                                </div>
                            </div>

                            {/* Newsletter Signup */}
                            <div className="mt-6">
                                <p className="text-gray-300 text-sm mb-3">Stay updated with our work</p>
                                <div className="flex">
                                    <input 
                                        type="email" 
                                        placeholder="Your email"
                                        className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-l-lg text-white text-sm focus:outline-none focus:border-orange-400"
                                    />
                                    <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-green-500 text-white rounded-r-lg hover:from-orange-600 hover:to-green-600 transition-all duration-200">
                                        <ArrowRightIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="border-t border-gray-700 pt-8 mt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="flex items-center space-x-4">
                            <p className="text-gray-400 text-sm">
                                © 2025 Pandit Sachidanand Welfare Foundation. All rights reserved.
                            </p>
                        </div>
                        
                        <div className="flex items-center space-x-6">
                            <a href="#" className="text-gray-400 hover:text-orange-300 text-sm transition-colors duration-200">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-gray-400 hover:text-green-300 text-sm transition-colors duration-200">
                                Terms of Service
                            </a>
                            <div className="flex items-center space-x-2">
                                <span className="text-gray-400 text-sm">Made with</span>
                                <HeartIcon className="w-4 h-4 text-red-400" />
                                <span className="text-gray-400 text-sm">for humanity</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Indian Cultural Quote */}
                    <div className="text-center mt-6 pt-6 border-t border-gray-800">
                        <div className="flex items-center justify-center space-x-4">
                            <LotusIcon className="w-5 h-5 text-orange-400" />
                            <p className="text-gray-300 text-sm italic">
                                "वसुधैव कुटुम्बकम्" - The World is One Family
                            </p>
                            <OmIcon className="w-5 h-5 text-green-400" />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
