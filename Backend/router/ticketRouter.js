const ticketRouter = require("express").Router();
const ticketController = require("../controllers/ticketController");
const adminMiddleware = require("../middleware/adminMiddleware")
const authMiddleware = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const uploadAttachments = multer({ storage: storage });

ticketRouter.post("/create-ticket", authMiddleware, uploadAttachments.array("attachments", 10), ticketController.createTicket);
ticketRouter.get("/show-tickets", authMiddleware, ticketController.getTickets);
ticketRouter.get("/show-tickets/:id", authMiddleware, ticketController.getTicketById);
ticketRouter.put("/edit-ticket/:id", authMiddleware, uploadAttachments.array("attachments", 10), ticketController.uptadeTicket);
ticketRouter.put("/close-ticket/:id", authMiddleware, ticketController.closeTicket)
ticketRouter.delete("/delete-ticket/:id", authMiddleware, ticketController.deleteTicket);
ticketRouter.post("/api/tickets/upload", uploadAttachments.single("file"), (req, res) => {
    res.json({
        fileName: req.file.originalname,
        filePath: `/uploads/${req.file.filename}`
    });
});

module.exports = ticketRouter

//routers for ticket system