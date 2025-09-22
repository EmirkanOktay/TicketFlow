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
    Divider,
    Badge,
} from "@mui/material";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import useLogo from "../hooks/useLogo";
import useDarkMode from "../hooks/useDarkMode";
import { getUserInfos } from "../api/UserRedux";
import { getAllNotifications, markAllNotificationsRead } from "../api/NotifyRedux";

const Navbar = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElNotif, setAnchorElNotif] = useState(null);
    const [userRole, setUserRole] = useState(null);

    const { logoWidth } = useLogo();
    const { handleDarkMode, openDarkMode } = useDarkMode();

    const userFromStore = useSelector((state) => state.user.user);
    const notifications = useSelector((state) => state.notifications.notifications || []);

    const handleNotifMenuOpen = (event) => {
        setAnchorElNotif(event.currentTarget);
        dispatch(markAllNotificationsRead())
            .unwrap()
            .catch((err) => console.error("Failed to mark notifications:", err));
    };


    const handleNotifMenuClose = () => setAnchorElNotif(null);

    const notifyToTicket = (id) => {
        setAnchorElNotif(null)
        navigate(`/ticket/my-tickets/ticket-details/${id}`)
    }

    useEffect(() => {
        dispatch(getUserInfos())
            .unwrap()
            .then((data) => setUserRole(data.role))
            .catch((error) => console.error("Failed to fetch user info:", error));
    }, [dispatch]);

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(getAllNotifications());
        }, 50);
        return () => clearInterval(interval);
    }, [dispatch]);

    const logoutHandler = () => {
        logout();
        toast.success("Logout Successful");
        navigate("/auth/login");
    };

    const { name, surname, role } = userFromStore;

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
                <ConfirmationNumberIcon sx={{ mr: 1, ml: logoWidth, color: "#f97316" }} />
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
                        transition: "margin 0.3s ease",
                    }}
                >
                    TicketFlow
                </Typography>

                <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
                    <Button
                        color="inherit"
                        sx={{ width: "0px", minWidth: 30, padding: 0, "&:hover": { color: "#f97316" } }}
                        onClick={handleDarkMode}
                    >
                        {openDarkMode ? <WbSunnyIcon /> : <NightlightRoundIcon />}
                    </Button>

                    <Button color="inherit" sx={{ width: "30px", minWidth: 0, padding: 0, "&:hover": { color: "#f97316" } }} onClick={handleNotifMenuOpen}>
                        <Badge badgeContent={notifications.filter((n) => !n.read).length} color="error">
                            <NotificationsIcon />
                        </Badge>
                    </Button>

                    <Menu
                        anchorEl={anchorElNotif}
                        open={Boolean(anchorElNotif)}
                        onClose={handleNotifMenuClose}
                        PaperProps={{ sx: { width: 350, maxHeight: 400, p: 1 } }}
                    >
                        <Typography sx={{ px: 1, py: 0.5, fontWeight: "bold" }}>Notifications</Typography>
                        <Divider sx={{ my: 0.5 }} />
                        {notifications.length === 0 ? (
                            <MenuItem disabled>
                                <Typography variant="body2" color="text.secondary">No notifications</Typography>
                            </MenuItem>
                        ) : (
                            notifications.map((n) => (
                                <MenuItem
                                    key={n._id}
                                    onClick={() => { notifyToTicket(n.link) }}
                                    sx={{
                                        flexDirection: "column",
                                        alignItems: "flex-start",
                                        backgroundColor: n.read ? "transparent" : "rgba(249,115,22,0.1)",
                                        mb: 0.5,
                                    }}
                                >
                                    <Typography variant="subtitle2" fontWeight={n.read ? "normal" : "bold"}>
                                        {n.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ fontSize: 10, wordBreak: "break-word", whiteSpace: "normal", mt: 0.5 }}
                                    >
                                        {n.message}
                                    </Typography>
                                    {n.createdAt && (
                                        <Typography variant="caption" color="text.secondary" mt={0.5}>
                                            {new Date(n.createdAt).toLocaleString()}
                                        </Typography>
                                    )}
                                </MenuItem>
                            ))
                        )}
                    </Menu>
                </Box>

                {user ? (
                    <>
                        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ ml: 2, p: 0 }}>
                            <Box display="flex" alignItems="center" gap={1}>
                                <Avatar sx={{ bgcolor: "#f97316", width: 36, height: 36, fontSize: 14 }}>
                                    {name?.[0]}
                                    {surname?.[0]}
                                </Avatar>
                                <Box textAlign="left">
                                    <Typography sx={{ color: "white", fontSize: 14, fontWeight: 500 }}>
                                        {name} {surname}
                                    </Typography>
                                    <Typography sx={{ color: "rgba(255,255,255,0.7)", fontSize: 12 }}>{role}</Typography>
                                </Box>
                            </Box>
                        </IconButton>

                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                            <MenuItem component={Link} to="/profile" onClick={() => setAnchorEl(null)}>Profile</MenuItem>
                            <MenuItem onClick={() => { logoutHandler(); setAnchorEl(null); }}>Logout</MenuItem>
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

                {user && ["Employee", "It", "Admin"].includes(userRole) && (
                    <Box sx={{ display: { xs: "flex", md: "none" } }}>
                        <IconButton color="inherit" onClick={(e) => setAnchorEl(e.currentTarget)}>
                            <MenuIcon />
                        </IconButton>
                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                            <MenuItem component={Link} to="/profile/my-profile" onClick={() => setAnchorEl(null)}>My Profile</MenuItem>
                            {userRole === "Admin" && (
                                <MenuItem component={Link} to="/admin/create-user" onClick={() => setAnchorEl(null)}>Create User</MenuItem>
                            )}
                            <MenuItem component={Link} to="/dashboard/support" onClick={() => setAnchorEl(null)}>Support</MenuItem>
                            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                        </Menu>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
