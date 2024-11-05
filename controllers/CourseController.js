const Course = require("../models/CourseModel");
const utils = require("../utils/mongooseUtil");
const slugify = require("slugify");

// render create page
const renderCreatePage = (req, res) => {
    return res.render("layouts/main", {
        courses: [],
        message: null,
        errMessage: null,
        viewPath: "../courses/create",
    });
};

// render edit page
const renderEditPage = async (req, res) => {
    try {
        const selectedCourse = await Course.findById(req.params.id);

        if (selectedCourse) {
            return res.render("layouts/main", {
                courses: [],
                message: null,
                errMessage: null,
                selectedCourse,
                viewPath: "../courses/edit",
            });
        }

        return res.status(404).json({ message: "Course Not Found" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// get all courses
const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({ deletedAt: null });
        const message = req.session.message;
        const errMessage = req.session.errMessage;
        req.session.message = null;
        req.session.errMessage = null;

        return res.render("layouts/main", {
            courses,
            message,
            errMessage,
            viewPath: "../home",
            userName: res.locals.userName, // Make sure userName is passed to the view
        });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// create course
const createCourse = async (req, res) => {
    try {
        const { name, description, videoLink, level } = req.body;

        // generate YouTube thumbnail URL for the course image
        const videoId = utils.extractVideoId(videoLink);
        const image = `https://img.youtube.com/vi/${videoId}/0.jpg`;
        const newId = await utils.generateId();

        // generate a unique slug based on the course name
        const slug = slugify(name, { lower: true, strict: true });

        const newCourse = new Course({
            _id: newId,
            name,
            description,
            image,
            videoId,
            level,
            slug,
        });

        await newCourse.save();

        return res.redirect("/course");
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// edit selected course
const editCourse = async (req, res) => {
    try {
        const { name, description, videoLink, level } = req.body;

        const videoId = utils.extractVideoId(videoLink);

        const updateCourse = await Course.findByIdAndUpdate(
            req.params.id,
            {
                name,
                description,
                videoId,
                level,
                image: `https://img.youtube.com/vi/${videoId}/0.jpg`,
            },
            { new: true }
        );

        if (!updateCourse) {
            return res
                .status(500)
                .json({ message: "Failed to update course information" });
        }

        return res.redirect("/course");
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// get course information
const getCourseInformationById = async (req, res) => {
    try {
        const resultCourse = await Course.findById(req.params.id);

        if (!resultCourse) {
            return res.status(404).json({ message: "Course not found" });
        }

        return res.json(resultCourse);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// show selected course
const showCourse = async (req, res) => {
    try {
        const selectedCourse = await Course.findById(req.params.id);

        if (selectedCourse) {
            return res.render("layouts/main", {
                courses: [],
                message: null,
                errMessage: null,
                selectedCourse,
                viewPath: "../courses/show",
            });
        }

        return res.status(404).json({ message: "Course Not Found" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// soft delete selected course
const softDeleteCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ message: "Failed to delete course" });
        }

        course.deletedAt = new Date();
        await course.save();

        return res.redirect("/me");
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// soft deleted all selected courses
const softDeleteMultipleCourses = async (req, res) => {
    const { action, courseIds } = req.body;

    if (action === "delete" && courseIds && courseIds.length > 0) {
        try {
            await Course.updateMany(
                { _id: { $in: courseIds } },
                { $set: { deletedAt: new Date() } }
            );
            return res.redirect("/me");
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    } else {
        return res
            .status(400)
            .json({ message: "Invalid action or no courses selected" });
    }
};

// force delete selected course
const forceDeleteCourse = async (req, res) => {
    try {
        await Course.deleteOne({ _id: req.params.id });
        return res.redirect("/me");
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// force deleted all selected courses
const forceDeleteMultipleCourses = async (courseIds) => {
    await Course.deleteMany({ _id: { $in: courseIds } });
};

// restore selected course
const restoreCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res
                .status(404)
                .json({ message: "Failed to restore course" });
        }

        course.deletedAt = null;
        await course.save();

        return res.redirect("/me");
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// restore multiple selected courses
const restoreMultipleCourses = async (courseIds) => {
    await Course.updateMany(
        { _id: { $in: courseIds } },
        { $set: { deletedAt: null } }
    );
};

// handle action for force delete and restore multiple courses
const handleAction = async (req, res) => {
    const { action, courseIds } = req.body;

    try {
        if (!courseIds && courseIds.length <= 0) {
            return res.status(400).json({ message: "No course selected" });
        }

        if (action === "restore") {
            restoreMultipleCourses(courseIds);
        } else if (action === "force-delete") {
            forceDeleteMultipleCourses(courseIds);
        } else {
            return res.status(400).json({ message: "Invalid action" });
        }

        return res.redirect("/me");
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports = {
    renderCreatePage,
    renderEditPage,
    getAllCourses,
    createCourse,
    editCourse,
    getCourseInformationById,
    showCourse,
    softDeleteCourse,
    softDeleteMultipleCourses,
    forceDeleteCourse,
    restoreCourse,
    handleAction,
};
