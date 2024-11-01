const jwt = require("jsonwebtoken");

const decodeToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return next();
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.error("Token verification failed: ", err);
        return res.redirect("/login");
    }
};

module.exports = decodeToken;
