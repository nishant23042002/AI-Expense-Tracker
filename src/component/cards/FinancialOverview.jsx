import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import CustomLegend from "../utilityComponent/CustomLegend";
import { CustomTooltip } from "../utilityComponent/CustomTooltip";
import { useTheme } from "../../hooks/useTheme.js";


const COLORS = ["#9932cc", "#7cfc00", "#ff0000"];

function FinancialOverview({ totalBalance, totalIncome, totalExpense }) {

    const { theme } = useTheme();
    const balanceData = [
        { name: "Total Balance", value: totalBalance },
        { name: "Total Income", value: totalIncome },
        { name: "Total Expense", value: totalExpense }
    ]


    if (!balanceData || balanceData.length === 0) return <p>No Financial Data to show.</p>;

    const isDark = theme == "dark"
    return (
        <div className="lg:w-130 w-full h-[500px] p-6 rounded-md text-slate-600 dark:text-slate-200 hover:shadow-xl duration-200 shadow-md border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center w-full">
                <h5 className="sm:text-xl font-semibold duration-200">Financial Overview</h5>
                <span className="text-sm font-medium">Total Income: ₹{totalIncome?.toLocaleString("en-IN")}</span>
            </div>
            <ResponsiveContainer width="100%" height={380}>
                <PieChart>
                    <Pie data={balanceData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        labelLine={false}
                        label={({ percent, x, y }) => (
                            <text x={x} y={y} fill={isDark ? "#e5e7eb" : "#374151"} textAnchor="center" dominantBaseline="central" fontSize={12}>
                                {(percent * 100).toFixed(0)}%
                            </text>
                        )}
                    >
                        {balanceData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>

                    <Tooltip content={<CustomTooltip />} />
                    <Legend content={<CustomLegend />} />
                </PieChart>
            </ResponsiveContainer>
        </div>

    )
}

export default FinancialOverview;