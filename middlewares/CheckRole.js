const checkRole = (roles) => {
    return (req, res, next) => {
        const userRole = req.user?.role;

        if (!userRole || !roles.includes(userRole)) {
            // Render trang lỗi chung với mã lỗi 403
            return res.status(403).render("error", {
                errorCode: 403,
                errorMessage: "Cấm truy cập",
                errorDescription: "Bạn không có quyền truy cập vào trang này."
            });
        }
        next();
    };
};

module.exports = checkRole;
