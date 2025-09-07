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
import useLogo from "../../hooks/useLogo";
import useDarkMode from "../../hooks/useDarkMode";

function Users() {
    const { logoWidth } = useLogo();
    const { openDarkMode } = useDarkMode();

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [closeSortClosed, setCloseSortClosed] = useState(false);
    const [nameSort, setNameSort] = useState(false);
    const [createSort, setCreateSort] = useState(false);
    const [emailSort, setEmailSort] = useState(false);
    const [roleSort, setRoleSort] = useState(0);
    const [createDate, setCrateDate] = useState(false)
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
        (user) =>
            user.name?.toLowerCase().includes(search.toLowerCase()) ||
            user.surname?.toLowerCase().includes(search.toLowerCase()) ||
            user.email?.toLowerCase().includes(search.toLowerCase())
    );

    const closedTicketSort = () => {
        setCloseSortClosed(!closeSortClosed)
        if (closeSortClosed) {
            return users.sort((a, b) => b.ticketCloseCount - a.ticketCloseCount);

        }
        else {
            return users.sort((a, b) => a.ticketCloseCount - b.ticketCloseCount);
        }
    }

    const createdTicketSort = () => {
        setCreateSort(!createSort)
        if (createSort) {
            return users.sort((a, b) => b.ticketCreatedCount - a.ticketCreatedCount);
        }
        else {
            return users.sort((a, b) => a.ticketCreatedCount - b.ticketCreatedCount);
        }
    }

    const sortByName = () => {
        setNameSort(!nameSort)
        if (nameSort) {
            return users.sort((a, b) => b.name.localeCompare(a.name));
        }
        else {
            return users.sort((a, b) => a.name.localeCompare(b.name));
        }
    }

    const sortByEmail = () => {
        setEmailSort(!emailSort)
        if (emailSort) {
            return users.sort((a, b) => b.email.localeCompare(a.email));
        }
        else {
            return users.sort((a, b) => a.email.localeCompare(b.email));
        }
    }

    const sortByRole = () => {
        setRoleSort(roleSort + 1)
        if (roleSort == 1) {
            let sort = users.sort((a, b) => a.role.localeCompare(b.role));
            return sort;
        }
        else {
            let sort = users.sort((a, b) => b.role.localeCompare(a.role));
            if (sort == "It") {
                return sort;
            }

        }
    }

    if (roleSort > 2) {
        setRoleSort(1);
    }

    const sortByCrateDate = () => {
        setCrateDate(!createDate)
        if (createDate) {
            return users.sort((a, b) => {
                const dateA = a.createdAt ? new Date(a.createdAt) : 0;
                const dateB = b.createdAt ? new Date(b.createdAt) : 0;
                return dateA - dateB;
            })
        }
        else {
            return users.sort((a, b) => {
                const dateA = a.createdAt ? new Date(a.createdAt) : 0;
                const dateB = b.createdAt ? new Date(b.createdAt) : 0;
                return dateB - dateA;
            })
        }
    }

    if (loading) return <Loading text="Loading..." />;

    return (
        <Box sx={{
            p: 4,
            bgcolor: openDarkMode ? "#082032" : "#F4F9F9",
            color: openDarkMode ? "#EEEEEE" : "#555555",
            minHeight: "100vh",
            marginLeft: logoWidth
        }}
        >            <Card sx={{ borderRadius: 4, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}>
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
                                <TableRow sx={{ bgcolor: openDarkMode ? "#082032" : "#F4F9F9" }}>
                                    <TableCell sx={{ fontWeight: "bold", cursor: 'pointer' }} onClick={() => sortByName()}>Users</TableCell>
                                    <TableCell sx={{ fontWeight: "bold", cursor: 'pointer' }} onClick={() => sortByEmail()}>Email</TableCell>
                                    <TableCell sx={{ fontWeight: "bold", cursor: 'pointer' }} onClick={() => sortByRole()}>Role</TableCell>
                                    <TableCell sx={{ fontWeight: "bold", cursor: 'pointer' }} onClick={() => sortByCrateDate()}>Account Create Date</TableCell>
                                    <TableCell sx={{ fontWeight: "bold", cursor: 'pointer' }} onClick={() => createdTicketSort()}>Created Tickets</TableCell>
                                    <TableCell sx={{ fontWeight: "bold", cursor: 'pointer' }} onClick={() => closedTicketSort()}>Closed Tickets</TableCell>
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
                                        <TableCell>{user.createdAt.toString().slice(0, 10)}</TableCell>
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
