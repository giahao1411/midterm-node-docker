const checkLogin = (req, res, next) => {
    if (req.session.userLogin) {
        return res.redirect("/course");
    }
    next();
};

module.exports = checkLogin;
