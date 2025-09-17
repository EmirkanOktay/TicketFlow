import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { PieChart } from "@mui/x-charts/PieChart";
import Loading from "../../components/Loading";
import { getAllUsers } from "../../api/UserRedux";
import { getAllTickets } from "../../api/TicketRedux";
import useLogo from "../../hooks/useLogo";

const AnalyticsPage = () => {
    const { logoWidth } = useLogo();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user.user);
    const currentUserRole = currentUser?.role;

    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [userStats, setUserStats] = useState({});
    const [ticketStats, setTicketStats] = useState({});

    const fetchData = async () => {
        try {
            const usersResp = await dispatch(getAllUsers()).unwrap();
            const ticketsResp = await dispatch(getAllTickets()).unwrap();
            setUsers(usersResp);
            setTickets(ticketsResp);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const calculateStats = () => {
        const totalUsers = users.length;
        const totalAdmins = users.filter(u => u.role === "Admin").length;
        const totalIt = users.filter(u => u.role === "It").length;
        const totalEmployee = users.filter(u => u.role === "Employee").length;

        const percentAdmins = totalUsers ? ((totalAdmins / totalUsers) * 100).toFixed(1) : 0;
        const percentIt = totalUsers ? ((totalIt / totalUsers) * 100).toFixed(1) : 0;
        const percentEmployee = totalUsers ? ((totalEmployee / totalUsers) * 100).toFixed(1) : 0;

        const totalTickets = tickets.length;

        const categoryCount = tickets.reduce((acc, t) => {
            acc[t.category] = (acc[t.category] || 0) + 1;
            return acc;
        }, {});
        const categoryPerc = Object.fromEntries(
            Object.entries(categoryCount).map(([k, v]) => [k, totalTickets ? ((v / totalTickets) * 100).toFixed(1) : 0])
        );

        const statusCount = tickets.reduce((acc, t) => {
            acc[t.status] = (acc[t.status] || 0) + 1;
            return acc;
        }, {});
        const statusPerc = Object.fromEntries(
            Object.entries(statusCount).map(([k, v]) => [k, totalTickets ? ((v / totalTickets) * 100).toFixed(1) : 0])
        );

        setUserStats({ totalUsers, totalAdmins, totalIt, totalEmployee, percentAdmins, percentIt, percentEmployee });
        setTicketStats({ totalTickets, categoryCount, categoryPerc, statusPerc });
    };

    useEffect(() => {
        if (currentUserRole !== "Admin") navigate("/dashboard");
        fetchData();
    }, []);

    useEffect(() => {
        if (users.length || tickets.length) calculateStats();
    }, [users, tickets]);

    if (loading) return <Loading text="Loading..." />;

    const pieData = Object.entries(ticketStats.categoryCount || {}).map(([label, value], i) => ({
        id: i,
        label,
        value,
    }));

    return (
        <Box sx={{ marginLeft: logoWidth, p: 4 }}>
            <Typography variant="h4" sx={{ mb: 4 }}>Admin Analytics Dashboard</Typography>

            <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", mb: 4 }}>
                <Card sx={{ flex: 1, minWidth: 250, p: 3, borderRadius: 3, boxShadow: "0 6px 25px rgba(0,0,0,0.1)", background: "linear-gradient(135deg,#f97316,#ffb347)", color: "#fff", cursor: "pointer", "&:hover": { transform: "scale(1.05)", boxShadow: "0 10px 35px rgba(0,0,0,0.3)" } }}>
                    <Typography variant="h6">Total Users</Typography>
                    <Typography variant="h4">{userStats.totalUsers}</Typography>
                    <Typography>{userStats.percentAdmins}% Admin</Typography>
                    <Typography>{userStats.percentIt}% IT</Typography>
                    <Typography>{userStats.percentEmployee}% Employee</Typography>
                </Card>

                <Card sx={{ flex: 1, minWidth: 250, p: 3, borderRadius: 3, boxShadow: "0 6px 25px rgba(0,0,0,0.1)", background: "linear-gradient(135deg,#1e293b,#334155)", color: "#f97316", cursor: "pointer", "&:hover": { transform: "scale(1.05)", boxShadow: "0 10px 35px rgba(0,0,0,0.3)" } }}>
                    <Typography variant="h6">Total Tickets</Typography>
                    <Typography variant="h4" sx={{ mb: 2 }}>{ticketStats?.totalTickets}</Typography>
                    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 1 }}>
                        {Object.entries(ticketStats.categoryCount || {}).map(([category, count, percent]) => (
                            <Box key={category} sx={{ flex: 1, minWidth: 100, p: 1.5, borderRadius: 2, backgroundColor: "rgba(255,255,255,0.1)", textAlign: "center" }}>
                                <Typography variant="subtitle2">{category}</Typography>
                                <Typography variant="h6">{count}</Typography>
                            </Box>
                        ))}
                    </Box>
                </Card>
            </Box>

            <Card sx={{ p: 3, borderRadius: 3, boxShadow: "0 6px 25px rgba(0,0,0,0.1)", mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>Ticket Categories</Typography>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <PieChart series={[{ data: pieData }]} width={300} height={300} />
                </Box>
            </Card>

            <Card sx={{ p: 3, borderRadius: 3, boxShadow: "0 6px 25px rgba(0,0,0,0.1)" }}>
                <CardContent>
                    <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>Ticket Status Overview</Typography>
                    <Box sx={{ display: "flex", justifyContent: "space-around", gap: 3, flexWrap: "wrap" }}>
                        {["Open", "In-progress", "Closed"].map(status => {
                            const value = parseFloat(ticketStats.statusPerc?.[status]) || 0;
                            return (
                                <Box key={status} sx={{ textAlign: "center", minWidth: 120 }}>
                                    <Gauge
                                        value={value}
                                        min={0}
                                        max={100}
                                        width={120}
                                        height={120}
                                        sx={{ [`& .${gaugeClasses.valueArc}`]: { fill: "#f97316" } }}
                                    />
                                    <Typography sx={{ mt: 1, fontWeight: "bold" }}>
                                        {status} ({value}%)
                                    </Typography>
                                </Box>
                            );
                        })}
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default AnalyticsPage;
