const express = require("express");
const router = express.Router();
const LoginController = require("../controllers/LoginController");
const checkLogin = require("../middlewares/CheckLogin");

// login route
router.get("/", checkLogin, LoginController.renderLoginPage);
router.post("/", checkLogin, LoginController.loginCourse);
router.get("/logout", LoginController.logOut);

module.exports = router;
