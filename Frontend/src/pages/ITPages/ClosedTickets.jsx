import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { getAllTickets } from '../../api/TicketRedux';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading';
import { Box, Card, CardContent, InputAdornment, TableContainer, TextField, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, Chip, IconButton } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from 'react-router-dom';
import useLogo from '../../hooks/useLogo';
import useDarkMode from '../../hooks/useDarkMode'
function ClosedTickets() {

    const { openDarkMode } = useDarkMode();
    const { logoWidth } = useLogo();

    const cellStyle = {
        fontWeight: "bold",
        cursor: "pointer",
        maxWidth: 120,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("")
    const [titleSort, setTitleSort] = useState(false);
    const [descriptionSort, setDescriptionSort] = useState(false);
    const [statusSort, setStatusSort] = useState(0);
    const [prioritySort, setPrioritySort] = useState(0);
    const [categorySort, setCategorySort] = useState(0);
    const [createdBy, setCreatedBy] = useState(false);
    const [closedBy, setClosedBy] = useState(false);
    const [closedDate, setClosedDate] = useState(false)
    const [closeDuration, setCloseDuration] = useState(false)
    const [createDate, setCrateDate] = useState(false)


    const getTickets = async () => {
        try {
            const res = await dispatch(getAllTickets()).unwrap();
            if (res) {
                const openTickets = res.filter(item => item.status === "Closed");
                setTickets(openTickets);
            }
        } catch (error) {
            toast.error(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getTickets()
    }, [])

    const filteredKey = tickets.filter((ticket) =>
        ticket.title?.toLowerCase().includes(search.toLowerCase()) ||
        ticket.description?.toLowerCase().includes(search.toLowerCase()) ||
        ticket.category?.toLowerCase().includes(search.toLowerCase()) ||
        ticket.createdBy?.name?.toLowerCase().includes(search.toLowerCase()) ||
        ticket.status?.toLowerCase().includes(search.toLowerCase())
    );

    const sortByTitle = () => {
        setTitleSort(!titleSort)
        if (titleSort) {
            return tickets.sort((a, b) => a.title.localeCompare(b.title))
        }
        else {
            return tickets.sort((a, b) => b.title.localeCompare(a.title))

        }
    }

    const sortByDescription = () => {
        setDescriptionSort(!descriptionSort)
        if (descriptionSort) {
            return tickets.sort((a, b) => a.description.localeCompare(b.description))
        }
        else {
            return tickets.sort((a, b) => b.description.localeCompare(a.description))

        }
    }
    const sortByStatus = () => {
        setStatusSort(statusSort + 1)
        if (statusSort == 1) {
            return tickets.sort((a, b) => a.status.localeCompare(b.status));

        }
        else {
            return tickets.sort((a, b) => b.status.localeCompare(a.status));
        }
    }
    if (statusSort > 2) {
        setStatusSort(1);
    }

    const sortByPriorty = () => {
        setPrioritySort(prioritySort + 1)
        if (prioritySort == 1) {
            return tickets.sort((a, b) => a.priority.localeCompare(b.priority));
        }
        else {
            return tickets.sort((a, b) => b.priority.localeCompare(a.priority));
        }
    }
    if (prioritySort > 3) {
        setPrioritySort(1);
    }

    const sortByCategory = () => {
        setCategorySort(categorySort + 1)
        if (categorySort == 1) {
            return tickets.sort((a, b) => a.category.localeCompare(b.category));
        }
        else {
            return tickets.sort((a, b) => b.category.localeCompare(a.category));
        }
    }
    if (categorySort > 2) {
        setCategorySort(1);
    }

    const sortByCreated = () => {
        setCreatedBy(!createdBy)
        if (createdBy) {
            return tickets.sort((a, b) => a.createdBy?.name.localeCompare(b.createdBy?.name))
        }
        else {
            return tickets.sort((a, b) => b.createdBy?.name.localeCompare(a.createdBy?.name))

        }
    }

    const sortByClosed = () => {
        setClosedBy(!closedBy)
        if (closedBy) {
            return tickets.sort((a, b) => a.closedBy.name.localeCompare(b.closedBy.name))
        }
        else {
            return tickets.sort((a, b) => b.closedBy.name.localeCompare(a.closedBy.name))

        }
    }

    const sortByCloseDate = () => {
        setClosedDate(!closedDate);

        if (closedDate) {
            return tickets.sort((a, b) => {
                const dateA = a.closedDate ? new Date(a.closedDate) : 0;
                const dateB = b.closedDate ? new Date(b.closedDate) : 0;
                return dateA - dateB;
            });
        } else {
            return tickets.sort((a, b) => {
                const dateA = a.closedDate ? new Date(a.closedDate) : 0;
                const dateB = b.closedDate ? new Date(b.closedDate) : 0;
                return dateB - dateA;
            });
        }
    };

    const sortByCreateDate = () => {
        setCrateDate(!createDate)
        if (createDate) {
            return tickets.sort((a, b) => {
                const dateA = a.closedDate ? new Date(a.closedDate) : 0;
                const dateB = b.closedDate ? new Date(b.closedDate) : 0;
                return dateA - dateB;
            })
        }
        else {
            return tickets.sort((a, b) => {
                const dateA = a.closedDate ? new Date(a.closedDate) : 0;
                const dateB = b.closedDate ? new Date(b.closedDate) : 0;
                return dateB - dateA;
            })
        }
    }

    const parseDuration = (duration) => {
        if (!duration) return 0;
        const match = duration.match(/(\d+)h\s+(\d+)m\s+(\d+)s/);
        if (!match) return 0;

        const hours = parseInt(match[1]);
        const minutes = parseInt(match[2]);
        const seconds = parseInt(match[3]);

        return hours * 3600 + minutes * 60 + seconds;
    };

    const sortByCloseDuration = () => {
        setCloseDuration(!closeDuration);

        return tickets.sort((a, b) => {
            const durationA = parseDuration(a.closeDuration);
            const durationB = parseDuration(b.closeDuration);

            return closeDuration ? durationA - durationB : durationB - durationA;
        });
    };

    const handleDetails = (id) => {
        navigate(`/it/tickets/ticket-detail/${id}`)
    }

    if (loading) return <Loading text="Loading..." />;
    return (
        <div>
            <Box sx={{
                p: 4,
                bgcolor: openDarkMode ? "#082032" : "#F4F9F9",
                color: openDarkMode ? "#EEEEEE" : "#555555",
                minHeight: "100vh",
                marginLeft: logoWidth
            }}
            >
                <Card sx={{
                    borderRadius: 4,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                    bgcolor: openDarkMode ? "#082032" : "#F4F9F9",
                    color: openDarkMode ? "#EEEEEE" : "#555555",
                }}>
                    <Box sx={{ background: "linear-gradient(90deg,#f97316, #fb923c)", p: 3, color: 'white' }}>
                        <Typography fontWeight="bold" variant='h5'>
                            🎫 Ticket Management
                        </Typography>
                        <Typography variant='body2' sx={{ opacity: 0.85 }}>
                            Manage all tickets in the system
                        </Typography>
                    </Box>
                    <CardContent>
                        <Box display="flex" justifyContent="flex-end" mb={3}>
                            <TextField size='small' placeholder='Search Ticket'
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                sx={{
                                    minWidth: 300,
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: 3,
                                        bgcolor: openDarkMode ? "#082032" : "#F4F9F9",
                                        color: openDarkMode ? "#EEEEEE" : "#555555",
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
                            sx={{
                                borderRadius: 3,
                                boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
                                maxWidth: "100%",
                                overflowX: "auto",
                            }}
                        >
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ bgcolor: openDarkMode ? "#082032" : "#F4F9F9" }}>
                                        <TableCell sx={{ cellStyle, cursor: 'pointer' }} onClick={() => { sortByTitle() }}>Title</TableCell>
                                        <TableCell sx={{ cellStyle, cursor: 'pointer' }} onClick={() => { sortByDescription() }}>Description</TableCell>
                                        <TableCell sx={{ cellStyle, cursor: 'pointer' }} onClick={() => { sortByStatus() }}>Status</TableCell>
                                        <TableCell sx={{ cellStyle, cursor: 'pointer' }} onClick={() => { sortByPriorty() }} >Priority</TableCell>
                                        <TableCell sx={{ cellStyle, cursor: 'pointer' }} onClick={() => { sortByCategory() }} >Category</TableCell>
                                        <TableCell sx={{ cellStyle }} >Attachments</TableCell>
                                        <TableCell sx={{ cellStyle, cursor: 'pointer' }} onClick={() => { sortByCreated() }}>Created By</TableCell>
                                        <TableCell sx={{ cellStyle, cursor: 'pointer' }} onClick={() => { sortByCreateDate() }}>Created Date</TableCell>
                                        <TableCell sx={{ cellStyle, cursor: 'pointer' }} onClick={() => { sortByClosed() }}>Closed By</TableCell>
                                        <TableCell sx={{ cellStyle, cursor: 'pointer' }} onClick={() => { sortByCloseDate() }}>Closed Date</TableCell>
                                        <TableCell sx={{ cellStyle, cursor: 'pointer' }} onClick={() => { sortByCloseDuration() }}>Close Duration</TableCell>
                                        <TableCell sx={{ cellStyle }} >Result</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {filteredKey.map((ticket, index) => (
                                        <TableRow key={ticket.id} hover>
                                            <TableCell>
                                                <Box flex="flex" alignItems="center" gap={1.5}>
                                                    {`${ticket.title.slice(0, 6)}...`}
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                {`${ticket.description.slice(0, 6)}...`}
                                            </TableCell>
                                            <TableCell>
                                                <Chip label={ticket.status}
                                                    color={
                                                        ticket.status === "Open"
                                                            ? "success"
                                                            : ticket.status === "In-progress"
                                                                ? "warning"
                                                                : "primary"
                                                    }
                                                    size="small" />
                                            </TableCell>

                                            <TableCell>
                                                <Chip label={ticket.priority}
                                                    color={
                                                        ticket.priority === "Low"
                                                            ? "success"
                                                            : ticket.priority === "Medium"
                                                                ? "warning"
                                                                : "error"
                                                    }
                                                    size="small" />
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={ticket.category}
                                                    color={
                                                        ticket.category === "Hardware" ? "success" :
                                                            ticket.category === "Software" ? "warning" :
                                                                ticket.category === "Network" ? "info" :
                                                                    "default"
                                                    }
                                                    size="small"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                {ticket.attachments?.length > 0 ? (
                                                    ticket.attachments.map((att, idx) => (
                                                        <a
                                                            key={idx}
                                                            href={`http://localhost:5000/uploads/${att.fileName}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            style={{ display: "block", marginBottom: 2, textDecoration: "none", color: "#1976d2" }}
                                                        >
                                                            {att.fileName.slice(0, 10)}
                                                        </a>
                                                    ))
                                                ) : (
                                                    <span>No attachments</span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {ticket.createdBy?.name || "-"} {`${ticket.createdBy?.surname.slice(0, 1)}`}
                                            </TableCell>
                                            <TableCell>
                                                {ticket.createdAt.toString().slice(0, 10) || "-"} {ticket.createdAt.toString().slice(0, 0)}
                                            </TableCell>
                                            <TableCell>
                                                {`${ticket.closedBy?.name || "-" && ticket.closedBy?.surname.slice(0, 1) || "-"}`}
                                            </TableCell>
                                            <TableCell>
                                                {ticket.closedDate?.toString().slice(0, 10) || "-"}
                                            </TableCell>
                                            <TableCell>
                                                {ticket.closeDuration || "-"}
                                            </TableCell>
                                            <TableCell>
                                                {ticket.result ? `${ticket.result.slice(0, 5)}...` : "-"}
                                            </TableCell>
                                            <TableCell>
                                                <IconButton color="warning" onClick={() => handleDetails(ticket._id)}>
                                                    <SearchIcon />
                                                </IconButton>

                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
            </Box>
        </div>
    )
}

export default ClosedTickets