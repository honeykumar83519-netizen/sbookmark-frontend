import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import { useGetBlogByIdQuery, useGetBlogsQuery } from '../store/apiSlice';
import { BACKEND_URL } from '../config';

export default function BlogPost() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: post, isLoading } = useGetBlogByIdQuery(id || '');

    // Fetch related posts (limit 4 to ensure we have enough after filtering current)
    const { data: blogsData } = useGetBlogsQuery({ limit: 4 });
    const relatedPosts = blogsData?.data.filter(b => b._id !== post?._id).slice(0, 3) || [];

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-pulse space-y-4 w-full max-w-2xl px-4">
                    <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto"></div>
                    <div className="h-64 bg-gray-200 rounded-xl w-full"></div>
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Post not found</h2>
                    <p className="text-gray-600 mb-6">The article you are looking for does not exist.</p>
                    <Link to="/blog" className="text-primary-600 hover:text-primary-700 font-semibold flex items-center justify-center gap-2">
                        <ArrowLeft size={20} /> Back to Blog
                    </Link>
                </div>
            </div>
        );
    }

    return (

        <div className="min-h-screen bg-white pb-16 md:pb-24 font-sans selection:bg-primary-100 selection:text-primary-900">
            {/* Top Navigation / Back Button */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 md:pt-8 pb-4">
                <button
                    onClick={() => navigate('/blog')}
                    className="group flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                >
                    <div className="p-2 rounded-full group-hover:bg-gray-100 transition-colors">
                        <ArrowLeft size={18} className="translate-x-0 group-hover:-translate-x-1 transition-transform" />
                    </div>
                    <span>Back to all posts</span>
                </button>
            </div>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-4 md:pt-8">
                {/* Header */}
                <header className="mb-10 md:mb-14 text-center md:text-left">
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-6">
                        <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-semibold">
                            {post.category}
                        </span>
                        <span className="text-gray-500 text-sm flex items-center gap-1">
                            <Clock size={16} /> 5 min read
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-8 leading-tight tracking-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center justify-center md:justify-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-xl font-bold text-primary-700">
                            {post.author.charAt(0)}
                        </div>
                        <div className="text-left">
                            <p className="font-bold text-gray-900">{post.author}</p>
                            <p className="text-sm text-gray-500">
                                {new Date(post.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                            </p>
                        </div>
                    </div>
                </header>

                {/* Hero Image */}
                <figure className="mb-16 -mx-4 sm:mx-0">
                    <img
                        src={post.image.startsWith('/uploads/')
                            ? `${BACKEND_URL}${post.image}`
                            : post.image
                        }
                        alt={post.title}
                        className="w-full h-auto md:h-[500px] object-cover sm:rounded-2xl shadow-sm"
                    />
                </figure>


                {/* Content Body */}
                <article className="prose prose-lg md:prose-xl prose-slate max-w-none mx-auto text-gray-800 leading-relaxed prose-headings:font-bold prose-headings:text-gray-900 prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl overflow-hidden break-words">
                    <div className="overflow-x-auto" dangerouslySetInnerHTML={{ __html: post.content }} />
                </article>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                    <div className="mt-16 pt-8 border-t border-gray-100">
                        <div className="flex flex-wrap gap-2 text-center justify-center md:justify-start">
                            {post.tags.map((tag) => (
                                <Link
                                    key={tag}
                                    to={`/blog?tag=${tag}`}
                                    className="px-4 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-full text-sm font-medium transition-colors"
                                >
                                    #{tag}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}


                {/* Author Box */}
                <div className="mt-16 bg-gray-50 rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary-100 flex items-center justify-center text-2xl sm:text-3xl font-bold text-primary-700 shrink-0">
                        {post.author.charAt(0)}
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{post.author}</h3>
                        <p className="text-gray-600">
                            Senior Editor at SBookmark. Sharing insights on digital bookmarking and link management.
                        </p>
                    </div>
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <section className="mt-16 pt-16 border-t border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Posts</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedPosts.map((relatedPost) => (
                                <Link
                                    key={relatedPost._id}
                                    to={`/blog/${relatedPost._id}`}
                                    className="group"
                                >
                                    <div className="aspect-video overflow-hidden rounded-lg mb-4">
                                        <img
                                            src={relatedPost.image.startsWith('/uploads/')
                                                ? `${BACKEND_URL}${relatedPost.image}`
                                                : relatedPost.image
                                            }
                                            alt={relatedPost.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <h3 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                                        {relatedPost.title}
                                    </h3>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}

