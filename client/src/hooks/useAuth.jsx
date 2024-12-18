import { useContext, useDebugValue } from "react";
import AuthContext from "../context/AuthContext";

// fungsi hooks useAuth ini digunakan menggunakan auth context
// untuk mengakses data auth dan setAuth
// karena didalam auth context terdapat provider yang menyediakannya
const useAuth = () => {
    const { auth } = useContext(AuthContext);

    useDebugValue(auth, auth => auth?.user ? "Logged In" : "Logged Out")
    
    return useContext(AuthContext);
}

export default useAuth;