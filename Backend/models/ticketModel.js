const mongoose = require("mongoose");

const schema = mongoose.Schema;

const ticketSchema = new schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['Open', 'In-progress', 'Closed'], default: 'Open' },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    category: { type: String, enum: ['Hardware', 'Software', 'Network', 'Other'], default: 'Other' },
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