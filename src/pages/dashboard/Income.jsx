import { useEffect, useState } from "react";
import IncomeOverview from "../../component/Income/IncomeOverview"
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPath";



function Income() {
    const [incomeData, setIncomeData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);

    const fetchIncomeData = async () => {
        setLoading(true)
        try {
            const res = await axiosInstance.get(`${API_PATHS.INCOME.GET_ALL_INCOME}`)
            console.log(res.data);
            const incomes = res.data.Incomes || [];
            const groupByIncomeCategory = {}
            incomes.forEach(income => {
                const category = income.category || "Others"
                groupByIncomeCategory[category] = (groupByIncomeCategory[category] || 0) + income.amount;
            });
            const incomeTransactionsChart = Object.entries(groupByIncomeCategory).map(([name, value]) => ({
                name,
                value
            }));
            console.log("Transformed", incomeTransactionsChart);
            if (res.data) {
                setIncomeData(incomeTransactionsChart);
            }
            // console.log(res.data);
        } catch (error) {
            console.log("Something went wrong. Please try again later.", error)
        } finally {
            setLoading(false)
        }
    }

    // const handleAddIncome = async () => {
    //     const res = await axiosInstance.post(`${API_PATHS.INCOME.ADD_INCOME}`)
    // }

    // const handleDeleteIncome = async () => {
    //     const res = await axiosInstance.delete(`${API_PATHS.INCOME.DEL_INCOME}`)
    // }

    // const handleDwnldIncome = async () => {
    //     const res = await axiosInstance.get(`${API_PATHS.INCOME.Dwnld_INCOME}`)
    // }

    useEffect(() => {
        fetchIncomeData();
        // handleAddIncome();
        // handleDeleteIncome();
        // handleDwnldIncome();
    }, [])
    return (
        <div className="my-5 mx-6">
            <div className="grid grid-cols-1 gap-6">
                <div className="">
                    <IncomeOverview income={incomeData} setIsOpenModal={setIsOpenModal} isOpenModal={isOpenModal} />
                </div>
            </div>
        </div>
    )
}
export default Income;