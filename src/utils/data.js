import { LuLayoutDashboard, LuHandCoins, LuWalletMinimal, LuLogOut } from "react-icons/lu"


export const SIDEMENU_ROUTES = [
    {
        id: "01",
        label: "Dashboard",
        icon: LuLayoutDashboard,
        path: "/dashboard"
    },
    {
        id: "02",
        label: "Income",
        icon: LuWalletMinimal,
        path: "/income"
    },
    {
        id: "03",
        label: "Expense",
        icon: LuHandCoins,
        path: "/expense"
    },
    {
        id: "04",
        label: "Set Goal",
        icon: LuLayoutDashboard,
        path: "/setgoal"
    },
    {
        id: "05",
        label: "Log Out",
        icon: LuLogOut,
        path: "logout"
    },
]