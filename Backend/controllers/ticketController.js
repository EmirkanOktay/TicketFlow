const Ticket = require("../models/ticketModel");
const fs = require("fs");
const path = require("path");
const User = require("../models/userModel");
const sendMail = require("../utils/sendMail");
const Notification = require("../models/notificationModel")

const createTicket = async (req, res, next) => {
    const user = await User.findById(req.user.id);

    try {
        const { title, description, category, priority } = req.body;

        const attachments = req.files ? req.files.map(file => ({
            fileName: file.filename,
            fileUrl: "/uploads/" + file.filename
        })) : [];

        const userRole = req.user.role;

        const ticket = await Ticket.create({
            title,
            description,
            category,
            priority,
            createdBy: req.user.id,
            attachments
        });
        if (userRole == 'Employee') {
            const user = await User.findById(req.user.id);
            user.ticketCreatedCount = (user.ticketCreatedCount || 0) + 1;
            await user.save();
        }

        const populatedTicket = await Ticket.findById(ticket._id)
            .populate("createdBy", "name surname email role");

        const sendNotify = new Notification({
            userId: req.user.id,
            title: "Ticket Has Been Created Succesfully",
            message: "Your ticket has been created. You can check your ticket situation on my tickets panel",
            link: ticket._id
        })

        await sendNotify.save();

        res.status(201).json({
            ticket: populatedTicket,
            notify: sendNotify
        });
        console.log("ticket created!");

        // await sendMail({
        //     to: user.email,
        //     subject: "Your Ticket Has Been Created!",
        //     html: `
        //         Hello ${user.name},<br><br>
        //         Your ticket "${ticket.title}" has been created.<br>
        //         Our IT team will check your problem and contact you.<br><br>
        //         Have a great day!<br>
        //         This mail was sent automatically.
        //     `
        // });

    } catch (error) {
        console.log("create ticket error  " + error);
        res.status(500).json({ message: "ticket error" });
    }
}

