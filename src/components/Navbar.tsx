import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Plus, User } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { logout } from '../store/authSlice';
import { BACKEND_URL } from '../config';

export default function Navbar() {
    const { user, isAuthenticated } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    // Don't show navbar for admin users (they have separate interface)
    if (isAuthenticated && user?.role === 'admin') {
        return null;
    }

    return (
        <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                <div className="flex justify-between items-center h-auto min-h-[80px] py-2">
                    <Link to="/" className="flex items-center">
                        <img
                            src="/logo2.jpg"
                            alt="Logo"
                            className="h-[60px] object-contain"

                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-600 hover:text-primary-600 font-medium transition-colors text-lg">Home</Link>
                        <Link to="/about" className="text-gray-600 hover:text-primary-600 font-medium transition-colors text-lg">About Us</Link>
                        <Link to="/blog" className="text-gray-600 hover:text-primary-600 font-medium transition-colors text-lg">Blog</Link>
                        <Link to="/contact" className="text-gray-600 hover:text-primary-600 font-medium transition-colors text-lg">Contact</Link>
                    </div>

                    <div className="flex items-center space-x-1.5 sm:space-x-3 md:space-x-4">
                        {isAuthenticated ? (
                            <>
                                <Link
                                    to="/submit"
                                    className="btn btn-primary flex items-center space-x-1 sm:space-x-2 text-sm px-3 py-1.5 sm:px-4 sm:py-2"
                                >
                                    <Plus size={16} className="sm:w-[18px] sm:h-[18px]" />
                                    <span className="hidden sm:inline">Submit Link</span>
                                    <span className="sm:hidden">Submit</span>
                                </Link>
                                <Link
                                    to={`/profile/${user?.id}`}
                                    className="flex items-center space-x-1.5 sm:space-x-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    {user?.avatar ? (
                                        <img
                                            src={user.avatar.startsWith('/uploads/')
                                                ? `${BACKEND_URL}${user.avatar}`
                                                : user.avatar
                                            }
                                            alt={user.username}
                                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary-100 flex items-center justify-center">
                                            <User size={16} className="text-primary-600 sm:w-[18px] sm:h-[18px]" />
                                        </div>
                                    )}
                                    <span className="hidden md:inline font-medium text-gray-700 text-sm">{user?.username}</span>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
                                    title="Logout"
                                >
                                    <LogOut size={18} className="sm:w-5 sm:h-5" />
                                </button>
                            </>
                        ) : (
                            <div className="flex items-center space-x-2 sm:space-x-3">
                                <Link to="/login" className="btn btn-secondary text-sm px-3 py-1.5 sm:px-4 sm:py-2">
                                    Login
                                </Link>
                                <Link to="/signup" className="btn btn-primary text-sm px-3 py-1.5 sm:px-4 sm:py-2">
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

