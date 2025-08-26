const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "ticketflow.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendMail = async ({ to, subject, text, html }) => {
    try {
        const info = await transporter.sendMail({
            from: `"Ticket System" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
            html
        });
        console.log("Mail sent:", info.messageId);
    } catch (err) {
        console.error("Mail sending error:", err);
    }
};

module.exports = sendMail;
