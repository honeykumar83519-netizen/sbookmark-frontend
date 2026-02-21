import { Shield, XCircle } from 'lucide-react';

export default function AcceptableUse() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6">

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-primary-50 p-8 border-b border-gray-100 text-center">
                        <Shield size={40} className="text-primary-600 mx-auto mb-4" />
                        <h1 className="text-3xl font-bold text-gray-900">Acceptable Use Policy</h1>
                        <p className="text-gray-600 mt-2">Guidelines for keeping our community safe</p>
                    </div>

                    <div className="p-8 sm:p-10 space-y-8">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <XCircle className="text-red-500" size={20} />
                                Prohibited Actions
                            </h2>
                            <p className="text-gray-600 mb-4">Users must strictly avoid:</p>
                            <ul className="space-y-3">
                                {[
                                    'Posting illegal, violent, or harmful content',
                                    'Submitting spam, phishing, or deceptive links',
                                    'Attempting to disrupt website services (DoS attacks)',
                                    'Scraping data without permission'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg text-red-800 text-sm font-medium">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-2">Consequences of Violation</h3>
                            <p className="text-gray-600 text-sm">
                                Violations of this policy are taken seriously and may result in content removal, temporary suspension, or permanent account banning without prior notice.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
