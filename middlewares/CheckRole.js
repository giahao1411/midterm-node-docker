// ./middlewares/CheckRole.js

const checkRole = (roles) => {
    return (req, res, next) => {
        const userRole = req.user?.role;

        // Kiểm tra xem người dùng có vai trò phù hợp không
        if (!userRole || !roles.includes(userRole)) {
            // Nếu không có quyền, render trang lỗi 403
            return res.status(403).render("error", {
                errorCode: 403,
                errorMessage: "Cấm truy cập",
                errorDescription: "Bạn không có quyền truy cập vào trang này.",
            });
        }

        // Trường hợp người dùng có quyền admin và muốn chuyển hướng đến các trang chỉ dành cho admin
        if (roles.includes("admin") && userRole !== "admin") {
            return res.redirect("/course/purchased");
        }

        next();
    };
};

module.exports = checkRole;
