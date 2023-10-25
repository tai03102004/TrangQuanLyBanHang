// Đăng nhập , đăng ký
module.exports.register = (req,res,next) =>{
    if(!req.body.name){
        req.flash("error", "Vui lòng nhập họ tên");
        res.redirect('back');
        return;
    }
    if(req.body.email){
        req.flash("error", "Email không được để trống");
        res.redirect('back');
        return;
    }
    if(req.body.title.password ){
        req.flash("error", "Password không được để trống");
        res.redirect('back');
        return;
    }
    next();
}
// Quên mật khẩu
module.exports.forgotPasswordPost = (req, res, next) => {
    if(!req.body.email) {
        req.flash("error", `Email không được để trống!`);
        res.redirect("back");
        return;
    }

    next();
}

// reset mật khẩu
module.exports.resetPasswordPost = (req, res, next) => {
    if(!req.body.password) {
        req.flash("error", `Mật khẩu không được để trống!`);
        res.redirect("back");
        return;
    }
    
    if(!req.body.confirmPassword) {
        req.flash("error", `Vui lòng xác nhận lại mật khẩu!`);
        res.redirect("back");
        return;
    }

    if(req.body.password != req.body.confirmPassword) {
        req.flash("error", `Xác nhận mật khẩu không trùng khớp!`);
        res.redirect("back");
        return;
    }

    next();
}