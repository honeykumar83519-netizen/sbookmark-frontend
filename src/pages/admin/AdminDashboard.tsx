import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetBlogsQuery, useDeleteBlogMutation, useGetAllUsersQuery, useToggleUserStatusMutation } from '../../store/apiSlice';
import { Plus, Trash2, Users, FileText, Search } from 'lucide-react';
import AdminNavbar from '../../components/AdminNavbar';
import ConfirmModal from '../../components/ConfirmModal';
import Pagination from '../../components/Pagination';
import type { User } from '../../types';
import { BACKEND_URL } from '../../config';
import SEO from '../../components/SEO';

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'users' | 'blogs'>('users');

    // Users pagination and filters
    const [usersPage, setUsersPage] = useState(1);
    const [usersSearch, setUsersSearch] = useState('');
    const [usersSearchInput, setUsersSearchInput] = useState('');
    const [usersRole, setUsersRole] = useState('');
    const [usersStatus, setUsersStatus] = useState('');

    // Blogs pagination and filters
    const [blogsPage, setBlogsPage] = useState(1);
    const [blogsSearch, setBlogsSearch] = useState('');
    const [blogsSearchInput, setBlogsSearchInput] = useState('');
    const [blogsCategory, setBlogsCategory] = useState('');

    // Debounce search inputs
    useEffect(() => {
        const timer = setTimeout(() => {
            setUsersSearch(usersSearchInput);
            setUsersPage(1); // Reset to first page on search
        }, 500);
        return () => clearTimeout(timer);
    }, [usersSearchInput]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setBlogsSearch(blogsSearchInput);
            setBlogsPage(1); // Reset to first page on search
        }, 500);
        return () => clearTimeout(timer);
    }, [blogsSearchInput]);

    // Confirmation modal states
    const [confirmModal, setConfirmModal] = useState<{
        isOpen: boolean;
        title: string;
        message: string;
        confirmText: string;
        variant: 'danger' | 'warning' | 'info';
        onConfirm: () => void;
    }>({
        isOpen: false,
        title: '',
        message: '',
        confirmText: 'Confirm',
        variant: 'danger',
        onConfirm: () => { },
    });

    // Error/Success notification
    const [notification, setNotification] = useState<{
        show: boolean;
        message: string;
        type: 'success' | 'error';
    }>({ show: false, message: '', type: 'success' });

    const { data: usersData, isLoading: usersLoading } = useGetAllUsersQuery({
        page: usersPage,
        limit: 10,
        search: usersSearch,
        role: usersRole,
        status: usersStatus,
    });

    const { data: blogsData, isLoading: blogsLoading } = useGetBlogsQuery({
        page: blogsPage,
        limit: 10,
        search: blogsSearch,
        category: blogsCategory,
    });

    const [deleteBlog] = useDeleteBlogMutation();
    const [toggleUserStatus] = useToggleUserStatusMutation();

    const showNotification = (message: string, type: 'success' | 'error') => {
        setNotification({ show: true, message, type });
        setTimeout(() => setNotification({ show: false, message: '', type: 'success' }), 3000);
    };

    const handleDeleteBlog = async (id: string, title: string) => {
        setConfirmModal({
            isOpen: true,
            title: 'Delete Blog Post',
            message: `Are you sure you want to delete "${title}"? This action cannot be undone.`,
            confirmText: 'Delete',
            variant: 'danger',
            onConfirm: async () => {
                try {
                    await deleteBlog(id).unwrap();
                    showNotification('Blog post deleted successfully', 'success');
                } catch (error: any) {
                    showNotification(error.data?.message || 'Failed to delete blog post', 'error');
                }
                setConfirmModal(prev => ({ ...prev, isOpen: false }));
            },
        });
    };

    const handleToggleStatus = async (id: string, username: string, isDeleted: boolean) => {
        const action = isDeleted ? 'activate' : 'ban';
        setConfirmModal({
            isOpen: true,
            title: `${isDeleted ? 'Activate' : 'Ban'} User`,
            message: `Are you sure you want to ${action} user "${username}"?${isDeleted ? ' This will restore their access to the platform.' : ' This will prevent them from accessing the platform.'}`,
            confirmText: isDeleted ? 'Activate' : 'Ban',
            variant: isDeleted ? 'info' : 'danger',
            onConfirm: async () => {
                try {
                    await toggleUserStatus(id).unwrap();
                    showNotification(`User ${action}ed successfully`, 'success');
                } catch (error: any) {
                    showNotification(error.data?.message || `Failed to ${action} user`, 'error');
                }
                setConfirmModal(prev => ({ ...prev, isOpen: false }));
            },
        });
    };

    const isLoading = activeTab === 'users' ? usersLoading : blogsLoading;

    return (
        <>
            <SEO title="Admin Dashboard" description="Admin dashboard for managing SBookmark." />
            <AdminNavbar />
            {/* Notification Toast */}
            {notification.show && (
                <div className="fixed top-4 right-4 z-50 animate-slideIn">
                    <div className={`px-6 py-3 rounded-lg shadow-lg ${notification.type === 'success'
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                        }`}>
                        {notification.message}
                    </div>
                </div>
            )}

            {/* Confirm Modal */}
            <ConfirmModal
                isOpen={confirmModal.isOpen}
                title={confirmModal.title}
                message={confirmModal.message}
                confirmText={confirmModal.confirmText}
                variant={confirmModal.variant}
                onConfirm={confirmModal.onConfirm}
                onCancel={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
            />

            <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                        {activeTab === 'blogs' && (
                            <button
                                onClick={() => navigate('/admin/create-blog')}
                                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary-600 text-white px-4 py-2.5 rounded-lg hover:bg-primary-700 transition shadow-sm"
                            >
                                <Plus size={20} /> Create New Blog
                            </button>
                        )}
                    </div>

                    {/* Tabs */}
                    <div className="border-b border-gray-200 mb-6 -mx-4 sm:mx-0 overflow-x-auto">
                        <div className="flex px-4 sm:px-0 min-w-max">
                            <button
                                onClick={() => setActiveTab('users')}
                                className={`flex items-center space-x-2 px-4 sm:px-6 py-3 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'users'
                                    ? 'border-primary-600 text-primary-600 font-semibold'
                                    : 'border-transparent text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                <Users size={18} />
                                <span>Users Management</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('blogs')}
                                className={`flex items-center space-x-2 px-4 sm:px-6 py-3 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'blogs'
                                    ? 'border-primary-600 text-primary-600 font-semibold'
                                    : 'border-transparent text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                <FileText size={18} />
                                <span>Blog Articles</span>
                            </button>
                        </div>
                    </div>

                    {/* Search and Filters */}
                    <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
                        <div className="flex flex-col md:flex-row gap-4">
                            {activeTab === 'users' ? (
                                <>
                                    <div className="flex-1">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                            <input
                                                type="text"
                                                placeholder="Search users by name or email..."
                                                value={usersSearchInput}
                                                onChange={(e) => setUsersSearchInput(e.target.value)}
                                                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex gap-2 sm:gap-4">
                                        <select
                                            value={usersRole}
                                            onChange={(e) => { setUsersRole(e.target.value); setUsersPage(1); }}
                                            className="flex-1 md:flex-none md:min-w-[140px] px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white cursor-pointer"
                                        >
                                            <option value="">All Roles</option>
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                        <select
                                            value={usersStatus}
                                            onChange={(e) => { setUsersStatus(e.target.value); setUsersPage(1); }}
                                            className="flex-1 md:flex-none md:min-w-[140px] px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white cursor-pointer"
                                        >
                                            <option value="">All Statuses</option>
                                            <option value="active">Active</option>
                                            <option value="banned">Banned</option>
                                        </select>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex-1">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                            <input
                                                type="text"
                                                placeholder="Search blogs by title..."
                                                value={blogsSearchInput}
                                                onChange={(e) => setBlogsSearchInput(e.target.value)}
                                                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                            />
                                        </div>
                                    </div>
                                    <select
                                        value={blogsCategory}
                                        onChange={(e) => { setBlogsCategory(e.target.value); setBlogsPage(1); }}
                                        className="w-full md:w-auto md:min-w-[200px] px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white cursor-pointer"
                                    >
                                        <option value="">All Categories</option>
                                        <option value="technology">Technology</option>
                                        <option value="design">Design</option>
                                        <option value="business">Business</option>
                                        <option value="science">Science</option>
                                        <option value="entertainment">Entertainment</option>
                                        <option value="health">Health</option>
                                        <option value="education">Education</option>
                                        <option value="other">Other</option>
                                    </select>
                                </>
                            )}
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-xl shadow-sm border border-gray-100">
                            <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-4" />
                            <p className="text-gray-500 animate-pulse">Fetching records...</p>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                            {activeTab === 'users' ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left min-w-max">
                                        <thead className="bg-gray-50 border-b border-gray-200">
                                            <tr>
                                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">User Profile</th>
                                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Joined Date</th>
                                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {usersData?.data?.map((user: User) => (
                                                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                                                                {user.avatar ? (
                                                                    <img
                                                                        src={user.avatar.startsWith('/uploads/')
                                                                            ? `${BACKEND_URL}${user.avatar}`
                                                                            : user.avatar
                                                                        }
                                                                        alt={user.username}
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                ) : (
                                                                    <span className="text-gray-400 font-bold">{user.username.charAt(0)}</span>
                                                                )}
                                                            </div>
                                                            <div>
                                                                <p className="font-medium text-gray-900">{user.username}</p>
                                                                <p className="text-sm text-gray-500">{user.email}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.role === 'admin'
                                                            ? 'bg-purple-100 text-purple-800'
                                                            : 'bg-blue-100 text-blue-800'
                                                            }`}>
                                                            {user.role}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex items-center text-sm ${user.isDeleted ? 'text-red-600' : 'text-green-600'}`}>
                                                            {user.isDeleted ? 'Banned' : 'Active'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-500">
                                                        {new Date(user.createdAt).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        {user.role !== 'admin' && (
                                                            <button
                                                                onClick={() => handleToggleStatus(user.id, user.username, user.isDeleted || false)}
                                                                className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${user.isDeleted
                                                                    ? 'text-green-600 border-green-200 hover:bg-green-50'
                                                                    : 'text-red-600 border-red-200 hover:bg-red-50'
                                                                    }`}
                                                            >
                                                                {user.isDeleted ? 'ACTIVATE' : 'BAN'}
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                            {usersData?.data?.length === 0 && (
                                                <tr>
                                                    <td colSpan={5} className="px-6 py-20 text-center text-gray-500 font-medium">
                                                        No users found matching your search.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                    {usersData?.pagination && (
                                        <div className="p-4 border-t border-gray-100 bg-gray-50/30">
                                            <Pagination
                                                currentPage={usersData.pagination.page}
                                                totalPages={usersData.pagination.pages}
                                                onPageChange={setUsersPage}
                                                totalItems={usersData.pagination.total}
                                                itemsPerPage={usersData.pagination.limit}
                                            />
                                        </div>
                                    )}
                                </div>
                            ) : null}

                            {activeTab === 'blogs' && (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left min-w-max">
                                        <thead className="bg-gray-50 border-b border-gray-200">
                                            <tr>
                                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {blogsData?.data && blogsData.data.map((blog) => (
                                                <tr key={blog._id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4 font-medium text-gray-900 max-w-md truncate">
                                                        {blog.title}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                            {blog.category}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-gray-500 text-sm">
                                                        {new Date(blog.createdAt).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <button
                                                            onClick={() => handleDeleteBlog(blog._id, blog.title)}
                                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                            title="Delete Post"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            {blogsData?.data?.length === 0 && (
                                                <tr>
                                                    <td colSpan={4} className="px-6 py-20 text-center text-gray-500 font-medium">
                                                        No blog posts found. Create one to get started.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                    {blogsData?.pagination && (
                                        <div className="p-4 border-t border-gray-100 bg-gray-50/30">
                                            <Pagination
                                                currentPage={blogsData.pagination.page}
                                                totalPages={blogsData.pagination.pages}
                                                onPageChange={setBlogsPage}
                                                totalItems={blogsData.pagination.total}
                                                itemsPerPage={blogsData.pagination.limit}
                                            />
                                        </div>
                                    )}
                                </div>
                            )}


                        </div>
                    )}
                </div>
            </div>

        </>
    );
}
