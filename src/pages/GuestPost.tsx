import { PenTool, CheckCircle, Mail, AlertCircle, FileText, Send } from 'lucide-react';

export default function GuestPost() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">

                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center p-3 bg-primary-100 rounded-2xl mb-4">
                        <PenTool size={32} className="text-primary-600" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        Guest Post Contribution
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Welcome to <strong>SBoookmark</strong>! We’re always open to collaborating with writers, bloggers, marketers, and industry experts who want to share valuable insights with our audience.
                    </p>
                </div>

                {/* Main Content Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 sm:p-10 space-y-10">

                        {/* Why Write for SBoookmark? */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <FileText className="text-primary-500" size={24} />
                                Why Write for SBoookmark?
                            </h2>
                            <ul className="space-y-3">
                                {[
                                    "Reach a growing and relevant audience",
                                    "Build your personal or brand authority",
                                    "Earn a quality backlink to your website",
                                    "Showcase your expertise in your niche"
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start gap-3 text-gray-600">
                                        <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Topics We Accept */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <CheckCircle className="text-primary-500" size={24} />
                                Topics We Accept
                            </h2>
                            <p className="text-gray-600 mb-4">We accept well-researched and original content related to:</p>
                            <div className="grid sm:grid-cols-2 gap-3">
                                {[
                                    "SEO & Digital Marketing",
                                    "Social Media Marketing",
                                    "Content Marketing & Blogging",
                                    "Technology & Tools",
                                    "Startups & Online Business",
                                    "Productivity & Growth Strategies"
                                ].map((item, index) => (
                                    <div key={index} className="bg-gray-50 p-3 rounded-lg text-gray-700 font-medium text-sm border border-gray-100">
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Guest Post Guidelines */}
                        <section className="bg-orange-50 p-6 rounded-xl border border-orange-100">
                            <h2 className="text-xl font-bold text-orange-900 mb-4 flex items-center gap-2">
                                <AlertCircle className="text-orange-500" size={24} />
                                Guest Post Guidelines
                            </h2>
                            <ul className="space-y-2 text-orange-800">
                                <li className="flex items-start gap-2">
                                    <span className="font-bold">•</span> Content must be 100% original and plagiarism-free
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="font-bold">•</span> Minimum word count: 800+ words
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="font-bold">•</span> Well-structured with headings and subheadings
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="font-bold">•</span> No spun or AI-only content without human editing
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="font-bold">•</span> Promotional or spammy content is not allowed
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="font-bold">•</span> Maximum 1–2 relevant do-follow links (subject to review)
                                </li>
                            </ul>
                        </section>

                        {/* Editorial Process */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">Editorial Process</h2>
                            <p className="text-gray-600 leading-relaxed">
                                All submissions are reviewed by our editorial team. We reserve the right to edit content for clarity, grammar, SEO optimization, or formatting. Submitting an article does not guarantee publication.
                            </p>
                        </section>

                        {/* How to Submit */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Send className="text-primary-500" size={24} />
                                How to Submit
                            </h2>
                            <p className="text-gray-600 mb-4">
                                Please email your article or topic idea with the following details:
                            </p>
                            <ul className="space-y-2 mb-6 ml-1">
                                {[
                                    "Your name and short author bio",
                                    "Proposed topic or draft article",
                                    "Website URL (if any)"
                                ].map((item, index) => (
                                    <li key={index} className="flex items-center gap-2 text-gray-600">
                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <div className="inline-flex items-center gap-3 bg-primary-50 text-primary-700 px-5 py-3 rounded-lg border border-primary-100">
                                <Mail size={20} />
                                <span className="font-medium">Email submissions to:</span>
                                <a href="mailto:contact@sbookmark.link" className="font-bold hover:underline">
                                    contact@sbookmark.link
                                </a>
                            </div>
                        </section>

                        {/* Copyright */}
                        <section className="pt-6 border-t border-gray-100">
                            <h2 className="text-lg font-semibold text-gray-900 mb-2">Copyright</h2>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                By submitting a guest post, you grant SBoookmark the right to publish and display the content on our website. Republishing elsewhere should include a clear credit link to SBoookmark.
                            </p>
                        </section>

                    </div>

                    {/* Bottom CTA */}
                    <div className="bg-gray-50 p-6 sm:p-8 text-center border-t border-gray-100">
                        <p className="text-gray-900 font-medium">
                            We look forward to collaborating with you and sharing valuable content with our readers!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
