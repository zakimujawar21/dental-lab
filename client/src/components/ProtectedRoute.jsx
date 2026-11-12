import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Layout from "./Layout";

const ProtectedRoute = ({ children }) => {
    const { admin, loading } = useAuth();

    if (loading) {
        return <div className="min-h-screen bg-slate-950 p-8 text-white">Loading...</div>;
    }

    if (!admin) {
        return <Navigate to="/login" replace />;
    }

    return <Layout>{children}</Layout>;
};

export default ProtectedRoute;