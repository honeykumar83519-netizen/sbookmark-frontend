import { Link } from 'react-router-dom';
import { ArrowUp, MessageCircle } from 'lucide-react';
import type { Link as LinkType } from '../types';
import { useToggleUpvoteMutation } from '../store/apiSlice';
import { useAppSelector } from '../hooks/reduxHooks';
import { formatDistanceToNow } from '../utils/dateUtils';

interface LinkCardProps {
    link: LinkType;
}

export default function LinkCard({ link }: LinkCardProps) {
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);
    const [toggleUpvote] = useToggleUpvoteMutation();

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

    return (
        <div className="card hover:shadow-lg transition-all overflow-hidden">
            {/* Hero Image */}
            {link.imageUrl && (
                <div className="w-full h-48 sm:h-56 md:h-64 overflow-hidden bg-gray-100">
                    <img
                        src={link.imageUrl}
                        alt={link.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                            e.currentTarget.parentElement!.style.display = 'none';
                        }}
                    />
                </div>
            )}

            {/* Content */}
            <div className="p-4 sm:p-5 md:p-6">
                {/* Site Name */}
                <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm font-semibold text-primary-600 hover:text-primary-700 uppercase tracking-wide mb-2 block"
                >
                    {new URL(link.url).hostname.replace('www.', '')}
                </a>

                {/* Title */}
                <Link
                    to={`/links/${link._id}`}
                    className="block mb-2 sm:mb-3"
                >
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 hover:text-primary-600 transition-colors line-clamp-2 leading-tight">
                        {link.title}
                    </h2>
                </Link>

                {/* Description */}
                {link.description && (
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3">
                        {link.description}
                    </p>
                )}

                {/* Bottom Bar */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-100">
                    {/* Upvotes */}
                    <button
                        onClick={handleUpvote}
                        className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg transition-colors text-sm ${hasUpvoted
                            ? 'bg-primary-100 text-primary-600'
                            : 'hover:bg-gray-100'
                            }`}
                        disabled={!isAuthenticated}
                    >
                        <ArrowUp size={16} className="sm:w-[18px] sm:h-[18px]" />
                        <span className="font-semibold">{link.upvoteCount}</span>
                    </button>

                    {/* Comments */}
                    <Link
                        to={`/links/${link._id}`}
                        className="flex items-center gap-1 sm:gap-1.5 text-sm text-gray-500 hover:text-primary-600 transition-colors"
                    >
                        <MessageCircle size={16} className="sm:w-[18px] sm:h-[18px]" />
                        <span>{link.commentCount}</span>
                    </Link>

                    {/* Category Badge */}
                    <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-primary-500 text-white rounded-full text-xs font-medium">
                        {link.category}
                    </span>

                    {/* Author & Time - Hidden on mobile, shown on larger screens */}
                    <div className="hidden sm:flex items-center gap-2 ml-auto text-sm text-gray-500">
                        <span className="text-gray-400">{formatDistanceToNow(link.createdAt)}</span>
                        <span className="text-gray-400">by</span>
                        <Link
                            to={`/profile/${link.author._id}`}
                            className="font-medium text-gray-700 hover:text-primary-600"
                        >
                            @{link.author.username}
                        </Link>
                    </div>
                </div>

                {/* Tags */}
                {link.tags.length > 0 && (
                    <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap mt-2 sm:mt-3">
                        {link.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="text-xs px-2 py-0.5 sm:py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
