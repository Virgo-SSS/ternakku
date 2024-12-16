import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useLocation } from "react-router-dom";

const RequireAuth = () => {
    const { auth, loading } = useAuth();
    const location = useLocation();
    console.log("requirea auth");
    console.log("auth", auth);

    // Show a loading indicator while checking authentication
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        auth?.user ? <Outlet /> : <Navigate to="/auth/login" state={{ from: location.pathname }} />
    )
}

export default RequireAuth;