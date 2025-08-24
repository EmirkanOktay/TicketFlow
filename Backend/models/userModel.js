const mongoose = require("mongoose");
const validator = require('validator');

const schema = mongoose.Schema;

const UserSchema = new schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: {
        type: String, required: true, unique: true, validate: [validator.isEmail, 'Please provide a valid email address']
    },
    password: {
        type: String, required: true, minlength: [8, 'Password must be at least 8 characters long'],
        maxlength: [128, 'Password must be less than 128 characters long']
    },
    role: { type: String, enum: ['Employee', 'It', 'Admin'], default: 'employee' }
}, { timestamps: true })

module.exports = mongoose.model("User", UserSchema);

//user model for database