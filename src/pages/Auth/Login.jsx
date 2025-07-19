import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function DarkSignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isAgree, setAgree] = useState("")
    const [message, setMessage] = useState("")
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        let formData = { email, password, isAgree }
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
        console.log("Creating account with:", formData);
        navigate("/dashboard")
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4 py-10">
            <div className="flex flex-col min-h-180 border border-slate-700 sm:flex-row max-w-5xl w-full  rounded-2xl overflow-hidden shadow-xl">
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
                    className="w-full md:w-1/2 bg-slate-900 p-8 text-slate-200 font-semibold"
                >
                    <h2 className="text-2xl font-bold mb-2">Login to your Account</h2>
                    <p className="text-sm text-gray-400 mb-6">
                        Don't have an account? <Link to={"/signUp"} className="underline text-blue-600">Sign Up</Link>
                    </p>
                    <h1 className="text-center mb-4 text-red-600">{message}</h1>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full border border-slate-700 bg-slate-900 px-4 py-2 rounded outline-none mb-4"
                    />

                    <div className="relative mb-4">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="w-full border border-slate-700 px-4 py-2 rounded outline-none"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-sm text-slate-300"
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
                        <span className="text-sm">
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
                        <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded shadow">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" className="h-4 w-4" /> Google
                        </button>
                        <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded shadow">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg" className="h-4 w-4" /> Apple
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}