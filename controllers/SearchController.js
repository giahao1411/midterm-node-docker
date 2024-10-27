const Course = require("../models/CourseModel"); 

// search courses by query
exports.searchCourses = async (req, res) => {
    try {
        const { query } = req.query;

        // separate keywords based on commas and remove spaces
        const keywords = query.split(',').map(keyword => keyword.trim()).filter(keyword => keyword);

        // facilitate searches using $or for all keywords
        const searchConditions = keywords.map(keyword => ({
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        }));

        // find courses that satisfy at least one of the conditions
        const courses = await Course.find({ $or: searchConditions });

        res.render("courses/searchResults", { courses, layout: false });
    } catch (error) {
        res.status(500).send("Có lỗi xảy ra khi tìm kiếm");
    }
};


