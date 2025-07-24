import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Login from "./pages/Auth/Login"
import SignUp from "./pages/Auth/SignUp"
import Home from "./pages/dashboard/Home"
import Expense from "./pages/dashboard/Expense"
import Income from "./pages/dashboard/Income"
import SetGoal from "./pages/dashboard/SetGoal"
import DashboardLayout from "./component/layout/DashboardLayout"
import Root from "./Root"




const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />, // ✅ Contains <Outlet />
    children: [
      {
        index: true, // Matches /dashboard
        element: <Home />,
      },
      {
        path: "income", // Matches /dashboard/income
        element: <Income />,
      },
      {
        path: "expense",
        element: <Expense />,
      },
      {
        path: "setgoal",
        element: <SetGoal />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}