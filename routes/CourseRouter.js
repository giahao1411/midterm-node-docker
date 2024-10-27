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

// delete route
router.get("/delete/:id", CourseController.getCourseInformationById);
router.delete("/delete/:id", CourseController.softDeleteCourse);
router.delete("/delete/force/:id");

// restore delete route
router.patch("/restore/:id");

module.exports = router;
