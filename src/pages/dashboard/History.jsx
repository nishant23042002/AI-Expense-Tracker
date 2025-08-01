import { ToastContainer } from "react-toastify"
import AllTransactions from "../../component/History/AllTransactions"

export default function History(){
    return (
        <div className="my-5 mx-6">
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="grid grid-cols-1 gap-6">

                <div className="">
                    <AllTransactions />
                </div>
            </div>
        </div>
    )
}