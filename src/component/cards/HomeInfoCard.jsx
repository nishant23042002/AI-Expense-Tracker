
function HomeInfoCard({ icon, label, value = 0, iconColor, bgColor, navigate }) {
    return (
        <div
            onClick={navigate}
            className={`cursor-pointer border border-slate-200 dark:border-slate-700  rounded-md shadow-sm p-5 flex items-center justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${bgColor}`}
        >
            <div
                className={`w-16 h-16 ${iconColor} text-2xl rounded-full flex justify-center items-center shadow-md`}
            >
                {icon}
            </div>
            <div className="text-right">
                <h4 className="text-sm font-medium">{label}</h4>
                <p className="text-xl font-bold">
                    ₹ {value?.toLocaleString("en-IN")}
                </p>
            </div>
        </div>
    );
}

export default HomeInfoCard;
