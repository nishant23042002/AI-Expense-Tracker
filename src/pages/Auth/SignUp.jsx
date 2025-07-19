import { useState } from "react";
import { Link } from "react-router-dom";
import ProfilePicSelector from "./ProfileSelector";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";


export default function DarkSignUp() {
    const [isDark, setIsDark] = useState(false);
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isAgree, setAgree] = useState(false)
    const [profilePic, setProfilePic] = useState()
    const [message, setMessage] = useState("")
    const [showPassword, setShowPassword] = useState(false);



    const handleSubmit = (e) => {
        e.preventDefault();
        let formData = { profilePic, userName, email, password, isAgree }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!userName || userName.length < 6) {
            setMessage("Please enter your name")
        }

        if (!profilePic) {
            setMessage("Please select profile picture")
        }

        if (!email || !emailRegex.test(email)) {
            setMessage("Please enter a valid email address.");
        }

        if (!password || password.length < 6) {
            setMessage("Password must be at least 6 characters.");
        }

        console.log("Creating account with:", formData);

    };

    return (
        <div className={`${isDark ? "min-h-screen flex items-center justify-center bg-slate-900 px-4 py-10" : "min-h-screen flex items-center justify-center bg-slate-200 px-4 py-10"}`}>
            <div className={`${isDark ? "flex flex-col min-h-180 sm:flex-row max-w-5xl w-full border border-slate-700 rounded-2xl overflow-hidden shadow-xl" : "flex flex-col min-h-180 sm:flex-row max-w-5xl w-full border border-slate-200 rounded-2xl overflow-hidden shadow-xl"}`}>
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
                    onSubmit={handleSubmit}
                    className={`${isDark ? "w-full md:w-1/2 p-8 text-slate-200" : "w-full md:w-1/2 p-8 bg-white text-slate-500"}`}
                >
                    <h2 className={`${isDark ? "text-2xl font-bold mb-2" : "text-2xl mb-2 text-slate-800 font-semibold"}`}>Create an account</h2>
                    <p className={`${isDark ? "text-sm text-slate-200 mb-6" : "text-sm text-slate-800 mb-6"}`}>
                        Already have an account? <Link to={"/login"} className="underline text-blue-600">Login</Link>
                    </p>

                    <div className="flex flex-col justify-center items-center gap-4 mb-4">
                        <ProfilePicSelector image={profilePic} setImage={setProfilePic} />

                        <input
                            type="text"
                            name="Your Name"
                            value={userName}
                            onChange={(e) => {
                                setUserName(e.target.value)
                                setMessage("")
                            }}
                            placeholder="First name"
                            className="border w-full border-slate-700 px-4 py-2 rounded outline-none"
                        />
                    </div>

                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setMessage("");
                        }}
                        placeholder="Email"
                        className="w-full border border-slate-700 px-4 py-2 rounded outline-none mb-4"
                    />

                    <div className="relative mb-4">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                                setMessage("")
                            }}
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
                            checked={isAgree}
                            onChange={(e) => {
                                setAgree(e.target.checked);
                                setMessage("");
                            }}
                        />

                        <span className={`${isDark ? "text-sm text-slate-200" : "text-sm text-slate-500"}`}>
                            I agree to the <span className="underline">Terms & Conditions</span>
                        </span>
                    </div>

                    <button
                        type="submit"
                        className="w-full cursor-pointer bg-[#7D5FFF] hover:bg-[#6C4DFF] transition text-white py-2 rounded font-medium mb-4"
                    >
                        Create account
                    </button>
                    <h1 className="text-center text-red-600">{message}</h1>
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