import { createSlice } from "@reduxjs/toolkit";

const userLogin = createSlice({
    name: "loginState",
    initialState: {
        user: null,
        accessToken: null,
        refreshToken: null,
    },
    reducers: {
        loginUser: (state, action) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
        setRefreshToken: (state, action) => {
            state.refreshToken = action.payload;
        },
        logoutUser: (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
        },
    },
});

export const { loginUser, logoutUser, setAccessToken, setRefreshToken } = userLogin.actions;
export default userLogin.reducer;
