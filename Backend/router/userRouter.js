const userRouter = require("express").Router();
const userController = require("../controllers/userControllers");

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.delete("/delete-user", userController.deleteUser)
userRouter.put("/edit", userController.editUser)

module.exports = userRouter