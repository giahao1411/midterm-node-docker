// dependencies
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

// modules exported
const CourseRouter = require("./routes/CourseRoute");
const MeRouter = require("./routes/MeRoute");
const db = require("./config/database");

// database connection
db.connect();

// initializes
const app = express();

// views engine
app.set("view engine", "ejs");
app.set("views", "./resources/views");

// serve static files
app.use(express.static("public"));

// middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride("_method")); // allow another method via a hidden input field

// use modules
app.use("/course", CourseRouter);
app.use("/me", MeRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
