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
router.get("/purchased", MeController.getPurchasedCourses);
router.post("/purchase", MeController.purchaseMultipleCourses);

// me add courses in cart
router.get("/cart", MeController.getCart);
router.post("/cart/:id", MeController.addToCart);
router.post("/cart/purchase/:id", MeController.purchaseCourse);

// me remove course from cart
router.delete("/cart/remove/:id", MeController.removeCourseFromCart);

module.exports = router;
