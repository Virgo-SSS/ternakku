import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireGuest = () => {
    const { auth } = useAuth();

    return (
        auth?.user ? <Navigate to="/dashboard" /> : <Outlet />
    )
}

export default RequireGuest;