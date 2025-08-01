import { LuTrash, LuTrendingDown, LuTrendingUp } from "react-icons/lu";
import { FcIdea } from "react-icons/fc";
import { memo, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import Swal from 'sweetalert2';



function TransactionCard({ title, icon, date, amount, type, txnTime, hideBtn, handleDeleteIncome, aiRecommendation }) {
    const [aiTip, setAiTip] = useState(false);

    const confirmDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to recover this transaction!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#aaa',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                handleDeleteIncome();
            }
        });
    };
    return (
        <div className="group my-2 border border-gray-200 bg-gray-100 relative flex flex-col sm:flex-row gap-3 sm:gap-4 p-3 rounded-lg hover:bg-gray-200 shadow hover:shadow-md transition-all duration-200">
            {/* Icon */}
            <div className="w-14 h-14 text-xl bg-gray-100 rounded-full text-gray-600 flex justify-center items-center self-center sm:self-auto">
                {icon}
            </div>
            {/* AI Recommendation Tooltip */}
            {aiTip && (
                <div onClick={() => setAiTip(false)} className="absolute z-10 top-0 left-0 right-0 w-60 max-w-[80vw] bg-white border border-yellow-200 rounded-md shadow-md p-3 text-sm text-gray-700">
                    <p className="whitespace-pre-wrap font-medium text-amber-900">{aiRecommendation}</p>
                </div>
            )}
            {/* Details */}
            <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between w-full gap-2">
                {/* Title + Date */}
                <div className="flex flex-col text-center sm:text-left sm:w-1/3">
                    <p className="text-sm sm:text-base font-bold text-slate-600 truncate">{title}</p>
                    <p className="text-xs text-gray-500 mt-1">{date}</p> <span className="text-xs text-gray-500 mt-1">{txnTime}</span>
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-center sm:justify-start gap-3 sm:gap-5">

                    {hideBtn && (
                        <button
                            onClick={confirmDelete}
                            className="text-md border border-gray-200 text-red-400 p-1.5 cursor-pointer rounded-full hover:bg-red-50 transition opacity-0 group-hover:opacity-100"
                        >
                            <LuTrash size={18} />
                        </button>
                    )}
                    <button
                        onClick={() => setAiTip(prev => !prev)}
                        className="relative text-md border border-gray-200 p-1.5 cursor-pointer rounded-full hover:bg-yellow-50 transition"
                    >
                        <FcIdea />
                    </button>


                </div>

                {/* Amount */}
                <div>
                    <button className="w-full items-center flex justify-end gap-2 text-xl cursor-pointer"><CiMenuKebab /></button>
                    <div className={`flex items-center justify-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium ${type === "income" ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"}`}>
                        {type === "income" ? `+ ₹${amount}` : `- ₹${amount}`}
                        {type === "income" ? <LuTrendingUp /> : <LuTrendingDown />}
                    </div>

                </div>
            </div>
        </div>
    );
}
export default memo(TransactionCard)