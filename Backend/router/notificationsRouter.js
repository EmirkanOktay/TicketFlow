const notifyRouter = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");
const notifyController = require("../controllers/notifyController")

notifyRouter.get("/show-all-notifications", authMiddleware, notifyController.showAllNotifys);
notifyRouter.put("/markRead", authMiddleware, notifyController.markRead)

module.exports = notifyRouter
