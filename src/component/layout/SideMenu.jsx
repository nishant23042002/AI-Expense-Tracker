import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/userLogin.js";
import { LuLayoutDashboard, LuHandCoins, LuWalletMinimal, LuLogOut } from "react-icons/lu"
import { GoGoal } from "react-icons/go";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuHistory } from "react-icons/lu";

function SideMenu({ activeMenu, user }) {
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogOut = () => {
        setMessage("Logging Out...")
        setTimeout(() => {
            dispatch(logoutUser());
            navigate("/login");
        }, 2000)
    }
    const MotionDiv = motion.div;
    return (
        <div className="w-64 h-[calc(100vh-61px)] bg-slate-200 border-r-slate-300 p-5 sticky top-[61px] z-20">
            <div className="flex flex-col items-center justify-between">
                <div className="relative flex flex-col justify-center items-center mb-8">
                    {/* Original Image */}
                    <img
                        className="w-40 h-40 border select-none border-slate-300 object-contain bg-transparent rounded-full cursor-pointer"
                        src={user?.profilePic_URL}
                        alt="profile-picture"
                        onClick={() => setShowPopup(true)}
                    />

                    {/* Popup Enlarged Image */}
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
                    <h5 className="font-medium">{user?.username?.toUpperCase()}</h5>
                </div>

                <button className={`w-full text-xl font-semibold flex gap-4 items-center ${activeMenu == "Dashboard" ? "text-white bg-purple-800" : ""} py-3 hover:bg-purple-800 duration-200 px-6 rounded-lg mb-3 cursor-pointer`} onClick={() => navigate("/dashboard")}><LuLayoutDashboard />Dashboard</button>
                <button className={`w-full text-xl font-semibold flex gap-4 items-center ${activeMenu == "Income" ? "text-white bg-green-500" : ""} py-3 hover:bg-green-500 duration-200 px-6 rounded-lg mb-3 cursor-pointer`} onClick={() => navigate("/dashboard/income")}><LuWalletMinimal />Income</button>
                <button className={`w-full text-xl font-semibold flex gap-4 items-center ${activeMenu == "Expense" ? "text-white bg-red-500" : ""} py-3 px-6 hover:bg-red-500 duration-200 rounded-lg mb-3 cursor-pointer`} onClick={() => navigate("/dashboard/expense")}><LuHandCoins />Expense</button>
                <button className={`w-full text-xl font-semibold flex gap-4 items-center ${activeMenu == "Set Goal" ? "text-white bg-yellow-500" : ""} py-3 px-6 hover:bg-yellow-500 duration-200 rounded-lg mb-3 cursor-pointer`} onClick={() => navigate("/dashboard/setgoal")}><GoGoal />Set Goal</button>
                <button className={`w-full text-xl font-semibold flex gap-4 items-center ${activeMenu == "Transactions" ? "text-white bg-blue-500" : ""} py-3 px-6 hover:bg-blue-500 duration-200 rounded-lg mb-3 cursor-pointer`} onClick={() => navigate("/dashboard/transactions")}><LuHistory />History</button>
                <button className={`w-full text-xl font-semibold flex gap-4 items-center ${activeMenu == "Logout" ? "text-white bg-slate-800" : ""} py-3 px-6 hover:bg-gray-600 duration-200 rounded-lg mb-3 cursor-pointer`} onClick={handleLogOut}><LuLogOut />Logout <span className="text-sm font-medium text-red-600">{message}</span></button>
            </div>
        </div >
    )
}

export default SideMenu;