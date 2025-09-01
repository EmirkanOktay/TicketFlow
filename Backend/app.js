const express = require("express");
require("dotenv").config();
require("../Backend/config/db");
const userRouter = require("../Backend/router/userRouter");
const ticketRouter = require("../Backend/router/ticketRouter");
const session = require("express-session");
const passport = require("passport");
const cookie = require("cookie-parser");
const cors = require("cors");
const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cookie());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    }
}))

app.use(passport.initialize());
app.use(passport.session());

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});


app.use("/api/users", userRouter)
app.use("/api/tickets", ticketRouter)
//routers


app.listen(process.env.LOCAL_HOST_PORT, () => {
    console.log("server establiashed")
})
//server