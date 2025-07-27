import { useState } from "react";
import { HiOutlineX } from "react-icons/hi";
import { LuArrowRight } from "react-icons/lu";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { CustomTooltip } from "../utilityComponent/CustomTooltip.jsx";







export default function IncomeBySourceAreaChart({ simpleAreaChartData }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    if (!simpleAreaChartData || simpleAreaChartData.length === 0) return <p>No Transactions made to show.</p>;

    const totalIncome = simpleAreaChartData.sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5)
        .sort((a, b) => new Date(a.date) - new Date(b.date)).map(val => val.value);
    const income = totalIncome.reduce((acc, curr) => acc + curr, 0);



    const formattedChartData = [...simpleAreaChartData]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5)
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .map((item) => ({
            ...item,
            // just use name for x-axis
            label: item.name,
        }));





    const MotionDiv = motion.div
    return (
        <div className="relative z-30 bg-slate-100 p-4 rounded-xl shadow-md w-full h-[500px] overflow-hidden">
            <div className="flex justify-between items-center mb-4 w-full">
                <h2 className="text-lg font-semibold text-gray-600 mb-4">Income by Source</h2>
                <div className="flex flex-col gap-1.5">
                    <h1 className="text-sm text-gray-500 text-end font-medium">Income: ₹{income?.toLocaleString("en-IN")}</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex font-semibold items-center gap-2 px-4 py-2 text-sm cursor-pointer  text-green-500 hover:text-green-600 border border-gray-200 rounded-lg bg-green-50 hover:bg-gray-100 transition-all"
                    >
                        Add Income <LuArrowRight size={16} />
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {
                    isModalOpen && (
                        <MotionDiv
                            className="h-[300px] border bg-black w-[350px] left-150 z-50 absolute top-10"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 120 }}
                        >
                            <div className="">
                                <button onClick={() => setIsModalOpen(false)}>
                                    <HiOutlineX className="text-2xl text-white cursor-pointer" />
                                </button>
                                <h1 className="text-center">heelllo</h1>
                            </div>
                        </MotionDiv>
                    )
                }
            </AnimatePresence>
            <ResponsiveContainer className="p-4" width="100%" height="85%">
                <AreaChart data={formattedChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                    <XAxis
                        dataKey="label"
                        tick={{ fontSize: window.innerWidth <= 800 ? 8 : 10 }}
                        angle={-10}
                        textAnchor="end"
                        interval={0}
                    />
                    <YAxis />
                    <Area
                        type="monotone"
                        dataKey="value"
                        nameKey="name"
                        stroke="#10b981"
                        fill="#bbf7d0"
                        strokeWidth={2}
                        activeDot={{ r: 6 }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                </AreaChart>
            </ResponsiveContainer>

        </div>
    );
}
