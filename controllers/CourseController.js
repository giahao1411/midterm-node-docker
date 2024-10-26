const Course = require("../models/CourseModel");
const utils = require("../utils/mongooseUtil");
const slugify = require("slugify");
const validator = require("validator");
require("dotenv").config();

// local variable
let courses = [];
let selectedCourse = null;
let isCreatePage = false;
let isEditPage = false;
let isMe = false;

// render create page
const renderCreatePage = (req, res) => {
    isCreatePage = true;
    isEditPage = false;
    return res.render("layouts/main", {
        courses,
        selectedCourse,
        isCreatePage,
        isEditPage,
        isMe,
    });
};

// render edit page
const renderEditPage = async (req, res) => {
    try {
        isEditPage = true;
        selectedCourse = await Course.findById(req.params.id);

        if (selectedCourse) {
            return res.render("layouts/main", {
                courses,
                selectedCourse,
                isCreatePage,
                isEditPage,
                isMe,
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
        isCreatePage = false;
        isEditPage = false;
        isMe = false;
        courses = await Course.find();

        return res.render("layouts/main", {
            courses,
            selectedCourse,
            isCreatePage,
            isEditPage,
            isMe,
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

const renderLoginPage = (req, res) => {
    return res.render("login", {
        errorMessage: null,
        email: "",
        password: "",
    });
};

// handling login information
const loginCourse = (req, res) => {
    let { inputEmail, inputPassword } = req.body;
    let error = "";

    const storedEmail = process.env.ADMIN_EMAIL;
    const storedPassword = process.env.ADMIN_PASSWORD;

    if (!inputEmail) {
        error = "Nhập email";
    } else if (!validator.isEmail(inputEmail)) {
        error = "Sai định dạng";
    } else if (!inputPassword) {
        error = "Nhập mật khẩu";
    } else if (inputPassword.length < 6) {
        error = "Mật khẩu phải có ít nhất 6 kí tự";
    } else if (inputEmail !== storedEmail) {
        error = "Sai email";
    } else if (inputPassword !== storedPassword) {
        error = "Sai mật khẩu";
    }

    if (error.length > 0) {
        res.render("login", {
            errorMessage: error,
            email: inputEmail,
            password: inputPassword,
        });
    } else {
        req.session.user = inputEmail;
        res.redirect("/");
    }
};

module.exports = {
    renderCreatePage,
    renderEditPage,
    getAllCourses,
    createCourse,
    editCourse,
    renderLoginPage,
    loginCourse,
};
