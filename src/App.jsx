import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom"
import Login from "./pages/Auth/Login"
import SignUp from "./pages/Auth/SignUp"
import Home from "./pages/dashboard/Home"
import Expense from "./pages/dashboard/Expense"
import Income from "./pages/dashboard/Income"

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

export default App

const Root = () => {
  const isAuth = !!localStorage.getItem("token")

  return isAuth ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  )
}