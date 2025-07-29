import { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";

export default function AllIncomeTransactions({ incomeTxnData = [] }) {
    const [tipsState, setTipsState] = useState({}); // { txnId: { showTip: true, isLoading: false } }

    if (!incomeTxnData.length) {
        return (
            <div className="text-center text-gray-500 mt-6">
                No income transactions found.
            </div>
        );
    }
    const MotionDiv = motion.div
    const handleTipClick = (txnId) => {
        const current = tipsState[txnId];

        // Toggle if already visible
        if (current?.showTip) {
            setTipsState((prev) => ({
                ...prev,
                [txnId]: { showTip: false, isLoading: false },
            }));
            return;
        }

        // Show loading, then tip
        setTipsState((prev) => ({
            ...prev,
            [txnId]: { showTip: true, isLoading: true },
        }));

        setTimeout(() => {
            setTipsState((prev) => ({
                ...prev,
                [txnId]: { showTip: true, isLoading: false },
            }));
        }, 1000);
    };

    return (
        <div className="mt-6 space-y-4 xl:w-200 mx-auto">
            <h1 className="text-2xl font-semibold text-slate-600">Income Transactions:</h1>
            {incomeTxnData.map((txn) => {
                const tipState = tipsState[txn._id] || {};
                return (
                    <MotionDiv
                        layout
                        key={txn._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="group flex flex-col gap-2 h-auto justify-between p-4 rounded-xl shadow-sm hover:shadow-md bg-white hover:bg-gray-50 transition-all duration-200"
                    >

                        {/* Top Section */}
                        <div className="flex justify-between items-start">
                            {/* Icon & Source */}
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
                        </div>

                        {/* Tip Button */}
                        {txn.aiRecommendation && (
                            <div className="mt-2 flex justify-end">
                                <button
                                    onClick={() => handleTipClick(txn._id)}
                                    className="text-sm px-3 py-1 rounded-lg border border-yellow-300 text-yellow-700 bg-yellow-50 hover:bg-yellow-100 transition-all"
                                >
                                    {tipState.showTip ? "Hide Tip" : "Show Tip"}
                                </button>
                            </div>
                        )}

                        {/* Tip Content */}
                        {tipState.showTip && (
                            <MotionDiv
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="text-sm text-gray-600 bg-yellow-50 p-3 mt-2 rounded-md border border-yellow-200"
                            >
                                {tipState.isLoading ? (
                                    <span className="animate-pulse text-yellow-600">Loading AI tip...</span>
                                ) : (
                                    txn.aiRecommendation
                                )}
                            </MotionDiv>
                        )}

                    </MotionDiv>
                );
            })}
        </div>
    );
}
