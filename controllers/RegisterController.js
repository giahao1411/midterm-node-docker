const validator = require("validator");
const bcrypt = require("bcrypt");
const UserModel = require("../models/UserModel"); 

// Displays the registration page
const showRegisterPage = (req, res) => {
    if (req.session.user) {
        return res.redirect("/course"); // Redirect if logged in
    }
    res.render("register", {
        errorMessage: null,
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
};

// Registration processing
const handleRegister = async (req, res) => {
    let { registerName, registerEmail, registerPassword, confirmPassword } = req.body;
    let error = "";
    const validDomains = [".com", ".net", ".org", ".edu", ".gov", ".vn"];

    // Check 
    if (!registerName) {
        error = "Vui lòng nhập tên đăng nhập";
    } else if (!registerEmail) {
        error = "Vui lòng nhập email";
    } else if (!validator.isEmail(registerEmail)) {
        error = "Sai định dạng email";
    } else if (!validDomains.some(domain => registerEmail.endsWith(domain))) {
        error = "Email phải có domain hợp lệ (ví dụ: .com, .net)";
    } else if (!registerPassword) {
        error = "Vui lòng nhập mật khẩu";
    } else if (registerPassword.length < 6) {
        error = "Mật khẩu phải có ít nhất 6 kí tự";
    } else if (registerPassword !== confirmPassword) {
        error = "Mật khẩu xác nhận không khớp";
    }

    if (error) {
        return res.render("register", {
            errorMessage: error,
            name: registerName,
            email: registerEmail,
            password: registerPassword,
            confirmPassword: confirmPassword
        });
    }

    try {
        const existingUser = await UserModel.findOne({ email: registerEmail });
        if (existingUser) {
            return res.render("register", {
                errorMessage: "Email đã được sử dụng",
                name: registerName,
                email: registerEmail,
                password: registerPassword,
                confirmPassword: confirmPassword
            });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(registerPassword, 10);

        // Create a new user and save it to the database with role 'user'
        const newUser = new UserModel({
            name: registerName, 
            email: registerEmail,
            password: hashedPassword,
            role: "user" // Add default role 'user'
        });

        await newUser.save();

        return res.redirect("/login");
    } catch (err) {
        console.error("Lỗi trong quá trình đăng ký:", err);
        res.render("register", {
            errorMessage: "Đã xảy ra lỗi, vui lòng thử lại sau.",
            name: registerName,
            email: registerEmail,
            password: registerPassword,
            confirmPassword: confirmPassword
        });
    }
};

module.exports = {
    showRegisterPage,
    handleRegister
};
