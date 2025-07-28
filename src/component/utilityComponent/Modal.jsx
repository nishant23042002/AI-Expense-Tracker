import { AnimatePresence, motion } from "framer-motion";
import { HiOutlineX } from "react-icons/hi";

export default function Modal({ setIsOpenModal }) {
    const MotionDiv = motion.div
    return (
        <AnimatePresence>
            <MotionDiv
                className="fixed inset-0 top-14 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 120 }}
            >
                <div className="relative w-full max-w-2xl max-h-[80vh] my-4 overflow-y-auto rounded-xl shadow-lg bg-slate-100">
                    <div className="relative pb-6">
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-300">
                            <h1 className="text-lg font-semibold text-slate-700">Add Income</h1>
                            <button onClick={setIsOpenModal}>
                                <HiOutlineX className="text-2xl text-slate-600 hover:text-red-500 transition cursor-pointer" />
                            </button>
                        </div>

                        {/* Modal Content goes here */}
                        <div className="p-6 md:p-8 bg-slate-100 rounded-xl space-y-6">
                            <div>
                                <label htmlFor="source" className="block text-sm font-medium text-slate-600 mb-1">
                                    Source <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="source"
                                    id="source"
                                    placeholder="e.g., Freelance, Salary"
                                    required
                                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-600 transition"
                                />
                            </div>

                            {/* Icon */}
                            <div>
                                <label htmlFor="icon" className="block text-sm font-medium text-slate-600 mb-1">
                                    Icon (optional)
                                </label>
                                <input
                                    type="text"
                                    name="icon"
                                    id="icon"
                                    placeholder="e.g., 💼, 🛒"
                                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-400 transition"
                                />
                            </div>

                            {/* Amount */}
                            <div>
                                <label htmlFor="amount" className="block text-sm font-medium text-slate-600 mb-1">
                                    Amount <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="amount"
                                    id="amount"
                                    placeholder="e.g., 4000"
                                    required
                                    step="500"
                                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-400 transition"
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-slate-600 mb-1">
                                    Category
                                </label>
                                <select
                                    name="category"
                                    id="category"
                                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-400 transition"
                                >
                                    <option value="">Select a category</option>
                                    {/* Example static options */}
                                    <option value="salary">Salary</option>
                                    <option value="freelance">Freelance</option>
                                    <option value="business">Business</option>
                                </select>
                            </div>

                            {/* Received Date */}
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Received Date</label>
                                <input
                                    type="date"
                                    name="receivedDate"
                                    size={"300px"}
                                    className="w-full mt-1 p-2 text-slate-600 border border-slate-200 focus:outline-none focus:ring focus:ring-green-200 rounded-md"
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="w-full md:w-auto px-6 py-2 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition"
                                >
                                    Save Income
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </MotionDiv>
        </AnimatePresence >
    )
}