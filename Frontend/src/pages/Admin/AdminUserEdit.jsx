import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById, editUser } from "../../api/UserRedux";
import { Box, Button, Paper, TextField, Typography, FormControl, InputLabel, Select, MenuItem, Avatar, InputAdornment } from "@mui/material";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function AdminUserEdit() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        role: "",
        password: "",
    });

    const [loading, setLoading] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (!user || user.role !== "Admin") {
            navigate("/dashboard");
        }
    }, [user, navigate]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await dispatch(getUserById(id)).unwrap();
                setFormData({
                    name: userData.name || "",
                    surname: userData.surname || "",
                    email: userData.email || "",
                    role: userData.role || "",
                    password: "",
                });
            } catch (error) {
                toast.error("Failed to fetch user data");
                navigate("/admin/users");
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [id, dispatch, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { ...formData };
            if (!payload.password) delete payload.password;

            await dispatch(editUser({ id, userData: payload })).unwrap();
            toast.success("User profile updated successfully");
            navigate("/admin/users");
        } catch (error) {
            toast.error(error || "Update failed");
        }
    };

    if (user.role != "Admin") {
        navigate("/")
    }
    if (loading) return <Typography sx={{ textAlign: "center", mt: 10 }}>Loading...</Typography>;


    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
                px: 2,
            }}
        >
            <Paper
                elevation={12}
                sx={{
                    p: 6,
                    borderRadius: 4,
                    width: "100%",
                    maxWidth: 500,
                    textAlign: "center",
                    background: "linear-gradient(135deg, #1e293b, #334155)",
                    color: "white",
                }}
            >
                <Box
                    sx={{
                        width: 80,
                        height: 80,
                        margin: "0 auto",
                        mb: 3,
                        borderRadius: "50%",
                        bgcolor: "#f97316",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 0 20px rgba(249,115,22,0.6)",
                    }}
                >
                    <Avatar sx={{ bgcolor: "#f97316" }}>
                        {formData.name?.[0]}
                        {formData.surname?.[0]}
                    </Avatar>
                </Box>

                <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }}>
                    Edit User
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        label="First Name"
                        margin="normal"
                        InputLabelProps={{ style: { color: "#cbd5e1" } }}
                        sx={{
                            input: { color: "#f1f5f9" },
                            mb: 2,
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 3,
                                "& fieldset": { borderColor: "#475569" },
                                "&:hover fieldset": { borderColor: "#f97316" },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#f97316",
                                    boxShadow: "0 0 8px #f97316",
                                },
                            },
                        }}
                    />
                    <TextField
                        fullWidth
                        name="surname"
                        value={formData.surname}
                        onChange={handleChange}
                        label="Last Name"
                        margin="normal"
                        InputLabelProps={{ style: { color: "#cbd5e1" } }}
                        sx={{
                            input: { color: "#f1f5f9" },
                            mb: 2,
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 3,
                                "& fieldset": { borderColor: "#475569" },
                                "&:hover fieldset": { borderColor: "#f97316" },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#f97316",
                                    boxShadow: "0 0 8px #f97316",
                                },
                            },
                        }}
                    />
                    <TextField
                        fullWidth
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        label="Email"
                        type="email"
                        margin="normal"
                        InputLabelProps={{ style: { color: "#cbd5e1" } }}
                        sx={{
                            input: { color: "#f1f5f9" },
                            mb: 2,
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 3,
                                "& fieldset": { borderColor: "#475569" },
                                "&:hover fieldset": { borderColor: "#f97316" },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#f97316",
                                    boxShadow: "0 0 8px #f97316",
                                },
                            },
                        }}
                    />
                    <TextField
                        fullWidth
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        label="Password"
                        margin="normal"
                        InputLabelProps={{ style: { color: "#cbd5e1" } }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment
                                    position="end"
                                    sx={{ cursor: "pointer", color: "#f97316" }}
                                    onClick={handleClickShowPassword}
                                >
                                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            input: { color: "#f1f5f9" },
                            mb: 3,
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 3,
                                "& fieldset": { borderColor: "#475569" },
                                "&:hover fieldset": { borderColor: "#f97316" },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#f97316",
                                    boxShadow: "0 0 8px #f97316",
                                },
                            },
                        }}
                    />

                    <FormControl
                        fullWidth
                        sx={{
                            mb: 3,
                            "& .MuiInputLabel-root": { color: "#cbd5e1" },
                            "& .MuiOutlinedInput-root": {
                                color: "#f1f5f9",
                                borderRadius: 3,
                                "& fieldset": { borderColor: "#475569" },
                                "&:hover fieldset": { borderColor: "#f97316" },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#f97316",
                                    boxShadow: "0 0 8px rgba(249,115,22,0.6)",
                                },
                            },
                            "& .Mui-focused .MuiInputLabel-root": {
                                color: "#f97316",
                            },
                        }}
                    >
                        <InputLabel>Role</InputLabel>
                        <Select name="role" value={formData.role} onChange={handleChange}>
                            <MenuItem value="Employee">Employee</MenuItem>
                            <MenuItem value="It">IT</MenuItem>
                            <MenuItem value="Admin">Admin</MenuItem>
                        </Select>
                    </FormControl>

                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        sx={{
                            py: 1.7,
                            borderRadius: 3,
                            fontWeight: "bold",
                            textTransform: "none",
                            background: "linear-gradient(90deg, #f97316, #ea580c)",
                            boxShadow: "0 4px 12px rgba(249,115,22,0.5)",
                            "&:hover": {
                                background: "linear-gradient(90deg, #ea580c, #f97316)",
                                boxShadow: "0 6px 14px rgba(249,115,22,0.7)",
                            },
                        }}
                    >
                        Update User
                    </Button>
                </form>
            </Paper>
        </Box>
    );
}

export default AdminUserEdit;
