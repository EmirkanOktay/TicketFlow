import { Box, Paper, TextField, Typography, Button, MenuItem } from "@mui/material";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createTicketSchema } from "../../validations/TicketSchema";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import { getTicketById, editTicket } from "../../api/TicketRedux";
import useAuth from "../../hooks/useAuth";

function EditMyTicket() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user || loading || !ticket) return;

        if (user.role === "Admin" || user.role === "It") return;

        if (user.role === "Employee") {
            if (ticket.createdBy?.id?.toString() !== user.id) {
                navigate("/dashboard");
            }
        } else {
            navigate("/dashboard");
        }
    }, [user, ticket, loading, navigate]);


    useEffect(() => {
        const fetchTicket = async () => {
            try {
                const res = await dispatch(getTicketById(id)).unwrap();
                setTicket(res);
            } catch (error) {
                toast.error("Failed to fetch ticket");
                navigate("/dashboard");
            } finally {
                setLoading(false);
            }
        };
        fetchTicket();
    }, [dispatch, id, navigate]);

    if (loading) return <Typography sx={{ textAlign: "center", mt: 10 }}>Loading...</Typography>;
    if (!ticket) return null;


    return (
        <div>   <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#0f172a",
                px: 2,
            }}
        >
            <Paper
                elevation={12}
                sx={{
                    p: 6,
                    borderRadius: 4,
                    width: "100%",
                    maxWidth: 700,
                    background: "linear-gradient(135deg, #0f172a, #1e293b)",
                    color: "white",
                    boxShadow: "0 8px 20px rgba(249,115,22,0.5)",
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
                    <ConfirmationNumberIcon sx={{ fontSize: 40, color: "#fff" }} />
                </Box>

                <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4, textAlign: "center" }}>
                    Edit Ticket
                </Typography>

                <Formik
                    enableReinitialize
                    initialValues={{
                        title: ticket.title || "",
                        description: ticket.description || "",
                        priority: ticket.priority || "Medium",
                        category: ticket.category || "Other",
                    }}
                    validationSchema={createTicketSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        try {
                            const res = await dispatch(editTicket({ id, ticketData: values }));

                            if (res.meta.requestStatus === "fulfilled") {
                                toast.success("Ticket updated successfully");
                                navigate("/dashboard");
                            } else {
                                toast.error(res.payload || "Update failed");
                            }
                        } catch (error) {
                            toast.error(error.message || "Update failed");
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ values, handleChange, errors, touched, isSubmitting }) => (
                        <Form style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            <TextField
                                fullWidth
                                label="Title"
                                name="title"
                                value={values.title}
                                onChange={handleChange}
                                error={touched.title && Boolean(errors.title)}
                                helperText={touched.title && errors.title}
                                InputLabelProps={{ style: { color: "#cbd5e1" } }}
                                InputProps={{ style: { color: "#cbd5e1" } }}
                                sx={inputStyle}
                            />

                            <TextField
                                fullWidth
                                label="Description"
                                name="description"
                                multiline
                                rows={4}
                                value={values.description}
                                onChange={handleChange}
                                error={touched.description && Boolean(errors.description)}
                                helperText={touched.description && errors.description}
                                InputLabelProps={{ style: { color: "#cbd5e1" } }}
                                InputProps={{ style: { color: "#cbd5e1" } }}
                                sx={inputStyle}
                            />

                            <TextField
                                select
                                fullWidth
                                label="Priority"
                                name="priority"
                                value={values.priority}
                                onChange={handleChange}
                                error={touched.priority && Boolean(errors.priority)}
                                helperText={touched.priority && errors.priority}
                                InputLabelProps={{ style: { color: "#cbd5e1" } }}
                                InputProps={{ style: { color: "#cbd5e1" } }}
                                sx={inputStyle}
                            >
                                {["Low", "Medium", "High"].map((p) => (
                                    <MenuItem key={p} value={p}>
                                        {p}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                select
                                fullWidth
                                label="Category"
                                name="category"
                                value={values.category}
                                onChange={handleChange}
                                error={touched.category && Boolean(errors.category)}
                                helperText={touched.category && errors.category}
                                InputLabelProps={{ style: { color: "#cbd5e1" } }}
                                InputProps={{ style: { color: "#cbd5e1" } }}
                                sx={inputStyle}
                            >
                                {["Hardware", "Software", "Network", "Other"].map((c) => (
                                    <MenuItem key={c} value={c}>
                                        {c}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                sx={buttonStyle}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Updating..." : "Update Ticket"}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Paper>
        </Box></div>
    )
}

const inputStyle = {
    "& .MuiOutlinedInput-root": {
        borderRadius: 3,
        "& fieldset": { borderColor: "#f97316" },
        "&:hover fieldset": { borderColor: "#f97316" },
        "&.Mui-focused fieldset": { borderColor: "#f97316", boxShadow: "0 0 8px #f97316" },
    },
    "& input": { color: "#fff" },
    "& textarea": { color: "#fff" },
};

const buttonStyle = {
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
};

export default EditMyTicket