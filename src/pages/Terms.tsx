import { FileText, CheckCircle, AlertTriangle, Scale } from 'lucide-react';

export default function Terms() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">

                {/* Header */}
                <div className="bg-white rounded-t-2xl p-8 border-b border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-xl">
                        <Scale size={32} className="text-blue-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Terms and Conditions</h1>
                        <p className="text-gray-500 text-sm mt-1">Last updated: January 2026</p>
                    </div>
                </div>

                {/* Content */}
                <div className="bg-white rounded-b-2xl shadow-sm border border-gray-100 p-8 sm:p-10 space-y-8 text-gray-700 leading-relaxed">

                    <p className="text-lg">
                        By accessing <strong>SBoookmark</strong>, you agree to be bound by these Terms and Conditions. Please read them carefully.
                    </p>

                    <section>
                        <div className="flex items-center gap-2 mb-4">
                            <CheckCircle className="text-primary-500" size={20} />
                            <h2 className="text-xl font-bold text-gray-900">Use of Website</h2>
                        </div>
                        <ul className="pl-7 space-y-2 text-gray-600">
                            <li>You agree to use the site only for lawful purposes.</li>
                            <li>You must not use the site in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the website.</li>
                        </ul>
                    </section>

                    <section>
                        <div className="flex items-center gap-2 mb-4">
                            <FileText className="text-primary-500" size={20} />
                            <h2 className="text-xl font-bold text-gray-900">User Content</h2>
                        </div>
                        <p className="pl-7 text-gray-600">
                            You are responsible for any content or links you submit. You must have the necessary rights to share them. SBoookmark is not responsible for the content posted by users.
                        </p>
                    </section>

                    <section>
                        <div className="flex items-center gap-2 mb-4">
                            <AlertTriangle className="text-red-500" size={20} />
                            <h2 className="text-xl font-bold text-gray-900">Prohibited Activities</h2>
                        </div>
                        <div className="pl-7 bg-red-50 p-4 rounded-lg border border-red-100">
                            <ul className="list-disc pl-4 space-y-2 text-gray-700">
                                <li>Spamming or automated submissions</li>
                                <li>Posting malicious, harmful, or illegal links</li>
                                <li>Copyright infringement</li>
                                <li>Harassment or hate speech</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3 ml-7">Termination & Liability</h2>
                        <div className="pl-7 space-y-4 text-gray-600">
                            <p>We reserve the right to suspend or terminate access for violations of these terms at our sole discretion, without notice.</p>
                            <p>SBoookmark is provided "as is". We are not responsible for third-party content, external links, or any damages resulting from the use of this site.</p>
                        </div>
                    </section>

                    <div className="bg-gray-50 rounded-xl p-6 mt-8">
                        <h3 className="font-bold text-gray-900 mb-2">Questions?</h3>
                        <p className="text-gray-600 text-sm">
                            Contact us at <a href="mailto:contact@sbookmark.link" className="text-primary-600 font-medium hover:underline">contact@sbookmark.link</a>.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}
