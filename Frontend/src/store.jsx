import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./api/UserRedux";
import ticketReducer from './api/TicketRedux'
import notificationsReducer from './api/NotifyRedux'
export const store = configureStore({
    reducer: {
        user: userReducer,
        ticket: ticketReducer,
        notifications: notificationsReducer
    },
});

export default store;
