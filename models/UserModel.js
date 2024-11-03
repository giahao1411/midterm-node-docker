const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    purchasedCourses: { type: Schema.Types.ObjectId, ref: "Course" },
    inCartCourses: { type: Schema.Types.ObjectId, ref: "Course" },
});

module.exports = mongoose.model("User", UserSchema);
