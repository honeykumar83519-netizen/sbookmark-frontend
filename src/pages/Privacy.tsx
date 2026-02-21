import { ShieldCheck, Lock, Eye, Server } from 'lucide-react';

export default function Privacy() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">

                {/* Header */}
                <div className="bg-white rounded-t-2xl p-8 border-b border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-green-100 rounded-xl">
                        <Lock size={32} className="text-green-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Privacy Policy</h1>
                        <p className="text-gray-500 text-sm mt-1">Last updated: January 2026</p>
                    </div>
                </div>

                {/* Content */}
                <div className="bg-white rounded-b-2xl shadow-sm border border-gray-100 p-8 sm:p-10 space-y-8 text-gray-700 leading-relaxed">

                    <p className="text-lg">
                        At <strong>SBoookmark</strong> (<a href="https://sbookmark.link" className="text-primary-600 hover:underline">https://sbookmark.link</a>), your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information.
                    </p>

                    <section>
                        <div className="flex items-center gap-2 mb-4">
                            <Eye className="text-primary-500" size={20} />
                            <h2 className="text-xl font-bold text-gray-900">Information We Collect</h2>
                        </div>
                        <div className="pl-7 space-y-4">
                            <div>
                                <h3 className="font-semibold text-gray-900">Personal Information</h3>
                                <p className="text-gray-600">We may collect personal data such as name and email address if you choose to provide it (e.g., when registering an account or contacting support).</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Non-Personal Information</h3>
                                <p className="text-gray-600">This includes technical data such as IP address, browser type, pages visited, and referring URLs, collected automatically to help us improve our service.</p>
                            </div>
                        </div>
                    </section>

                    <hr className="border-gray-100" />

                    <section>
                        <div className="flex items-center gap-2 mb-4">
                            <Server className="text-primary-500" size={20} />
                            <h2 className="text-xl font-bold text-gray-900">How We Use Your Information</h2>
                        </div>
                        <ul className="list-disc pl-11 space-y-2 text-gray-600">
                            <li>Operate and maintain our website</li>
                            <li>Improve user experience and personalization</li>
                            <li>Prevent fraud and abuse</li>
                            <li>Comply with legal obligations</li>
                        </ul>
                    </section>

                    <hr className="border-gray-100" />

                    <section>
                        <div className="flex items-center gap-2 mb-4">
                            <ShieldCheck className="text-primary-500" size={20} />
                            <h2 className="text-xl font-bold text-gray-900">Data Protection</h2>
                        </div>
                        <div className="pl-7 space-y-4">
                            <div>
                                <h3 className="font-semibold text-gray-900">Cookies</h3>
                                <p className="text-gray-600">SBoookmark uses cookies to store preferences and analyze website traffic. You may disable cookies through your browser settings.</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Third-Party Services</h3>
                                <p className="text-gray-600">We may use third-party tools such as analytics or advertising services. These services have their own privacy policies.</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Children’s Information</h3>
                                <p className="text-gray-600">We do not knowingly collect data from children under the age of 13.</p>
                            </div>
                        </div>
                    </section>

                    <div className="bg-gray-50 rounded-xl p-6 mt-8">
                        <h3 className="font-bold text-gray-900 mb-2">Contact Us</h3>
                        <p className="text-gray-600 text-sm">
                            If you have questions about this Privacy Policy, please contact us at <a href="mailto:contact@sbookmark.link" className="text-primary-600 font-medium hover:underline">contact@sbookmark.link</a>.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}
