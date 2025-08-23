const ticketRouter = require("express").Router();
const ticketController = require("../controllers/ticketController");
const adminMiddleware = require("../middleware/adminMiddleware")
const authMiddleware = require("../middleware/authMiddleware");

ticketRouter.post("/create-ticket", authMiddleware, ticketController.createTicket);
ticketRouter.get("/show-tickets", authMiddleware, ticketController.getTickets);
ticketRouter.get("/show-ticket", authMiddleware, ticketController.getTicketById);
ticketRouter.put("/edit-ticket", authMiddleware, ticketController.uptadeTicket);
ticketRouter.put("/close-ticket", authMiddleware, ticketController.closeTicket)

module.exports = ticketRouter