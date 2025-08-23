const mongoose = require("mongoose");

const schema = mongoose.Schema;

const ticketSchema = new schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['open', 'in-progress', 'closed'], default: 'open' },
    priorty: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    category: { type: String, enum: ['hardware', 'software', 'network', 'other'], default: 'other' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    result: { type: String }
}, { timestamps: true })

module.exports = mongoose.model("Ticket", ticketSchema);