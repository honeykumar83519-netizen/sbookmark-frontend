import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, FileText, Menu, X } from 'lucide-react';
import { useAppDispatch } from '../hooks/reduxHooks';
import { logout } from '../store/authSlice';

export default function AdminNavbar() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/admin');
        setMobileOpen(false);
    };

    return (
        <nav className="bg-gray-900 shadow-lg border-b border-gray-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-4 sm:space-x-8">
                        <Link to="/admin/dashboard" className="flex items-center shrink-0">
                            <span className="text-xl font-bold text-white">
                                <span className="text-primary-500">Admin</span>Panel
                            </span>
                        </Link>

                        {/* Desktop nav links */}
                        <div className="hidden sm:flex space-x-1">
                            <Link
                                to="/admin/dashboard"
                                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                            >
                                <LayoutDashboard size={18} />
                                <span>Dashboard</span>
                            </Link>
                            <Link
                                to="/admin/create-blog"
                                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                            >
                                <FileText size={18} />
                                <span>Create Blog</span>
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Desktop logout */}
                        <button
                            onClick={handleLogout}
                            className="hidden sm:flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                            title="Logout"
                        >
                            <LogOut size={18} />
                            <span>Logout</span>
                        </button>

                        {/* Mobile hamburger */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="sm:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-300"
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="sm:hidden bg-gray-800 border-t border-gray-700 animate-fadeIn">
                    <div className="px-4 py-3 flex flex-col space-y-1">
                        <Link
                            to="/admin/dashboard"
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center space-x-2 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                        >
                            <LayoutDashboard size={18} />
                            <span>Dashboard</span>
                        </Link>
                        <Link
                            to="/admin/create-blog"
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center space-x-2 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                        >
                            <FileText size={18} />
                            <span>Create Blog</span>
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="flex items-center space-x-2 px-4 py-3 rounded-lg text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors w-full text-left"
                        >
                            <LogOut size={18} />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}
