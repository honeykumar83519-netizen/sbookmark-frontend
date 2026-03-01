import { FileWarning, Mail } from 'lucide-react';
import SEO from '../components/SEO';

export default function Dmca() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <SEO title="DMCA Policy" description="DMCA Copyright Policy for the SBookmark platform." />
            <div className="max-w-3xl mx-auto px-4 sm:px-6">

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10">
                    <div className="flex items-center gap-4 mb-6">
                        <FileWarning size={32} className="text-primary-600" />
                        <h1 className="text-3xl font-bold text-gray-900">DMCA Copyright Policy</h1>
                    </div>

                    <div className="space-y-6 text-gray-700 leading-relaxed">
                        <p className="text-lg">
                            SBoookmark respects the intellectual property rights of others and expects our users to do the same.
                        </p>

                        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                            <h2 className="font-bold text-gray-900 mb-3">Filing a Complaint</h2>
                            <p className="mb-4">If you believe your copyright has been violated by content on our site, please provide a written notice containing:</p>
                            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-800">
                                <li>Your contact details (Name, Address, Phone, Email)</li>
                                <li>A description of the copyrighted work claimed to be infringed</li>
                                <li>The URL or location of the infringing material on our site</li>
                                <li>A statement of good faith belief that the use is unauthorized</li>
                                <li>A statement that the information is accurate, under penalty of perjury</li>
                            </ul>
                        </div>

                        <div className="flex items-center gap-4 pt-4">
                            <div className="p-3 bg-gray-100 rounded-full">
                                <Mail size={24} className="text-gray-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">Contact DMCA Agent</h3>
                                <a href="mailto:contact@sbookmark.link" className="text-primary-600 font-medium hover:underline">
                                    contact@sbookmark.link
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
