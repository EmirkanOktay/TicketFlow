import { Box, Paper, TextField, Typography, Button } from "@mui/material";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../api/UserRedux";
import { toast } from "react-toastify";
import { Formik, Form } from "formik";
import { resetPasswordSchema } from "../../validations/userSchema";

const ChangePassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = async (values) => {
        try {
            const result = await dispatch(resetPassword({ email: values.email }));
            if (resetPassword.fulfilled.match(result)) {
                toast.success("Reset link sent to your email.");
                navigate("/auth/login");
            } else {
                toast.error(result.payload || "Failed to send reset link.");
            }
        } catch (error) {
            console.log(error);
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
                    Reset Password
                </Typography>

                <Formik
                    initialValues={{ email: "" }}
                    validationSchema={resetPasswordSchema}
                    onSubmit={submitHandler}
                >
                    {({ handleChange, values, errors, touched }) => (
                        <Form>
                            <TextField
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                fullWidth
                                label="Email"
                                type="email"
                                margin="normal"
                                InputLabelProps={{ style: { color: "#cbd5e1" } }}
                                error={touched.email && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
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
                                type="submit"
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
                        </Form>
                    )}
                </Formik>

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
