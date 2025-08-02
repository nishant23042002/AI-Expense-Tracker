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


export default function Last60DaysIncome({ simpleAreaChartData }) {
    const navigate = useNavigate()

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
        <div className="relative z-30 bg-gray-900 border border-slate-700 p-4 rounded-md shadow-md w-full h-[500px] overflow-hidden">
            <div className="flex justify-between items-center mb-4 w-full">
                <h2 className="text-lg font-semibold text-gray-200 mb-4">Income Last 60 Days</h2>
                <div className="flex flex-col gap-1.5">
                    <h1 className="text-sm text-gray-200 text-end font-medium">Income: ₹{income.toLocaleString("en-IN")}</h1>
                    <button
                        onClick={() => navigate("/dashboard/income")}
                        className="inline-flex font-semibold items-center gap-2 px-4 py-2 text-sm cursor-pointer  text-green-500 hover:text-green-600 border border-slate-700 rounded-lg bg-slate-900 hover:bg-gray-100 transition-all"
                    >
                        Add Income <LuArrowRight size={16} />
                    </button>
                </div>
            </div>
            <ResponsiveContainer className="p-4" width="100%" height="85%">
                <AreaChart data={totalIncome}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                    <XAxis
                        dataKey="name"
                        tick={{ fontSize: window.innerWidth <= 800 ? 8 : 10 }}
                        angle={-10}
                        textAnchor="end"
                        stroke="#dcdcdc"
                        interval={0}
                    />
                    <YAxis stroke="#dcdcdc" />
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
