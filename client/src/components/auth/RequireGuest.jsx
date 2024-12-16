import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireGuest = () => {
    const { auth } = useAuth();
    const location = useLocation();
    const from = location.state?.from || '/dashboard';

    return (
        auth?.user ? <Navigate to={from} /> : <Outlet />
    )
}

export default RequireGuest;