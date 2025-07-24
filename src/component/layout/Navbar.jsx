import { HiOutlineMenu, HiOutlineX } from "react-icons/hi"
import SideMenu from "./SideMenu"
import { useState } from "react"


export default function Navbar({ activeMenu }) {
    const [openSideMenu, setOpenSideMenu] = useState(false);
    return (
        <div className="flex gap-5 bg-slate-200 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
            <button className="hidden max-sm:block border border-amber-500 text-black" onClick={() => setOpenSideMenu(!openSideMenu)}>
                {openSideMenu ? (
                    <HiOutlineMenu className="text-2xl" />
                ) : (
                    <HiOutlineX className="text-2xl" />
                )}
            </button>

            <h2 className="text-lg font-medium text-black">Expense Tracker</h2>

            {
                openSideMenu && (
                    <div className="fixed top-[61px] -ml-4 bg-white">
                        <SideMenu activeMenu={activeMenu} />
                    </div>
                )
            }
        </div>
    )
}