const Ticket = require("../models/ticketModel");

const createTicket = async (req, res, next) => {
    try {
        const { title, description, category, priority } = req.body;

        const attachments = req.files ? req.files.map(file => ({
            fileName: file.filename,
            fileUrl: "/uploads/" + file.filename
        })) : [];

        const ticket = await Ticket.create({
            title,
            description,
            category,
            priority,
            createdBy: req.user.id,
            attachments
        });

        const populatedTicket = await Ticket.findById(ticket._id)
            .populate("createdBy", "name surname email role");

        res.status(201).json(populatedTicket);
        console.log("ticket created!");

    } catch (error) {
        console.log("create ticket error  " + error);
        res.status(500).json({ message: "ticket error" });
    }
}


const getTickets = async (req, res, next) => {
    try {
        let tickets;

        if (req.user.role = "Admin") {
            tickets = await Ticket.find().populate("createdBy", "name surname email").populate("closedBy", "name surname email role");
        }
        else if (req.user.role = "It") {
            tickets = await Ticket.find().populate("createdBy", "name surname email").populate("closedBy", "name surname email role");
        }
        else {
            tickets = await Ticket.find({ createdBy: req.user.id }).populate("createdBy", "name surname email").populate("closedBy", "name surname email role");
        }
        res.status(200).json({ tickets });

    } catch (error) {
        console.log("error while getting tickets " + error);
        res.status(500).json({ message: "ticket error" })
    }
}

const getTicketById = async (req, res, next) => {
    try {
        const ticket = await Ticket.findById(req.params.id).populate("createdBy", "name surname email").populate("closedBy", "name surname email role");
        if (ticket) {
            const userRole = req.user.role;
            const userId = req.user.id;

            if (
                userRole === "Admin" ||
                (userRole === "It") ||
                (userRole === "Employee" && ticket.createdBy.toString() === userId)
            ) {
                res.status(200).json(ticket);
            } else {
                res.status(403).json({ message: "You are not authorized to view this ticket" });
            }
        }
        else {
            res.status(400).json({ message: "ticket not found" })
        }
    } catch (error) {
        console.log("error for get ticket by id" + error);
        res.status(500).json({ message: "ticket error" })

    }
}

const uptadeTicket = async (req, res, next) => {
    try {
        const ticket = await Ticket.findById(req.params.id)
        if (!ticket) {
            res.status(400).json({ message: "ticket not found" })
        }
        const userRole = req.user.role;
        const userId = req.user.id;

        if (
            !(
                userRole === "Admin" ||
                userRole === "It" ||
                (userRole === "Employee" && ticket.createdBy?.toString() === userId)
            )
        ) {
            return res.status(403).json({ message: "Not authorized to update this ticket" });
        }

        const { title, description, category, priority, status } = req.body;

        if (title) ticket.title = title;
        if (description) ticket.description = description;
        if (category) ticket.category = category;
        if (priority) ticket.priority = priority;
        if (status) ticket.status = status;
        await ticket.save()
        res.status(200).json({ message: "Ticket updated", ticket });

    }
    catch (error) {
        console.log("uptade ticket error " + error)
        res.status(500).json({ message: "ticket update error" })

    }
}
const closeTicket = async (req, res, next) => {
    try {
        const ticket = await Ticket.findById(req.params.id).populate("createdBy", "name surname email")

        if (!ticket) return res.status(404).json({ message: "Ticket not found" });

        if (ticket.status == "closed") {
            return res.status(400).json({ message: "ticket already closed" })
        }

        const userRole = req.user.role;
        const userId = req.user.id;

        if (
            !(
                userRole === "Admin" ||
                userRole === "It" ||
                (userRole === "Employee" && ticket.createdBy?.toString() === userId)
            )
        ) {
            return res.status(403).json({ message: "Not authorized to close this ticket" });
        }

        ticket.status = "closed";
        ticket.closedBy = req.user.id;
        ticket.closedDate = new Date();
        if (!req.body.result) {
            return res.status(400).json({ message: "ticket needs result for close" });
        }
        ticket.result = req.body.result;

        const totalSeconds = Math.floor((new Date() - new Date(ticket.createdAt)) / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        ticket.closeDuration = `${hours}h ${minutes}m ${seconds}s`

        await ticket.save();
        const populatedTicket = await Ticket.findById(ticket._id)
            .populate("closedBy", "name surname email role");

        res.status(200).json({ message: "Ticket closed", populatedTicket });

    } catch (error) {
        console.error("Ticket close error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const showTicketsByStatus = async (req, res, next) => {
    try {
        const userRole = req.user.role;
        const userId = req.user.id;
        const status = req.query.status;

        let filter = {};
        if (status) filter.status = status;

        if (userRole !== "Admin" && userRole !== "IT") {
            filter.createdBy = userId;
        }

        const tickets = await Ticket.find(filter)
            .populate("createdBy", "name surname email")
            .populate("closedBy", "name surname email role");

        res.status(200).json({ tickets });
    } catch (error) {
        console.error("Tickets error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
const deleteTicket = async (req, res, next) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        const userRole = req.user.role;
        if (userRole == "Admin" || userRole == "Employee") {
            if (ticket) {
                await ticket.deleteOne();
                return res.status(200).json({ message: "Ticket deleted successfully" });
            }
            else {
                return res.status(404).json({ message: "Ticket not found" });
            }
        }
        else {
            return res.status(403).json({ message: "Not authorized to close this ticket" });
        }
    }
    catch (error) {
        console.log("ticket delete error" + error)
        return res.status(500).json({ message: "Server error" });
    }
}

module.exports = { createTicket, getTickets, getTicketById, uptadeTicket, closeTicket, deleteTicket, showTicketsByStatus }