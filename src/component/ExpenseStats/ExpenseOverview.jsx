import { LuArrowRight } from "react-icons/lu";
import { XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend, BarChart, Bar } from "recharts";
import { CustomTooltip } from "../utilityComponent/CustomTooltip"
import CustomLegend from "../utilityComponent/CustomLegend"
import { useModal } from "../../hooks/useModal.js";
import Modal from "../utilityComponent/Modal.jsx";
import { memo, useMemo } from "react";
import {useTheme} from "../../hooks/useTheme.js"




function ExpenseOverview({ expenseChartData, handleSubmit, isSubmitting }) {
    const {theme} = useTheme()
    const categoryTotals = {};
    const { isOpenModal, openModal, closeModal, modalType } = useModal();

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
    const isDark = theme == "dark"

    return (
        <div>
            <h1 className="text-2xl text-slate-700 dark:text-slate-200 mb-4 font-semibold">Expense Overview</h1>

            <div className="relative text-slate-700 dark:text-slate-200 rounded-md shadow-sm hover:shadow-md transition-all duration-300 p-6 w-full mx-auto mb-10 border border-slate-200 dark:border-slate-700">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="sm:text-lg font-semibold">Expense by Source</h2>
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-sm sm:text-lg font-medium">
                            Total: ₹ {totalAmount?.toLocaleString("en-IN") || 0}
                        </span>
                        <button
                            onClick={() => openModal("expense")}
                            className="inline-flex items-center cursor-pointer gap-2 px-4 py-2 text-sm font-medium text-white bg-rose-500 hover:bg-rose-600 rounded-lg shadow-sm transition"
                        >
                            Add Expense
                            <LuArrowRight size={16} />
                        </button>
                    </div>
                </div>

                {/* Modal */}
                {isOpenModal && (
                    <Modal        
                        type={modalType}             
                        handleSubmit={handleSubmit}
                        setIsOpenModal={closeModal}
                        isSubmitting={isSubmitting}
                    />
                )}

                {/* Chart */}
                <div className="h-[250px] sm:h-[300px] md:h-[400px] lg:h-[450px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={barChartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke={isDark ? "#e5e7eb" : "#374151"} />
                            <YAxis tick={{ fontSize: 12 }} stroke={isDark ? "#e5e7eb" : "#374151"}/>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend content={<CustomLegend />} />
                            <Bar
                                dataKey="value"
                                fill="#f87171" // Tailwind rose-400
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