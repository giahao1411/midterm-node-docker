const express = require("express");
const router = express.Router();
const CourseController = require("../controllers/CourseController");
const checkRole = require("../middlewares/CheckRole");
const requireAuth = require("../middlewares/TokenAuth");

router.use(requireAuth);

// create route
router.get("/create", checkRole(["admin"]), CourseController.renderCreatePage);
router.post("/create", checkRole(["admin"]), CourseController.createCourse);

// get all courses
router.get("/", CourseController.getAllCourses);
router.get("/get/:id", CourseController.getCourseInformationById);

router.get("/show/:id", CourseController.showCourse);

// edit route
router.get("/edit/:id", checkRole(["admin"]), CourseController.renderEditPage);
router.patch("/edit/:id", checkRole(["admin"]), CourseController.editCourse);

// delete route
router.delete(
    "/delete/multiple-courses",
    checkRole(["admin"]),
    CourseController.softDeleteMultipleCourses
);
router.delete(
    "/delete/:id",
    checkRole(["admin"]),
    CourseController.softDeleteCourse
);
router.delete(
    "/delete/force/:id",
    checkRole(["admin"]),
    CourseController.forceDeleteCourse
);

// restore deletion route
router.patch(
    "/restore/:id",
    checkRole(["admin"]),
    CourseController.restoreCourse
);

// handle form submit for force delete and restore multiple courses
router.post(
    "/handle-action",
    checkRole(["admin"]),
    CourseController.handleAction
);

module.exports = router;
