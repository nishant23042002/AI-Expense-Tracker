import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/userLogin.js";


function Home() {
    const user = useSelector((state) => state.loginState.user);
    console.log(user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogOut = () => {
        dispatch(logoutUser());
        navigate("/login");
    }
    return (
        <div className=" bg-slate-200 h-screen w-full">
            <div className="flex justify-between items-center border p-4">
                {user ? (
                    <div className="flex items-center gap-3">
                        <img src={user.profilePic_URL} alt="profile" className="w-8 h-8 rounded-full" />
                        <span className="font-semibold">{user.username}</span>
                    </div>
                ) : ""
                }
                <button onClick={handleLogOut} className="p-2 px-4 rounded-2xl font-semibold border bg-slate-800 text-slate-200 cursor-pointer">Log Out</button>

            </div>
        </div>
    )
}
export default Home