import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./api/UserRedux";
import ticketReducer from './api/TicketRedux'
export const store = configureStore({
    reducer: {
        user: userReducer,
        ticket: ticketReducer
    },
});

export default store;
