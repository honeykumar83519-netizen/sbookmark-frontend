import { Link } from 'react-router-dom';
import { useGetBlogsQuery } from '../store/apiSlice';
import { Hash, FileText, ChevronRight } from 'lucide-react';
import { BACKEND_URL } from '../config';

const POPULAR_TAGS = [
    'programming', 'javascript', 'react', 'web-design', 'startup', 'productivity', 'ai', 'crypto'
];

export default function Sidebar() {
    const { data: blogsData, isLoading } = useGetBlogsQuery({ limit: 5 });

    // Get latest 5 blogs
    const latestBlogs = blogsData?.data || [];

    return (
        <aside className="space-y-8">
            {/* Latest Blogs Widget */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2 border-b border-gray-100 pb-3">
                    <FileText size={20} className="text-primary-600" />
                    Latest Articles
                </h3>

                {isLoading ? (
                    <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="animate-pulse flex gap-3">
                                <div className="w-16 h-16 bg-gray-200 rounded-md"></div>
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-5">
                        {latestBlogs.length > 0 ? (
                            latestBlogs.map(blog => (
                                <Link to={`/blog/${blog._id}`} key={blog._id} className="group flex gap-3 items-start">
                                    <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                                        <img
                                            src={blog.image.startsWith('/uploads/')
                                                ? `${BACKEND_URL}${blog.image}`
                                                : blog.image
                                            }
                                            alt={blog.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2 mb-1">
                                            {blog.title}
                                        </h4>
                                        <p className="text-xs text-gray-500">
                                            {new Date(blog.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </p>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500">No blogs posted yet.</p>
                        )}
                    </div>
                )}

                <div className="mt-5 pt-4 border-t border-gray-100 text-center">
                    <Link to="/blog" className="text-sm font-semibold text-primary-600 hover:text-primary-700 flex items-center justify-center gap-1">
                        View All Posts <ChevronRight size={16} />
                    </Link>
                </div>
            </div>

            {/* Tags Widget */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2 border-b border-gray-100 pb-3">
                    <Hash size={20} className="text-primary-600" />
                    Popular Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                    {POPULAR_TAGS.map(tag => (
                        <Link
                            key={tag}
                            to={`/blog?tag=${tag}`}
                            className="text-xs font-medium px-3 py-1.5 bg-gray-50 text-gray-600 rounded-full border border-gray-100 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-100 transition-all"
                        >
                            #{tag}
                        </Link>
                    ))}
                </div>
            </div>
        </aside>
    );
}
