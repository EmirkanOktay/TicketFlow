import { Box, Button, Paper, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import Navbar from "../../components/Navbar";
const Register = () => {
    return (
        <div>
            <Navbar />
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
                        Create Account
                    </Typography>

                    <Box component="form">
                        <TextField
                            fullWidth
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
                                    "&.Mui-focused fieldset": { borderColor: "#f97316", boxShadow: "0 0 8px #f97316" },
                                },
                            }}
                        />
                        <TextField
                            fullWidth
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
                                    "&.Mui-focused fieldset": { borderColor: "#f97316", boxShadow: "0 0 8px #f97316" },
                                },
                            }}
                        />
                        <TextField
                            fullWidth
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
                                    "&.Mui-focused fieldset": { borderColor: "#f97316", boxShadow: "0 0 8px #f97316" },
                                },
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            margin="normal"
                            InputLabelProps={{ style: { color: "#cbd5e1" } }}
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

                        <FormControl fullWidth sx={{ mb: 3 }}>
                            <InputLabel sx={{ color: "#cbd5e1" }}>Role</InputLabel>
                            <Select
                                defaultValue=""
                                sx={{
                                    color: "#f1f5f9",
                                    borderRadius: 4,
                                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#475569" },
                                    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#f97316" },
                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#f97316",
                                        boxShadow: "0 0 10px rgba(249,115,22,0.6)",
                                    },
                                    "& .MuiSelect-select": {
                                        "&:focus": { backgroundColor: "transparent" },
                                    },
                                    "& .MuiSelect-icon": { color: "#f97316" },
                                    "& .MuiMenuItem-root": { color: "#f1f5f9" },
                                }}
                            >
                                <MenuItem value="Employee">Employee</MenuItem>
                                <MenuItem value="It">IT</MenuItem>
                                <MenuItem value="Admin">Admin</MenuItem>
                            </Select>
                        </FormControl>


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
                            Register
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </div>
    );
};

export default Register;
