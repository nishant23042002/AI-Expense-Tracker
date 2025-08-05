export const BASE_URL = import.meta.env.VITE_BASE_URL;
console.log(BASE_URL);


export const API_PATHS = {
    AUTH: {
        SIGNUP: "/user/signup",
        LOGIN: "/user/login",
        LOGOUT: "/user/logout",
        REFRESHTOKEN: "/user/refresh-token"
    },
    DASHBOARD: {
        GET_DATA: "/dashboard/dashboardstats"
    },
    INCOME: {
        ADD_INCOME: "/income/addIncome",
        DEL_INCOME: "/income",
        EDIT_INCOME: "/income/editincome",
        Dwnld_INCOME: "/income/downloadIncome",
        GET_ALL_INCOME: "/income/getAllIncome"
    },
    EXPENSE: {
        ADD_EXPENSE: "/expense/addexpense",
        GET_MY_EXPENSE: "/expense/getmyexpense",
        UPLOAD_EXPENSE: "/expense/myexpense/upload-receipt",
        DEL_EXPENSE: "/expense",
        EDIT_EXPENSE: "/expense/editexpense"
    }
}