import { LuTrash, LuTrendingDown, LuTrendingUp } from "react-icons/lu";
import { FcIdea } from "react-icons/fc";
import { memo, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Swal from 'sweetalert2';



function TransactionCard({
    title,
    icon,
    date,
    amount,
    type,
    txnTime,
    hideBtn,
    handleDeleteIncome,
    aiRecommendation
}) {
    const [aiTip, setAiTip] = useState(false);

    const confirmDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to recover this transaction!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#9ca3af",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                handleDeleteIncome();
            }
        });
    };

    return (
        <div className="group my-2 border border-slate-700 bg-gray-800 relative flex flex-col sm:flex-row gap-3 p-3 rounded-lg hover:bg-slate-900 shadow-sm hover:shadow-md transition-all duration-200">
            {/* Icon */}
            <div className="w-14 h-14 text-xl bg-slate-900 rounded-full text-slate-600 flex justify-center items-center shadow-sm">
                {icon}
            </div>

            {/* AI Tip */}
            {aiTip && (
                <div
                    onClick={() => setAiTip(false)}
                    className="absolute z-10 top-0 left-0 right-0 w-60 max-w-[80vw] bg-white border border-amber-200 rounded-md shadow-lg p-3 text-sm text-slate-700"
                >
                    <p className="whitespace-pre-wrap font-medium text-amber-900">{aiRecommendation}</p>
                </div>
            )}

            {/* Main Details */}
            <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between w-full gap-2">
                {/* Title + Date */}
                <div className="flex flex-col text-center text-slate-300 sm:text-left sm:w-1/3">
                    <p className="text-sm sm:text-base font-semibold truncate">{title}</p>
                    <p className="text-xs mt-1">{date}</p>
                    <span className="text-xs">{txnTime}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-center sm:justify-start gap-3 sm:gap-5">
                    {hideBtn && (
                        <button
                            onClick={confirmDelete}
                            className="p-1.5 text-rose-500 border border-slate-200 rounded-full hover:bg-rose-50 transition opacity-0 group-hover:opacity-100"
                        >
                            <LuTrash size={18} />
                        </button>
                    )}
                    <button
                        onClick={() => setAiTip((prev) => !prev)}
                        className="p-1.5 border border-slate-200 rounded-full hover:bg-amber-50 transition"
                    >
                        <FcIdea />
                    </button>
                </div>

                {/* Amount */}
                <div className="flex flex-row-reverse justify-between items-center">
                    <button className="items-center flex justify-end gap-2 text-2xl text-slate-500 cursor-pointer">
                        <BsThreeDotsVertical />
                    </button>
                    <div
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium ${type === "income"
                                ? "bg-emerald-100 text-emerald-600"
                                : "bg-rose-100 text-rose-500"
                            }`}
                    >
                        {type === "income" ? `+ ₹${amount}` : `- ₹${amount}`}
                        {type === "income" ? <LuTrendingUp /> : <LuTrendingDown />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(TransactionCard)