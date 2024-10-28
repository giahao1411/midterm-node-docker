const express = require("express");
const router = express.Router();
const CourseController = require("../controllers/CourseController");
const authLogin = require("../middlewares/requireLogin");

//login route
router.use(authLogin);

// get all courses
router.get("/", CourseController.getAllCourses);
router.get("/get/:id", CourseController.getCourseInformationById);

// create route
router.get("/create", CourseController.renderCreatePage);
router.post("/create", CourseController.createCourse);

// edit route
router.get("/edit/:id", CourseController.renderEditPage);
router.patch("/edit/:id", CourseController.editCourse);

// delete route
router.delete(
    "/delete/multiple-courses",
    CourseController.softDeleteMultipleCourses
);
router.delete("/delete/:id", CourseController.softDeleteCourse);
router.delete("/delete/force/:id", CourseController.forceDeleteCourse);

// restore deletion route
router.patch("/restore/:id", CourseController.restoreCourse);

// handle form submit for force delete and restore multiple courses
router.post("/handle-action", CourseController.handleAction);

module.exports = router;
