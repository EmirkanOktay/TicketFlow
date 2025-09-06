import { useSelector } from "react-redux";
import { Box, Card, Typography, Avatar, Button, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";

function MyProfile() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const user = useSelector((state) => state.user.user);

    const handleButton = () => {
        navigate("/profile/edit-profile")
    }

    useEffect(() => {
        if (user) {
            setLoading(false);
        }
    }, [user]);

    if (loading) return <Loading text="Loading..." />;
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
                    maxWidth: 450,
                    width: "100%",
                    borderRadius: 4,
                    overflow: "hidden",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                    position: "relative",
                }}
            >
                <Box
                    sx={{
                        height: 120,
                        background: "linear-gradient(135deg, #f97316, #fb923c)",
                    }}
                />

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        mt: -6,
                    }}
                >
                    <Avatar
                        sx={{
                            bgcolor: "#f97316",
                            width: 100,
                            height: 100,
                            fontSize: 36,
                            fontWeight: "bold",
                            border: "4px solid white",
                        }}
                    >
                        {user.name?.[0]}
                        {user.surname?.[0]}
                    </Avatar>
                </Box>

                <Box sx={{ textAlign: "center", mt: 2, px: 3, pb: 3 }}>
                    <Typography variant="h5" fontWeight="bold">
                        {user.name} {user.surname}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ color: "text.secondary", mb: 2 }}
                    >
                        {user.role}
                    </Typography>

                    <Divider sx={{ mb: 2 }} />

                    <Typography variant="body1" sx={{ mb: 1 }}>
                        <strong>Email:</strong> {user.email}
                    </Typography>

                    <Typography variant="body1" sx={{ mb: 1 }}>
                        <strong>Role:</strong> {user.role}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                        <strong>Account Create Date:</strong> {user.createdAt.toString().slice(0, 10)}
                    </Typography>

                    <Button
                        onClick={handleButton}
                        variant="contained"
                        sx={{
                            bgcolor: "#f97316",
                            "&:hover": { bgcolor: "#ea580c" },
                            width: "100%",
                            py: 1.5,
                            borderRadius: 3,
                            fontWeight: "bold",
                        }}
                    >
                        Edit Profile
                    </Button>
                </Box>
            </Card>
        </Box>
    );
}

export default MyProfile;
