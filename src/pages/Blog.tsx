import { useState } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGetBlogsQuery } from '../store/apiSlice';
import Sidebar from '../components/Sidebar';
import Pagination from '../components/Pagination';
import { BACKEND_URL } from '../config';

export default function Blog() {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const { data: blogsData, isLoading } = useGetBlogsQuery({ page, limit: 12 });

    if (isLoading) {
        return <div className="text-center py-24">Loading articles...</div>;
    }

    const blogs = blogsData?.data || [];

    return (
        <div className="min-h-screen bg-gray-50 py-8 md:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Main Content */}
                    <main className="lg:col-span-3">
                        {/* Header */}
                        <div className="mb-8 text-center sm:text-left">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                                Latest Updates & Stories
                            </h1>
                            <p className="text-lg text-gray-600 max-w-2xl">
                                Insights, tutorials, and news from the SBoookmark team and community.
                            </p>
                        </div>

                        {/* Blog Grid */}
                        <div className="grid gap-6 sm:grid-cols-2">
                            {blogs && blogs.map((post) => (
                                <article key={post._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group flex flex-col h-full">
                                    {/* Image */}
                                    <div className="h-48 sm:h-56 overflow-hidden bg-gray-100 relative shrink-0">
                                        <img
                                            src={post.image.startsWith('/uploads/')
                                                ? `${BACKEND_URL}${post.image}`
                                                : post.image
                                            }
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-primary-600">
                                            {post.category}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5 sm:p-6 flex flex-col flex-1">
                                        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                                            <div className="flex items-center gap-1">
                                                <Calendar size={14} />
                                                {new Date(post.createdAt).toLocaleDateString()}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-[10px] font-bold">
                                                    {post.author.charAt(0)}
                                                </div>
                                                <span>{post.author}</span>
                                            </div>
                                        </div>

                                        <h2
                                            onClick={() => navigate(`/blog/${post._id}`)}
                                            className="text-lg sm:text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-primary-600 transition-colors cursor-pointer"
                                        >
                                            {post.title}
                                        </h2>

                                        <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed flex-1">
                                            {post.excerpt}
                                        </p>

                                        <button
                                            onClick={() => navigate(`/blog/${post._id}`)}
                                            className="text-primary-600 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all mt-auto w-fit"
                                        >
                                            Read More <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </article>
                            ))}
                            {blogs?.length === 0 && (
                                <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-dashed border-gray-200 text-gray-500">
                                    No posts yet. Check back later!
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {blogsData?.pagination && blogsData.pagination.pages > 1 && (
                            <div className="mt-12">
                                <Pagination
                                    currentPage={blogsData.pagination.page}
                                    totalPages={blogsData.pagination.pages}
                                    onPageChange={setPage}
                                    totalItems={blogsData.pagination.total}
                                    itemsPerPage={blogsData.pagination.limit}
                                />
                            </div>
                        )}
                    </main>

                    {/* Sidebar */}
                    <aside className="lg:col-span-1 mt-12 lg:mt-0">
                        <div className="lg:sticky lg:top-24 max-h-none lg:max-h-[calc(100vh-8rem)] overflow-y-visible lg:overflow-y-auto pr-0 lg:pr-2 custom-scrollbar">
                            <Sidebar />
                        </div>
                    </aside>
                </div>
            </div>
        </div>

    );
}
