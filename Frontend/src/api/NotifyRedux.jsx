import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllNotifications = createAsyncThunk(
    "notifications/getAllNotifications",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get("http://localhost:5000/api/notifications/show-all-notifications", { withCredentials: true });
            if (res.status === 200) return res.data.notifications;
            return rejectWithValue("Error");
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const markAllNotificationsRead = createAsyncThunk(
    "notifications/markAllNotificationsRead",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.put("http://localhost:5000/api/notifications/markRead", {}, { withCredentials: true });
            if (res.status === 200) return res.data.notifications;
            return rejectWithValue("Error marking notifications");
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const initialState = {
    notifications: [],
    loading: false,
    error: null,
    success: false,
};

const notificationsSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        resetNotificationState: (state) => {
            state.notifications = [];
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllNotifications.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(getAllNotifications.fulfilled, (state, action) => {
                state.loading = false;
                state.notifications = action.payload || [];
                state.success = true;
            })
            .addCase(getAllNotifications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })
            .addCase(markAllNotificationsRead.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(markAllNotificationsRead.fulfilled, (state, action) => {
                state.loading = false;
                state.notifications = state.notifications.map(n => ({ ...n, read: true }));
            })

            .addCase(markAllNotificationsRead.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetNotificationState } = notificationsSlice.actions;
export default notificationsSlice.reducer;
