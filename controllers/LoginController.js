const validator = require("validator");
require("dotenv").config();

// get login
const renderLoginPage = (req, res) => {
    return res.render("login", {
        errorMessage: null,
        email: "",
        password: "",
    });
};

// handling login information
const loginCourse = (req, res) => {
    let { inputEmail, inputPassword } = req.body;
    let error = "";

    const storedEmail = process.env.ADMIN_EMAIL;
    const storedPassword = process.env.ADMIN_PASSWORD;

    if (!inputEmail) {
        error = "Nhập email";
    } else if (!validator.isEmail(inputEmail)) {
        error = "Sai định dạng";
    } else if (!inputPassword) {
        error = "Nhập mật khẩu";
    } else if (inputPassword.length < 6) {
        error = "Mật khẩu phải có ít nhất 6 kí tự";
    } else if (inputEmail !== storedEmail) {
        error = "Sai email";
    } else if (inputPassword !== storedPassword) {
        error = "Sai mật khẩu";
    }

    if (error.length > 0) {
        res.render("login", {
            errorMessage: error,
            email: inputEmail,
            password: inputPassword,
        });
    } else {
        req.session.user = inputEmail;
        res.redirect("/course");
    }
};

module.exports = {
    renderLoginPage,
    loginCourse,
};