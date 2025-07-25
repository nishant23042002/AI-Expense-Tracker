import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
import { useLocation, Outlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";




const MotionDiv = motion.div;
const pageVariants = {
    initial: { rotateY: 90, opacity: 0 },
    animate: {
        rotateY: 0,
        opacity: 1,
        transition: { duration: 0.5 },
    },
    exit: {
        rotateY: -90,
        opacity: 0,
        transition: { duration: 0.3 },
    },
};






const routeToMenu = {
    "/dashboard": "Dashboard",
    "/dashboard/income": "Income",
    "/dashboard/expense": "Expense",
    "/dashboard/setgoal": "Set Goal",
};

const DashboardLayout = () => {
    const location = useLocation();
    const user = useSelector((state) => state.loginState.user);
    // console.log(user);
    const activeMenu = routeToMenu[location.pathname] || "";
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 640); // sm = 640px
    const [openSideMenu, setOpenSideMenu] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const isNowDesktop = window.innerWidth > 640;
            setIsDesktop(isNowDesktop);
            if (isNowDesktop) {
                // Ensure mobile menu is closed
                setOpenSideMenu(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    return (
        <div className="bg-slate-300">
            <Navbar
                activeMenu={activeMenu}
                openSideMenu={openSideMenu}
                setOpenSideMenu={setOpenSideMenu}
                user={user}
            />
            {user && (
                <div className="flex">
                    {isDesktop && (
                        <div>
                            <SideMenu user={user} activeMenu={activeMenu} />
                        </div>
                    )}

                    <MotionDiv
                        key={location.pathname}
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="grow"
                    >
                        <Outlet />
                    </MotionDiv>
                </div>
            )}
        </div>
    )
}

export default DashboardLayout;