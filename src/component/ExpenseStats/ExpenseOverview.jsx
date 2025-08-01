import { LuArrowRight } from "react-icons/lu";
import { XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend, BarChart, Bar } from "recharts";
import { CustomTooltip } from "../utilityComponent/CustomTooltip"
import CustomLegend from "../utilityComponent/CustomLegend"
import { useModal } from "../../hooks/useModal.js";
import Modal from "../utilityComponent/Modal.jsx";
import { memo, useMemo } from "react";





function ExpenseOverview({ type, expenseChartData, handleSubmit, isSubmitting }) {
    const categoryTotals = {};
    const { isOpenModal, openModal, closeModal } = useModal();

    expenseChartData.forEach((txn) => {
        const category = txn.category || "Others";
        categoryTotals[category] = (categoryTotals[category] || 0) + txn.amount;
    });

    const barChartData = useMemo(() => {
        return Object.entries(categoryTotals).map(([name, value]) => ({ name, value: value }));
    }, [expenseChartData]);


    const totalAmount = useMemo(() => {
        return expenseChartData.reduce((acc, curr) => acc + curr.amount, 0);
    }, [expenseChartData]);


    return (
        <div>
            <h1 className="text-2xl mb-4 font-semibold text-slate-600">Expense Overview: </h1>
            <div className="relative bg-slate-100 z-30 rounded-2xl shadow-md p-4 sm:p-6 md:p-8 w-full max-w-full mx-auto mb-10 border border-gray-200">
                <div className="flex justify-between items-center mb-4 w-full">
                    <h2 className="sm:text-lg font-semibold text-gray-600 mb-4">Expense by Source</h2>
                    <div className="flex flex-col items-center gap-3">
                        <span className="text-slate-600 text-sm sm:text-lg font-medium">Total: ₹ {totalAmount?.toLocaleString("en-IN") || 0}</span>
                        <button
                            onClick={openModal}
                            className="inline-flex font-semibold items-center gap-2 px-4 py-2 text-sm cursor-pointer  text-red-500 hover:text-red-600 border border-gray-200 rounded-lg bg-green-50 hover:bg-red-100 transition-all"
                        >
                            {type == "expense" ? "Add Expense" : "Add Income"} <LuArrowRight size={16} />
                        </button>
                    </div>
                </div>

                {isOpenModal && <Modal type={type} handleSubmit={handleSubmit} setIsOpenModal={closeModal} isSubmitting={isSubmitting} />}

                <div className="h-[250px] sm:h-[300px] md:h-[400px] lg:h-[450px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={barChartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend content={<CustomLegend />} />
                            <Bar
                                dataKey="value"
                                fill="#b22222"
                                radius={[8, 8, 0, 0]}
                                barSize={100}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>

    )
}

export default memo(ExpenseOverview)