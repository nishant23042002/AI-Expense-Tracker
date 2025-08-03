import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { FaCopy } from "react-icons/fa";
import { useState } from "react";
import moment from "moment";

function TransactionModal({ isOpen, onClose, transaction, onEdit, onDelete }) {
    const [copied, setCopied] = useState(false);
    if (!transaction) return null;
    const MotionDiv = motion.div
    const handleCopyId = () => {
        navigator.clipboard.writeText(transaction._id || "").then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };


    const formatTypeBadge = (type) =>
        type === "income"
            ? "bg-green-100 text-green-600"
            : "bg-red-100 text-red-500";

    return (
        <AnimatePresence>
            {isOpen && (
                <MotionDiv
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <MotionDiv
                        className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-2xl max-h-[80vh] overflow-y-auto relative"
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                    >
                        {copied && <h1 className="text-center text-green-600 text-xs">Copied!</h1>}
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl"
                        >
                            <IoClose />
                        </button>

                        {/* Title */}
                        <h2 className="text-2xl font-semibold text-slate-800 mb-2">{transaction?.icon} {transaction?.title || transaction?.source}</h2>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className={`px-2 py-0.5 text-md rounded-full font-medium ${formatTypeBadge(transaction.type)}`}>
                                {transaction.type}
                            </span>
                            {transaction.category && (
                                <span className="bg-blue-100 text-blue-600 px-2 py-0.5 text-md rounded-full font-medium">
                                    {transaction.category}
                                </span>
                            )}
                         
                        </div>

                        {/* Info */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-sm text-slate-700">
                            <div>
                                <p className="text-blue-500 font-medium text-md mb-1">Date</p>
                                <p>{moment(transaction?.date).format("DD MMM YYYY")}</p>
                            </div>
                            <div>
                                <p className="text-blue-500 font-medium text-md mb-1">Time</p>
                                <p>{moment(transaction?.createdAt).format("hh:mm A")}</p>
                            </div>
                            <div>
                                <p className="text-blue-500 font-medium text-md mb-1">Amount</p>
                                <p className={`${transaction.type === "income" ? "text-green-600" : "text-red-500"} font-medium`}>
                                    ₹{transaction.amount}
                                </p>
                            </div>
                            <div className="flex justify-center flex-col gap-1">
                                <p className="text-blue-500 font-medium text-md mb-1">Transaction ID : </p>
                                <div className="flex justify-between items-center">
                                    <span className="bg-gray-100 py-0.5 rounded text-xs">{transaction._id}</span>
                                    <button
                                        onClick={handleCopyId}
                                        className="text-blue-500 hover:text-blue-700 text-sm"
                                        title="Copy ID"
                                    >
                                        <FaCopy size={14} />
                                    </button>
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <p className="text-blue-500 text-md font-medium mb-1">Description</p>
                                <p className="text-slate-700 font-medium">{transaction?.notes || "—"}</p>
                            </div>
                            {transaction?.aiRecommendation && (
                                <div className="sm:col-span-2">
                                    <p className="text-blue-500 text-md font-medium mb-1">AI Recommendation 💡</p>
                                    <div className="bg-yellow-50 border border-yellow-200 text-amber-800 p-3 rounded-md text-sm leading-relaxed whitespace-pre-wrap">
                                         {transaction?.aiRecommendation}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="mt-6 flex justify-end gap-3 border-t border-slate-200 pt-4">
                            <button
                                onClick={() => onEdit(transaction)}
                                className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => {
                                    onDelete(transaction);
                                    onClose();
                                }}
                                className="px-4 py-2 text-sm rounded-md bg-red-500 text-white hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </MotionDiv>
                </MotionDiv>
            )}
        </AnimatePresence>
    );
}
export default TransactionModal
