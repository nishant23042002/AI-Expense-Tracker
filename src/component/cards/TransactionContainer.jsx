import { LuArrowRight, LuUtensils } from "react-icons/lu";
import TransactionCard from "./TransactionCard";
import moment from "moment"
import { useCountAnimation } from "../../hooks/useCountAnimation";
import { useEffect } from "react";

export default function TransactionContainer({
    transactions = [],
    openTransaction,
    title = "Recent Transactions",
    length = 0,
    dateKey = "date",
    seemoreBtn,
    handleDeleteIncome,
    hideBtn
}) {
    const { counts, animateCount } = useCountAnimation();

    useEffect(() => {
        animateCount(title, length)
    }, [])

    const lengths = counts[title];
    return (
        <div className="xl:w-160 w-full p-6 border text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 rounded-md shadow-sm hover:shadow-md transition-all duration-300">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h5 className="sm:text-lg font-semibold">{title}</h5>
                <p className="text-sm">{lengths} items</p>
            </div>

            {/* See More Button */}
            {seemoreBtn && (
                <div className="flex justify-end">
                    <button
                        onClick={openTransaction}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-indigo-700 border cursor-pointer rounded-lg hover:bg-indigo-100 dark:hover:bg-slate-800 transition"
                    >
                        See more <LuArrowRight size={16} />
                    </button>
                </div>
            )}

            {/* Transactions List */}
            <div className="mt-6">
                {transactions?.map((trxn) => (
                    <TransactionCard
                        key={trxn._id}
                        title={trxn?.source || trxn?.category || "Others"}
                        icon={trxn?.icon || "🔄"}
                        date={moment(trxn?.[dateKey]).format("Do MMM YYYY")}
                        type={trxn?.type}
                        amount={trxn?.amount}
                        aiRecommendation={trxn?.aiRecommendation}
                        txnTime={moment(trxn?.createdAt).local().format("hh:mm A")}
                        handleDeleteIncome={() => handleDeleteIncome(trxn._id)}
                        hideBtn={hideBtn}
                    />
                ))}

            </div>
        </div>
    );
}
