const mongoose = require("mongoose");

const schema = mongoose.Schema;

const UserSchema = new schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    repassword: { type: String, required: true },
    role: { type: String, enum: ['employee', 'it', 'admin'], default: 'employee' }
}, { timestamps: true })

module.exports = mongoose.model("User", UserSchema);