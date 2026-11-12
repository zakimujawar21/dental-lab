import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyLogin = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const response = await api.get("/auth/verify");
                setAdmin(response.data.admin || { id: response.data.adminId });
            } catch (error) {
                localStorage.removeItem("token");
                setAdmin(null);
            } finally {
                setLoading(false);
            }
        };

        verifyLogin();
    }, []);

    const login = async (email, password) => {
        const response = await api.post("/auth/login", {
            email,
            password,
        });

        localStorage.setItem("token", response.data.token);
        setAdmin(response.data.admin);

        return response.data;
    };

    const logout = () => {
        localStorage.removeItem("token");
        setAdmin(null);
    };

    return (
        <AuthContext.Provider
            value={{ admin, loading, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);