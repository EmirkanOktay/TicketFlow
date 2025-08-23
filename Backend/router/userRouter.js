const userRouter = require("express").Router();
const userController = require("../controllers/userControllers");

userRouter.post("/register", userController.register)


module.exports = userRouter