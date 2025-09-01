import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./api/UserRedux";

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

export default store;
