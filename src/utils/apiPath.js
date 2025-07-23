export const BASE_URL = import.meta.env.VITE_BASE_URL;
console.log(BASE_URL);


export const API_PATHS = {
    AUTH: {
        SIGNUP: "/user/signup",
        LOGIN: "/user/login"
    },
    DASHBOARD: {
        GET_DATA: "/dashboard/dashboardstats"
    },
    INCOME: {
        ADD_INCOME: "/income/addIncome",
        DEL_INCOME: "/income/:id",
        Dwnld_INCOME: "/income/downloadIncome",
        GET_ALL_INCOME: "/income/getAllIncome"
    },
    EXPENSE: {
        ADD_EXPENSE: "/expense/addexpense",
        GET_MY_EXPENSE: "/expense/getmyexpense",
        UPLOAD_EXPENSE: "/expense/myexpense/upload-receipt",
        DEL_EXPENSE: "/expense/:id"
    },
    GOAL: {
        SET_GOAL: "/goal/setgoal",
        GOAL_PROGRESS: "/goal/goalprogress",
        GET_ALL_GOALS: "/goal/getallgoals",
        REFRESH_GOAL_TIP: "/goal/refreshgoaltip/:goalId"
    }
}