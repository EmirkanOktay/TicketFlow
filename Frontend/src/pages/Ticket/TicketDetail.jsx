import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {
    Typography,
    Box,
    Card,
    Chip,
    Divider,
    Button,
} from "@mui/material";
import { toast } from "react-toastify";
import { getTicketById } from "../../api/TicketRedux";

function TicketDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user || !["Employee", "Admin", "It"].includes(user.role)) {
            navigate("/dashboard");
        }
    }, [user, navigate]);

    useEffect(() => {
        const fetchTicket = async () => {
            try {
                const res = await dispatch(getTicketById(id)).unwrap();
                setTicket(res);
            } catch (error) {
                console.error("Thunk error:", error);
                toast.error(error);
                navigate("/dashboard");
            } finally {
                setLoading(false);
            }
        };
        fetchTicket();
    }, [dispatch, id, navigate]);

    if (loading)
        return (
            <Typography sx={{ textAlign: "center", mt: 10 }}>
                Loading...
            </Typography>
        );
    if (!ticket) return null;

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "80vh",
                p: 2,
            }}
        >
            <Card
                sx={{
                    maxWidth: 800,
                    width: "100%",
                    borderRadius: 4,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                    p: 3,
                }}
            >
                <Box sx={{ mb: 2 }}>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        {ticket.title}
                    </Typography>
                    <Chip
                        label={ticket.status}
                        color={
                            ticket.status === "Open"
                                ? "success"
                                : ticket.status === "Closed"
                                    ? "error"
                                    : "warning"
                        }
                        sx={{ fontWeight: "bold" }}
                    />
                </Box>

                <Divider sx={{ mb: 2 }} />

                <Box sx={{ mb: 2 }}>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                        <strong>Description:</strong> {ticket.description}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                        <strong>Priority:</strong> {ticket.priority}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                        <strong>Category:</strong> {ticket.category}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                        <strong>Attachments:</strong>{" "}
                        {ticket.attachments?.length > 0 ? (
                            ticket.attachments.map((att, idx) => (
                                <a
                                    key={idx}
                                    href={`http://localhost:5000/uploads/${att.fileName}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ display: "block", marginBottom: 2, textDecoration: "none", color: "#1976d2" }}
                                >
                                    {att.fileName.slice(0, 10)}
                                </a>
                            ))
                        ) : (
                            <span>No attachments</span>
                        )}

                    </Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                        <strong>Created By:</strong>{" "}
                        {ticket.createdBy?.name} {ticket.createdBy?.surname}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                        <strong>Created At:</strong>{" "}
                        {new Date(ticket.createdAt).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                        <strong>Closed By:</strong>{" "}
                        {ticket.closedBy?.name} {ticket.closedBy?.surname}
                    </Typography>

                    <Typography variant="body1" sx={{ mb: 1 }}>
                        <strong>Closed Date:</strong>{" "}
                        {ticket.closedDate
                            ? new Date(ticket.closedDate).toLocaleDateString()
                            : "-"}
                    </Typography>

                    <Typography variant="body1" sx={{ mb: 1 }}>
                        <strong>Close Duration:</strong>{" "}
                        {ticket.closeDuration || "-"}
                    </Typography>

                    <Typography variant="body1" sx={{ mb: 1 }}>
                        <strong>Result:</strong>{" "}
                        {ticket.result || "-"}
                    </Typography>

                </Box>

                <Divider sx={{ mb: 2 }} />
                <Box sx={{ display: "flex", gap: 2 }}>
                    {(ticket.status === "Open" || ticket.status === "In-Progress") && (
                        <Button
                            onClick={() => navigate(`/ticket/edit-ticket/${ticket._id}`)}
                            variant="contained"
                            sx={{
                                bgcolor: "#f97316",
                                "&:hover": { bgcolor: "#f97316" },
                                flex: 1,
                            }}
                        >
                            Edit Ticket
                        </Button>
                    )}
                    <Button
                        onClick={() => navigate("/ticket/my-tickets")}
                        variant="outlined"
                        sx={{ flex: 1, color: "#f97316", border: "1px solid #f97316" }}
                    >
                        Back
                    </Button>
                </Box>

            </Card>
        </Box>
    );
}

export default TicketDetail;
