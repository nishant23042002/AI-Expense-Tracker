import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { HiOutlineX } from "react-icons/hi";

export default function Modal({
    type,
    setIsOpenModal,
    handleSubmit,
    isSubmitting
}) {
    const isIncome = type === "income";

    const [formData, setFormData] = useState({
        source: "",
        amount: "",
        receivedDate: "",
        icon: "",
        category: ""
    });

    const handleChange = (key, value) => setFormData((prev) => ({ ...prev, [key]: value }));

    const MotionDiv = motion.div;
    return (
        <AnimatePresence>
            <MotionDiv
                className="fixed inset-0 top-14 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 120 }}
            >
                <div className="relative w-full max-w-2xl max-h-[80vh] my-4 rounded-xl shadow-lg bg-slate-100 overflow-y-hidden">
                    <div className="relative pb-6">
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-300">
                            <h1 className="text-lg font-semibold text-slate-700">
                                {isIncome ? "Add Income" : "Add Expense"}
                            </h1>
                            <button onClick={setIsOpenModal}>
                                <HiOutlineX className="text-2xl text-slate-600 hover:text-red-500 transition cursor-pointer" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 md:p-8 bg-slate-100 rounded-xl space-y-6">
                            {/* Source/Title */}
                            <div>
                                <label htmlFor="source" className="block text-sm font-medium text-slate-600 mb-1">
                                    {isIncome ? "Source" : "Title"} <span className="text-red-500">*</span>
                                </label>
                                <input
                                    onChange={(e) => handleChange("source", e.target.value)}
                                    value={formData.source}
                                    type="text"
                                    id="source"
                                    placeholder={isIncome ? "e.g., Salary, Freelance" : "e.g., Rent, Food"}
                                    className={`${isIncome ? "w-full p-2 text-slate-600 border border-slate-200 rounded-md focus:outline-none focus:ring focus:ring-green-200" : "w-full p-2 text-slate-600 border border-slate-200 rounded-md focus:outline-none focus:ring focus:ring-red-500"}`}
                                />
                            </div>

                            {/* Icon */}
                            <div>
                                <label htmlFor="icon" className="block text-sm font-medium text-slate-600 mb-1">
                                    Icon (optional)
                                </label>
                                <input
                                    onChange={(e) => handleChange("icon", e.target.value)}
                                    value={formData.icon}
                                    type="text"
                                    id="icon"
                                    placeholder={`${isIncome ? "e.g. 💼, 📊" : "e.g. 💸, 🍕"}`}
                                    className={`${isIncome ? "w-full p-2 text-slate-600 border border-slate-200 rounded-md focus:outline-none focus:ring focus:ring-green-200" : "w-full p-2 text-slate-600 border border-slate-200 rounded-md focus:outline-none focus:ring focus:ring-red-500"}`}
                                />
                            </div>

                            {/* Amount */}
                            <div>
                                <label htmlFor="amount" className="block text-sm font-medium text-slate-600 mb-1">
                                    Amount <span className="text-red-500">*</span>
                                </label>
                                <input
                                    onChange={(e) => handleChange("amount", e.target.value)}
                                    value={formData.amount}
                                    type="number"
                                    id="amount"
                                    placeholder="e.g., 4000"
                                    required
                                    step="100"
                                    className={`${isIncome ? "w-full p-2 text-slate-600 border border-slate-200 rounded-md focus:outline-none focus:ring focus:ring-green-200" : "w-full p-2 text-slate-600 border border-slate-200 rounded-md focus:outline-none focus:ring focus:ring-red-500"}`}
                                />
                            </div>

                            {/* Date */}
                            <div>
                                <label htmlFor="receivedDate" className="block text-sm font-medium text-gray-600 mb-1">
                                    {isIncome ? "Received Date" : "Spent Date"}
                                </label>
                                <input
                                    onChange={(e) => handleChange("receivedDate", e.target.value)}
                                    value={formData.receivedDate}
                                    type="date"
                                    id="receivedDate"
                                    className={`${isIncome ? "w-full p-2 text-slate-600 border border-slate-200 rounded-md focus:outline-none focus:ring focus:ring-green-200" : "w-full p-2 text-slate-600 border border-slate-200 rounded-md focus:outline-none focus:ring focus:ring-red-500"}`}
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <button
                                    onClick={() => handleSubmit(formData)}
                                    disabled={isSubmitting}
                                    className={`${isIncome ? "w-full flex gap-4 items-center justify-center px-6 py-2 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition" : "w-full flex gap-4 items-center justify-center px-6 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition"}`}
                                >
                                    {isSubmitting
                                        ? isIncome ? "Adding Income" : "Adding Expense"
                                        : isIncome ? "Add Income" : "Add Expense"}
                                    {isSubmitting && (
                                        <div className="w-4 h-4 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </MotionDiv>
        </AnimatePresence>
    );
}
