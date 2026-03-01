import { Mail, Globe, MessageSquare } from 'lucide-react';
import SEO from '../components/SEO';

export default function Contact() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <SEO title="Contact Us" description="Get in touch with the SBookmark team." />
            <div className="max-w-3xl mx-auto px-4 sm:px-6">

                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center p-3 bg-primary-100 rounded-2xl mb-4">
                        <MessageSquare size={32} className="text-primary-600" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                        Get in Touch
                    </h1>
                    <p className="text-gray-600">
                        We'd love to hear from you. Here is how you can reach us.
                    </p>
                </div>

                <div className="grid gap-6">
                    {/* Email Card */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center gap-6 hover:shadow-md transition-shadow">
                        <div className="bg-blue-50 p-4 rounded-full">
                            <Mail size={24} className="text-blue-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Email Support</h3>
                            <p className="text-gray-500 text-sm mb-1">For general inquiries and support</p>
                            <a href="mailto:contact@sbookmark.link" className="text-primary-600 font-medium hover:underline">
                                contact@sbookmark.link
                            </a>
                        </div>
                    </div>

                    {/* Website Card */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center gap-6 hover:shadow-md transition-shadow">
                        <div className="bg-purple-50 p-4 rounded-full">
                            <Globe size={24} className="text-purple-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Visit Website</h3>
                            <p className="text-gray-500 text-sm mb-1">Check out our latest updates</p>
                            <a href="https://sbookmark.link" target="_blank" rel="noopener noreferrer" className="text-primary-600 font-medium hover:underline">
                                https://sbookmark.link
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
