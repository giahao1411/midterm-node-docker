const express = require("express");
const router = express.Router();
const CourseController = require("../controllers/CourseController");
const requireLogin = require("../middlewares/requireLogin");

// course home route
router.get("/",requireLogin, CourseController.getAllCourses);

// create route
router.get("/create",requireLogin, CourseController.renderCreatePage);
router.post("/create",requireLogin, CourseController.createCourse);

// edit route
router.get("/edit/:id",requireLogin, CourseController.renderEditPage);
router.patch("/edit/:id",requireLogin, CourseController.editCourse);

// login route
router.get("/login", CourseController.renderLoginPage);
router.post("/login", CourseController.loginCourse);

module.exports = router;
