import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/userLogin.js";
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPath.js";

export default function Login() {
    const [isDark, setIsDark] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isAgree, setAgree] = useState("")
    const [message, setMessage] = useState("")
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            email,
            password,
            isAgree
        };

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            setMessage("Please enter a valid email address.");
            return;
        }

        if (!password || password.length < 6) {
            setMessage("Password must be at least 6 characters.");
            return;
        }

        if (!isAgree) {
            setMessage("You must agree to the Terms & Conditions.");
            return;
        }
        try {
            // const res = await fetch("http://localhost:4001/api/v1/user/login", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //     body: JSON.stringify(payload),
            // });

            const res = await axiosInstance.post(API_PATHS.AUTH.LOGIN, payload);
            const data = res.data;

            dispatch(
                loginUser({
                    user: data.user,
                    token: data.token,
                })
            );

            setMessage(data.message || "Login successful.");
            setTimeout(() => {
                navigate("/dashboard");
            }, 2000);
        } catch (err) {
            console.error("Login error:", err);
            const errorMsg = err.response?.data?.message || "Something went wrong. Please try again.";
            setMessage(errorMsg);
        }
    };

    return (
        <div className={`${!isDark ? "min-h-screen flex items-center justify-center bg-slate-200 px-4 py-10" : "min-h-screen flex items-center justify-center bg-slate-900 px-4 py-10"}`}>
            <div className={`${isDark ? "flex flex-col min-h-180 border border-slate-700 sm:flex-row max-w-6xl w-full  rounded-2xl overflow-hidden shadow-xl" : "flex flex-col min-h-180 border border-slate-300 sm:flex-row max-w-6xl w-full  rounded-2xl overflow-hidden shadow-xl"}`}>
                {/* Left Panel */}
                <div className="w-full md:w-1/2 relative">
                    <img
                        src="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
                        alt="Desert"
                        className="w-full h-full object-cover opacity-90 hover:opacity-100 duration-100"
                    />
                    <div className="absolute bottom-6 left-6 text-white">
                        <h3 className="text-lg font-semibold">Capturing Moments,</h3>
                        <p className="text-sm">Creating Memories</p>
                    </div>
                </div>

                {/* Right Panel */}
                <form
                    noValidate
                    onSubmit={handleSubmit}
                    className={`${!isDark ? "w-full md:w-1/2 bg-slate-200 p-8 text-slate-200 font-semibold" : "w-full md:w-1/2 bg-slate-900 p-8 text-slate-200 font-semibold"}`}
                >
                    <h2 className={`${isDark ? "text-2xl font-bold mb-2" : "text-2xl text-slate-800 font-bold mb-2"}`}>Login to your Account</h2>
                    <p className="text-sm text-gray-400 mb-6">
                        Don't have an account? <Link to={"/signUp"} className="underline text-blue-600">Sign Up</Link>
                    </p>
                    <h1 className={`${message.includes("Successfully") ? "text-center mb-4 text-green-600" : "text-center mb-4 text-red-600"}`}>{message}</h1>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className={`${!isDark ? "w-full border border-slate-400 bg-slate-200 px-4 py-2 rounded outline-none mb-4 text-slate-900" : "w-full border border-slate-700 bg-slate-900 px-4 py-2 rounded outline-none mb-4"}`}
                    />

                    <div className="relative mb-4">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className={`${!isDark ? "w-full border border-slate-400 bg-slate-200 px-4 py-2 rounded outline-none mb-4 text-slate-900" : "w-full border border-slate-700 bg-slate-900 px-4 py-2 rounded outline-none mb-4"}`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className={`${isDark ? "absolute right-3 top-3 text-sm text-slate-300" : "absolute right-3 top-3 text-sm text-slate-800"}`}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>

                    <div className="flex items-center mb-6">
                        <input
                            type="checkbox"
                            name="agreed"
                            checked={isAgree}
                            onChange={() => setAgree(prev => !prev)}
                            className="mr-2 border border-green-700"
                        />
                        <span className={`${!isDark ? "text-sm text-slate-800" : "text-sm text-slate-200"}`}>
                            I agree to the <a href="#" className="underline">Terms & Conditions</a>
                        </span>
                    </div>

                    <button
                        type="submit"
                        className="w-full cursor-pointer bg-[#7D5FFF] hover:bg-[#6C4DFF] transition text-white py-2 rounded font-medium mb-4"
                    >
                        Login
                    </button>

                    <p className="text-center text-sm text-gray-400 mb-2">Or register with</p>

                    <div className="flex gap-4 justify-center">
                        <button className="flex items-center gap-2 bg-slate-200 font-semibold text-black px-4 py-2 rounded shadow">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" className="h-4 w-4" /> Google
                        </button>
                        <button className="flex items-center gap-2 bg-slate-200 text-black font-semibold px-4 py-2 rounded shadow">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg" className="h-4 w-4" /> Apple
                        </button>
                    </div>
                </form>
                <button onClick={() => setIsDark((prev) => !prev)} className={`${!isDark ? "flex justify-center cursor-pointer items-center bg-slate-200 gap-1.5  text-black font-semibold px-4 py-2 shadow" : "flex justify-center cursor-pointer items-center bg-slate-800 gap-1.5  text-white font-semibold px-4 py-2 shadow"}`}>
                    {!isDark ? <MdDarkMode /> : <CiLight />}
                    {isDark ? "Light" : "Dark"}
                </button>
            </div>
        </div>
    );
}