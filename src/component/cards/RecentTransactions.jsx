import { LuArrowRight, LuUtensils } from "react-icons/lu";
import TransactionCard from "./TransactionCard";
import moment from "moment"

export default function RecentTransactions({
    transactions = [],
    openTransaction,
    title = "Recent Transactions",
    length = 0,
    dateKey = "date",
    sourceKey = "source"
}) {
    if (!transactions || transactions.length === 0) return <p>No Transactions made to show.</p>;

    return (
        <div className="xl:w-130 w-full sm:h-[500px] bg-slate-100 p-6 rounded-2xl border hover:shadow-xl duration-200 border-gray-200 shadow-md">
            <div className="flex items-center justify-between mb-4">
                <h5 className="sm:text-xl font-semibold text-slate-500">{title}</h5>
                <p className="text-base text-gray-500">{length} items</p>
            </div>

            <div className="flex justify-end">
                <button
                    onClick={openTransaction}
                    className="inline-flex font-semibold items-center gap-2 px-4 py-2 text-sm cursor-pointer  text-purple-700 hover:text-purple-800 border border-gray-200 rounded-lg bg-purple-50 hover:bg-gray-100 transition-all"
                >
                    See more <LuArrowRight size={16} />
                </button>
            </div>

            <div className="mt-6">
                {
                    transactions?.slice(0, 4)?.map((trxn) => (

                        <TransactionCard
                            key={trxn._id}
                            title={trxn?.[sourceKey]}
                            icon={trxn?.icon}
                            date={moment(trxn?.[dateKey]).format("Do MMM YYYY")}
                            type={trxn?.type}
                            amount={trxn?.amount}
                            hideDelBtn
                        />
                    ))
                }
            </div>
        </div>
    );
}