const getTickets = async (req, res, next) => {
    try {
        let tickets;

        if (req.user.role == "Admin") {
            tickets = await Ticket.find().populate("createdBy", "name surname email").populate("closedBy", "name surname email role");
        }
        else if (req.user.role == "It") {
            tickets = await Ticket.find().populate("createdBy", "name surname email").populate("closedBy", "name surname email role");
        }
        else {
            tickets = await Ticket.find({ createdBy: req.user.id }).populate("createdBy", "name surname email").populate("closedBy", "name surname email role");
        }
        res.status(200).json(tickets);

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
                (userRole === "Employee" && ticket.createdBy._id.toString() === userId)
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
            return res.status(400).json({ message: "ticket not found" })
        }
        const userRole = req.user.role;
        const ticketOwnerId = ticket.createdBy?._id ? ticket.createdBy._id.toString() : ticket.createdBy?.toString();

        if (
            !(
                userRole === "Admin" ||
                userRole === "It" ||
                (userRole === "Employee" && ticket.createdBy?._id.toString() === ticketOwnerId)
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

        let sendNotifyToEmployee;

        if (userRole === "Employee") {
            sendNotifyToEmployee = req.user.id;
        }

        const sendNotify = new Notification({
            userId: sendNotifyToEmployee || req.user.id,
            title: "Ticket Has Been Uptaded Succesfully",
            message: `"${ticket.title} ticket has been uptaded. You can check your ticket situation on my tickets panel`,
            link: ticket._id
        })

        await sendNotify.save();
        res.status(200).json({ message: "Ticket updated", ticket, notify: sendNotify });

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
        if (userRole == 'It') {
            const user = await User.findById(req.user.id);
            user.ticketCloseCount = (user.ticketCloseCount || 0) + 1;
            await user.save();
        }
        ticket.status = "Closed";
        ticket.closedBy = req.user.id;

        ticket.closedDate = new Date().toLocaleDateString();
        if (!req.body || !req.body.result) {
            return res.status(400).json({ message: "ticket needs result for close" });
        }

        ticket.result = req.body.result;
        const now = new Date();
        ticket.closedDate = now;
        ticket.status = "Closed";
        ticket.closedBy = req.user.id;

        const totalSeconds = Math.floor((now - new Date(ticket.createdAt)) / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        ticket.closeDuration = `${hours}h ${minutes}m ${seconds}s`;

        await ticket.save();
        const populatedTicket = await Ticket.findById(ticket._id)
            .populate("closedBy", "name surname email role");

        const sendNotify = new Notification({
            userId: ticket.createdBy,
            title: "Ticket Has Been Closed",
            message: `Your ticket has been closed.\n${ticket.result}\nYou can check your ticket situation on my tickets panel`,
            link: ticket._id
        });

        await sendNotify.save();


        // await sendMail({
        //     to: ticket.createdBy.email,
        //     subject: "Your Ticket Has Been Closed!",
        //     html: `
        //         Hello ${ticket.createdBy.name},<br><br>
        //         Your ticket "${ticket.title}" has been closed.<br>
        //         Result: ${ticket.result}<br>
        //         Closed by: ${req.user.name} (${req.user.role})<br>
        //         Close duration: ${ticket.closeDuration}<br><br>
        //         Have a great day!<br>
        //         This mail was sent automatically.
        //     `
        // });


        res.status(200).json({ message: "Ticket closed", populatedTicket, notify: sendNotify });

    } catch (error) {
        console.error("Ticket close error:", error);
        res.status(500).json({ message: "Server error" });
    }
};


const inProgresss = async (req, res, next) => {
    try {
        const ticket = await Ticket.findById(req.params.id);

        if (!ticket) return res.status(404).json({ message: "Ticket not found" });

        if (ticket.status === "Closed") {
            return res.status(400).json({ message: "Ticket already closed" });
        }

        const userRole = req.user?.role;
        const userId = req.user?.id;

        if (!userRole || !userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (
            !(
                userRole === "Admin" ||
                userRole === "It" ||
                (ticket.createdBy && ticket.createdBy._id.toString() === userId)
            )
        ) {
            return res.status(403).json({ message: "Not authorized to change this ticket" });
        }
        if (ticket.status == "In-progress") {
            return res.status(400).json({ message: "Ticket is already in-progress" })
        }
        ticket.status = "In-progress";
        await ticket.save();

        const sendNotify = new Notification({
            userId: ticket.createdBy,
            title: "Ticket Has Been Closed",
            message: `Your ticket ${ticket.title} has been in progress.\nYou can check your ticket situation on my tickets panel`,
            link: ticket._id
        });

        await sendNotify.save();

        res.status(200).json({ ticket, notify: sendNotify });
    } catch (error) {
        console.error("Ticket in-progress error:", error);
        res.status(500).json({ message: "Server error" });
    }
};


const deleteTicket = async (req, res, next) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        const userRole = req.user.role;

        if (userRole == "Admin" || userRole == "Employee") {
            if (ticket) {

                if (ticket.attachments && ticket.attachments.length > 0) {
                    for (const file of ticket.attachments) {
                        const filePath = path.join(__dirname, "../uploads", file.fileName);

                        fs.unlink(filePath, (err) => {
                            if (err) {
                                console.error("File Error:", err.message);
                            } else {
                                console.log("File deleted:", file.fileName);
                            }
                        });
                    }
                }

                await ticket.deleteOne();

                const sendNotify = new Notification({
                    userId: req.user.id,
                    title: "Ticket Has Been Deleted",
                    message: `Ticket has been deleted: ${ticket.title}`,
                    link: ticket._id
                });

                await sendNotify.save();
                return res.status(200).json({ message: "Ticket Deleted ", notify: sendNotify });


            } else {
                return res.status(404).json({ message: "Ticket not found" });
            }
        } else {
            return res.status(403).json({ message: "Not authorized to close this ticket" });
        }
    }
    catch (error) {
        console.log("ticket delete error" + error);
        return res.status(500).json({ message: "Server error" });
    }
}

module.exports = { createTicket, getTickets, getTicketById, uptadeTicket, closeTicket, deleteTicket, inProgresss }