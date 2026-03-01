import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Plus, User, Menu, X } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { logout } from '../store/authSlice';
import { BACKEND_URL } from '../config';

export default function Navbar() {
    const { user, isAuthenticated } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
        setMobileOpen(false);
    };

    // Don't show navbar for admin users (they have separate interface)
    if (isAuthenticated && user?.role === 'admin') {
        return null;
    }

    return (
        <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                <div className="flex justify-between items-center h-[72px]">

                    {/* Logo */}
                    <Link to="/" className="flex items-center shrink-0">
                        <img src="/logo2.jpg" alt="Logo" className="h-[55px] object-contain" />
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-600 hover:text-primary-600 font-medium transition-colors text-lg">Home</Link>
                        <Link to="/about" className="text-gray-600 hover:text-primary-600 font-medium transition-colors text-lg">About Us</Link>
                        <Link to="/blog" className="text-gray-600 hover:text-primary-600 font-medium transition-colors text-lg">Blog</Link>
                        <Link to="/contact" className="text-gray-600 hover:text-primary-600 font-medium transition-colors text-lg">Contact</Link>
                    </div>

                    {/* Right-side actions */}
                    <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
                        {isAuthenticated ? (
                            <>
                                {/* Submit Link button — icon only on mobile, full label on sm+ */}
                                <Link
                                    to="/submit"
                                    className="btn btn-primary flex items-center gap-1.5 text-sm px-2.5 py-1.5 sm:px-4 sm:py-2 whitespace-nowrap"
                                >
                                    <Plus size={16} />
                                    <span className="hidden sm:inline">Submit Link</span>
                                </Link>

                                {/* Profile — only shown on desktop */}
                                <Link
                                    to={`/profile/${user?.id}`}
                                    className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    {user?.avatar ? (
                                        <img
                                            src={user.avatar.startsWith('/uploads/') ? `${BACKEND_URL}${user.avatar}` : user.avatar}
                                            alt={user.username}
                                            className="w-8 h-8 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                                            <User size={18} className="text-primary-600" />
                                        </div>
                                    )}
                                    <span className="font-medium text-gray-700 text-sm">{user?.username}</span>
                                </Link>

                                {/* Logout — only shown on desktop */}
                                <button
                                    onClick={handleLogout}
                                    className="hidden md:inline-flex p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
                                    title="Logout"
                                >
                                    <LogOut size={20} />
                                </button>
                            </>
                        ) : (
                            /* Login / Sign Up — only on desktop */
                            <div className="hidden md:flex items-center gap-3">
                                <Link to="/login" className="btn btn-secondary text-sm px-4 py-2">Login</Link>
                                <Link to="/signup" className="btn btn-primary text-sm px-4 py-2">Sign Up</Link>
                            </div>
                        )}

                        {/* Hamburger — mobile only */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 shadow-lg animate-fadeIn">
                    <div className="px-4 py-3 flex flex-col">
                        {/* Nav links */}
                        <Link to="/" onClick={() => setMobileOpen(false)} className="py-3 text-gray-700 hover:text-primary-600 font-medium border-b border-gray-50 transition-colors">Home</Link>
                        <Link to="/about" onClick={() => setMobileOpen(false)} className="py-3 text-gray-700 hover:text-primary-600 font-medium border-b border-gray-50 transition-colors">About Us</Link>
                        <Link to="/blog" onClick={() => setMobileOpen(false)} className="py-3 text-gray-700 hover:text-primary-600 font-medium border-b border-gray-50 transition-colors">Blog</Link>
                        <Link to="/contact" onClick={() => setMobileOpen(false)} className="py-3 text-gray-700 hover:text-primary-600 font-medium transition-colors">Contact</Link>

                        {isAuthenticated ? (
                            <div className="mt-3 pt-3 border-t border-gray-100 flex flex-col gap-1">
                                <Link
                                    to={`/profile/${user?.id}`}
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center gap-3 py-2.5 px-1 text-gray-700 hover:text-primary-600 font-medium transition-colors rounded-lg hover:bg-gray-50"
                                >
                                    {user?.avatar ? (
                                        <img
                                            src={user.avatar.startsWith('/uploads/') ? `${BACKEND_URL}${user.avatar}` : user.avatar}
                                            alt={user.username}
                                            className="w-8 h-8 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                                            <User size={16} className="text-primary-600" />
                                        </div>
                                    )}
                                    <span>{user?.username}</span>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-3 py-2.5 px-1 text-red-600 hover:text-red-700 font-medium transition-colors rounded-lg hover:bg-red-50 w-full text-left"
                                >
                                    <LogOut size={18} />
                                    <span>Logout</span>
                                </button>
                            </div>
                        ) : (
                            <div className="flex gap-3 mt-4 pt-3 border-t border-gray-100">
                                <Link to="/login" onClick={() => setMobileOpen(false)} className="btn btn-secondary flex-1 text-center text-sm">Login</Link>
                                <Link to="/signup" onClick={() => setMobileOpen(false)} className="btn btn-primary flex-1 text-center text-sm">Sign Up</Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
