import { LuTrash, LuTrendingDown, LuTrendingUp } from "react-icons/lu";

export default function TransactionCard({ title, icon, date, amount, type, hideDelBtn }) {

    return (

        <div className="group relative flex justify-center shadow hover:shadow-md gap-4 mt-2 p-3 rounded-lg hover:bg-gray-200 cursor-pointer duration-200">
            <div className="w-16 h-14 text-xl bg-gray-100 rounded-full text-gray-600 flex justify-center items-center">
                {icon}
            </div>


            <div className="w-full flex max-[450px]:flex-col max-[450px]:items-end items-center justify-between">
                <div>
                    <p className="text-sm text-gray-600 font-medium">{title}</p>
                    <p className="text-xs text-center text-gray-500 my-1">{date}</p>
                </div>
                <div className="flex items-center gap-2">
                    {
                        !hideDelBtn && (
                            <button onClick={onDelete} className="text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                <LuTrash size={18} />
                            </button>
                        )
                    }

                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${type === "income" ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"}`}>
                        <h6 className="text-sm font-medium">{type === "income" ? "+" : "-"}  ₹ {amount} </h6>
                        {type === "income" ? <LuTrendingUp /> : <LuTrendingDown />}
                    </div>
                </div>
            </div>
        </div>
    )
}