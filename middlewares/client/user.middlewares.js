const User = require("../../models/auth.model");

module.exports.requireAuth = async (req, res, next) => {
    // Khii ko đăng nhâp sẽ bị out ra trang login
    if(!req.cookies.tokenUser) {
        res.redirect(`/user/login`);
        return;
    }
    // Nếu ko có user sẽ bị out ra trang login

    const user = await User.findOne({
        tokenUser: req.cookies.tokenUser
    });

    if(!user) {
        res.redirect(`/user/login`);
        return;
    }

    next();
}