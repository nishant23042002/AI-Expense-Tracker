
function HomeInfoCard({ icon, label, value = 0, iconColor, bgColor, navigate }) {
    return (
        <div
            onClick={navigate}
            className={`cursor-pointer border border-slate-700 bg-slate-900 rounded-md shadow-sm p-5 flex items-center justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${bgColor}`}
        >
            <div
                className={`w-14 h-14 ${iconColor} text-white text-3xl rounded-full flex justify-center items-center shadow-md`}
            >
                {icon}
            </div>
            <div className="text-right text-slate-200">
                <h4 className="text-sm font-medium">{label}</h4>
                <p className="text-xl font-bold">
                    ₹ {value?.toLocaleString("en-IN")}
                </p>
            </div>
        </div>
    );
}

export default HomeInfoCard;
