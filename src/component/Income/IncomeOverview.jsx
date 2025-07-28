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
import { useEffect, useState } from "react";
import Modal from "../utilityComponent/Modal";
import { useModal } from "../../hooks/useModal.js"




export default function IncomeOverview({ income, handleAddIncome }) {
    const { isOpenModal, openModal, closeModal } = useModal();
    const [filteredIncome, setFilteredIncome] = useState([]);
    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;

            if (!income) return;

            // Show fewer bars on small screens
            if (screenWidth < 540) {
                setFilteredIncome(income.slice(0, 3));
            } else if (screenWidth < 768) {
                setFilteredIncome(income.slice(0, 4));
            } else {
                setFilteredIncome(income);
            }
        };

        handleResize(); // Initial check
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [income]);

    if (!income || income.length === 0) return <p className="text-center text-gray-500 py-8">No income data available.</p>;
    const totalAmount = income.reduce((acc, curr) => acc + curr.value, 0)
    return (
        <div>
            <h1 className="text-2xl mb-4 font-semibold text-slate-600">Income Overview: </h1>
            <div className="relative bg-slate-100 z-30 rounded-2xl shadow-md p-4 sm:p-6 md:p-8 w-full max-w-full mx-auto mb-10 border border-gray-200">
                <div className="flex justify-between items-center mb-4 w-full">
                    <h2 className="text-lg font-semibold text-gray-600 mb-4">Income by Source</h2>
                    <div className="flex flex-col items-center gap-3">
                        <span className="text-slate-600 font-medium">Total: ₹ {totalAmount.toLocaleString("en-IN") || 0}</span>
                        <button
                            onClick={openModal}
                            className="inline-flex font-semibold items-center gap-2 px-4 py-2 text-sm cursor-pointer  text-green-500 hover:text-green-600 border border-gray-200 rounded-lg bg-green-50 hover:bg-green-100 transition-all"
                        >
                            Add Income <LuArrowRight size={16} />
                        </button>
                    </div>
                </div>

                {isOpenModal && <Modal handleAddIncome={handleAddIncome} setIsOpenModal={closeModal} />}

                <div className="h-[250px] sm:h-[300px] md:h-[400px] lg:h-[450px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={filteredIncome}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                            <XAxis
                                dataKey="name"
                                tick={{ fontSize: 12 }}
                                axisLine={{ stroke: '#ddd' }}
                            />
                            <YAxis
                                tick={{ fontSize: 12 }}
                                axisLine={{ stroke: '#ddd' }}
                            />
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
