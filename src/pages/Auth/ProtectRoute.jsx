// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ children }) {
    const user = useSelector((state) => state?.auth?.user);
    const token = useSelector((state) => state?.auth?.token) || localStorage.getItem("token");

    // If not logged in, redirect to login
    if (!user || !token) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
export default ProtectedRoute