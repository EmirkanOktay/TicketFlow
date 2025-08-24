const mongoose = require("mongoose");

const schema = mongoose.Schema;

const ticketSchema = new schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['open', 'in-progress', 'closed'], default: 'open' },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    category: { type: String, enum: ['hardware', 'software', 'network', 'other'], default: 'other' },
    attachments: [
        {
            fileName: String,
            fileData: Buffer,
            contentType: String,
            uploadedAt: { type: Date, default: Date.now }
        }
    ],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    closedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    closedDate: { type: Date },
    closeDuration: { type: String },
    result: { type: String }
}, { timestamps: true })



module.exports = mongoose.model("Ticket", ticketSchema);

//database ticket model