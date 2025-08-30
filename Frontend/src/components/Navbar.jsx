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
import { useState } from "react";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
    const { user, logout } = useAuth();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

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
                    to="/"
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

                {user && (
                    <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
                        <Button color="inherit" component={Link} to="/ticket/create" sx={{ "&:hover": { color: "#f97316" } }}>
                            New Ticket
                        </Button>
                        <Button color="inherit" component={Link} to="/ticket" sx={{ "&:hover": { color: "#f97316" } }}>
                            My Tickets
                        </Button>
                        <Button color="inherit" component={Link} to="/dashboard" sx={{ "&:hover": { color: "#f97316" } }}>
                            Dashboard
                        </Button>
                    </Box>
                )}

                {user ? (
                    <>
                        <IconButton onClick={handleMenuOpen} sx={{ ml: 2 }}>
                            <Avatar sx={{ bgcolor: "#f97316" }}>
                                {user.username?.[0]?.toUpperCase() || "U"}
                            </Avatar>
                        </IconButton>
                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                            <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>
                                Profile
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    logout();
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

                {user && (
                    <Box sx={{ display: { xs: "flex", md: "none" } }}>
                        <IconButton color="inherit" onClick={handleMenuOpen}>
                            <MenuIcon />
                        </IconButton>
                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                            <MenuItem component={Link} to="/ticket/create" onClick={handleMenuClose}>
                                New Ticket
                            </MenuItem>
                            <MenuItem component={Link} to="/ticket" onClick={handleMenuClose}>
                                My Tickets
                            </MenuItem>
                            <MenuItem component={Link} to="/dashboard" onClick={handleMenuClose}>
                                Dashboard
                            </MenuItem>
                        </Menu>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
