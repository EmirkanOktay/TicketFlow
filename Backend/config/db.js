const mongoose = require("mongoose")

mongoose.connect(process.env.DB_CONNECT_LINK)
    .then(() => { console.log("databese connected") })
    .catch((err) => { console.log("database connection problem " + " " + err) })

//database connection