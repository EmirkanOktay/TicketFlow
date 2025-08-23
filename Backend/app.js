const express = require("express");
require("dotenv").config();
require("../Backend/config/db");
const app = express();

app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res, next) => {
    res.json({
        message: "hi"
    })
})

app.listen(process.env.LOCAL_HOST_PORT, () => {
    console.log("server establiashed")
})