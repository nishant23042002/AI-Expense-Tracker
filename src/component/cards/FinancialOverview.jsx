import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import CustomLegend from "../utilityComponent/CustomLegend";
import CustomTooltip from "../utilityComponent/CustomTooltip";

const COLORS = ["#845EC2", "#00C9A7", "#FFC75F", "#FF6F91", "#4B4453"];

function FinancialOverview({ totalBalance, totalIncome, totalExpense }) {
    const balanceData = [
        { name: "Total Balance", amount: totalBalance },
        { name: "Total Income", amount: totalIncome },
        { name: "Total Expense", amount: totalExpense }
    ]
    return (
        <div className="lg:w-130 w-full h-[500px] bg-slate-50 p-6 rounded-2xl border hover:shadow-xl duration-200 border-gray-100 shadow-md">
            <div className="flex justify-between items-center mb-4 w-full">
                <h5 className="sm:text-xl font-semibold text-slate-500">Financial Overview</h5>
                <span className="text-sm text-gray-500 font-medium">Total Income: ₹{totalIncome?.toLocaleString("en-IN")}</span>
            </div>
            <ResponsiveContainer width="100%" height={380}>
                <PieChart>
                    <Pie data={balanceData}
                        dataKey="amount"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={130}
                        innerRadius={100}
                        labelLine={false}
                        label={({ percent, x, y }) => (
                            <text x={x} y={y} fill="#333" textAnchor="middle" dominantBaseline="central" fontSize={12}>
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