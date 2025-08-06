import { memo } from "react";
import TransactionContainer from "../Cards/TransactionContainer";


function AllIncomeTransactions({ incomeTxnData = [], handleDeleteIncome }) {

    if (!incomeTxnData.length) {
        return (
            <div className="text-center text-gray-500 mt-6">
                No income transactions found.
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