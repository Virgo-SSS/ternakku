import { createContext, useEffect, useState } from "react";
import axios from "../api/api"
import { useLocation } from 'react-router-dom';

const AuthContext = createContext({});

// auth provider ini merupakan provider dari context auth 
// yang menyediakan data auth dan setAuth sebagai global state
// yang dapat diakses oleh semua komponen didalam aplikasi
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [loading, setLoading] = useState(true); // Add loading state
    const location = useLocation(); // Get the current route

    useEffect(() => {
        const refreshToken = async () => {
            try {
                const response = await axios.get('/token', { withCredentials: true });
                const newToken = response.data.data.token;
                const user = response.data.data.user;

                setAuth({
                    token: newToken,
                    user: user,
                });
            } catch (error) {
                setAuth({}); // Clear auth if refresh fails
            } finally {
                setLoading(false); // Mark loading as complete
            }
        };

        refreshToken();
    }, [location.pathname]); // Re-run effect if the route changes

    return (
        <AuthContext.Provider value={{ auth, setAuth, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;