import { memo } from "react";
import TransactionContainer from "../Cards/TransactionContainer";


function AllIncomeTransactions({ incomeTxnData = [], handleDeleteIncome, loading }) {

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[300px]">
                <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-indigo-500"></div>
                    <p className="text-slate-600 dark:text-slate-300">Loading Income transactions...</p>
                </div>
            </div>
        );
    }

    if (!incomeTxnData?.length) {
        return (
            <div className="flex items-center justify-center min-h-[300px]">
                <p className="text-slate-600 dark:text-slate-300">No Income transactions found.</p>
            </div>
        );
    }

    return (
        <div className="w-full">
            <TransactionContainer
                transactions={incomeTxnData}
                title="Overall Income Transactions"
                length={incomeTxnData.length || 0}
                dateKey="receivedDate"
                handleDeleteIncome={handleDeleteIncome}
                hideBtn
            />
        </div>
    );
}
export default memo(AllIncomeTransactions)