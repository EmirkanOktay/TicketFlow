const express = require("express");
require("dotenv").config();
require("../Backend/config/db");
const userRouter = require("../Backend/router/userRouter");
const ticketRouter = require("../Backend/router/ticketRouter");
const notifyRouter = require("../Backend/router/notificationsRouter");
const session = require("express-session");
const passport = require("passport");
const cookie = require("cookie-parser");
const cors = require("cors");
const app = express();
const path = require("path");

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cookie());
app.use(cors({
    origin: "*",
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

app.get('/', (req, res) => {
    res.send('Server is running!');
});



app.use("/api/users", userRouter)
app.use("/api/tickets", ticketRouter)
app.use("/api/notifications", notifyRouter)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//routers


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server established on port ${PORT}`)
})

app.listen(PORT, () => {
    console.log("server establiashed")
})

//server