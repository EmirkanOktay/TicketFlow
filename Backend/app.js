const express = require("express");
require("dotenv").config();
require("../Backend/config/db");
const userRouter = require("../Backend/router/userRouter");
const ticketRouter = require("../Backend/router/ticketRouter");
const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use("/api/users", userRouter)
app.use("/api/tickets", ticketRouter)


app.get("/", (req, res, next) => {
    res.json({
        message: "hi"
    })
})

app.listen(process.env.LOCAL_HOST_PORT, () => {
    console.log("server establiashed")
})