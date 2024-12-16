import { createContext, useEffect, useState } from "react";
import axios from "../api/api"
import { useLocation } from 'react-router-dom';

const AuthContext = createContext({});

// auth provider ini merupakan provider dari context auth 
// yang menyediakan data auth dan setAuth sebagai global state
// yang dapat diakses oleh semua komponen didalam aplikasi
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const location = useLocation(); // Get the current route

    useEffect(() => {
        const excludedPaths = ['/auth/login', '/auth/register', '/auth/forgot-password'];

        if (!excludedPaths.includes(location.pathname) && !auth?.user) {
            console.log("Fetch refresed Auth data")
            const refreshToken = async () => {
                try {
                    // get new token
                    const response = await axios.get('/token', {
                        withCredentials: true
                    });

                    const newToken = response.data.data.token;
                    const user = response.data.data.user;
                    console.log("New Token from provider", newToken)
                    console.log("Set Auth dulu kawan")
                    // set new token to auth context
                    setAuth((prevAuth) => (
                        {
                            ...prevAuth,
                            token: newToken,
                            user: user
                        }
                    ));
                } catch (error) {
                } 
            };

            refreshToken();
        } 

        return;
    }, [location.pathname]); // Re-run effect if the route changes

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;