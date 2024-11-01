// dependencies
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const cookieParser = require("cookie-parser");

// modules exported
const CourseRouter = require("./routes/CourseRouter");
const MeRouter = require("./routes/MeRouter");
const LoginRouter = require("./routes/LoginRouter");
const SearchRouter = require("./routes/SearchRouter");
const HomeRouter = require("./routes/HomeRouter");
const RegisterRouter = require("./routes/RegisterRouter");

const db = require("./config/database");

// middleware exported
const setUser = require("./middlewares/SetUser");

// database connection
db.connect();

// initializes
const app = express();

// express-session
app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 2, // 2 hours
            httpOnly: true,
            secure: false,
        },
    })
);

// views engine
app.set("view engine", "ejs");
app.set("views", "./resources/views");

// serve static files
app.use(express.static("public"));

// middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride("_method")); // allow another method via a query field
app.use(cookieParser());
app.use(setUser);

// // set local variables for EJS templates
// app.use((req, res, next) => {
//     res.locals.userRole = req.user ? req.user.role : null;
//     res.locals.userName = req.user ? req.user.name : "Guest";
//     next();
// });

// Use modules
app.use("/login", LoginRouter);
app.use("/register", RegisterRouter);
app.use("/", HomeRouter);
app.use("/course", CourseRouter);
app.use("/me", MeRouter);
app.use("/search", SearchRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
