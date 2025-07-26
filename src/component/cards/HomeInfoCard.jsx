import React from "react";

function HomeInfoCard({ icon, label, value = 0, iconColor, bgColor, navigate }) {
    return (
        <div onClick={navigate} className={`cursor-pointer rounded-2xl shadow-md p-5 flex items-center justify-between  duration-300 hover:shadow-xl ${bgColor}`}>
            <div className={`w-14 h-14 drop-shadow-xl ${iconColor} text-4xl text-white rounded-full text-[26px] flex justify-center items-center`}>
                {icon}
            </div>
            <div className="text-right">
                <h4 className="text-sm text-slate-500 font-medium">{label}</h4>
                <p className="text-xl font-semibold text-slate-800">
                    ₹ {value?.toLocaleString("en-IN")}
                </p>
            </div>
        </div>
    );
}

export default HomeInfoCard
