import { useState } from 'react';
import { HelpCircle, Plus, Minus } from 'lucide-react';

const FAQS = [
    {
        question: "What is SBookmark?",
        answer: "SBookmark is a modern bookmarking platform that allows you to save, organize, and manage your favorite links from across the web in one secure place. You can categorize your links, add tags, and access them from any device."
    },
    {
        question: "Is SBookmark free to use?",
        answer: "Yes! SBookmark is currently free for all users. You can create an account, save unlimited bookmarks, and organize them into collections without any cost."
    },
    {
        question: "How do I save a link?",
        answer: "Once you are logged in, simply click on the 'Submit Link' button in the navigation bar. Paste the URL you want to save, and our system will automatically fetch the preview details. You can then add a custom title, description, category, and tags before saving."
    },
    {
        question: "Can I make my bookmarks private?",
        answer: "By default, bookmarks submitted to the public feed are visible to everyone. We are working on a feature to allow private collections where only you can see your saved links. Stay tuned for updates!"
    },
    {
        question: "How do I organize my bookmarks?",
        answer: "You can organize your bookmarks using Categories (like Technology, Design, News) and Tags. This makes it easy to filter and search for specific content later."
    },
    {
        question: "Can I edit or delete a bookmark after saving it?",
        answer: "Yes, you can manage your saved bookmarks from your Profile page. You have full control to update the details or remove links you no longer need."
    },
    {
        question: "I forgot my password. How can I reset it?",
        answer: "Currently, please contact our support team at contact@sbookmark.link for assistance with account recovery. We are implementing an automated password reset feature soon."
    }
];

export default function Faq() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6">

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center p-3 bg-primary-100 rounded-2xl mb-4">
                        <HelpCircle size={32} className="text-primary-600" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-lg text-gray-600">
                        Everything you need to know about using SBookmark.
                    </p>
                </div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {FAQS.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-md"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                            >
                                <span className="font-semibold text-gray-900 text-lg">
                                    {faq.question}
                                </span>
                                {openIndex === index ? (
                                    <Minus className="text-primary-600 flex-shrink-0" size={20} />
                                ) : (
                                    <Plus className="text-gray-400 flex-shrink-0" size={20} />
                                )}
                            </button>

                            <div
                                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-48 opacity-100 pb-6' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <p className="text-gray-600 leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact Support */}
                <div className="mt-12 text-center">
                    <p className="text-gray-600">
                        Still have questions? <a href="/contact" className="text-primary-600 font-semibold hover:underline">Contact our support</a>
                    </p>
                </div>

            </div>
        </div>
    );
}
