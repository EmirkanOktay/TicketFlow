import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
    "user/loginUser",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const res = await axios.post(
                "http://localhost:5000/api/users/login",
                { email, password },
                { withCredentials: true }
            );
            if (res.status === 200) return res.data.user;
            return rejectWithValue("Login failed");
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

export const getUserInfos = createAsyncThunk(
    "user/getUserInfos",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(
                "http://localhost:5000/api/users/show-user-infos",
                { withCredentials: true }
            );
            if (res.status === 200) return res.data.user;
            return rejectWithValue("User not found");
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

export const resetPassword = createAsyncThunk(
    "user/resetUserPasswors",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.post("http://localhost:5000/api/users/reset-password", { withCredentials: true });
            if (res.status === 200) return res.data.message;
            return rejectWithValue("Reset password failed");
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }

)

const initialState = {
    user: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.error = null;
            localStorage.removeItem("user");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                localStorage.setItem("user", JSON.stringify(action.payload));
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getUserInfos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserInfos.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(getUserInfos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
