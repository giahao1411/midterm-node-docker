const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");
require("dotenv").config();

// Hiển thị trang đăng nhập
const renderLoginPage = (req, res) => {
    if (req.session.user) {
        return res.redirect("/course"); // Chuyển hướng nếu đã đăng nhập
    }
    return res.render("login", {
        errorMessage: null,
        email: "",
        password: "", // Thêm biến password để tránh lỗi
    });
};

// Xử lý đăng nhập
const loginCourse = async (req, res) => {
    let { inputEmail, inputPassword } = req.body;
    let error = "";

    try {
        const user = await UserModel.findOne({ email: inputEmail });
        if (!user) {
            error = "Sai email hoặc mật khẩu";
            return res.render("login", {
                errorMessage: error,
                email: inputEmail,
                password: inputPassword,
            });
        }

        const isMatch = await bcrypt.compare(inputPassword, user.password);
        if (!isMatch) {
            error = "Sai email hoặc mật khẩu";
            return res.render("login", {
                errorMessage: error,
                email: inputEmail,
                password: inputPassword,
            });
        }

        // Tạo JWT chứa cả tên đăng nhập và vai trò
        const token = jwt.sign(
            { userName: user.name, role: user.role.toLowerCase() }, // Chuyển vai trò thành chữ thường
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        );

        req.session.userLogin = {
            userId: user.id,
            userName: user.name,
            role: user.role.toLowerCase(),
        };

        res.cookie("token", token, { httpOnly: true });
        res.redirect("/course");
    } catch (err) {
        console.error("Lỗi trong quá trình đăng nhập:", err);
        res.render("login", {
            errorMessage: "Đã xảy ra lỗi, vui lòng thử lại sau.",
            email: inputEmail,
            password: inputPassword,
        });
    }
};

const logOut = (req, res) => {
    res.clearCookie("token");
    req.session.destroy();
    res.redirect("/login");
};

module.exports = { renderLoginPage, loginCourse, logOut };
