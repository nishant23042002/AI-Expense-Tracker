import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Legend
} from "recharts";
import { CustomTooltip } from "../utilityComponent/CustomTooltip";
import { LuArrowRight } from "react-icons/lu";
import Modal from "../utilityComponent/Modal";
import { useModal } from "../../hooks/useModal.js"
import { memo, useMemo } from "react";
import { useTheme } from "../../hooks/useTheme.js";




function IncomeOverview({ income, handleSubmit, isSubmitting }) {
    const { isOpenModal, openModal, closeModal, modalType } = useModal();
    const { theme } = useTheme()



    const totalAmount = useMemo(() => {
        return income.reduce((acc, curr) => acc + curr.value, 0);
    }, [income])



    const isDark = theme == "dark"
    return (
        <div>
            <h1 className="text-2xl mb-4 font-semibold">Income Overview: </h1>
            <div className="relative z-30 rounded-md shadow-md p-4 sm:p-6 md:p-8 w-full max-w-full mx-auto mb-10 border dark:border-slate-700 border-slate-200">
                <div className="flex justify-between items-center mb-4 w-full">
                    <h2 className="text-lg font-semibold mb-4">Income by Source</h2>
                    <div className="flex flex-col items-center gap-3">
                        <span className="font-medium">Total: ₹ {totalAmount?.toLocaleString("en-IN") || 0}</span>
                        <button
                            onClick={() => openModal("income")}
                            className="inline-flex items-center cursor-pointer gap-2 px-4 py-2 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-lg shadow-sm transition"
                        >
                            Add Income <LuArrowRight size={16} />
                        </button>
                    </div>
                </div>

                {isOpenModal && <Modal type={modalType} handleSubmit={handleSubmit} setIsOpenModal={closeModal} isSubmitting={isSubmitting} />}

                <div className="h-[250px] sm:h-[300px] md:h-[400px] lg:h-[450px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={income}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke={isDark ? "#e5e7eb" : "#374151"} />
                            <YAxis tick={{ fontSize: 12 }} stroke={isDark ? "#e5e7eb" : "#374151"} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Bar
                                dataKey="value"
                                fill="#4CAF50"
                                radius={[8, 8, 0, 0]}
                                barSize={40}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
export default memo(IncomeOverview)