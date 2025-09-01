import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    useEffect(() => {
        const checkToken = () => {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                const userData = JSON.parse(storedUser);
                const tokenExp = userData.tokenExp;
                if (Date.now() >= tokenExp * 1000) {
                    logout();
                    window.location.href = "/auth/login";
                } else {
                    setUser(userData);
                }
            }
            setLoading(false);
        };

        checkToken();
    }, []);


    return (<AuthContext.Provider value={{ user, login, logout, loading }}>{children}</AuthContext.Provider>)
};

export default AuthContext;