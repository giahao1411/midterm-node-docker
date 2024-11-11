const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
    const token =
        req.cookies.token || req.headers["authorization"]?.split(" ")[1];

    if (!token) {
        req.session.errorMessage = "Vui lòng đăng nhập để tiếp tục.";
        return res.redirect("/login");
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            req.session.errorMessage =
                "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.";
            return res.redirect("/login");
        }

        // Chuyển vai trò thành chữ thường và gán vào req.user
        req.user = {
            userId: decoded.userId,
            userName: decoded.userName,
            role: decoded.role?.toLowerCase(),
        };

        // Gán tên đăng nhập vào res.locals
        res.locals.userName = decoded.userName;
        res.locals.userRole = decoded.role?.toLowerCase();

        next();
    });
};

module.exports = requireAuth;
