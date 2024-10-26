// middlewares/requireLogin.js
const requireLogin = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
};

module.exports = requireLogin;
