import { useCallback, useEffect, useState } from "react";
import IncomeOverview from "../../component/Income/IncomeOverview"
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPath";
import AllIncomeTransactions from "../../component/Income/AllIncomeTransactions.jsx";




function Income() {
    const [incomeChartData, setIncomeChartData] = useState([]);
    const [incomeTxnData, setIncomeTxnData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchIncomeData = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const res = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);
            const incomes = res.data?.Incomes || [];

            // Grouping income by category
            const grouped = incomes.reduce((acc, income) => {
                const category = income.category || "Others";
                acc[category] = (acc[category] || 0) + income.amount;
                return acc;
            }, {});

            const chartData = Object.entries(grouped).map(([name, value]) => ({ name, value }));

            setIncomeChartData(chartData);
            setIncomeTxnData(incomes);
        } catch (err) {
            console.error("Failed to fetch income data:", err);
            setError("Something went wrong. Please try again later.");
        } finally {
            setLoading(false);
        }
    }, []);

    const handleAddIncome = async (income) => {
        let { source, amount, icon, receivedDate } = income;
        if (!source.trim()) {
            console.error("Source is required")
            return
        }

        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            console.error("Amount should be greater than 0.")
            return
        }

        if (!receivedDate) {
            console.error("Date is required.");
            return
        }

        try {
            await axiosInstance.post(`${API_PATHS.INCOME.ADD_INCOME}`, { source, amount, receivedDate, icon })
            console.log("Added income");
            setLoading(false)
        } catch (error) {
            setError("Something went wrong. Please try again later.", error);
        }
    }

    // const handleDeleteIncome = async () => {
    //     const res = await axiosInstance.delete(`${API_PATHS.INCOME.DEL_INCOME}`)
    // }

    // const handleDwnldIncome = async () => {
    //     const res = await axiosInstance.get(`${API_PATHS.INCOME.Dwnld_INCOME}`)
    // }

    useEffect(() => {
        fetchIncomeData();
        // handleAddIncome();
        // handleDeleteIncome();
        // handleDwnldIncome();
    }, [fetchIncomeData])
    return (
        <div className="my-5 mx-6">
            <div className="grid grid-cols-1 gap-6">

                {loading && (
                    <h1 className="text-2xl text-slate-600 font-semibold text-center">
                        Loading income data...
                    </h1>
                )}

                {error && (
                    <div className="text-red-600 text-center text-sm font-medium">
                        {error}
                    </div>
                )}


                <div className="">
                    <IncomeOverview income={incomeChartData} handleAddIncome={handleAddIncome} />
                    <AllIncomeTransactions incomeTxnData={incomeTxnData} />
                </div>
            </div>
        </div>
    )
}
export default Income;