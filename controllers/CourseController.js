const Course = require("../models/CourseModel");

// local variable
let courses = [];
let isCreatePage = false;
let isMe = false;

// get all courses
const getAllCourses = async (req, res) => {
    try {
        isCreatePage = false;
        courses = await Course.find();

        return res.render("layouts/main", { courses, isCreatePage, isMe });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// render the create page
const renderCreatePage = (req, res) => {
    isCreatePage = true;
    return res.render("layouts/main", { courses, isCreatePage, isMe });
};

module.exports = {
    renderCreatePage,
    getAllCourses,
};
