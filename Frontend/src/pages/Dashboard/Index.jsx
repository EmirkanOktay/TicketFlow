import { useDispatch, useSelector } from "react-redux";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { getAllTickets } from "../../api/TicketRedux";
import { getAllUsers } from "../../api/UserRedux";
import { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import Loading from '../../components/Loading';
import useLogo from "../../hooks/useLogo";

const Dashboard = () => {
    const { logoWidth } = useLogo();
    const currentUser = useSelector((state) => state.user.user);
    const currentUserRole = currentUser.role;
    const dispatch = useDispatch();
    const [tickets, setTickets] = useState([]);
    const [users, setUsers] = useState([]);
    const [countCategory, setCountCategory] = useState({});
    const [countPriority, setCountPriority] = useState({});
    const [totalTicketPercan, setTotalTicketPercan] = useState({});
    const [mostTicketCreater, setMostTicketCreater] = useState();
    const [mostTicketCloser, setMostTicketCloser] = useState();
    const [avarageCloseDuration, setAvarageCloseDuration] = useState();
    const [loading, setLoading] = useState(true);

    const getTicketsAll = async () => {
        try {
            const response = await dispatch(getAllTickets()).unwrap();
            if (response) setTickets(response);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getUsersAll = async () => {
        try {
            const response = await dispatch(getAllUsers()).unwrap();
            if (response) setUsers(response)
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getTicketsAll();
        getUsersAll();
    }, []);

    useEffect(() => {
        if (!tickets || tickets.length === 0) return;

        const categoryCount = tickets.reduce((acc, ticket) => {
            if (!ticket?.category) return acc;
            acc[ticket.category] = (acc[ticket.category] || 0) + 1;
            return acc;
        }, {});

        const priorityCount = tickets.reduce((acc, ticket) => {
            if (!ticket?.priority) return acc;
            acc[ticket.priority] = (acc[ticket.priority] || 0) + 1;
            return acc;
        }, {});

        const statusCount = tickets.reduce((acc, ticket) => {
            if (!ticket?.status) return acc;
            acc[ticket.status] = (acc[ticket.status] || 0) + 1;
            return acc;
        }, {});

        const totalTickets = tickets.length;

        const statusPercentage = Object.fromEntries(
            Object.entries(statusCount).map(([status, count]) => [status, ((count / totalTickets) * 100).toFixed(1)])
        );

        const durationToSeconds = (duration) => {
            const h = parseInt(duration.match(/(\d+)h/)?.[1] || 0);
            const m = parseInt(duration.match(/(\d+)m/)?.[1] || 0);
            const s = parseInt(duration.match(/(\d+)s/)?.[1] || 0);
            return h * 3600 + m * 60 + s;
        };

        const closedTickets = tickets.filter(ticket => ticket.status === "Closed" && ticket.closeDuration);
        const totalSeconds = closedTickets.reduce((acc, ticket) => acc + durationToSeconds(ticket.closeDuration), 0);
        const averageSeconds = closedTickets.length > 0 ? totalSeconds / closedTickets.length : 0;

        const formatSeconds = (seconds) => {
            const h = Math.floor(seconds / 3600);
            const m = Math.floor((seconds % 3600) / 60);
            const s = Math.floor(seconds % 60);
            return `${h}h ${m}m ${s}s`;
        };

        const averageCloseDuration = formatSeconds(averageSeconds);

        const mostTicketCreaterUser = users.reduce((mostUser, currentUser) => {
            if (!mostUser || currentUser.ticketCreatedCount > mostUser.ticketCreatedCount) return currentUser;
            return mostUser;
        }, null);

        const mostTicketCloserUser = users.reduce((mostUser, currentUser) => {
            if (!mostUser || currentUser.ticketCloseCount > mostUser.ticketCloseCount) return currentUser;
            return mostUser;
        }, null)

        setCountCategory(categoryCount);
        setCountPriority(priorityCount);
        setTotalTicketPercan(statusPercentage);
        setAvarageCloseDuration(averageCloseDuration);
        setMostTicketCreater(mostTicketCreaterUser);
        setMostTicketCloser(mostTicketCloserUser);
    }, [tickets, users]);

    const pieData = Object.entries(countPriority).map(([priority, value], index) => ({
        id: index,
        label: priority,
        value,
        color:
            priority.toLowerCase() === "high"
                ? "#f97316"
                : priority.toLowerCase() === "medium"
                    ? "#fbbf24"
                    : "#1e293b",
    }));

    if (loading) return <Loading text="Loading..." />;
    return (
        <>
            <Box sx={{ marginLeft: logoWidth, px: 4, py: 4, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginLeft: '10px' }}>
                    <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700 }}>
                            Welcome Back, {currentUser.name}!
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#6b7280', mt: 0.5 }}>
                            Here's your dashboard summary at a glance.
                        </Typography>
                    </Box>
                </Box>
            </Box>

            {
                currentUser && currentUserRole == "Admin" && (
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 4, p: 4, marginLeft: logoWidth }}>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                            <Card
                                sx={{
                                    flex: 1,
                                    minWidth: 300,
                                    borderRadius: 3,
                                    boxShadow: "0 6px 25px rgba(0,0,0,0.1)",
                                    backgroundColor: "#f9f9f9",
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold", }}>
                                        Ticket Category Overview
                                    </Typography>
                                    <BarChart
                                        xAxis={[{ scaleType: "band", data: Object.keys(countCategory) }]}
                                        series={[{ data: Object.values(countCategory), color: "#f97316" }]}
                                        width={500}
                                        height={350}
                                    />
                                </CardContent>
                            </Card>

                            <Card
                                sx={{
                                    flex: 1,
                                    minWidth: 250,
                                    borderRadius: 3,
                                    boxShadow: "0 6px 25px rgba(0,0,0,0.1)",
                                    backgroundColor: "#f9f9f9",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    p: 2,
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}>
                                        Ticket Priority Overview
                                    </Typography>
                                    <PieChart series={[{ data: pieData }]} width={250} height={250} />
                                </CardContent>
                            </Card>

                            <Card
                                sx={{
                                    flex: 1,
                                    minWidth: 250,
                                    borderRadius: 3,
                                    boxShadow: "0 6px 25px rgba(0,0,0,0.1)",
                                    backgroundColor: "#f9f9f9",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    p: 2,
                                }}
                            >
                                <CardContent>
                                    <Typography
                                        variant="h6"
                                        sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}
                                    >
                                        Current Ticket Status Overview
                                    </Typography>
                                    <Box sx={{ display: "flex", justifyContent: "space-around", gap: 2 }}>
                                        {["Closed", "In-progress", "Open"].map((status) => (
                                            <Box key={status} sx={{ textAlign: "center" }}>
                                                <Gauge
                                                    value={parseFloat(totalTicketPercan[status] || 0)}
                                                    min={0}
                                                    max={100}
                                                    width={120}
                                                    height={120}
                                                    sx={(theme) => ({
                                                        [`& .${gaugeClasses.valueArc}`]: { fill: "#f97316" }
                                                    })}
                                                />
                                                <Typography sx={{ mt: 1, fontWeight: "bold" }}>
                                                    {status} ({totalTicketPercan[status] || 0}%)
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>

                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(3, 1fr)" },
                                gap: 3,
                            }}
                        >
                            <Card
                                sx={{
                                    borderRadius: 3,
                                    boxShadow: "0 6px 25px rgba(0,0,0,0.2)",
                                    background: "linear-gradient(135deg, #f97316 0%, #ffb347 100%)",
                                    color: "#fff",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    p: 3,
                                    transition: "transform 0.3s, box-shadow 0.3s",
                                    "&:hover": {
                                        transform: "scale(1.05)",
                                        boxShadow: "0 10px 35px rgba(0,0,0,0.3)",
                                    },
                                }}
                            >
                                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>🏆</Typography>
                                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>Most Ticket Creator</Typography>
                                </Box>
                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>{mostTicketCreater.ticketCreatedCount} Ticket Created!</Typography>

                                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                                        {mostTicketCreater?.name} {mostTicketCreater?.surname}
                                    </Typography>
                                    <Typography variant="body2">{mostTicketCreater?.email}</Typography>
                                    <Typography variant="body">{mostTicketCreater?.role}</Typography>
                                </Box>
                            </Card>

                            <Card
                                sx={{
                                    borderRadius: 3,
                                    boxShadow: "0 6px 25px rgba(0,0,0,0.2)",
                                    background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
                                    color: "#f97316",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    p: 3,
                                    transition: "transform 0.3s, box-shadow 0.3s",
                                    "&:hover": {
                                        transform: "scale(1.05)",
                                        boxShadow: "0 10px 35px rgba(0,0,0,0.3)",
                                    },
                                }}
                            >
                                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>✅</Typography>
                                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>Most Ticket Closer</Typography>
                                </Box>
                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>{mostTicketCloser.ticketCloseCount} Ticket Closed!</Typography>
                                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                                        {mostTicketCloser?.name} {mostTicketCloser?.surname}
                                    </Typography>
                                    <Typography variant="body2">{mostTicketCloser?.email}</Typography>
                                    <Typography variant="body">{mostTicketCloser?.role}</Typography>
                                </Box>
                            </Card>

                            <Card
                                sx={{
                                    borderRadius: 3,
                                    boxShadow: "0 6px 25px rgba(0,0,0,0.2)",
                                    background: "linear-gradient(135deg, #f97316 0%, #1e293b 100%)",
                                    color: "#fff",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    p: 3,
                                    transition: "transform 0.3s, box-shadow 0.3s",
                                    "&:hover": {
                                        transform: "scale(1.05)",
                                        boxShadow: "0 10px 35px rgba(0,0,0,0.3)",
                                    },
                                }}
                            >
                                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>⏱️</Typography>
                                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>Average Close Duration</Typography>
                                </Box>
                                <Box sx={{ mt: 3, textAlign: "center" }}>
                                    <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                                        {avarageCloseDuration || "0h 0m 0s"}
                                    </Typography>
                                </Box>
                            </Card>
                        </Box>
                    </Box>
                )
            }
        </>
    );

};

export default Dashboard;
