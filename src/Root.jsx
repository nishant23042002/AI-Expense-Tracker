import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Root() {
    const user = useSelector((state) => state.loginState?.user);
    const token = useSelector((state) => state.loginState?.accessToken);
    const isAuth = user || token;

    return isAuth ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
}
