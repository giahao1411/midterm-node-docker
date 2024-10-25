const Course = require("../models/CourseModel");

// local variable
var courses = [];
var isCreatePage = false;
var isMe = false;

const getAllCourses = async (req, res) => {
    try {
        courses = await Course.find();
        isMe = true;
        return res.render("layouts/main", { courses, isCreatePage, isMe });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllCourses,
};
