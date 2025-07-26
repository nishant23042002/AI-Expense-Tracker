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


export default function IncomeBySourceAreaChart({ simpleAreaChartData, totalIncome }) {

    return (
        <div className="bg-white p-4 rounded-xl shadow-md w-full h-[500px]">
            <div className="flex justify-between items-center mb-4 w-full">
                <h2 className="text-lg font-semibold text-gray-600 mb-4">Income by Source</h2>
                <span className="text-sm text-gray-500 font-medium">Income: ₹{totalIncome?.toLocaleString("en-IN")}</span>
            </div>
            <ResponsiveContainer className="p-4" width="100%" height="85%">
                <AreaChart data={simpleAreaChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                    <XAxis
                        dataKey="source"
                        tick={{ fontSize: 12 }}
                        interval={0}
                        angle={-10}
                    />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₹${value.toLocaleString("en-IN")}`, "Amount"]} />
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#10b981"
                        fill="#bbf7d0"
                        strokeWidth={2}
                        activeDot={{ r: 6 }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
