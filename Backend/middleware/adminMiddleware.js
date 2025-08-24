const adminMiddleware = (req, res, next) => {

    if (req.user && req.user.role === "Admin") {
        next();
    } else {
        res.status(403).json({ message: "Admin access required" });
    }
};

module.exports = adminMiddleware;
