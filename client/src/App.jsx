import { useLocation } from "react-router-dom";
import Layout from "./pages/layouts/Layout";
import AppRoutes from "./routes/AppRoutes";
import { Blank } from "./pages/layouts/Blank";

function App() {
    const location = useLocation();
    const isAuthPath =  location.pathname.includes("auth") || 
                        location.pathname.includes("error") ||
                        location.pathname.includes("under-maintenance") || 
                        location.pathname.includes("blank");
    
    return (
        <>
            {isAuthPath ? (
                <AppRoutes>
                    <Blank />
                </AppRoutes>
            ) : (
                <Layout>
                    <AppRoutes />
                </Layout>
            )}
        </>
    );
}

export default App;