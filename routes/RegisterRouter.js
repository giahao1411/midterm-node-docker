const express = require("express");
const router = express.Router();
const RegisterController = require("../controllers/RegisterController");

// Route GET - Trang đăng ký
router.get("/", RegisterController.showRegisterPage);

// Route POST - Xử lý đăng ký
router.post("/", RegisterController.handleRegister);

module.exports = router;
