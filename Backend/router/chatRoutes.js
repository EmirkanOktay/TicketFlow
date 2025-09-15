const chatRouter = require("express").Router();
const chatController = require("../controllers/chatController");
const authMiddleware = require("../middleware/authMiddleware");

chatRouter.post("/send", authMiddleware, chatController.createMessage);
chatRouter.get("/:chatRoomId", authMiddleware, chatController.getMessagesByChatRoom)    