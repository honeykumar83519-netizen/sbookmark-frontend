import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/reduxHooks';

interface UserRouteProps {
    children: React.ReactNode;
}

export default function UserRoute({ children }: UserRouteProps) {
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);

    // If authenticated and is an admin - redirect to admin dashboard
    if (isAuthenticated && user?.role === 'admin') {
        return <Navigate to="/admin/dashboard" replace />;
    }

    // All other cases (unauthenticated or regular user) - allow access
    return <>{children}</>;
}
