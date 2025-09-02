import { Box, Button, Paper, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/UserRedux";
import { toast } from "react-toastify";
import { registerSchema } from "../../validations/userSchema";
import { Formik, Form } from "formik";

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userRole = useSelector((state) => state.user?.user?.role);

    useEffect(() => {
        if (!userRole) {
            navigate("/auth/login");
        } else if (userRole !== "Admin") {
            navigate("/dashboard");
        }
    }, [userRole, navigate]);

    return (
        <div>
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

                    <Formik
                        initialValues={{
                            name: "",
                            surname: "",
                            email: "",
                            password: "",
                            role: "",
                        }}
                        validationSchema={registerSchema}
                        onSubmit={async (values, { setSubmitting, resetForm }) => {
                            try {
                                const result = await dispatch(registerUser(values));
                                if (registerUser.fulfilled.match(result)) {
                                    toast.success("Registration successful");
                                    resetForm();
                                    navigate("/dashboard");
                                } else {
                                    toast.error(result.payload || "Registration failed");
                                }
                            } catch (err) {
                                console.log(err);
                                toast.error("An error occurred");
                            } finally {
                                setSubmitting(false);
                            }
                        }}
                    >
                        {({ values, errors, touched, handleChange, isSubmitting }) => (
                            <Form>
                                <TextField
                                    fullWidth
                                    label="First Name"
                                    name="name"
                                    margin="normal"
                                    value={values.name}
                                    onChange={handleChange}
                                    error={touched.name && Boolean(errors.name)}
                                    helperText={touched.name && errors.name}
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
                                    label="Last Name"
                                    name="surname"
                                    margin="normal"
                                    value={values.surname}
                                    onChange={handleChange}
                                    error={touched.surname && Boolean(errors.surname)}
                                    helperText={touched.surname && errors.surname}
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
                                    label="Email"
                                    name="email"
                                    type="email"
                                    margin="normal"
                                    value={values.email}
                                    onChange={handleChange}
                                    error={touched.email && Boolean(errors.email)}
                                    helperText={touched.email && errors.email}
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
                                    label="Password"
                                    name="password"
                                    type="password"
                                    margin="normal"
                                    value={values.password}
                                    onChange={handleChange}
                                    error={touched.password && Boolean(errors.password)}
                                    helperText={touched.password && errors.password}
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
                                    error={touched.role && Boolean(errors.role)}
                                >
                                    <InputLabel>Role</InputLabel>
                                    <Select
                                        name="role"
                                        value={values.role}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="Employee">Employee</MenuItem>
                                        <MenuItem value="It">IT</MenuItem>
                                        <MenuItem value="Admin">Admin</MenuItem>
                                    </Select>
                                    {touched.role && errors.role && (
                                        <Typography sx={{ color: "red", fontSize: 12, mt: 0.5, textAlign: "left" }}>
                                            {errors.role}
                                        </Typography>
                                    )}
                                </FormControl>


                                <Button
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                    disabled={isSubmitting}
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
                            </Form>
                        )}
                    </Formik>
                </Paper>
            </Box>
        </div>
    );
};

export default Register;
