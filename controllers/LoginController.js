const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// get login
const renderLoginPage = (req, res) => {
    if (req.session.user) {
        return res.redirect("/course"); // Redirect if already logged in
    }
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
    const storedPasswordHash = process.env.ADMIN_PASSWORD_HASH;

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
    } else {
        // Compare password asynchronously with bcrypt
        bcrypt.compare(inputPassword, storedPasswordHash, (err, isMatch) => {
            if (err) {
                return res.render("login", {
                    errorMessage: "Đã xảy ra lỗi, vui lòng thử lại.",
                    email: inputEmail,
                    password: inputPassword,
                });
            }
            if (!isMatch) {
                error = "Sai mật khẩu";
            }

            if (error.length > 0) {
                res.render("login", {
                    errorMessage: error,
                    email: inputEmail,
                    password: inputPassword,
                });
            } else {
                // Generate JWT token after successful password verification
                const token = jwt.sign(
                    { email: inputEmail },
                    process.env.JWT_SECRET,
                    { expiresIn: "2h" }
                );
                console.log(token);

                res.cookie("token", token, { httpOnly: true });

                // Redirect to the course page
                res.redirect("/course");
            }
        });
    }

    // If there's an error before bcrypt comparison
    if (error.length > 0) {
        res.render("login", {
            errorMessage: error,
            email: inputEmail,
            password: inputPassword,
        });
    }
};

module.exports = {
    renderLoginPage,
    loginCourse,
};
