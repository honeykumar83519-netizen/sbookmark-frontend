import { Cookie, Settings, BarChart } from 'lucide-react';

export default function CookiePolicy() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6">

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10">
                    <div className="flex items-center gap-4 mb-8 border-b border-gray-100 pb-6">
                        <div className="p-3 bg-orange-100 rounded-full">
                            <Cookie size={32} className="text-orange-600" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900">Cookie Policy</h1>
                    </div>

                    <div className="space-y-8">
                        <p className="text-lg text-gray-700">
                            SBoookmark uses cookies to improve functionality, analyze performance, and provide a better user experience.
                        </p>

                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">What Are Cookies?</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Cookies are small text files stored on your device (computer, tablet, or mobile) when you visit certain websites. They allow the site to remember your actions and preferences over a period of time.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">How We Use Cookies</h2>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="p-4 border border-gray-200 rounded-xl hover:border-primary-200 transition-colors">
                                    <Settings className="text-primary-500 mb-2" size={24} />
                                    <h3 className="font-semibold text-gray-900 mb-1">Essential</h3>
                                    <p className="text-sm text-gray-500">To remember your login state and preferences.</p>
                                </div>
                                <div className="p-4 border border-gray-200 rounded-xl hover:border-primary-200 transition-colors">
                                    <BarChart className="text-primary-500 mb-2" size={24} />
                                    <h3 className="font-semibold text-gray-900 mb-1">Analytics</h3>
                                    <p className="text-sm text-gray-500">To understand how visitors use our site.</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-xl">
                            <h3 className="font-bold text-gray-900 mb-2">Managing Cookies</h3>
                            <p className="text-gray-600 text-sm">
                                You can control and/or delete cookies as you wish through your browser settings. Note that disabling cookies may affect the functionality of this website.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
