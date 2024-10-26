const Course = require("../models/CourseModel");

const generateId = async () => {
    try {
        const lastCourse = await Course.findOne().sort({ _id: -1 });
        return lastCourse ? lastCourse._id + 1 : 1;
    } catch (err) {
        throw new Error("Unable to generate ID, " + err.message);
    }
};

const extractVideoId = (url) => {
    const regex =
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
};

module.exports = { generateId, extractVideoId };
