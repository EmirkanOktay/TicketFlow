const userRouter = require("express").Router();
const userController = require("../controllers/userControllers");
const adminMiddleware = require("../middleware/adminMiddleware")
const authMiddleware = require("../middleware/authMiddleware");

userRouter.post("/register", authMiddleware, adminMiddleware, userController.register);
userRouter.post("/login", userController.login);
userRouter.post("/logout", authMiddleware, userController.logout);
userRouter.get("/show-user-infos", authMiddleware, userController.showUsersInfos);
userRouter.delete("/delete-user/:id", authMiddleware, adminMiddleware, userController.deleteUser)
userRouter.put("/edit-user/:id", authMiddleware, userController.editUser)
userRouter.get("/show-all-employeers", authMiddleware, adminMiddleware, userController.showUsers)
userRouter.post("/reset-password", userController.resetPassword);
module.exports = userRouter

//routers for users