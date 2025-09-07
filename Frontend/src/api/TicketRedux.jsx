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

export const getAllTickets = createAsyncThunk(
    "ticket/getAllTickets",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get("http://localhost:5000/api/tickets/show-tickets", { withCredentials: true })
            if (res.status === 200) return res.data
            return rejectWithValue("Error");
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message)
        }
    }
)

export const deleteTicket = createAsyncThunk(
    "ticket/deleteTicket",
    async (id, { rejectWithValue }) => {
        try {
            const res = await axios.delete(`http://localhost:5000/api/tickets/delete-ticket/${id}`, { withCredentials: true })
            if (res.status == 200) return res.data;
            return rejectWithValue("Error");
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message)

        }
    }
)
export const editTicket = createAsyncThunk(
    "ticket/editTicket",
    async ({ id, ticketData }, { rejectWithValue }) => {
        try {
            const res = await axios.put(
                `http://localhost:5000/api/tickets/edit-ticket/${id}`,
                ticketData,
                { withCredentials: true }
            );

            if (res.status === 200) return res.data;
            return rejectWithValue("Error");
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);


export const getTicketById = createAsyncThunk(
    "ticket/getTicketById",
    async (id, { rejectWithValue }) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/tickets/get-ticket/${id}`, { withCredentials: true });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to fetch ticket");
        }
    }
);

// /show-tickets/:id


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
            state.loading = false; user
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
