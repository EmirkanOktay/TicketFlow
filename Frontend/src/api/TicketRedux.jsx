import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createTicket = createAsyncThunk(
    "ticket/createTicket",
    async (ticketData, { rejectWithValue }) => {
        try {
            const res = await axios.post(
                "http://localhost:5000/api/tickets/create-ticket",
                ticketData,
                { withCredentials: true }
            );
            if (res.status === 201) return res.data.ticket;
            return rejectWithValue("Ticket creation failed");
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

const initialState = {
    ticket: null,
    loading: false,
    error: null,
    success: false
};

const ticketSlice = createSlice({
    name: "ticket",
    initialState,
    reducers: {
        resetTicketState: (state) => {
            state.ticket = null;
            state.loading = false;
            state.error = null;
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTicket.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(createTicket.fulfilled, (state, action) => {
                state.loading = false;
                state.ticket = action.payload;
                state.success = true;
            })
            .addCase(createTicket.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            });
    }
});

export const { resetTicketState } = ticketSlice.actions;
export default ticketSlice.reducer;
