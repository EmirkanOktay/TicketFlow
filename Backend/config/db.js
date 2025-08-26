const mongoose = require("mongoose")

const db = mongoose.connect(process.env.DB_CONNECT_LINK)
    .then(() => { console.log("databese connected") })
    .catch((err) => { console.log("database connection problem " + " " + err) })

module.exports = db
//database connection