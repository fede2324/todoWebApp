import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth.jsx"; //<---------------- ONLY TO CREATE HOME PAGE
import Loading from '../components/Loading.jsx'

const ProtectedRoute = () => {
    // --------------- ONLY TO CREATE HOME PAGE -----------------------
        // const { user, loading } = useAuth();
    var loading = false
    var user = true
    // --------------- ONLY TO CREATE HOME PAGE -----------------------
    // Show loading if loading var is true (while load the data)
    if (loading || user === undefined) {
        return <Loading/>
        
    }

    // If user is logged can access to private pages, otherwise redirect to login
    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
