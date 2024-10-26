const express = require("express");
const router = express.Router();
const CourseController = require("../controllers/CourseController");

// course home route
router.get("/", CourseController.getAllCourses);

// create route
router.get("/create", CourseController.renderCreatePage);
router.post("/create", CourseController.createCourse);

// edit route
router.get("/edit/:id", CourseController.renderEditPage);
router.patch("/edit/:id", CourseController.editCourse);

module.exports = router;
