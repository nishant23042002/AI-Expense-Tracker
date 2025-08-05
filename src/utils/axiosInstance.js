import axios from "axios";
import { API_PATHS, BASE_URL } from "./apiPath";
import { store } from "../redux/store.js"
import { loginUser, logoutUser } from "../redux/userLogin.js";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    withCredentials: true,
});

// ✅ Request Interceptor
axiosInstance.interceptors.request.use((config) => {
    const token = store.getState().loginState?.accessToken;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});



// Response Interceptor: Handle 401 by refreshing token
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If 401 and not already retried
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const res = await axiosInstance.get(`${API_PATHS.AUTH.REFRESHTOKEN}`, {
                    withCredentials: true,
                });
                const newAccessToken = res.data.accessToken;

                store.dispatch(loginUser({
                    user: store.getState().loginState?.user,
                    accessToken: newAccessToken,
                }));
                // Save and retry
                localStorage.setItem("accessToken", newAccessToken);
                axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
                originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                store.dispatch(logoutUser());
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
