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
import { useDispatch, useSelector } from "react-redux";
import { getUserInfos } from "../api/UserRedux";
const Navbar = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [anchorEl, setAnchorEl] = useState(null);
    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);
    const [userRole, setUserRole] = useState(null)
    const disppatch = useDispatch();
    const userFromStore = useSelector((state) => state.user.user);

    useEffect(() => {
        disppatch(getUserInfos())
            .unwrap()
            .then((data) => setUserRole(data.role))
            .catch((error) => console.error("Failed to fetch user info:", error));
    }, [disppatch])

    const logoutHandler = () => {
        logout();
        toast.success("Logout Successful");
        navigate("/auth/login");
    }
    const { name, surname, role } = userFromStore
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
                        <Button color="inherit" component={Link} to="/ticket/my-tickets" sx={{ "&:hover": { color: "#f97316" } }}>
                            My Tickets
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
                        <IconButton onClick={handleMenuOpen} sx={{ ml: 2, p: 0 }}>
                            <Box display="flex" alignItems="center" gap={1}>
                                <Avatar sx={{ bgcolor: "#f97316", width: 36, height: 36, fontSize: 14 }}>
                                    {name?.[0]}{surname?.[0]}
                                </Avatar>
                                <Box textAlign="left">
                                    <Typography sx={{ color: 'white', fontSize: 14, fontWeight: 500 }}>
                                        {name} {surname}
                                    </Typography>
                                    <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>
                                        {role}
                                    </Typography>
                                </Box>
                            </Box>
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
                            <MenuItem component={Link} to="/profile/my-profile" onClick={handleMenuClose}>
                                My Profile
                            </MenuItem>
                            <MenuItem component={Link} to="support" onClick={handleMenuClose}>
                                Support
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
                            <MenuItem component={Link} to="/profile/my-profile" onClick={handleMenuClose}>                                My Profile
                            </MenuItem>
                            <MenuItem component={Link} to="support" onClick={handleMenuClose}>
                                Support
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
                            <MenuItem component={Link} to="/profile/my-profile" onClick={handleMenuClose}>                                My Profile
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
