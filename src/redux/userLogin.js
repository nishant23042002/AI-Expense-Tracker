import { createSlice } from "@reduxjs/toolkit"

const storedUser = JSON.parse(localStorage.getItem("user"));
const storedToken = localStorage.getItem("token");


const userLogin = createSlice({
    name: "loginState",
    initialState: {
        user: storedUser || null,
        token: storedToken || null,
    },
    reducers: {
        loginUser: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;

            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("token", action.payload.token);
        },
        logoutUser: (state) => {
            state.user = null;
            state.token = null;

            localStorage.removeItem("user");
            localStorage.removeItem("token");
        }
    }
});

export const { loginUser, logoutUser } = userLogin.actions;
export default userLogin.reducer;