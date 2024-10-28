// middlewares/requireLogin.js
const requireLogin = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/login");
    }
    next();
};

const checkLogin = (req, res, next) => {
    if (req.session.user) {
        return res.redirect("/course");
    }
    next();
};

module.exports = { requireLogin, checkLogin };
