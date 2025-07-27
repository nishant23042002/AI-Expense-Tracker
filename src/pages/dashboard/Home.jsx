import { useEffect, useState } from "react"
import axiosInstance from "../../utils/axiosInstance.js"
import { API_PATHS } from "../../utils/apiPath.js";
import HomeInfoCard from "../../component/cards/HomeInfoCard.jsx";
import { IoMdCard } from "react-icons/io"
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


    const simpleAreaChartData = dashboardStats?.last60DaysIncomeTransactions?.incomeLast60Days || []

    useEffect(() => {
        fetchDashboardStats();
    }, []);
    console.log("Last60daysIncome Transactions", simpleAreaChartData);
    console.log("Recent transaction: ", dashboardStats?.recentTransaction);
    console.log("Income transaction: ", dashboardStats?.last60DaysIncomeTransactions?.transaction);
    console.log("Expense transaction: ", dashboardStats?.last30DaysExpenses?.transaction);

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
            {
                dashboardStats ? (
                    <div className="flex flex-wrap max-md:justify-center gap-6 mt-6">
                        {/* Simple AreaChart */}
                        <Last60DaysIncome
                            totalIncome={dashboardStats?.totalIncome}
                            simpleAreaChartData={simpleAreaChartData}
                        />


                        <TransactionCard
                            transactions={dashboardStats?.recentTransaction}
                        />
                        <TransactionCard
                            transactions={dashboardStats?.last60DaysIncomeTransactions?.transaction}
                            openTransaction={() => navigate("/dashboard/income")}
                        />
                        <TransactionCard
                            transactions={dashboardStats?.last30DaysExpenses?.transaction}
                            openTransaction={() => navigate("/dashboard/expense")}
                        />

                        {/* PieCharts */}
                        <FinancialOverview
                            totalBalance={dashboardStats?.totalBalance}
                            totalIncome={dashboardStats?.totalIncome}
                            totalExpense={dashboardStats?.totalExpense}
                        />
                        <Last30DaysExpenses
                            pieChartData={pieChartDataForExpenses}
                        />
                    </div>
                ) : (
                    <div className="flex items-center justify-center p-8">
                        <h1 className="font-bold text-2xl text-slate-600">No data for STATS.</h1>
                    </div>
                )
            }

        </div>
    );
}
export default Home