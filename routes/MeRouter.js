const express = require("express");
const router = express.Router();
const MeController = require("../controllers/MeController");
const checkRole = require("../middlewares/CheckRole");
const requireAuth = require("../middlewares/TokenAuth");

router.use(requireAuth);

// me home route
router.get("/", checkRole(["admin"]), MeController.getAllCourses);

// me trash route
router.get("/trash", checkRole(["admin"]), MeController.getAllTrashCourses);

// me get purchased courses
router.get("/purchased");
router.post("/purchased/:id");

// me add courses in cart
router.get("/cart", MeController.getCart);
router.post("/cart/:id");

module.exports = router;
