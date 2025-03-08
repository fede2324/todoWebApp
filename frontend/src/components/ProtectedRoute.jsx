import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";

const ProtectedRoute = () => {
    const { user, loading } = useAuth();

    // Show loading if loading var is true (while load the data)
    if (loading || user === undefined) {
        return <div className="loading-spinner">Cargando...</div>;
    }

    // If user is logged can access to private pages, otherwise redirect to login
    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
