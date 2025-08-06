import { LuTrash, LuTrendingDown, LuTrendingUp } from "react-icons/lu";
import { FcIdea } from "react-icons/fc";
import { memo, useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Swal from 'sweetalert2';
import { useCountAnimation } from "../../hooks/useCountAnimation.js"


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
    const { counts, animateCount } = useCountAnimation()
    const [aiTip, setAiTip] = useState(false);
    const [menu, setMenu] = useState(false);

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

    useEffect(() => {
        animateCount(title, amount)
    }, [title, amount])

    const amounts = counts[title];

    return (
        <div draggable className="group my-2 border dark:border-slate-700 border-slate-200 relative flex flex-col justify-center items-center sm:flex-row gap-3 p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
            {/* Icon */}
            <div className="w-14 h-14 dark:bg-slate-200 text-xl rounded-full flex justify-center items-center shadow-sm">
                <span>{icon}</span>
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
                <div className="flex flex-col text-center sm:text-left sm:w-1/3">
                    <p className="text-sm sm:text-base font-semibold truncate">{title}</p>
                    <p className="text-xs mt-1">{date}</p>
                    <span className="text-xs">{txnTime}</span>
                </div>

                {/* Action Buttons */}

                {/* Amount */}
                <div className="relative flex flex-row-reverse justify-center items-center">
                    <button onClick={() => setMenu((prev) => !prev)} className="items-center flex justify-end gap-2 text-2xl text-slate-500 cursor-pointer">
                        <BsThreeDotsVertical />
                    </button>
                    {menu &&
                        <div className="flex flex-col gap-2 z-50 justify-center items-center h-30 w-20 rounded-md absolute top-10 right-6 border border-slate-200 dark:border-slate-700 dark:bg-slate-900 bg-white">
                            <button
                                onClick={() => setAiTip((prev) => !prev)}
                                className="p-1.5 border border-slate-200 dark:border-slate-700 rounded-full hover:bg-amber-50 transition cursor-pointer"
                            >
                                <FcIdea />
                            </button>
                            {hideBtn && (
                                <button
                                    onClick={confirmDelete}
                                    className="p-1.5 border border-slate-200 rounded-full dark:bg-slate-900 dark:border-slate-700 hover:text-white transition cursor-pointer bg-white hover:bg-red-600 text-red-600"
                                >
                                    <LuTrash size={18} />
                                </button>
                            )}
                        </div>
                    }

                    <div
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium ${type === "income"
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-rose-100 text-rose-500"
                            }`}
                    >
                        {type === "income" ? `+ ₹${amounts}` : `- ₹${amounts}`}
                        {type === "income" ? <LuTrendingUp /> : <LuTrendingDown />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(TransactionCard)