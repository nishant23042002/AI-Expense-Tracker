import { useEffect, useState } from "react"
import axiosInstance from "../../utils/axiosInstance.js"
import { API_PATHS } from "../../utils/apiPath.js";
import HomeInfoCard from "../../component/Cards/HomeInfoCard.jsx";
import { IoMdCard } from "react-icons/io"
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu"
import { useNavigate } from "react-router-dom"
import FinancialOverview from "../../component/Cards/FinancialOverview.jsx";
import Last30DaysExpenses from "../../component/Cards/Last30DaysExpenses.jsx";
import Last60DaysIncome from "../../component/Cards/Last60DaysIncome.jsx";
import TransactionContainer from "../../component/Cards/TransactionContainer.jsx";


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

    const expenseTxnLength = dashboardStats?.recentTransaction?.filter((item) => item.type == "expense").length || 0
    const incomeTxnLength = dashboardStats?.recentTransaction?.filter((item) => item.type == "income").length || 0
    return (
        <div className="my-5 mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-slate-700 dark:text-slate-200">
                <HomeInfoCard
                    icon={<IoMdCard />}
                    label="Total Balance"
                    value={dashboardStats?.totalBalance}
                    iconColor="bg-indigo-600 text-white"
                    bgColor="bg-indigo-50 dark:bg-slate-800"
                />
                <HomeInfoCard
                    icon={<LuWalletMinimal />}
                    label="Total Income"
                    value={dashboardStats?.totalIncome}
                    iconColor="bg-emerald-500 text-white"
                    bgColor="bg-emerald-50 dark:bg-slate-800"
                    navigate={() => navigate("/dashboard/income")}
                />
                <HomeInfoCard
                    icon={<LuHandCoins />}
                    label="Total Expenses"
                    value={dashboardStats?.totalExpense}
                    iconColor="bg-rose-500 text-white"
                    bgColor="bg-rose-50 dark:bg-slate-800"
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
                        {/* PieCharts */}
                        <FinancialOverview
                            totalBalance={dashboardStats?.totalBalance}
                            totalIncome={dashboardStats?.totalIncome}
                            totalExpense={dashboardStats?.totalExpense}
                        />
                        <Last30DaysExpenses
                            pieChartData={pieChartDataForExpenses}
                        />



                        <TransactionContainer
                            transactions={dashboardStats?.recentTransaction?.slice(0, 4)}
                            openTransaction={() => navigate("/dashboard/transactions")}
                            title="Recent Transactions"
                            length={dashboardStats?.recentTransaction?.length}
                            dateKey="date"
                            seemoreBtn
                        />
                        <TransactionContainer
                            transactions={dashboardStats?.last30DaysExpenses?.transaction?.slice(0, 4)}
                            openTransaction={() => navigate("/dashboard/expense")}
                            title="Recent Expense Transactions"
                            length={expenseTxnLength}
                            dateKey="spentDate"
                            seemoreBtn
                        />
                        <TransactionContainer
                            transactions={dashboardStats?.last60DaysIncomeTransactions?.transaction.slice(0, 4)}
                            openTransaction={() => navigate("/dashboard/income")}
                            title="Recent Income Transactions"
                            length={incomeTxnLength}
                            dateKey="receivedDate"
                            seemoreBtn
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