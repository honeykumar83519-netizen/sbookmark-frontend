import { ArrowUp, Facebook, Linkedin, Mail, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 border-t border-gray-800 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="space-y-2 text-center md:text-left">
                        <Link to="/" className="inline-block">
                            <img
                                src="/logo3.png"
                                alt="LinkHive Logo"
                                className="h-10 sm:h-12 md:h-14 lg:h-[60px] w-auto object-contain"
                            />
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
                            Simplify your online bookmarking with secure and efficient link management. Save, organize, and access your favorite links anywhere.
                        </p>
                        <div className="flex gap-4 justify-center md:justify-start">
                            {[
                                { Icon: Facebook, href: '#' },
                                { Icon: Twitter, href: '#' },
                                { Icon: Linkedin, href: '#' },
                                { Icon: Mail, href: 'mailto:contact@sbookmark.link' }
                            ].map(({ Icon, href }, index) => (
                                <a
                                    key={index}
                                    href={href}
                                    className="bg-gray-800 p-2.5 rounded-lg hover:bg-primary-600 hover:text-white transition-all transform hover:-translate-y-1"
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="text-center md:text-left">
                        <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/" className="hover:text-primary-400 transition-colors inline-block hover:translate-x-1 duration-200">Home</Link></li>
                            <li><Link to="/about" className="hover:text-primary-400 transition-colors inline-block hover:translate-x-1 duration-200">About Us</Link></li>
                            <li><Link to="/blog" className="hover:text-primary-400 transition-colors inline-block hover:translate-x-1 duration-200">Blog</Link></li>
                            <li><Link to="/contact" className="hover:text-primary-400 transition-colors inline-block hover:translate-x-1 duration-200">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="text-center md:text-left">
                        <h3 className="text-white font-bold text-lg mb-6">Resources</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/faq" className="hover:text-primary-400 transition-colors inline-block hover:translate-x-1 duration-200">FAQ</Link></li>
                            <li><Link to="/dmca" className="hover:text-primary-400 transition-colors inline-block hover:translate-x-1 duration-200">DMCA Policy</Link></li>
                            <li><Link to="/acceptable-use" className="hover:text-primary-400 transition-colors inline-block hover:translate-x-1 duration-200">Acceptable Use Policy</Link></li>
                            <li><Link to="/disclaimer" className="hover:text-primary-400 transition-colors inline-block hover:translate-x-1 duration-200">Disclaimer</Link></li>
                            <li><Link to="/guest-post" className="hover:text-primary-400 transition-colors inline-block hover:translate-x-1 duration-200">Guest Post</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="text-center md:text-left">
                        <h3 className="text-white font-bold text-lg mb-6">Legal</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/privacy" className="hover:text-primary-400 transition-colors inline-block hover:translate-x-1 duration-200">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="hover:text-primary-400 transition-colors inline-block hover:translate-x-1 duration-200">Terms and Conditions</Link></li>
                            <li><Link to="/cookie-policy" className="hover:text-primary-400 transition-colors inline-block hover:translate-x-1 duration-200">Cookie Policy</Link></li>
                        </ul>
                        <button
                            onClick={scrollToTop}
                            className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-xs font-semibold px-4 py-3 rounded-lg transition-colors mt-8 uppercase tracking-wider"
                        >
                            <ArrowUp size={14} />
                            Back to Top
                        </button>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <p>&copy; {new Date().getFullYear()} SBookmark.link. All rights reserved.</p>
                    <p>Designed By <a href="https://webseorank.in"  target="_blank" className="hover:text-gray-300 transition-colors">WebSeoRank</a></p>
                </div>
            </div>
        </footer>
    );
}
