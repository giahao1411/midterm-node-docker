const express = require("express");
const router = express.Router();
const MeController = require("../controllers/MeController");
const checkRole = require("../middlewares/CheckRole");

// me home route
router.get("/", MeController.getAllCourses);

// me trash route
router.get("/trash", MeController.getAllTrashCourses);

// me get purchased courses
router.get("/purchased");

module.exports = router;
