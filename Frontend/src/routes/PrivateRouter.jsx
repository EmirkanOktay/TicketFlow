import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return null; // token kontrolü bitmeden render etme

    return user ? children : <Navigate to="/auth/login" replace />;
};

export default PrivateRoute;
