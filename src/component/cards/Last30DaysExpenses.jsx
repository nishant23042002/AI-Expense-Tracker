import {
    PieChart,
    Pie,
    Tooltip,
    Cell,
    ResponsiveContainer,
    Legend
} from "recharts";
import CustomLegend from "../utilityComponent/CustomLegend";
import CustomTooltip from "../utilityComponent/CustomTooltip";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#ffbb28", "#00c49f"];

function Last30DaysExpenses({ pieChartData }) {
    const totalExpense = pieChartData.reduce((acc, curr) => acc + curr.value, 0);

    if (!pieChartData || pieChartData?.length === 0) return <p>No expenses to show.</p>;

    return (
        <div className="lg:w-130 w-full h-[500px] bg-slate-50 p-6 rounded-2xl border hover:shadow-xl duration-200 border-gray-100 shadow-md">
            <div className="flex justify-between items-center w-full">
                <h2 className="sm:text-xl font-semibold text-slate-500">Expenses Last 30 Days</h2>
                <span className="text-sm text-gray-500 font-medium">Total Spent: ₹{totalExpense?.toLocaleString("en-IN")}</span>
            </div>

            <ResponsiveContainer className="mt-4" width="100%" height={380}>
                <PieChart className="mt-4">
                    <Pie
                        data={pieChartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                       
                        fill="#8884d8"
                        labelLine={false}
                        label={({ percent, x, y }) => (
                            <text x={x} y={y} fill="#333" textAnchor="middle" dominantBaseline="central" fontSize={12}>
                                {(percent * 100).toFixed(0)}%
                            </text>
                        )}
                    >
                        {pieChartData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                        <Tooltip content={<CustomTooltip />} />
                        <Legend content={<CustomLegend />} />
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Last30DaysExpenses;