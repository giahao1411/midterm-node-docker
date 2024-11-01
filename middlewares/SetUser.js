const jwt = require("jsonwebtoken");

const setUser = (req, res, next) => {
    const token =
        req.cookies.token || req.headers["authorization"]?.split(" ")[1];

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (!err && decoded.userName) {
                res.locals.userName = decoded.userName; // Assign the correct login name from the token
                res.locals.userRole = decoded.role?.toLowerCase() || "guest";
            } else {
                res.locals.userName = "Khách"; // Default is Guest if there is no valid token
                res.locals.userRole = "guest";
            }
            next();
        });
    } else {
        res.locals.userName = "Khách"; // Default is Guest if there is no token
        res.locals.userRole = "guest";
        next();
    }
};

module.exports = setUser;
