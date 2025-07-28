import { Tooltip } from "react-tooltip";
import { HiOutlineLightBulb } from "react-icons/hi";
import { motion } from "framer-motion";
import { format } from "date-fns";

export default function AllIncomeTransactions({ incomeTxnData = [] }) {
    if (!incomeTxnData.length) {
        return (
            <div className="text-center text-gray-500 mt-6">
                No income transactions found.
            </div>
        );
    }

    console.log(incomeTxnData);
    const MotionDiv = motion.div

    return (
        <div className="mt-6 space-y-4">
            <h1 className="text-2xl font-semibold text-slate-600">Income Transactions: </h1>
            {incomeTxnData.map((txn) => (
                <MotionDiv
                    key={txn._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="group flex items-start justify-between p-4 rounded-xl shadow-sm hover:shadow-md bg-white hover:bg-gray-50 transition-all duration-200"
                >
                    {/* Icon & Category */}
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 flex items-center justify-center text-2xl rounded-full bg-gray-100">
                            {txn.icon || "💰"}
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-700">{txn.source}</p>
                            <p className="text-xs text-gray-500">
                                {format(new Date(txn.receivedDate), "do MMM yyyy, h:mm a")}
                            </p>
                        </div>
                    </div>

                    {/* Amount & Category */}
                    <div className="text-right space-y-1">
                        <p className="text-green-600 text-sm font-bold">
                            + ₹{txn.amount.toLocaleString()}
                        </p>
                        <p className="text-xs text-slate-500">
                            {txn.isAICategorized ? txn.category : "Uncategorized"}
                        </p>
                    </div>

                    {/* AI Suggestion Icon */}
                    {txn.aiRecommendation && (
                        <>
                            <div className="ml-3 mt-1 cursor-pointer">
                                <HiOutlineLightBulb
                                    data-tooltip-id={`ai-tip-${txn._id}`}
                                    data-tooltip-content={txn.aiRecommendation}
                                    className="text-yellow-400 text-xl hover:scale-110 transition-transform duration-150"
                                />
                            </div>
                            <Tooltip
                                id={`ai-tip-${txn._id}`}
                                className="max-w-xs text-xs"
                                place="top"
                                delayShow={400}
                            />
                        </>
                    )}
                </MotionDiv>
            ))}
        </div>
    );
}
