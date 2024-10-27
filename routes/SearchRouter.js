const express = require("express");
const router = express.Router();
const searchController = require("../controllers/SearchController");

// Route tìm kiếm
router.get("/", searchController.searchCourses);

module.exports = router;
