import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
} from "@mui/material";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserInfos } from "../api/UserRedux";
const Navbar = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [anchorEl, setAnchorEl] = useState(null);
    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);
    const [userRole, setUserRole] = useState(null)
    const disppatch = useDispatch();

    useEffect(() => {
        disppatch(getUserInfos())
            .unwrap()
            .then((data) => setUserRole(data.role))
            .catch((error) => console.error("Failed to fetch user info:", error));
    }, [disppatch])

    console.log(userRole)
    const logoutHandler = () => {
        logout();
        toast.success("Logout Successful");
        navigate("/auth/login");
    }

    return (
        <AppBar
            position="sticky"
            sx={{
                background: "linear-gradient(90deg, #1e293b 0%, #0f172a 100%)",
                boxShadow: 3,
                px: 2,
            }}
        >
            <Toolbar>
                <ConfirmationNumberIcon sx={{ mr: 1, color: "#f97316" }} />{" "}
                <Typography
                    variant="h6"
                    component={Link}
                    to="/dashboard"
                    sx={{
                        flexGrow: 1,
                        textDecoration: "none",
                        color: "white",
                        fontWeight: "bold",
                        letterSpacing: 1,
                    }}
                >
                    TicketFlow
                </Typography>

                {user && userRole === "Employee" && (
                    <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
                        <Button color="inherit" component={Link} to="/ticket/create" sx={{ "&:hover": { color: "#f97316" } }}>
                            New Ticket
                        </Button>
                        <Button color="inherit" component={Link} to="/ticket" sx={{ "&:hover": { color: "#f97316" } }}>
                            My Tickets
                        </Button>
                        <Button color="inherit" component={Link} to="/ticket/create" sx={{ "&:hover": { color: "#f97316" } }}>
                            Create Ticket
                        </Button>
                    </Box>
                )}


                {user && userRole === "Admin" && (
                    <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
                        <Button color="inherit" component={Link} to="/admin/tickets" sx={{ "&:hover": { color: "#f97316" } }}>
                            Tickets
                        </Button>
                        <Button color="inherit" component={Link} to="/admin/users" sx={{ "&:hover": { color: "#f97316" } }}>
                            Users
                        </Button>
                        <Button color="inherit" component={Link} to="/admin/analytics" sx={{ "&:hover": { color: "#f97316" } }}>
                            Analytics
                        </Button>
                    </Box>
                )}

                {user && userRole === "It" && (
                    <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
                        <Button color="inherit" component={Link} to="/it/tickets" sx={{ "&:hover": { color: "#f97316" } }}>
                            Tickets
                        </Button>
                        <Button color="inherit" component={Link} to="/it/open-tickets" sx={{ "&:hover": { color: "#f97316" } }}>
                            Open Tickets
                        </Button>
                        <Button color="inherit" component={Link} to="/it/closed-tickets" sx={{ "&:hover": { color: "#f97316" } }}>
                            Closed Tickets
                        </Button>
                    </Box>
                )}
                {user ? (
                    <>
                        <IconButton onClick={handleMenuOpen} sx={{ ml: 2 }}>
                            <Avatar sx={{ bgcolor: "#f97316" }}>
                                {user.username?.[0]?.toUpperCase() || ""}
                            </Avatar>
                        </IconButton>
                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                            <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>
                                Profile
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    logoutHandler();
                                    handleMenuClose();
                                }}
                            >
                                Logout
                            </MenuItem>
                        </Menu>
                    </>
                ) : (
                    <Button
                        variant="contained"
                        color="secondary"
                        component={Link}
                        to="/auth/login"
                        sx={{ bgcolor: "#f97316", "&:hover": { bgcolor: "#ea580c" } }}
                    >
                        Login
                    </Button>
                )}

                {user && userRole == "Employee" && (
                    <Box sx={{ display: { xs: "flex", md: "none" } }}>
                        <IconButton color="inherit" onClick={handleMenuOpen}>
                            <MenuIcon />
                        </IconButton>
                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                            <MenuItem component={Link} to="/profile/edit" onClick={handleMenuClose}>
                                My Profile
                            </MenuItem>
                            <MenuItem component={Link} to="/ticket" onClick={handleMenuClose}>
                                My Tickets
                            </MenuItem>
                            <MenuItem component={Link} onClick={logoutHandler}>
                                Logout
                            </MenuItem>
                        </Menu>
                    </Box>
                )}

                {user && userRole == "It" && (
                    <Box sx={{ display: { xs: "flex", md: "none" } }}>
                        <IconButton color="inherit" onClick={handleMenuOpen}>
                            <MenuIcon />
                        </IconButton>
                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                            <MenuItem component={Link} to="/profile/edit" onClick={handleMenuClose}>
                                My Profile
                            </MenuItem>
                            <MenuItem component={Link} to="/it/tickets" onClick={handleMenuClose}>
                                Tickets
                            </MenuItem>
                            <MenuItem component={Link} onClick={logoutHandler}>
                                Logout
                            </MenuItem>
                        </Menu>
                    </Box>
                )}

                {user && userRole == "Admin" && (
                    <Box sx={{ display: { xs: "flex", md: "none" } }}>
                        <IconButton color="inherit" onClick={handleMenuOpen}>
                            <MenuIcon />
                        </IconButton>
                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                            <MenuItem component={Link} to="/profile/edit" onClick={handleMenuClose}>
                                My Profile
                            </MenuItem>
                            <MenuItem component={Link} to="/admin/create-user" onClick={handleMenuClose}>
                                Create User
                            </MenuItem>
                            <MenuItem component={Link} onClick={logoutHandler}>
                                Logout
                            </MenuItem>
                        </Menu>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
