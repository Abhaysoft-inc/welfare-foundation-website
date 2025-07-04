import {
    PhoneIcon,
    EmailIcon,
    FacebookIcon,
    TwitterIcon,
    InstagramIcon,
    LinkedInIcon,
    LotusIcon
} from '../icons';

export default function Footer() {
    const quickLinks = [
        { name: 'About', href: '#about' },
        { name: 'Programs', href: '#programs' },
        { name: 'Gallery', href: '#gallery' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <footer className="bg-gray-900 text-gray-300 py-8 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Simple two-column layout */}
                <div className="flex flex-col md:flex-row justify-between">
                    {/* Left column: Logo and info */}
                    <div className="mb-8 md:mb-0">
                        <div className="flex items-center mb-4">
                            <div className="relative mr-3">
                                <img
                                    src="/images/logo.jpg"
                                    alt="Pandit Sachidanand Welfare Foundation Logo"
                                    className="w-12 h-12 md:w-16 md:h-16 rounded-full  border-2 border-gray-600"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextElementSibling.classList.remove('hidden');
                                        e.target.nextElementSibling.classList.add('flex');
                                    }}
                                />
                                {/* Fallback icon in case image doesn't load */}
                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-orange-500 items-center justify-center hidden">
                                    <LotusIcon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-white font-semibold">
                                    Pandit Sachidanand
                                </h3>
                                <p className="text-xs text-orange-300">Welfare Foundation</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-400 mb-4 max-w-md">
                            Dedicated to serving humanity with compassion, unity, and selfless service.
                        </p>

                        {/* Social icons */}
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-orange-400">
                                <FacebookIcon className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-blue-400">
                                <TwitterIcon className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-green-400">
                                <InstagramIcon className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-red-400">
                                <LinkedInIcon className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Right column: Contact and links */}
                    <div className="grid grid-cols-2 gap-8">
                        {/* Links */}
                        <div>
                            <h4 className="text-white font-medium mb-3 text-sm">Quick Links</h4>
                            <ul className="space-y-2">
                                {quickLinks.map((link, index) => (
                                    <li key={index}>
                                        <a href={link.href} className="text-gray-400 hover:text-orange-300 text-sm">
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h4 className="text-white font-medium mb-3 text-sm">Contact</h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center">
                                    <PhoneIcon className="w-4 h-4 text-orange-400 mr-2" />
                                    <span>+91 9415432141</span>
                                </div>
                                <div className="flex items-center">
                                    <EmailIcon className="w-4 h-4 text-green-400 mr-2" />
                                    <span>sn1984.pandey@gmail.com</span>
                                </div>
                                <div className="flex items-start mt-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <div className="text-gray-400 leading-relaxed">
                                        <div>H/o Manoj Kumar, Kurmauta</div>
                                        <div>Manjharia, Manjha, Natwalia</div>
                                        <div>Kushinagar, Kasia</div>
                                        <div>Uttar Pradesh, India - 274402</div>
                                        <div className="mt-1 text-xs text-gray-500">
                                            CIN: U88900UP2024NPL210627
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Simple copyright */}
                <div className="border-t border-gray-800 mt-8 pt-6 text-xs text-center text-gray-500">
                    <p>© 2025 Pandit Sachidanand Welfare Foundation. All rights reserved.</p>
                    <p className="mt-1">सेवा परमो धर्मः</p>
                </div>
            </div>
        </footer>
    );
}
