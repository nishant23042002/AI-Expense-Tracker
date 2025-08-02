import { HiOutlineMenu, HiOutlineX } from "react-icons/hi"
import SideMenu from "./SideMenu"
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

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

    // 👇 Close SideMenu when route changes
    useEffect(() => {
        setOpenSideMenu(false);
    }, [location.pathname, setOpenSideMenu]);
    const MotionDiv = motion.div

    return (
        <div className="flex gap-5 bg-slate-900 text-slate-100 shadow-sm py-4 px-7 sticky top-0 z-50">
            <button
                className="hidden max-md:block text-slate-300"
                onClick={() => setOpenSideMenu(!openSideMenu)}
            >
                {openSideMenu ? <HiOutlineX className="text-2xl" /> : <HiOutlineMenu className="text-2xl" />}
            </button>
            <h2 className="text-lg font-semibold text-slate-300">Expense Tracker</h2>

            <AnimatePresence>
                {openSideMenu && (
                    <MotionDiv
                        key="mobile-sidemenu"
                        className="fixed top-[61px] left-0 w-64 h-[calc(100vh-62px)] bg-slate-900 z-40 shadow-lg"
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