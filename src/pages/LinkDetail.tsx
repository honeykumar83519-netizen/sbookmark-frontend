import { useParams } from 'react-router-dom';
import { useGetLinkByIdQuery, useGetCommentsByLinkQuery, useCreateCommentMutation } from '../store/apiSlice';
import { ArrowUp, ExternalLink, Loader, MessageCircle } from 'lucide-react';
import { useToggleUpvoteMutation } from '../store/apiSlice';
import { useAppSelector } from '../hooks/reduxHooks';
import { formatDistanceToNow } from '../utils/dateUtils';
import { useState } from 'react';
import SEO from '../components/SEO';

export default function LinkDetail() {
    const { id } = useParams<{ id: string }>();
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);
    const { data: linkData, isLoading: linkLoading } = useGetLinkByIdQuery(id!);
    const { data: commentsData, isLoading: commentsLoading } = useGetCommentsByLinkQuery(id!);
    const [toggleUpvote] = useToggleUpvoteMutation();
    const [createComment] = useCreateCommentMutation();
    const [commentText, setCommentText] = useState('');

    if (linkLoading) {
        return (
            <div className="flex justify-center py-12">
                <Loader className="animate-spin text-primary-600" size={40} />
            </div>
        );
    }

    if (!linkData) {
        return <div className="text-center py-12">Link not found</div>;
    }

    const link = linkData.data;
    const hasUpvoted = user ? link.upvotes.includes(user.id) : false;

    const handleUpvote = async () => {
        if (!isAuthenticated) {
            alert('Please login to upvote');
            return;
        }
        try {
            await toggleUpvote(link._id).unwrap();
        } catch (error) {
            console.error('Failed to upvote:', error);
        }
    };

    const handleSubmitComment = async (parentCommentId?: string) => {
        if (!isAuthenticated) {
            alert('Please login to comment');
            return;
        }
        if (!commentText.trim()) return;

        try {
            await createComment({
                content: commentText,
                linkId: id!,
                parentCommentId,
            }).unwrap();
            setCommentText('');
        } catch (error) {
            console.error('Failed to post comment:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
            <SEO title={link.title} description={link.description || link.title} />
            <div className="max-w-4xl mx-auto px-3 sm:px-4">
                {/* Main Link Card - Matching Homepage Design */}
                <div className="card hover:shadow-lg transition-all overflow-hidden mb-6 sm:mb-8">
                    {/* Hero Image */}
                    {link.imageUrl && (
                        <div className="w-full h-56 sm:h-72 md:h-96 overflow-hidden bg-gray-100">
                            <img
                                src={link.imageUrl}
                                alt={link.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.currentTarget.parentElement!.style.display = 'none';
                                }}
                            />
                        </div>
                    )}

                    {/* Content */}
                    <div className="p-4 sm:p-6 md:p-8">
                        {/* Site Name */}
                        <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs sm:text-sm font-semibold text-primary-600 hover:text-primary-700 uppercase tracking-wide mb-2 sm:mb-3 flex items-center gap-2 group"
                        >
                            {new URL(link.url).hostname.replace('www.', '')}
                            <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
                        </a>

                        {/* Title - Now links to external URL */}
                        <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block"
                        >
                            <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-900 hover:text-primary-600 transition-colors mb-3 sm:mb-4 leading-tight">
                                {link.title}
                            </h1>
                        </a>

                        {/* Description */}
                        {link.description && (
                            <div className="mb-4 sm:mb-6 p-4 sm:p-5 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-gray-200">
                                <p className="text-gray-800 text-sm sm:text-base md:text-lg leading-relaxed whitespace-pre-wrap">
                                    {link.description}
                                </p>
                            </div>
                        )}

                        {/* Bottom Bar - Matching Homepage */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-t border-b border-gray-100 mb-4 gap-4 sm:gap-0">
                            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm text-gray-500">
                                {/* Upvotes */}
                                <button
                                    onClick={handleUpvote}
                                    className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors font-semibold ${hasUpvoted
                                        ? 'bg-primary-100 text-primary-600'
                                        : 'hover:bg-gray-100'
                                        }`}
                                    disabled={!isAuthenticated}
                                >
                                    <ArrowUp size={18} className="sm:w-5 sm:h-5" />
                                    <span className="text-sm sm:text-base">{link.upvoteCount}</span>
                                </button>

                                {/* Comments */}
                                <div className="flex items-center gap-2">
                                    <MessageCircle size={18} className="sm:w-5 sm:h-5" />
                                    <span className="text-sm sm:text-base">{link.commentCount} comments</span>
                                </div>

                                {/* Category Badge */}
                                <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-primary-500 text-white rounded-full text-xs sm:text-sm font-medium">
                                    {link.category}
                                </span>
                            </div>

                            {/* Author & Time */}
                            <div className="flex items-center gap-2 text-sm sm:ml-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                                <span className="text-gray-400">{formatDistanceToNow(link.createdAt)}</span>
                                <span className="text-gray-400">by</span>
                                <span className="font-medium text-gray-700">
                                    @{link.author.username}
                                </span>
                            </div>
                        </div>

                        {/* Tags */}
                        {link.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                                {link.tags.map((tag, idx) => (
                                    <span
                                        key={idx}
                                        className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm hover:bg-gray-200 transition-colors"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Comments Section */}
                <div className="card p-4 sm:p-6 md:p-8">
                    <div className="flex items-center gap-2 mb-4 sm:mb-6">
                        <MessageCircle size={20} className="text-gray-600 sm:w-6 sm:h-6" />
                        <h2 className="text-xl sm:text-2xl font-bold">{link.commentCount} Comments</h2>
                    </div>

                    {isAuthenticated && (
                        <div className="mb-6">
                            <textarea
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                className="input text-sm sm:text-base"
                                rows={3}
                                placeholder="Add a comment..."
                            />
                            <button
                                onClick={() => handleSubmitComment()}
                                className="btn btn-primary mt-2 text-sm sm:text-base py-2"
                            >
                                Post Comment
                            </button>
                        </div>
                    )}

                    {commentsLoading ? (
                        <div className="flex justify-center py-8">
                            <Loader className="animate-spin text-primary-600" size={32} />
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {commentsData?.data.map((comment) => (
                                <div key={comment._id} className="border-l-2 border-gray-200 pl-3 sm:pl-4">
                                    <div className="flex items-start gap-3">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="font-medium text-gray-900 text-sm sm:text-base">
                                                    {comment.author.username}
                                                </span>
                                                <span className="text-xs sm:text-sm text-gray-500">
                                                    {formatDistanceToNow(comment.createdAt)}
                                                </span>
                                            </div>
                                            <p className="text-gray-700 text-sm sm:text-base">{comment.content}</p>

                                            {comment.replies && comment.replies.length > 0 && (
                                                <div className="mt-4 space-y-3 ml-2 sm:ml-6">
                                                    {comment.replies.map((reply) => (
                                                        <div key={reply._id} className="border-l-2 border-gray-100 pl-3 sm:pl-4">
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <span className="font-medium text-gray-900 text-xs sm:text-sm">
                                                                    {reply.author.username}
                                                                </span>
                                                                <span className="text-[10px] sm:text-xs text-gray-500">
                                                                    {formatDistanceToNow(reply.createdAt)}
                                                                </span>
                                                            </div>
                                                            <p className="text-gray-700 text-xs sm:text-sm">{reply.content}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {commentsData?.data.length === 0 && (
                                <p className="text-center text-gray-500 py-8 text-sm sm:text-base">
                                    No comments yet. Be the first to comment!
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
