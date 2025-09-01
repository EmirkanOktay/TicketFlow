import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";

export default function useAuth() {
    const { user, login, logout, loading } = useContext(AuthContext);

    useEffect(() => {
        if (!user?.token) return;

        const payload = JSON.parse(atob(user.token.split(".")[1]));
        const expiresIn = payload.exp * 1000 - Date.now();

        if (expiresIn <= 0) {
            logout();
            toast.info("Session expired. Please login again.");
        } else {
            const timer = setTimeout(() => {
                logout();
                toast.info("Session expired. Please login again.");
            }, expiresIn);
            return () => clearTimeout(timer);
        }
    }, [user, logout]);

    return { user, login, logout, loading };
}
