import axios from "axios";
import { BASE_URL } from "./apiPath";
import { store } from "../redux/store.js"


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



  
export default axiosInstance;
