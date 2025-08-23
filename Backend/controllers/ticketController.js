const Ticket = require("../models/ticketModel");

const createTicket = async (req, res, next) => {
    try {
        const { title, description, category, priority } = req.body;

        const ticket = await Ticket.create({
            title,
            description,
            category,
            priority,
            createdBy: req.user.id,
        })
        res.status(201).json(ticket);
        console.log("ticket created!")

    } catch (error) {
        console.log("create ticket error  " + error)
        res.status(500).json({ message: "ticket error" })
    }
}

const getTickets = async (req, res, next) => {
    try {
        let tickets;

        if (req.user.role = "Admin") {
            tickets = await Ticket.find();
        }
        else if (req.user.role = "It") {
            tickets = await Ticket.find({ assignedTo: req.user.id })
        }
        else {
            tickets = await Ticket.find({ createdBy: req.user.id })
        }
        res.status(200).json(tickets);

    } catch (error) {
        console.log("error while getting tickets " + error);
        res.status(500).json({ message: "ticket error" })
    }
}

const getTicketById = async (req, res, next) => {

}

const uptadeTicket = async (req, res, next) => {

}

const closeTicket = async (req, res, next) => {

}

module.exports = { createTicket, getTickets, getTicketById, uptadeTicket, closeTicket }