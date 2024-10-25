const express = require("express");
const router = express.Router();
const CourseController = require("../controllers/CourseController");

router.get("/", CourseController.getAllCourses);

router.get("/create", CourseController.renderCreatePage);

module.exports = router;
