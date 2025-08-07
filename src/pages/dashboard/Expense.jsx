import { useCallback, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ExpenseOverview from "../../components/ExpenseStats/ExpenseOverview"
import AllExpenseTransactions from "../../components/ExpenseStats/AllExpenseTransactions";
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPath.js";
import { useModal } from "../../hooks/useModal.js";




function Expense() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [expenseTxnData, setExpenseTxnData] = useState([]);
    const [loading, setLoading] = useState(false);
    const { closeModal } = useModal()

    const fetchExpenseData = useCallback(async () => {
        setLoading(true)
        setIsSubmitting(true)
        try {
            const res = await axiosInstance.get(`${API_PATHS.EXPENSE.GET_MY_EXPENSE}`)
            setExpenseTxnData(res.data.Expenses || []);
        } catch (error) {
            console.log(error)
            toast.error(error.message || "Something went wrong!!!")
        } finally {
            setIsSubmitting(false);
            setLoading(false)
        }
    }, []);

    const handleAddExpense = async (expense) => {
        const { source, amount, icon, receivedDate } = expense;

        // Rename source -> title, receivedDate -> spentDate
        const payload = {
            title: source,
            amount,
            spentDate: receivedDate,
            icon,
        };

        // Validation
        if (!payload.title.trim()) return toast.error("Title is required");
        if (!payload.amount || isNaN(payload.amount) || Number(payload.amount) <= 0) return toast.error("Amount must be greater than 0");
        if (!payload.spentDate) return toast.error("Date is required");

        try {
            setIsSubmitting(true);
            const res = await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, payload);
            toast.success(res?.data?.message || "Expense added");
            await fetchExpenseData();
            closeModal();
        } catch (err) {
            console.error(err.response?.data || err.message);
            toast.error(err.response?.data?.message || "Failed to add expense");
        } finally {
            setIsSubmitting(false);
        }
    };





    const handleDeleteExpense = async (expenseId) => {
        try {
            let res = await axiosInstance.delete(`${API_PATHS.EXPENSE.DEL_EXPENSE}/${expenseId}`);
            toast.success(res.message || "Expense Deleted")
            await fetchExpenseData();
        } catch (error) {
            toast.error(error.message || "Something went wrong")
        }
    }

    useEffect(() => {
        fetchExpenseData();
    }, [])
    return (
        <div className="my-5 mx-auto px-4">
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
                <ExpenseOverview
                    expenseChartData={expenseTxnData}
                    handleSubmit={handleAddExpense}
                    isSubmitting={isSubmitting}
                />
                <AllExpenseTransactions
                    loading={loading}
                    expenseTxnData={expenseTxnData}
                    handleDeleteExpense={handleDeleteExpense}
                />
            </div>
        </div>

    )
}
export default Expense;