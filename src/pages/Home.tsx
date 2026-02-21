import { useState, useEffect } from 'react';
import { useGetLinksQuery } from '../store/apiSlice';
import LinkCard from '../components/LinkCard';
import Sidebar from '../components/Sidebar';
import Pagination from '../components/Pagination';
import { Loader, ChevronDown, Check } from 'lucide-react';
import type { LinkSortType, CategoryType } from '../types';

const CATEGORIES: CategoryType[] = [
    'Technology',
    'Design',
    'Business',
    'Science',
    'Entertainment',
    'Health',
    'Education',
    'Other',
];

export default function Home() {
    const [sort, setSort] = useState<LinkSortType>('latest');
    const [category, setCategory] = useState<string>('');
    const [page, setPage] = useState(1);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Reset to page 1 when sort or category changes
    useEffect(() => {
        setPage(1);
    }, [sort, category]);

    const { data, isLoading, error } = useGetLinksQuery({
        sort,
        category: category || undefined,
        page,
        limit: 20,
    });

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Main Content */}
                    <main className="lg:col-span-3">
                        <div className="mb-8 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                                Discover & Share Links
                            </h1>
                            <p className="text-gray-600">
                                Community-curated collection of the best links on the web
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                                <button
                                    onClick={() => setSort('latest')}
                                    className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${sort === 'latest'
                                        ? 'bg-primary-600 text-white shadow-md ring-2 ring-primary-100'
                                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                                        }`}
                                >
                                    Latest
                                </button>
                                <button
                                    onClick={() => setSort('trending')}
                                    className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${sort === 'trending'
                                        ? 'bg-primary-600 text-white shadow-md ring-2 ring-primary-100'
                                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                                        }`}
                                >
                                    Trending
                                </button>
                                <button
                                    onClick={() => setSort('top')}
                                    className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${sort === 'top'
                                        ? 'bg-primary-600 text-white shadow-md ring-2 ring-primary-100'
                                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                                        }`}
                                >
                                    Top
                                </button>
                            </div>

                            <div className="relative w-full sm:w-64">
                                {/* Dropdown Trigger */}
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="w-full flex items-center justify-between px-4 py-2.5 bg-white border border-gray-300 rounded-lg shadow-sm text-sm sm:text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                >
                                    <span className="truncate">{category || 'All Categories'}</span>
                                    <ChevronDown
                                        size={18}
                                        className={`text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                                    />
                                </button>

                                {/* Dropdown Menu */}
                                {isDropdownOpen && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-10"
                                            onClick={() => setIsDropdownOpen(false)}
                                        />
                                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-20 max-h-60 overflow-y-auto w-full py-1">
                                            <button
                                                className={`w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-gray-50 transition-colors text-sm sm:text-base ${category === '' ? 'text-primary-600 bg-primary-50 font-medium' : 'text-gray-700'
                                                    }`}
                                                onClick={() => {
                                                    setCategory('');
                                                    setIsDropdownOpen(false);
                                                }}
                                            >
                                                <span>All Categories</span>
                                                {category === '' && <Check size={16} />}
                                            </button>
                                            {CATEGORIES.map((cat) => (
                                                <button
                                                    key={cat}
                                                    className={`w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-gray-50 transition-colors text-sm sm:text-base ${category === cat ? 'text-primary-600 bg-primary-50 font-medium' : 'text-gray-700'
                                                        }`}
                                                    onClick={() => {
                                                        setCategory(cat);
                                                        setIsDropdownOpen(false);
                                                    }}
                                                >
                                                    <span className="truncate">{cat}</span>
                                                    {category === cat && <Check size={16} />}
                                                </button>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {isLoading && (
                            <div className="flex justify-center py-12">
                                <Loader className="animate-spin text-primary-600" size={32} />
                            </div>
                        )}

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm sm:text-base">
                                Failed to load links. Please try again.
                            </div>
                        )}

                        {data && (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                    {data.data.links.map((link) => (
                                        <LinkCard key={link._id} link={link} />
                                    ))}
                                </div>

                                {data.data.links.length === 0 && (
                                    <div className="text-center py-12 text-gray-500 text-sm sm:text-base">
                                        No links found. Be the first to submit one!
                                    </div>
                                )}
                            </>
                        )}

                        {/* Pagination */}
                        {data && data.data.pagination.pages > 1 && (
                            <div className="mt-8">
                                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                                    <Pagination
                                        currentPage={data.data.pagination.page}
                                        totalPages={data.data.pagination.pages}
                                        onPageChange={setPage}
                                        totalItems={data.data.pagination.total}
                                        itemsPerPage={data.data.pagination.limit}
                                    />
                                </div>
                            </div>
                        )}
                    </main>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-28">
                            <Sidebar />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
