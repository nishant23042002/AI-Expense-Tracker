import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import Login from "./pages/Auth/Login"
import SignUp from "./pages/Auth/SignUp"
import Home from "./pages/dashboard/Home"
import Expense from "./pages/dashboard/Expense"
import Income from "./pages/dashboard/Income"
import { useSelector } from "react-redux"

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/income" element={<Income />} />
          <Route path="/expense" element={<Expense />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;

const Root = () => {
  const user = useSelector((state) => state?.auth?.user);
  const token = useSelector((state) => state?.auth?.token) || localStorage.getItem("token");
  const isAuth = user || token

  return isAuth ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  )
}