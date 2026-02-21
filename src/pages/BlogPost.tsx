import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock, Share2, Twitter, Facebook, Linkedin } from 'lucide-react';
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

    const shareUrl = window.location.href;

    return (
        <div className="min-h-screen bg-white pb-24 font-sans selection:bg-primary-100 selection:text-primary-900">
            {/* Top Navigation / Back Button */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-4">
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
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-6">
                        <span className="px-3 py-1 bg-primary-50 text-primary-700 rounded-lg text-xs font-bold uppercase tracking-wider border border-primary-100">
                            {post.category}
                        </span>
                        <span className="text-gray-400 text-sm flex items-center gap-1.5 font-medium">
                            <span className="w-1 h-1 rounded-full bg-gray-300" />
                            <Clock size={14} /> 5 min read
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-8 leading-tight tracking-tight text-balance">
                        {post.title}
                    </h1>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-gray-100 pb-8">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center text-xl font-bold text-primary-700 shadow-inner ring-2 ring-white">
                                    {post.author.charAt(0)}
                                </div>
                                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                                    <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-white" />
                                </div>
                            </div>
                            <div className="text-left">
                                <p className="font-bold text-gray-900 text-base leading-none mb-1.5">{post.author}</p>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <span>{new Date(post.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                    <span className="w-0.5 h-0.5 rounded-full bg-gray-400"></span>
                                    <span>Contributor</span>
                                </div>
                            </div>
                        </div>

                        {/* Top Share Actions */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => window.open(`https://twitter.com/intent/tweet?url=${shareUrl}&text=${post.title}`, '_blank')}
                                className="p-2.5 text-gray-400 hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10 rounded-full transition-colors"
                                aria-label="Share on Twitter"
                            >
                                <Twitter size={20} />
                            </button>
                            <button
                                onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank')}
                                className="p-2.5 text-gray-400 hover:text-[#4267B2] hover:bg-[#4267B2]/10 rounded-full transition-colors"
                                aria-label="Share on Facebook"
                            >
                                <Facebook size={20} />
                            </button>
                            <button
                                onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`, '_blank')}
                                className="p-2.5 text-gray-400 hover:text-[#0A66C2] hover:bg-[#0A66C2]/10 rounded-full transition-colors"
                                aria-label="Share on LinkedIn"
                            >
                                <Linkedin size={20} />
                            </button>
                            <div className="w-px h-6 bg-gray-200 mx-1" />
                            <button className="p-2.5 text-gray-400 hover:text-gray-900 rounded-full transition-colors">
                                <Share2 size={20} />
                            </button>
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
                    <figcaption className="text-center text-gray-400 text-xs sm:text-sm mt-3 font-medium">
                        Featured image for {post.title}
                    </figcaption>
                </figure>

                {/* Content Body */}
                <article className="prose prose-lg md:prose-xl prose-slate max-w-none mx-auto text-gray-800 leading-relaxed prose-headings:font-bold prose-headings:text-gray-900 prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl">
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </article>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                    <div className="mt-16 pt-8 border-t border-gray-100">
                        <div className="flex flex-wrap gap-2.5">
                            {post.tags.map((tag) => (
                                <Link
                                    key={tag}
                                    to={`/blog?tag=${tag}`}
                                    className="px-4 py-2 bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-full text-sm font-medium transition-colors"
                                >
                                    #{tag}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Minimal Author Box */}
                <div className="mt-16 bg-gray-50 rounded-2xl p-8 flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
                    <div className="flex-shrink-0">
                        <div className="w-20 h-20 rounded-full bg-white border-4 border-white shadow-sm flex items-center justify-center text-3xl font-bold text-gray-400 overflow-hidden">
                            {post.author.charAt(0)}
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="flex flex-col md:flex-row items-center md:items-baseline justify-between gap-2 mb-2">
                            <h3 className="text-xl font-bold text-gray-900">{post.author}</h3>
                            <Link to="/blog" className="text-primary-600 text-sm font-semibold hover:underline">View Profile</Link>
                        </div>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Senior Editor at LinkHive. Covers the latest in web development, design trends, and digital innovation. Always exploring new technologies and sharing insights with the community.
                        </p>
                    </div>
                </div>
            </main>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <section className="mt-24 pt-16 pb-12 bg-gray-50/50 border-t border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6">
                        <div className="flex items-center justify-between mb-10">
                            <h2 className="text-2xl font-bold text-gray-900">Read Next</h2>
                            <Link to="/blog" className="group flex items-center gap-1 text-sm font-semibold text-gray-600 hover:text-primary-600 transition-colors">
                                See all <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {relatedPosts.map((relatedPost) => (
                                <Link
                                    key={relatedPost._id}
                                    to={`/blog/${relatedPost._id}`}
                                    className="group block"
                                >
                                    <div className="aspect-[16/10] overflow-hidden rounded-xl bg-gray-200 mb-4 shadow-sm">
                                        <img
                                            src={relatedPost.image.startsWith('/uploads/')
                                                ? `${BACKEND_URL}${relatedPost.image}`
                                                : relatedPost.image
                                            }
                                            alt={relatedPost.title}
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 text-xs font-semibold text-primary-600 uppercase tracking-wide mb-2">
                                            {relatedPost.category}
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-primary-600 transition-colors">
                                            {relatedPost.title}
                                        </h3>
                                        <p className="text-gray-500 text-sm line-clamp-2">
                                            {relatedPost.excerpt}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
