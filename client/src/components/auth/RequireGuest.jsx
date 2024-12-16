import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireGuest = () => {
    const { auth } = useAuth();
    const location = useLocation();
    const from = location.state?.from || '/dashboard';
    console.log("require guest");
    console.log("auth", auth);

    return (
        auth?.user ? <Navigate to={from} /> : <Outlet />
    )
}

export default RequireGuest;