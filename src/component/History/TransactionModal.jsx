import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { FaCopy } from "react-icons/fa";
import { useEffect, useState } from "react";
import moment from "moment";
import Swal from "sweetalert2";
import { useCountAnimation } from "../../hooks/useCountAnimation";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import { toast } from "react-toastify";

function TransactionModal({ isOpen, onClose, transaction, onEdit, onDelete, fetchTransactionsData }) {
    const [copied, setCopied] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        source: "",
        amount: "",
    });

    const { counts, animateCount } = useCountAnimation();
    const MotionDiv = motion.div;

    const handleCopyId = () => {
        navigator.clipboard.writeText(transaction._id || "").then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

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
                onDelete(transaction._id, transaction.type);
                onClose();
            }
        });
    };

    const formatTypeBadge = (type) =>
        type === "income" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500";

    useEffect(() => {
        if (transaction) {
            animateCount(transaction?.type, transaction?.amount, 1000);
            setFormData({
                title: transaction?.title || "",
                source: transaction?.source || "",
                amount: transaction?.amount || "",
            });
        }
    }, [transaction]);

    const amountAnimation = counts[transaction?.type];

    const handleSave = async () => {
        try {
            setLoading(true);
            const payload =
                transaction.type === "income"
                    ? {
                        source: formData.source,
                        amount: Number(formData.amount),
                        autoGenerate: true // backend will use AI to fill category/notes
                    }
                    : {
                        title: formData.title,
                        amount: Number(formData.amount),
                        autoGenerate: true
                    };

            const url =
                transaction.type === "income"
                    ? `${API_PATHS.INCOME.EDIT_INCOME}/${transaction._id}`
                    : `${API_PATHS.EXPENSE.EDIT_EXPENSE}/${transaction._id}`;

            await axiosInstance.put(url, payload);
            await fetchTransactionsData();

            onEdit(transaction._id, transaction.type, payload);

            toast.success(`${transaction.type} updated successfully with AI enhancements`);
            setEditMode(false);
            onClose();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update transaction");
        } finally {
            setLoading(false);
        }
    };

    if (!transaction) return null;

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
                        className="dark:bg-slate-800 bg-slate-100 dark:text-slate-200 rounded-2xl shadow-xl p-6 sm:p-8 w-full mx-2 max-w-2xl max-h-[80vh] overflow-y-auto relative"
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                    >
                        {copied && <h1 className="text-center text-green-600 text-xs">Copied!</h1>}

                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 hover:text-red-700 text-2xl cursor-pointer"
                        >
                            <IoClose />
                        </button>

                        <h2 className="text-2xl font-semibold mb-2">
                            {transaction?.icon}{" "}
                            {editMode ? (
                                <input
                                    type="text"
                                    value={transaction.type === "income" ? formData.source : formData.title}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            [transaction.type === "income" ? "source" : "title"]: e.target.value,
                                        })
                                    }
                                    className="border border-slate-300 dark:border-slate-600 rounded px-2 py-1 text-sm w-full dark:bg-slate-700"
                                />
                            ) : (
                                transaction?.title || transaction?.source
                            )}
                        </h2>

                        <div className="flex flex-wrap gap-2 mb-4">
                            <span
                                className={`px-2 py-0.5 text-md rounded-full font-medium ${formatTypeBadge(
                                    transaction.type
                                )}`}
                            >
                                {transaction?.type.toUpperCase()}
                            </span>
                            {!editMode && transaction.category && (
                                <span className="bg-blue-100 text-blue-600 px-2 py-0.5 text-md rounded-full font-medium">
                                    {transaction.category}
                                </span>
                            )}
                        </div>

                        {editMode && (
                            <div className="bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-50 border-l-4 border-yellow-500 text-yellow-900 p-3 rounded-lg mb-4 text-base font-semibold flex items-center gap-2 animate-pulse">
                                <span className="text-2xl">💡</span>
                                AI will automatically fill <span className="underline">Category</span>, <span className="underline">Notes</span>, and <span className="underline">Recommendations</span> based on what you enter here.
                            </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-sm">
                            <div>
                                <p className="text-blue-500 font-medium text-md mb-1">Date :</p>
                                <p>{moment(transaction?.date).format("DD MMM YYYY")}</p>
                            </div>
                            <div>
                                <p className="text-blue-500 font-medium text-md mb-1">Time :</p>
                                <p>{moment(transaction?.createdAt).format("hh:mm A")}</p>
                            </div>
                            <div>
                                <p className="text-blue-500 font-medium text-md mb-1">Amount :</p>
                                {editMode ? (
                                    <input
                                        type="number"
                                        value={formData.amount}
                                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                        className="border border-slate-300 dark:border-slate-600 rounded px-2 py-1 text-sm"
                                    />
                                ) : (
                                    <p
                                        className={`${transaction.type === "income"
                                            ? "text-green-600"
                                            : "text-red-500"
                                            } font-medium`}
                                    >
                                        ₹{amountAnimation?.toLocaleString("en-IN")}
                                    </p>
                                )}
                            </div>
                            <div className="flex justify-center flex-col gap-1">
                                <p className="text-blue-500 font-medium text-md mb-1">Transaction ID :</p>
                                <div className="flex justify-between items-center">
                                    <span className="dark:bg-slate-600 bg-gray-200 px-2 py-0.5 rounded text-xs">
                                        {transaction._id}
                                    </span>
                                    <button
                                        onClick={handleCopyId}
                                        className="text-blue-500 hover:text-blue-700 text-sm"
                                        title="Copy ID"
                                    >
                                        <FaCopy size={14} />
                                    </button>
                                </div>
                            </div>

                            {!editMode && (
                                <>
                                    <div className="sm:col-span-2">
                                        <p className="text-blue-500 text-md font-medium mb-1">Notes : </p>
                                        <p className="font-medium">{transaction?.notes || "—"}</p>
                                    </div>
                                    {transaction?.aiRecommendation && (
                                        <div className="sm:col-span-2">
                                            <p className="text-blue-500 text-md font-medium mb-1">AI Recommendation 💡</p>
                                            <div className="dark:bg-slate-400 bg-slate-200 border border-yellow-200 font-medium dark:text-slate-900 p-3 rounded-md text-sm leading-relaxed whitespace-pre-wrap">
                                                {transaction?.aiRecommendation}
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>

                        <div className="mt-6 flex justify-end gap-3 border-t border-slate-200 dark:border-slate-700 pt-4">
                            {editMode ? (
                                <>
                                    <button
                                        onClick={handleSave}
                                        disabled={loading}
                                        className="px-4 py-2 text-sm rounded-md bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 flex items-center gap-2"
                                    >
                                        {loading && (
                                            <svg
                                                className="animate-spin h-4 w-4 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25 text-black"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8v8H4z"
                                                ></path>
                                            </svg>
                                        )}
                                        Save
                                    </button>
                                    <button
                                        onClick={() => setEditMode(false)}
                                        className="px-4 py-2 text-sm rounded-md bg-gray-500 text-white"
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => setEditMode(true)}
                                        className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => confirmDelete(transaction._id)}
                                        className="px-4 py-2 text-md rounded-md bg-red-400 hover:bg-red-700 text-white duration-150 cursor-pointer"
                                    >
                                        Delete
                                    </button>
                                </>
                            )}
                        </div>
                    </MotionDiv>
                </MotionDiv>
            )}
        </AnimatePresence>
    );
}
export default TransactionModal;
