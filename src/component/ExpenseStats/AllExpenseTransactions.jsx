import { memo } from "react";
import TransactionContainer from "../Cards/TransactionContainer";

function AllExpenseTransactions({ expenseTxnData, handleDeleteIncome }) {
    if (!expenseTxnData.length) {
        return (
            <div className="text-center text-gray-500 mt-6">
                No income transactions found.
            </div>
        );
    }
    return (
        <div className="w-full">
            <TransactionContainer
                transactions={expenseTxnData}
                title="Overall Expense Transactions"
                length={expenseTxnData?.length || 0}
                dateKey="spentDate"
                handleDeleteIncome={handleDeleteIncome}
                hideBtn
            />
        </div>
    )
}

export default memo(AllExpenseTransactions);