import { Box, Paper, TextField, Typography, Button } from "@mui/material";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { Link } from "react-router-dom";

const ChangePassword = () => {
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
                {/* Icon */}
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
                    Reset Password
                </Typography>

                <Box component="form">
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        margin="normal"
                        InputLabelProps={{ style: { color: "#cbd5e1" } }}
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

                    <Button
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
                        Send Reset Link
                    </Button>
                </Box>

                <Typography variant="body2" sx={{ mt: 3, color: "#cbd5e1" }}>
                    Remember your password?{" "}
                    <Link
                        to="/auth/login"
                        style={{ textDecoration: "none", color: "#f97316", fontWeight: 500 }}
                    >
                        Login
                    </Link>
                </Typography>
            </Paper>
        </Box>
    );
};

export default ChangePassword;
