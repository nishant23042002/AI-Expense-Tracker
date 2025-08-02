import { LuArrowRight, LuUtensils } from "react-icons/lu";
import TransactionCard from "./TransactionCard";
import moment from "moment"

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
    return (
        <div className="xl:w-160 w-full bg-slate-900 p-6 rounded-xl border border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h5 className="sm:text-lg font-semibold text-slate-200">{title}</h5>
                <p className="text-sm text-slate-200">{length} items</p>
            </div>

            {/* See More Button */}
            {seemoreBtn && (
                <div className="flex justify-end">
                    <button
                        onClick={openTransaction}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 border border-slate-700 rounded-lg bg-slate-900 hover:bg-indigo-100 transition"
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
                        icon={trxn?.icon}
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
