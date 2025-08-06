import { HiOutlineMenu, HiOutlineX } from "react-icons/hi"
import SideMenu from "./SideMenu"
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTheme } from "../../hooks/useTheme.js"


const slideVariants = {
    initial: {
        x: "-100%",
        opacity: 0,
    },
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            type: "tween",
            duration: 0.3,
        },
    },
    exit: {
        x: "-100%",
        opacity: 0,
        transition: {
            type: "tween",
            duration: 0.2,
        },
    },
};




export default function Navbar({
    activeMenu,
    openSideMenu,
    setOpenSideMenu,
    user
}) {
    const location = useLocation(); // 👈 track current route
    const { theme, toggleTheme } = useTheme();

    // 👇 Close SideMenu when route changes
    useEffect(() => {
        setOpenSideMenu(false);
    }, [location.pathname, setOpenSideMenu]);
    const MotionDiv = motion.div

    return (
        <div className="flex justify-between items-center gap-5 text-xl bg-white shadow-sm py-4 px-7 sticky text-slate-800 dark:bg-slate-900 dark:text-slate-200 top-0 z-50 border-b border-slate-200 dark:border-slate-700">
            <button
                className="hidden max-md:block"
                onClick={() => setOpenSideMenu(!openSideMenu)}
            >
                {openSideMenu ? <HiOutlineX className="text-2xl" /> : <HiOutlineMenu className="text-2xl" />}
            </button>
            <h2 className="font-semibold">Expense Tracker</h2>
            <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 transition-all duration-300"
            >
                {theme === "dark" ? "🌙" : "☀️"}
            </button>


            <AnimatePresence>
                {openSideMenu && (
                    <MotionDiv
                        key="mobile-sidemenu"
                        className="fixed top-[61px] left-0 w-64 h-[calc(100vh-62px)] z-40 shadow-lg"
                        variants={slideVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        <SideMenu activeMenu={activeMenu} user={user} />
                    </MotionDiv>
                )}
            </AnimatePresence>
        </div>

    )
}