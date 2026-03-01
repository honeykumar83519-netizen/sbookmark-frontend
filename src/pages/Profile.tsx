import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetUserProfileQuery, useGetUserLinksQuery } from '../store/apiSlice';
import { Loader, Link as LinkIcon, MessageCircle, ArrowUp, User as UserIcon, Edit } from 'lucide-react';
import LinkCard from '../components/LinkCard';
import Pagination from '../components/Pagination';
import EditProfileModal from '../components/EditProfileModal';
import { useAppSelector } from '../hooks/reduxHooks';
import { BACKEND_URL } from '../config';
import SEO from '../components/SEO';

export default function Profile() {
    const { id } = useParams<{ id: string }>();
    const currentUser = useAppSelector((state) => state.auth.user);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [page, setPage] = useState(1);

    const { data: profileData, isLoading: profileLoading } = useGetUserProfileQuery(id!);
    const { data: linksData, isLoading: linksLoading } = useGetUserLinksQuery({ userId: id!, page, limit: 10 });

    if (profileLoading) {
        return (
            <div className="flex justify-center py-12">
                <Loader className="animate-spin text-primary-600" size={40} />
            </div>
        );
    }

    if (!profileData) {
        return <div className="text-center py-12">User not found</div>;
    }

    const { user, stats } = profileData.data;

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <SEO title={`${user.username}'s Profile`} description={`Profile page for ${user.username} on SBookmark.`} />
            <div className="max-w-5xl mx-auto px-4">
                <div className="card mb-6 sm:mb-8 p-4 sm:p-6 md:p-8">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left">
                        <div className="flex-shrink-0">
                            {user.avatar ? (
                                <img
                                    src={user.avatar.startsWith('/uploads/')
                                        ? `${BACKEND_URL}${user.avatar}`
                                        : user.avatar
                                    }
                                    alt={user.username}
                                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-white shadow-sm"
                                />
                            ) : (
                                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center border-4 border-white shadow-sm">
                                    <UserIcon size={40} className="text-primary-600 sm:w-12 sm:h-12" />
                                </div>
                            )}
                        </div>

                        <div className="flex-1 w-full">
                            <div className="flex flex-col sm:flex-row items-center justify-between mb-2 gap-2 sm:gap-0">
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{user.username}</h1>
                                {currentUser?.id === user.id && (
                                    <button
                                        onClick={() => setIsEditModalOpen(true)}
                                        className="btn btn-secondary flex items-center gap-2 text-sm px-3 py-1.5"
                                    >
                                        <Edit size={16} />
                                        Edit Profile
                                    </button>
                                )}
                            </div>
                            {user.bio && <p className="text-gray-600 mb-4 text-sm sm:text-base max-w-2xl mx-auto sm:mx-0">{user.bio}</p>}

                            <div className="flex justify-center sm:justify-start gap-4 sm:gap-6 border-t sm:border-t-0 border-gray-100 pt-4 sm:pt-0 w-full">
                                <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                                    <LinkIcon size={18} className="text-gray-400 sm:w-5 sm:h-5" />
                                    <span className="text-lg font-semibold text-gray-700">
                                        {stats.linksSubmitted}
                                    </span>
                                    <span className="text-xs sm:text-sm text-gray-500">Links</span>
                                </div>

                                <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                                    <ArrowUp size={18} className="text-gray-400 sm:w-5 sm:h-5" />
                                    <span className="text-lg font-semibold text-gray-700">
                                        {stats.totalUpvotes}
                                    </span>
                                    <span className="text-xs sm:text-sm text-gray-500">Upvotes</span>
                                </div>

                                <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                                    <MessageCircle size={18} className="text-gray-400 sm:w-5 sm:h-5" />
                                    <span className="text-lg font-semibold text-gray-700">
                                        {stats.commentsPosted}
                                    </span>
                                    <span className="text-xs sm:text-sm text-gray-500">Comments</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-bold mb-4">Submitted Links</h2>

                    {linksLoading ? (
                        <div className="flex justify-center py-12">
                            <Loader className="animate-spin text-primary-600" size={32} />
                        </div>
                    ) : linksData && linksData.data.links.length > 0 ? (
                        <>
                            <div className="space-y-4">
                                {linksData.data.links.map((link) => (
                                    <LinkCard key={link._id} link={link} />
                                ))}
                            </div>

                            {linksData.data.pagination.pages > 1 && (
                                <div className="mt-8">
                                    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                                        <Pagination
                                            currentPage={linksData.data.pagination.page}
                                            totalPages={linksData.data.pagination.pages}
                                            onPageChange={setPage}
                                            totalItems={linksData.data.pagination.total}
                                            itemsPerPage={linksData.data.pagination.limit}
                                        />
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="card text-center text-gray-500 py-12">
                            No links submitted yet
                        </div>
                    )}
                </div>

                {/* Edit Profile Modal */}
                <EditProfileModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                />
            </div>
        </div>
    );
}
