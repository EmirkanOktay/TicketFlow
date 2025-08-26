const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    let token = req.cookies?.token;


    if (!token && req.headers.authorization?.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.log("JWT error:", err);
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;
