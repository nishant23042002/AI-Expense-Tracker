import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const user = useSelector((state) => state.loginState?.user);
    const accessToken = useSelector((state) => state.loginState?.accessToken);

    if (!user || !accessToken) {
        return <Navigate to="/login" />;
    }

    return children;
}
