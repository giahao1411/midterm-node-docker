const Course = require("../models/CourseModel");

const generateId = async () => {
    try {
        const lastCourse = await Course.findOne().sort({ _id: -1 });
        return lastCourse ? lastCourse._id + 1 : 1;
    } catch (err) {
        throw new Error("Unable to generate ID, " + err.message);
    }
};

module.exports = generateId;
