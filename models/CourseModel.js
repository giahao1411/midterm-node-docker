const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema(
    {
        _id: { type: Number, require: true },
        name: { type: String, require: true },
        description: { type: String },
        image: { type: String },
        videoId: { type: String, require: true },
        level: { type: String },
        slug: { type: String, unique: true },
        deleteAt: { type: Date, default: null },
    },
    {
        _id: false,
        timestamps: true,
    }
);

module.exports = mongoose.model("Course", CourseSchema);
