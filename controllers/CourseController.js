const Course = require("../models/CourseModel");
const utils = require("../utils/mongooseUtil");
const slugify = require("slugify");

// render create page
const renderCreatePage = (req, res) => {
    return res.render("layouts/main", {
        courses: [],
        selectedCourse: null,
        isEditPage: false,
        isCreatePage: true,
        isMe: false,
        isTrash: false,
    });
};

// render edit page
const renderEditPage = async (req, res) => {
    try {
        const selectedCourse = await Course.findById(req.params.id);

        if (selectedCourse) {
            return res.render("layouts/main", {
                courses: [],
                selectedCourse,
                isCreatePage: false,
                isEditPage: true,
                isMe: false,
                isTrash: false,
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

        return res.render("layouts/main", {
            courses,
            selectedCourse: null,
            isEditPage: false,
            isCreatePage: false,
            isMe: false,
            isTrash: false,
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

// force delete selected course
const forceDeleteCourse = async (req, res) => {};

module.exports = {
    renderCreatePage,
    renderEditPage,
    getAllCourses,
    createCourse,
    editCourse,
    getCourseInformationById,
    softDeleteCourse,
    forceDeleteCourse,
};
