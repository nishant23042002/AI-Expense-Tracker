import { memo } from "react";
import TransactionContainer from "../Cards/TransactionContainer";

function AllExpenseTransactions({ expenseTxnData, handleDeleteExpense }) {
    if (!expenseTxnData.length) {
        return (
            <div className="text-center text-slate-500 mt-6">
                No expense transactions found.
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
                handleDeleteIncome={handleDeleteExpense}
                hideBtn
            />
        </div>
    );
}

export default memo(AllExpenseTransactions);