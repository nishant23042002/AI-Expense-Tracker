import {
    PieChart,
    Pie,
    Tooltip,
    Cell,
    ResponsiveContainer,
    Legend
} from "recharts";
import CustomLegend from "../utilityComponent/CustomLegend";
import { CustomTooltip } from "../utilityComponent/CustomTooltip";

const COLORS = [
    "#e6194b", // red
    "#3cb44b", // green
    "#ffe119", // yellow
    "#0082c8", // blue
    "#f58231", // orange
    "#911eb4", // purple
];






function Last30DaysExpenses({ pieChartData }) {

    const sortedPieChartData = [...pieChartData].sort((a, b) => a.name.localeCompare(b.name));
    const totalExpense = sortedPieChartData.reduce((acc, curr) => acc + curr.value, 0);

    return (
        <div className="lg:w-130 w-full h-[500px] p-6 text-slate-600 dark:text-slate-200 rounded-md hover:shadow-xl duration-200 shadow-md border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center w-full">
                <h2 className="sm:text-xl font-semibold">Expenses Last 30 Days</h2>
                <span className="text-smfont-medium">Total Spent: ₹{totalExpense?.toLocaleString("en-IN")}</span>
            </div>

            <ResponsiveContainer width="100%" height={380}>
                <PieChart>
                    <Pie
                        data={sortedPieChartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        labelLine={false}
                        label={({ percent, x, y }) => (
                            <text x={x} y={y} fill="#e5e7eb" textAnchor="center" dominantBaseline="central" fontSize={12}>
                                {(percent * 100).toFixed(0)}%
                            </text>
                        )}
                    >
                        {sortedPieChartData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend content={<CustomLegend />} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
export default Last30DaysExpenses