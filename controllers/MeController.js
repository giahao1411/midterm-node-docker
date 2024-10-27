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
            selectedCourse: null,
            isEditPage: false,
            isCreatePage: false,
            isMe: true,
            isTrash: false,
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
            selectedCourse: null,
            isEditPage: false,
            isCreatePage: false,
            isMe: false,
            isTrash: true,
        });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllCourses,
    getAllTrashCourses,
};
