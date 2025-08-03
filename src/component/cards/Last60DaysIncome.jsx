import { LuArrowRight } from "react-icons/lu";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { CustomTooltip } from "../utilityComponent/CustomTooltip.jsx";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme.js"

export default function Last60DaysIncome({ simpleAreaChartData }) {
    const navigate = useNavigate()
    const { theme } = useTheme();

    const isDark = theme == "dark"
    const groupedByName = {};

    simpleAreaChartData.forEach((entry) => {
        if (!groupedByName[entry.name]) {
            groupedByName[entry.name] = 0;
        }
        groupedByName[entry.name] += entry.value;
    });

    const totalIncome = Object.entries(groupedByName).map(([name, value]) => ({
        name,
        value
    }));


    const income = totalIncome.reduce((acc, curr) => acc + curr.value, 0);

    console.log(simpleAreaChartData);

    return (
        <div className="relative z-30 p-4 rounded-md shadow-md w-full h-[500px] overflow-hidden border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200">
            <div className="flex justify-between items-center mb-4 w-full">
                <h2 className="text-lg font-semibold mb-4">Income Last 60 Days</h2>
                <div className="flex flex-col gap-1.5">
                    <h1 className="text-sm text-end font-medium">Income: ₹{income.toLocaleString("en-IN")}</h1>
                    <button
                        onClick={() => navigate("/dashboard/income")}
                        className="inline-flex font-semibold items-center gap-2 px-4 py-2 text-sm cursor-pointer  text-green-500 hover:text-green-600 border rounded-lg  hover:bg-gray-100 dark:hover:bg-slate-800 transition-all"
                    >
                        Add Income <LuArrowRight size={16} />
                    </button>
                </div>
            </div>
            <ResponsiveContainer className="p-4 text-red-600" width="100%" height="85%">
                <AreaChart data={totalIncome}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                        dataKey="name"
                        tick={{ fontSize: window.innerWidth <= 800 ? 10 : 14 }}
                        angle={-10}
                        textAnchor="end"                       
                        stroke={isDark ? "#e5e7eb" : "#374151"}
                        interval={0}
                    />
                    <YAxis stroke={isDark ? "#e5e7eb" : "#374151"} />
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
