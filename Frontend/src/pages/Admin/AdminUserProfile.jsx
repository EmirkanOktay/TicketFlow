import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { getUserById } from "../../api/UserRedux";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Box } from "@mui/system";
import { Avatar, Button, Card, Divider, Typography } from "@mui/material";

function AdminUserProfile() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null)
    const { id } = useParams();

    const getUser = async () => {
        try {
            const respond = await dispatch(getUserById(id)).unwrap();
            return setUser(respond)
        } catch (error) {
            toast.error(error)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    const handleButton = () => {
        navigate(`/admin/edit-user/${user._id}`)
    }
    if (loading) return <Loading text="Loading..." />;

    return (
        <div>
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
                            sx={{ mb: 2 }}
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
            </Box></div>
    )
}

export default AdminUserProfile