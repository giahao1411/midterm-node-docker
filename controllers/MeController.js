const Course = require("../models/CourseModel");

const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({ deletedAt: null });
        const trashCourses = await Course.countDocuments({
            deletedAt: { $ne: null },
        });

        return res.render("layouts/main", {
            courses,
            trashCourses,
            viewPath: "../me/stored-courses",
        });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const getAllTrashCourses = async (req, res) => {
    try {
        const courses = await Course.find({ deletedAt: { $ne: null } });

        return res.render("layouts/main", {
            courses,
            viewPath: "../me/trash-courses",
        });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllCourses,
    getAllTrashCourses,
};
