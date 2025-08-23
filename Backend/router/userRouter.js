const userRouter = require("express").Router();
const userController = require("../controllers/userControllers");
const adminMiddleware = require("../middleware/adminMiddleware")
const authMiddleware = require("../middleware/authMiddleware");

userRouter.post("/register", adminMiddleware, authMiddleware, userController.register);
userRouter.post("/login", userController.login);
userRouter.delete("/delete-user", adminMiddleware, authMiddleware, userController.deleteUser)
userRouter.put("/edit", authMiddleware, userController.editUser)
userRouter.get("/show-all-employeers", adminMiddleware, authMiddleware, userController.showUsers)

module.exports = userRouter