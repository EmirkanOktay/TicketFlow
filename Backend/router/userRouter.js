const userRouter = require("express").Router();
const userController = require("../controllers/userControllers");
const adminMiddleware = require("../middleware/adminMiddleware")
const authMiddleware = require("../middleware/authMiddleware");

userRouter.post("/register", authMiddleware, adminMiddleware, userController.register);
userRouter.post("/login", userController.login);
userRouter.delete("/delete-user/:id", authMiddleware, adminMiddleware, userController.deleteUser)
userRouter.put("/edit-user/:id", authMiddleware, userController.editUser)
userRouter.get("/show-all-employeers", authMiddleware, adminMiddleware, userController.showUsers)

module.exports = userRouter

//routers for userz