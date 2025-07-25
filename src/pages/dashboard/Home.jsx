import { useEffect, useState } from "react"
import axiosInstance from "../../utils/axiosInstance.js"
import { API_PATHS } from "../../utils/apiPath.js";
import HomeInfoCard from "../../component/cards/HomeInfoCard.jsx";
import { IoMdCard, IoMdTrendingUp } from "react-icons/io"
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu"
import TransactionCard from "../../component/cards/RecentTransactions.jsx";
import { useNavigate } from "react-router-dom"


function Home() {
    const [dashboardStats, setDashboardStats] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchDashboardStats = async () => {
        if (loading) return;

        setLoading(true);

        try {
            const res = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
            console.log("API response:", res.data); // 👈 check this
            setDashboardStats(res.data.data); // no .data if it's already flat
        } catch (error) {
            console.log("Dashboard fetch error:", error?.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardStats();
    }, []);




    return (
        <div className="my-5 mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <HomeInfoCard
                    icon={<IoMdCard />}
                    label="Total Balance"
                    value={dashboardStats?.totalBalance}
                    iconColor={"bg-purple-800"}
                    bgColor={"bg-purple-50"}
                />
                <HomeInfoCard
                    icon={<LuWalletMinimal />}
                    label="Total Income"
                    value={dashboardStats?.totalIncome}
                    iconColor={"bg-yellow-500"}
                    bgColor={"bg-yellow-50"}
                />
                <HomeInfoCard
                    icon={<LuHandCoins />}
                    label="Total Expenses"
                    value={dashboardStats?.totalExpense}
                    iconColor={"bg-red-500"}
                    bgColor={"bg-red-50"}
                />

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <TransactionCard transactions={dashboardStats?.recentTransaction} openTransaction={() => navigate("/dashboard/expense")} />
            </div>
        </div>
    );

}
export default Home