import moment from "moment";

export const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;

        return (
            <div className="bg-white shadow-md border border-gray-200 rounded p-2 text-sm">
                <p className="font-bold text-slate-600 truncate">{data?.name}</p>
                {
                    data.date && (
                        <p className="font-bold text-slate-600">
                            Date: {moment(data?.date).format("Do MMM YYYY")}
                        </p>
                    )
                }
                <p className="font-bold text-slate-600">₹{data?.value?.toLocaleString("en-IN") || 0}</p>
            </div>
        );
    }
    return null;
};