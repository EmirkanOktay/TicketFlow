import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Box,
    Avatar,
    Typography,
    IconButton,
    Tooltip,
    Divider,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import AddIcon from "@mui/icons-material/Add";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";
import useLogo from '../hooks/useLogo';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import DoneIcon from '@mui/icons-material/Done';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import AutorenewIcon from '@mui/icons-material/Autorenew';

export default function Sidebar() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);
    const { name, surname, role } = user || {};
    let { open, setOpen, drawerWidth } = useLogo();

    const toggleSidebar = () => setOpen(!open);

    const logoutHandler = () => {
        logout();
        navigate("/auth/login");
    };

    const menuItemsByRole = {
        admin: [
            { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard", section: "Pages" },
            { text: "Tickets", icon: <ConfirmationNumberIcon />, path: "/admin/tickets", section: "Management" },
            { text: "Users", icon: <PeopleIcon />, path: "/admin/users", section: "Management" },
            { text: "Create User", icon: <GroupAddIcon />, path: "/admin/create-user", section: "Management" },
            { text: "Analytics", icon: <AnalyticsIcon />, path: "/admin/analytics", section: "Management" },
            { text: "My Profile", icon: <AccountCircleIcon />, path: "/profile/my-profile", section: "Profile" },
            { text: "Support", icon: <SupportAgentIcon />, path: "/dashboard/support", section: "Pages" },
        ],
        employee: [
            { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard", section: "Pages" },
            { text: "Create New Ticket", icon: <AddIcon />, path: "/ticket/create", section: "Pages" },
            { text: "My Tickets", icon: <ConfirmationNumberIcon />, path: "/ticket/my-tickets", section: "Pages" },
            { text: "Support", icon: <SupportAgentIcon />, path: "/dashboard/support", section: "Pages" },
            { text: "My Profile", icon: <AccountCircleIcon />, path: "/profile/my-profile", section: "Profile" },
        ],
        it: [
            { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard", section: "Pages" },
            { text: "Tickets", icon: <ConfirmationNumberIcon />, path: "/it/tickets", section: "Management" },
            { text: "Open Tickets", icon: <HourglassTopIcon />, path: "/it/open-tickets", section: "Management" },
            { text: "In-Progress Tickets", icon: <AutorenewIcon />, path: "/it/in-progress-tickets", section: "Management" },
            { text: "Closed Tickets", icon: <DoneIcon />, path: "/it/closed-tickets", section: "Management" },
            { text: "My Profile", icon: <AccountCircleIcon />, path: "/profile/my-profile", section: "Profile" },
            { text: "Support", icon: <SupportAgentIcon />, path: "/dashboard/support", section: "Pages" },
        ],
    };

    const menuItems = menuItemsByRole[role?.toLowerCase()] || [];

    const sections = [...new Set(menuItems.map(item => item.section))];

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                transition: "width 0.3s ease",
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    background: "linear-gradient(180deg, #1e293b 0%, #0f172a 100%)",
                    color: "white",
                    transition: "width 0.3s",
                    overflowX: "hidden",
                },
            }}
        >
            <Toolbar sx={{ display: "flex", justifyContent: open ? "flex-end" : "center", px: 1 }}>
                <IconButton onClick={toggleSidebar} sx={{ color: "white" }}>
                    <MenuIcon />
                </IconButton>
            </Toolbar>

            {open && (
                <Box sx={{ textAlign: "center", p: 2 }}>
                    <Avatar sx={{ bgcolor: "#f97316", width: 56, height: 56, fontSize: 18, mx: "auto" }}>
                        {name?.[0]}{surname?.[0]}
                    </Avatar>
                    <Typography variant="subtitle1" sx={{ mt: 1 }}>
                        {name} {surname}
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.7 }}>
                        {role}
                    </Typography>
                </Box>
            )}

            <List>
                {sections.map(section => (
                    <Box key={section} sx={{ mt: 2 }}>
                        {open && (
                            <Typography sx={{ pl: 2, pt: 1, pb: 1, fontWeight: "bold", opacity: 0.7 }}>
                                {section}
                            </Typography>
                        )}
                        {menuItems
                            .filter(item => item.section === section)
                            .map(item => (
                                <ListItem key={item.text} disablePadding sx={{ justifyContent: open ? "initial" : "center" }}>
                                    <Tooltip title={!open ? item.text : ""} placement="right">
                                        <ListItemButton component={Link} to={item.path}>
                                            <ListItemIcon sx={{ color: "white", minWidth: 0, mr: open ? 3 : "auto", justifyContent: "center" }}>
                                                {item.icon}
                                            </ListItemIcon>
                                            {open && <ListItemText primary={item.text} />}
                                        </ListItemButton>
                                    </Tooltip>
                                </ListItem>
                            ))}
                        {open && <Divider sx={{ my: 1, backgroundColor: "rgba(255,255,255,0.2)" }} />}
                    </Box>
                ))}

                <ListItem disablePadding sx={{ justifyContent: open ? "initial" : "center", mt: 2 }}>
                    <Tooltip title={!open ? "Logout" : ""} placement="right">
                        <ListItemButton onClick={logoutHandler}>
                            <ListItemIcon sx={{ color: "white", minWidth: 0, mr: open ? 3 : "auto", justifyContent: "center" }}>
                                <ExitToAppIcon />
                            </ListItemIcon>
                            {open && <ListItemText primary="Logout" />}
                        </ListItemButton>
                    </Tooltip>
                </ListItem>
            </List>
        </Drawer>
    )
}
