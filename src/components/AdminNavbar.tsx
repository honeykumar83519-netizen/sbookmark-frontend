import { Link, useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, FileText } from 'lucide-react';
import { useAppDispatch } from '../hooks/reduxHooks';
import { logout } from '../store/authSlice';

export default function AdminNavbar() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/admin');
    };

    return (
        <nav className="bg-gray-900 shadow-lg border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-8">
                        <Link to="/admin/dashboard" className="flex items-center">
                            <span className="text-xl font-bold text-white">
                                <span className="text-primary-500">Admin</span> Panel
                            </span>
                        </Link>

                        <div className="flex space-x-1">
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

                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                        title="Logout"
                    >
                        <LogOut size={18} />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </nav>
    );
}
