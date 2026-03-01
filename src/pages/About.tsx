import { Info, Target, Users } from 'lucide-react';
import SEO from '../components/SEO';

export default function About() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <SEO title="About Us" description="Learn about SBookmark, a modern platform for saving and organizing web content." />
            <div className="max-w-4xl mx-auto px-4 sm:px-6">

                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center p-3 bg-primary-100 rounded-2xl mb-4">
                        <Info size={32} className="text-primary-600" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        About SBoookmark
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Your go-to platform for saving, organizing, and discovering the best content on the web.
                    </p>
                </div>

                {/* Main Content Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 sm:p-10 space-y-8">

                        {/* Who We Are */}
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 mt-1">
                                <Users className="text-primary-500" size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-2">Who We Are</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    SBoookmark is a modern, community-driven bookmarking platform designed to clutter-free your digital life. We believe that great content deserves to be saved, shared, like-minded individuals. Whether you are a developer, designer, or just an avid reader, SBoookmark helps you keep track of what matters.
                                </p>
                            </div>
                        </div>

                        {/* Our Mission */}
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 mt-1">
                                <Target className="text-primary-500" size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-2">Our Mission</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    Our mission is to make link sharing simple, secure, and accessible for everyone. We strive to build a tool that not only stores links but also fosters a community of knowledge sharing. We are committed to privacy, ease of use, and continuous innovation.
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* Bottom CTA or Decor */}
                    <div className="bg-gray-50 p-6 sm:p-8 text-center border-t border-gray-100">
                        <p className="text-gray-500 italic">
                            "The best way to predict the future is to create it."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
