const Course = require("../models/CourseModel");
const User = require("../models/UserModel");

const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({ deletedAt: null });
        const trashCourses = await Course.countDocuments({
            deletedAt: { $ne: null },
        });

        return res.render("layouts/main", {
            courses,
            message: null,
            errMessage: null,
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
            message: null,
            errMessage: null,
            viewPath: "../me/trash-courses",
        });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const getCart = async (req, res) => {
    try {
        return res.render("layouts/main", {
            courses: null,
            message: null,
            errMessage: null,
            viewPath: "../me/cart",
        });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const getPurchasedCourses = async (req, res) => {};

const addToCart = async (req, res) => {
    const userId = req.session.userLogin.userId;
    const courseId = parseInt(req.params.id);

    try {
        const user = await User.findById(userId).select("inCartCourses");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // check if the course is already in inCartCourses
        const isCourseInCart = user.inCartCourses.includes(courseId);

        if (isCourseInCart) {
            req.session.errMessage = "Khóa học đã tồn tại trong giỏ hàng";
            return res.redirect("/course");
        }

        user.inCartCourses.push(courseId);
        await user.save();

        req.session.message = "Khóa học đã được thêm vào giỏ hàng";
        return res.redirect("/course");
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const purchaseCourse = async (req, res) => {};

module.exports = {
    getAllCourses,
    getAllTrashCourses,
    getCart,
    getPurchasedCourses,
    addToCart,
    purchaseCourse,
};
