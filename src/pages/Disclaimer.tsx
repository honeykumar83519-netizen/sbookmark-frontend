import { AlertOctagon, AlertCircle } from 'lucide-react';

export default function Disclaimer() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6">

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10 text-center">
                    <AlertOctagon size={48} className="text-gray-400 mx-auto mb-6" />
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">Disclaimer</h1>

                    <div className="text-left space-y-6 text-gray-700 leading-relaxed bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <div className="flex gap-3">
                            <AlertCircle className="text-gray-500 flex-shrink-0 mt-1" size={20} />
                            <p>The information on SBoookmark is provided for general informational purposes only.</p>
                        </div>
                        <div className="flex gap-3">
                            <AlertCircle className="text-gray-500 flex-shrink-0 mt-1" size={20} />
                            <p>We do not guarantee the accuracy, completeness, or reliability of any user-submitted links or content.</p>
                        </div>
                        <div className="flex gap-3">
                            <AlertCircle className="text-gray-500 flex-shrink-0 mt-1" size={20} />
                            <p>External websites linked from our platform are not controlled by SBoookmark. We assume no responsibility for their content or privacy practices.</p>
                        </div>
                        <div className="flex gap-3">
                            <AlertCircle className="text-gray-500 flex-shrink-0 mt-1" size={20} />
                            <p>Use of this website and reliance on any information is strictly at your own risk.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
