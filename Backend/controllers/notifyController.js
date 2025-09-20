const Notification = require("../models/notificationModel")
const User = require("../models/userModel");

const showAllNotifys = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const notify = await Notification.find({ userId: req.user.id })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            notifications: notify
        });

    }
    catch (error) {
        console.log("notifications error  " + error);
        res.status(500).json({ message: "notifications error" });
    }
}

const markRead = async (req, res, next) => {

    try {
        await Notification.updateMany(
            { userId: req.user.id, read: false },
            { $set: { read: true } }
        );

        const updatedNotifications = await Notification.find({ userId: req.user._id });
        res.status(200).json({ notifications: updatedNotifications });

    } catch (error) {
        console.log("notifications error  " + error);
        res.status(500).json({ message: "notifications error" });
    }
}

module.exports = { showAllNotifys, markRead }