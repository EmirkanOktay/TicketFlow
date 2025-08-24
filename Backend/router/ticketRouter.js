const ticketRouter = require("express").Router();
const ticketController = require("../controllers/ticketController");
const adminMiddleware = require("../middleware/adminMiddleware")
const authMiddleware = require("../middleware/authMiddleware");

ticketRouter.post("/create-ticket", authMiddleware, ticketController.createTicket);
ticketRouter.get("/show-tickets", authMiddleware, ticketController.getTickets);
ticketRouter.get("/show-tickets/:id", authMiddleware, ticketController.getTicketById);
ticketRouter.put("/edit-ticket/:id", authMiddleware, ticketController.uptadeTicket);
ticketRouter.put("/close-ticket/:id", authMiddleware, ticketController.closeTicket)
ticketRouter.delete("/delete-ticket/:id", authMiddleware, ticketController.deleteTicket);
ticketRouter.get("/show-tickets-status", authMiddleware, ticketController.showTicketsByStatus);
module.exports = ticketRouter

//routers for ticket system