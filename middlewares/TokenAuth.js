const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
    // Check if cookies are parsed
    const token =
        req.cookies.token || req.headers["authorization"]?.split(" ")[1]; // Bearer token

    if (!token) {
        return res.redirect("/login"); // Redirect if no token found
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.redirect("/login"); // Redirect if token is invalid
        }

        // Attach user info to the request
        req.user = decoded; // You can access user info in subsequent routes
        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = requireAuth; // Correct export
