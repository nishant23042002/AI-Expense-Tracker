export default function CustomTooltip({ active, payload }) {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 rounded-xl shadow text-sm">
                <p className="font-semibold">{payload[0].name}</p>
                <p>₹{payload[0].value}</p>
            </div>
        );
    }

    return null;
};
