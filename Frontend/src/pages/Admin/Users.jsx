import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllUsers, deleteUser } from "../../api/UserRedux";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'
import {
    Box,
    Card,
    CardContent,
    Typography,
    TextField,
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    IconButton,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Loading from "../../components/Loading";
import GradeIcon from '@mui/icons-material/Grade';

function Users() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getUsers = async () => {
        try {
            const results = await dispatch(getAllUsers()).unwrap();
            setUsers(results);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    const handleOpenDialog = (id) => {
        setSelectedUserId(id);
        setOpen(true);
    };

    const handleEdit = (id) => {
        navigate(`/admin/edit-user/${id}`);
    };


    const handleCloseDialog = () => {
        setOpen(false);
        setSelectedUserId(null);
    };

    const confirmDeleteUser = async () => {
        try {
            const result = await dispatch(deleteUser(selectedUserId)).unwrap();
            toast.success("User Deleted")
            setUsers(users.filter((u) => u._id !== selectedUserId));
            navigate("/admin/users")

        } catch (error) {
            toast.error(error);
            console.error("Delete user error:", error);
        } finally {
            handleCloseDialog();
        }
    };

    const filteredUsers = users.filter(
        (u) =>
            u.name?.toLowerCase().includes(search.toLowerCase()) ||
            u.surname?.toLowerCase().includes(search.toLowerCase()) ||
            u.email?.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return <Loading text="Loading..." />;

    return (
        <Box sx={{ p: 4, bgcolor: "#f5f7fa", minHeight: "100vh" }}>
            <Card sx={{ borderRadius: 4, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}>
                <Box
                    sx={{
                        background: "linear-gradient(90deg, #f97316, #fb923c)",
                        p: 3,
                        color: "white",
                    }}
                >
                    <Typography variant="h5" fontWeight="bold">
                        👥 User Management
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.85 }}>
                        Manage all registered users in the system
                    </Typography>
                </Box>

                <CardContent>
                    <Box display="flex" justifyContent="flex-end" mb={3}>
                        <TextField
                            size="small"
                            placeholder="Search User..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            sx={{
                                minWidth: 300,
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: 3,
                                    backgroundColor: "#fff",
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                                },
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ color: "#9ca3af" }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>

                    <TableContainer
                        component={Paper}
                        sx={{ borderRadius: 3, boxShadow: "0 4px 16px rgba(0,0,0,0.05)" }}
                    >
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: "#f3f4f6" }}>
                                    <TableCell sx={{ fontWeight: "bold" }}>Users</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>Role</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>Created</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>Closed</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {filteredUsers.map((user) => (
                                    <TableRow key={user._id} hover>
                                        <TableCell>
                                            <Box display="flex" alignItems="center" gap={1.5}>
                                                <Avatar sx={{ bgcolor: "#f97316" }}>
                                                    {user.name?.[0]}
                                                    {user.surname?.[0]}
                                                </Avatar>
                                                <Typography fontWeight="500">
                                                    {user.name} {user.surname}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={user.role}
                                                color={
                                                    user.role === "Admin"
                                                        ? "error"
                                                        : user.role === "Employee"
                                                            ? "warning"
                                                            : "primary"
                                                }
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell>{user.ticketCreatedCount}</TableCell>
                                        <TableCell>{user.ticketCloseCount}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => handleEdit(user._id)} color="primary">
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                color="error"
                                                onClick={() => handleOpenDialog(user._id)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                            <IconButton sx={{ color: ' orange' }}>
                                                <GradeIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>

            <Dialog
                open={open}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to delete this user?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        This action cannot be undone. The user will be permanently deleted.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={confirmDeleteUser} color="error" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default Users;
