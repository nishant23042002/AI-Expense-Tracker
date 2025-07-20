import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userLogin.js"

export const store = configureStore({
    reducer: {
        loginState: userReducer
    }
})