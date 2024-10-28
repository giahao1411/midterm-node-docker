const express = require("express");
const router = express.Router();
const LoginController = require("../controllers/LoginController");


// login route
router.get("/", LoginController.renderLoginPage);
router.post("/", LoginController.loginCourse);

module.exports = router;