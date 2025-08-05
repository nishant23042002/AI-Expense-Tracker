import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/userLogin.js";
import { LuLayoutDashboard, LuHandCoins, LuWalletMinimal, LuLogOut } from "react-icons/lu"
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuHistory } from "react-icons/lu";
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPath.js";
import { persistor } from "../../redux/store.js";

function SideMenu({ activeMenu, user }) {
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        setMessage("Logging Out")
        try {
            await axiosInstance.get(`${API_PATHS.AUTH.LOGOUT}`)
            dispatch(logoutUser());
            navigate("/login");
            persistor.purge(); 
        } catch (err) {
            console.error(err);
        }
    };

    const MotionDiv = motion.div;
    return (
        <div className="w-64 h-[calc(100vh-77px)] p-5 bg-white dark:bg-slate-900 sticky top-[77px] z-20 border-r border-b border-slate-200 dark:border-slate-700">
            <div className="flex flex-col text-xl items-center text-slate-800 dark:text-slate-200">
                <div className="relative flex flex-col justify-center items-center mb-8 text-slate-800 dark:text-slate-200">
                    <img
                        className="relative w-40 h-40 border-4 border-white dark:border-slate-700 object-contain rounded-full cursor-pointer shadow-lg"
                        src={user?.profilePic_URL}
                        alt="profile-picture"
                        onClick={() => setShowPopup(true)}
                    />

                    <AnimatePresence>
                        {showPopup && (
                            <MotionDiv
                                className="absolute rounded-full w-54 h-54 -top-5 left-1/2 -translate-x-1/2 z-30"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.5, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 120 }}
                                onClick={() => setShowPopup(false)}
                            >
                                <img
                                    src={user?.profilePic_URL}
                                    alt="Expanded Profile"
                                    className="w-54 h-54 rounded-full border-4 border-white shadow-lg cursor-pointer"
                                />
                            </MotionDiv>
                        )}
                    </AnimatePresence>
                    <h5 className=" font-semibold">{user?.username?.toUpperCase()}</h5>
                </div>

                <button
                    className={`w-full flex gap-4 items-center px-6 py-3 mb-3 rounded-lg font-medium transition ${activeMenu === "Dashboard" ? "bg-indigo-600 text-white" : "hover:bg-indigo-500 hover:text-white"
                        }`}
                    onClick={() => navigate("/dashboard")}
                >
                    <LuLayoutDashboard /> Dashboard
                </button>

                <button
                    className={`w-full flex gap-4 items-center px-6 py-3 mb-3 rounded-lg font-medium transition ${activeMenu === "Income" ? "bg-emerald-500 text-white" : "hover:bg-emerald-400 hover:text-white"
                        }`}
                    onClick={() => navigate("/dashboard/income")}
                >
                    <LuWalletMinimal /> Income
                </button>

                <button
                    className={`w-full flex gap-4 items-center px-6 py-3 mb-3 rounded-lg font-medium transition ${activeMenu === "Expense" ? "bg-rose-500 text-white" : "hover:bg-rose-400 hover:text-white"
                        }`}
                    onClick={() => navigate("/dashboard/expense")}
                >
                    <LuHandCoins /> Expense
                </button>

                <button
                    className={`w-full flex gap-4 items-center px-6 py-3 mb-3 rounded-lg font-medium transition ${activeMenu === "Transactions" ? "bg-sky-500 text-white" : "hover:bg-sky-400 hover:text-white"
                        }`}
                    onClick={() => navigate("/dashboard/transactions")}
                >
                    <LuHistory /> History
                </button>

                <button
                    className="w-full flex gap-4 items-center px-6 py-3 mb-3 rounded-lg font-medium hover:bg-slate-700 hover:text-white transition"
                    onClick={handleLogout}
                >
                    <LuLogOut /> Logout
                    <span className="text-sm font-medium text-rose-400">{message}</span>
                </button>
            </div>
        </div>

    )
}

export default SideMenu;
