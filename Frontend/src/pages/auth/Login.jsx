import { Box, Paper, TextField, Typography, Button } from "@mui/material";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/UserRedux";
import useAuth from "../../hooks/useAuth";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const resultAction = await dispatch(loginUser({ email, password }));
            if (loginUser.fulfilled.match(resultAction)) {
                login(resultAction.payload);
                toast.success("Login Successful");
                navigate("/dashboard");
            } else {
                toast.error(resultAction.payload || "Login Failed");
            }
        } catch (err) {
            toast.error("Login Failed");
        }
    };

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
                    <ConfirmationNumberIcon sx={{ fontSize: 40 }} />
                </Box>

                <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }}>
                    Welcome Back
                </Typography>
                <form>

                    <Box component="form">
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            InputLabelProps={{ style: { color: "#cbd5e1" } }}
                            sx={{
                                input: { color: "#f1f5f9" },
                                mb: 2,
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: 3,
                                    "& fieldset": { borderColor: "#475569" },
                                    "&:hover fieldset": { borderColor: "#f97316" },
                                    "&.Mui-focused fieldset": { borderColor: "#f97316", boxShadow: "0 0 8px #f97316" },
                                },
                            }}
                        />

                        <TextField
                            fullWidth
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            margin="normal"
                            value={password}
                            autoComplete="new-password"
                            onChange={(e) => setPassword(e.target.value)}
                            InputLabelProps={{ style: { color: "#cbd5e1" } }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end" sx={{ cursor: 'pointer', color: "#f97316", }} onClick={handleClickShowPassword}>
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
                                    "&.Mui-focused fieldset": { borderColor: "#f97316", boxShadow: "0 0 8px #f97316" },
                                },

                            }}
                        />

                        <Button
                            onClick={submitHandler}
                            fullWidth
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
                            Login
                        </Button>
                    </Box>
                </form>
                <Typography variant="body2" sx={{ mt: 3, color: "#cbd5e1" }}>
                    If you forget your password {""}
                    <Link
                        to="/auth/reset-password"
                        style={{ textDecoration: "none", color: "#f97316", fontWeight: 500 }}
                    >
                        Change Your Password
                    </Link>
                </Typography>
            </Paper>
        </Box>
    );
};

export default Login;
