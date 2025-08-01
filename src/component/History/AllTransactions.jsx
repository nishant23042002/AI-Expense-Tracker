import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import TransactionModal from "./TransactionModal";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import moment from "moment";






function useDebounce(value, delay = 300) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
}

export default function AllTransactions() {
    const [txnData, setTxnData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [filterType, setFilterType] = useState("all");
    const [sortBy, setSortBy] = useState("date-desc");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [value, setValue] = useState("");

    const debouncedSearch = useDebounce(value, 300);

    const handleOpenModal = useCallback((txn) => {
        setSelectedTransaction(txn);
        setIsModalOpen(true);
    }, []);


    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    const fetchTransactionsData = async () => {
        try {
            const res = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
            setTxnData(res?.data?.data?.recentTransaction || []);
        } catch (error) {
            toast.error(error.message || "Something went wrong");
        }
    };

    useEffect(() => {
        fetchTransactionsData();
    }, []);

    const filteredTransactions = useMemo(() => {
        const lowerCaseValue = debouncedSearch.trim().toLowerCase();

        return txnData
            .filter((txn) => {
                const matchesSearch =
                    lowerCaseValue === "" || [
                        txn._id,
                        txn.amount?.toString(),
                        txn.category,
                        txn.source,
                        txn.title,
                        txn.notes
                    ]
                        .filter(Boolean)
                        .some((field) =>
                            field.toString().toLowerCase().includes(lowerCaseValue)
                        );

                const matchesType = filterType === "all" || txn.type === filterType;
                const matchesFromDate = !fromDate || new Date(txn.date) >= new Date(fromDate);
                const matchesToDate = !toDate || new Date(txn.date) <= new Date(toDate);

                return matchesSearch && matchesType && matchesFromDate && matchesToDate;
            })
            .sort((a, b) => {
                if (sortBy === "date-asc") return new Date(a.date) - new Date(b.date);
                if (sortBy === "date-desc") return new Date(b.date) - new Date(a.date);
                if (sortBy === "amount-asc") return a.amount - b.amount;
                if (sortBy === "amount-desc") return b.amount - a.amount;
                return 0;
            });
    }, [txnData, filterType, fromDate, toDate, sortBy, debouncedSearch]);


    return (
        <div className="min-h-screen bg-slate-100 p-4 sm:p-6 md:p-8">
            <div className=" mx-auto">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">📜 Transaction History</h1><span className="text-blue-600 font-bold text-md">Total Transactions made : {txnData?.length || 0}</span>
                </div>
                <p className="text-gray-500 mb-6">Click a transaction to view more details.</p>

                {/* Filter & Sort Controls */}
                <div className="bg-white rounded-md shadow p-4 mb-6 flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                        <label className="text-sm text-slate-600 font-medium">Filter:</label>
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="p-1.5 border border-gray-300 rounded-md text-sm"
                        >
                            <option value="all">All</option>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
                        <label>From:</label>
                        <input
                            type="date"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1 text-sm"
                        />
                        <label>To:</label>
                        <input
                            type="date"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1 text-sm"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <label className="text-sm text-slate-600 font-medium">Sort by:</label>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="p-1.5 border border-gray-300 rounded-md text-sm"
                        >
                            <option value="date-desc">Date (Newest)</option>
                            <option value="date-asc">Date (Oldest)</option>
                            <option value="amount-desc">Amount (High → Low)</option>
                            <option value="amount-asc">Amount (Low → High)</option>
                        </select>
                    </div>
                </div>
                <div className="border border-slate-200 shadow focus-within:shadow-md mb-2 duration-200">
                    <input value={value} className="p-4 font-medium w-full rounded-md outline-none" type="search" placeholder="eg. search with category, transactionId, amount." name="search" id="search" onChange={(e) => setValue(e.target.value)} />
                </div>
                {/* Table Head for Desktop */}
                <div className="hidden sm:grid grid-cols-5 px-4 py-2 text-sm text-gray-500 font-semibold border-b bg-gray-50 rounded-t-md">
                    <div>Icon</div>
                    <div>Date</div>
                    <div>Amount</div>
                    <div>Category</div>
                    <div>Time</div>
                </div>

                {/* Transaction List */}
                <div className="flex flex-col gap-4 mt-2">
                    {filteredTransactions.length > 0 ? (
                        filteredTransactions.map((txn) => (
                            <div
                                key={txn._id}
                                onClick={() => handleOpenModal(txn)}
                                className="bg-white rounded-md border border-slate-200 shadow hover:shadow-md transition cursor-pointer p-4 flex flex-col sm:grid sm:grid-cols-5 sm:items-center gap-y-2 gap-x-4"
                            >
                                {/* Icon */}
                                <div className="max-lg:text-[10px] text-xl text-center sm:text-left">{txn?.icon || "📝"}</div>

                                {/* Date */}
                                <div className="max-lg:text-[10px] text-sm text-gray-600 text-center sm:text-left">
                                    {moment(txn?.date).format("DD MMM YYYY")}
                                </div>

                                {/* Amount */}
                                <div
                                    className={`max-lg:text-[10px] text-sm font-semibold text-center sm:text-left ${txn.type === "income" ? "text-green-600" : "text-red-500"
                                        }`}
                                >
                                    {txn.type === "income" ? "+ ₹" : "- ₹"}
                                    {txn.amount}
                                </div>

                                {/* Category */}
                                <div className="max-lg:text-[10px] text-sm text-slate-700 font-medium text-center sm:text-left truncate">
                                    {txn.category}
                                </div>

                                {/* Time */}
                                <div className="max-lg:text-[10px] text-sm text-blue-600 text-center sm:text-left">
                                    {moment(txn?.createdAt).format("hh:mm A")}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-400 py-10 text-sm">No transactions found.</div>
                    )}
                </div>
            </div>

            {/* Transaction Modal */}
            <TransactionModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                transaction={selectedTransaction}
                onEdit={(txn) => console.log("Edit:", txn)}
            />
        </div>
    );
}
