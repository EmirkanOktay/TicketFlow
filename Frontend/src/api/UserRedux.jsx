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

export const getUserById = createAsyncThunk(
    "user/getUserById",
    async (id, { rejectWithValue }) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/users/get-user/${id}`, { withCredentials: true });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to fetch user");
        }
    }
);

export const getAllUsers = createAsyncThunk(
    "user/getAllUsers",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get("http://localhost:5000/api/users/show-all-employeers", {
                withCredentials: true,
            });
            return res.data.users;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

export const deleteUser = createAsyncThunk(
    "user/deleteUser",
    async (id, { rejectWithValue }) => {
        try {
            const res = await axios.delete(
                `http://localhost:5000/api/users/delete-user/${id}`,
                { withCredentials: true }
            );
            if (res.status === 200) return res.data.user;
            return rejectWithValue("Error");
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)


export const editUser = createAsyncThunk(
    "user/editUser",
    async ({ id, userData }, { rejectWithValue }) => {
        try {
            const res = await axios.put(`http://localhost:5000/api/users/edit-user/${id}`, userData, { withCredentials: true })
            if (res.status == 200) return res.data.user;
            return rejectWithValue("Error")
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);

        }
    }
)

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
export const registerUser = createAsyncThunk(
    "user/registerUser",
    async (userData, { rejectWithValue }) => {
        try {
            const res = await axios.post(
                "http://localhost:5000/api/users/register",
                {
                    name: userData.name,
                    surname: userData.surname,
                    email: userData.email,
                    password: userData.password,
                    role: userData.role,
                },
                { withCredentials: true }
            );

            if (res.status === 201) return res.data;
            return rejectWithValue("Registration failed");
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const initialState = {
    user: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : null,
    loading: false,
    error: null,
    notifications: [],
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
