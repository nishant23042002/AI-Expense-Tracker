import { useEffect, useState } from "react"
import axiosInstance from "../../utils/axiosInstance.js"
import { API_PATHS } from "../../utils/apiPath.js";
import HomeInfoCard from "../../component/cards/HomeInfoCard.jsx";
import { IoMdCard, IoMdTrendingUp } from "react-icons/io"
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu"
import TransactionCard from "../../component/cards/RecentTransactions.jsx";
import { useNavigate } from "react-router-dom"
import FinancialOverview from "../../component/cards/FinancialOverview.jsx";
import Last30DaysExpenses from "../../component/cards/Last30DaysExpenses.jsx";
import Last60DaysIncome from "../../component/cards/Last60DaysIncome.jsx";


function Home() {
    const [dashboardStats, setDashboardStats] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


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

    const last30daysExpense = dashboardStats?.last30DaysExpenses?.transaction || [];
    const groupByCategoryExpense = {}
    last30daysExpense.forEach(txn => {
        const category = txn.category || "Others"
        groupByCategoryExpense[category] = (groupByCategoryExpense[category] || 0) + txn.amount;
    });
    const pieChartDataForExpenses = Object.entries(groupByCategoryExpense).map(([name, value]) => ({
        name,
        value
    }));

    const source = dashboardStats?.last60DaysIncomeTransactions?.transaction || []
    const groupBySource = {}

    source.forEach(txn => {
        let src = txn.source || "Others";
        if (isMobile && src.length > 10) {
            src = src.slice(0, 10) + "…";
        }
        groupBySource[src] = (groupBySource[src] || 0) + txn.amount;
    });

    const simpleAreaChartData = Object.entries(groupBySource).map(([source, value]) => ({
        source,
        value
    }))
    console.log(simpleAreaChartData);



    useEffect(() => {
        fetchDashboardStats();
    }, []);

    return (
        <div className="my-5 mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                    navigate={() => navigate("/dashboard/expense")}
                />

            </div>

            <div className="flex flex-wrap max-md:justify-center gap-6 mt-6">
                <Last60DaysIncome
                    totalIncome={dashboardStats?.totalIncome}
                    simpleAreaChartData={simpleAreaChartData}
                />

                <TransactionCard
                    transactions={dashboardStats?.recentTransaction}
                    openTransaction={() => navigate("/dashboard/expense")}
                />

                <FinancialOverview
                    totalBalance={dashboardStats?.totalBalance}
                    totalIncome={dashboardStats?.totalIncome}
                    totalExpense={dashboardStats?.totalExpense}
                />

                <Last30DaysExpenses
                    pieChartData={pieChartDataForExpenses}
                />

            </div>
        </div>
    );
}
export default Home