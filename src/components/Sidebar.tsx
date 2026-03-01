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
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-3 border-b border-gray-50 pb-4">
                    <div className="p-1.5 bg-primary-50 rounded-lg text-primary-600">
                        <FileText size={20} />
                    </div>
                    Latest Articles
                </h3>

                {isLoading ? (
                    <div className="space-y-6">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="animate-pulse flex gap-4">
                                <div className="w-16 h-16 bg-gray-100 rounded-xl"></div>
                                <div className="flex-1 space-y-3 py-1">
                                    <div className="h-4 bg-gray-100 rounded w-full"></div>
                                    <div className="h-4 bg-gray-100 rounded w-2/3"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-6">
                        {latestBlogs.length > 0 ? (
                            latestBlogs.map(blog => (
                                <Link to={`/blog/${blog.slug || blog._id}`} key={blog._id} className="group flex gap-4 items-start focus:outline-none">
                                    <div className="flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden bg-gray-100 ring-1 ring-gray-100 group-hover:ring-primary-100 transition-all shadow-sm">
                                        <img
                                            src={blog.image.startsWith('/uploads/')
                                                ? `${BACKEND_URL}${blog.image}`
                                                : blog.image
                                            }
                                            alt={blog.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0 pt-0.5">
                                        <h4 className="text-sm font-bold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2 leading-snug mb-2">
                                            {blog.title}
                                        </h4>
                                        <div className="flex items-center text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                                            {new Date(blog.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p className="text-sm text-gray-400 py-4 text-center font-medium">No articles yet.</p>
                        )}
                    </div>
                )}

                <div className="mt-8 pt-6 border-t border-gray-50">
                    <Link to="/blog" className="text-sm font-black text-primary-600 hover:text-primary-700 flex items-center justify-center gap-2 group transition-all">
                        <span>VIEW ALL ARTICLES</span>
                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>

            {/* Tags Widget */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-3 border-b border-gray-50 pb-4">
                    <div className="p-1.5 bg-primary-50 rounded-lg text-primary-600">
                        <Hash size={20} />
                    </div>
                    Popular Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                    {POPULAR_TAGS.map(tag => (
                        <Link
                            key={tag}
                            to={`/blog?tag=${tag}`}
                            className="text-[11px] font-black uppercase tracking-widest px-4 py-2 bg-gray-50 text-gray-500 rounded-xl hover:bg-primary-600 hover:text-white hover:shadow-lg hover:shadow-primary-500/30 transition-all border border-transparent"
                        >
                            #{tag}
                        </Link>
                    ))}
                </div>
            </div>

        </aside>
    );
}
