const express = require("express");
const router = express.Router();
const MeController = require("../controllers/MeController");

router.get("/", MeController.getAllCourses);

module.exports = router;
