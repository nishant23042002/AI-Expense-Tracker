// store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userLogin";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // uses localStorage for web

// Combine all reducers
const rootReducer = combineReducers({
    loginState: userReducer,
});

// Configuration for redux-persist
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["loginState"],
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

// Export persistor
export const persistor = persistStore(store);
