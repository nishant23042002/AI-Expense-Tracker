import { createSlice } from "@reduxjs/toolkit";

const userLogin = createSlice({
    name: "loginState",
    initialState: {
        user: null,
        accessToken: null
    },
    reducers: {
        loginUser: (state, action) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },    
        logoutUser: (state) => {
            state.user = null;
            state.accessToken = null;
        },
    },
});

export const { loginUser, logoutUser, setAccessToken, setRefreshToken } = userLogin.actions;
export default userLogin.reducer;
