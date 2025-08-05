import { useCallback, useEffect, useState } from "react";
import IncomeOverview from "../../component/IncomeStats/IncomeOverview.jsx";
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPath";
import AllIncomeTransactions from "../../component/IncomeStats/AllIncomeTransactions.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useModal } from "../../hooks/useModal.js";

function Income() {
    const [incomeChartData, setIncomeChartData] = useState([]);
    const [incomeTxnData, setIncomeTxnData] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const { closeModal } = useModal()
    
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const fetchIncomeData = useCallback(async () => {
        setError("");
        try {
            const res = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);
            const incomes = res.data?.Incomes || [];

            // Grouping income by category
            const monthlyTotals = Array(12).fill(0); // Initialize with 12 months

            incomes.forEach(item => {
                const date = new Date(item.receivedDate);
                const monthIndex = date.getMonth(); // 0 (Jan) - 11 (Dec)
                monthlyTotals[monthIndex] += item.amount;
            });

            const data = months.map((month, index) => ({
                name: month,
                value: monthlyTotals[index]
            }));

            setIncomeChartData(data);
            setIncomeTxnData(incomes);
        } catch (err) {
            console.error("Failed to fetch income data:", err);           
        }
    }, []);

    const handleAddIncome = async (income) => {
        let { source, amount, icon, receivedDate } = income;
        if (!source.trim()) {
            toast.error("Source is required");
            return;
        }

        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            toast.error("Amount should be greater than 0.");
            return;
        }

        if (!receivedDate) {
            toast.error("Date is required.");
            return;
        }

        try {
            setIsSubmitting(true)
            await axiosInstance.post(`${API_PATHS.INCOME.ADD_INCOME}`, { source, amount, receivedDate, icon })
            toast.success("Income added successfully");
            closeModal()
            await fetchIncomeData();
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Please try again later.");
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleDeleteIncome = async (incomeId) => {
        try {
            setIsSubmitting(true);
            await axiosInstance.delete(`${API_PATHS.INCOME.DEL_INCOME}/${incomeId}`);
            toast.success("Income deleted successfully");
            await fetchIncomeData();
        } catch (error) {
            console.error("Delete error:", error);
            toast.error(error.message || "Failed to delete income. Try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    // const handleDwnldIncome = async () => {
    //     const res = await axiosInstance.get(`${API_PATHS.INCOME.Dwnld_INCOME}`)
    // }

    useEffect(() => {
        fetchIncomeData();
        // handleDeleteIncome();
        // handleDwnldIncome();
    }, [])
    return (
        <div className="my-5 mx-6">
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="grid grid-cols-1 gap-6">

                {error && (
                    <div className="text-red-600 text-center text-sm font-medium">
                        {error}
                    </div>
                )}


                <div className="dark:text-slate-200 text-slate-700">
                    <IncomeOverview income={incomeChartData} handleSubmit={handleAddIncome} isSubmitting={isSubmitting} />
                    <AllIncomeTransactions
                        incomeTxnData={incomeTxnData}
                        handleDeleteIncome={handleDeleteIncome}
                    />
                </div>
            </div>
        </div>
    )
}
export default Income;