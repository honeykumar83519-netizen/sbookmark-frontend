import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/reduxHooks';

interface AdminRouteProps {
    children: React.ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);

    // Not authenticated at all - redirect to admin login
    if (!isAuthenticated) {
        return <Navigate to="/admin" replace />;
    }

    // Authenticated but not an admin - redirect to home
    if (user?.role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    // Admin user - allow access
    return <>{children}</>;
}
