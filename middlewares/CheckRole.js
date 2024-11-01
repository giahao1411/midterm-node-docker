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

        next();
    };
};

module.exports = checkRole;
