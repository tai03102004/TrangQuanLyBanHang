const Auth = require("../../models/auth.model");
const md5 = require("md5");

module.exports.signup = async (req,res) =>{
    const user = await Auth.find(
        { deleted: false }
    );
    res.render("client/pages/auth/logout", {
        pageTitle: "Đăng ký",
        user : user,
    });
}

module.exports.signupPost = async (req, res) => {

    // console.log(name);
    try {
        // Check if the email already exists
        
        const name_id = req.body.name_id;
        const email = req.body.email;
        const phone = req.body.phone;
        const password = req.body.password;
        const account = await Auth.find({deleted:false});

        for (const user of account){
            if (user.name_id == name_id ) {
                req.flash("error", "Tên đăng nhập đã được sử dụng. Vui lòng chọn tên đăng nhập khác.");
                res.redirect("back");
                return;
            }
            if (user.email == email) {
                req.flash("error", "Email này đã được sử dụng. Vui lòng đổi email khác. ");
                res.redirect("back");
                return;
            }
            if (user.phone == phone) {
                req.flash("error", "Số điện thoại này đã được sử dụng. Vui lòng đổi Số điện thoại khác. ");
                res.redirect("back");
                return;
            }
        }

        // Check password length
        if (password.length < 6) {
            req.flash("error", "Mật khẩu phải có hơn 5 ký tự");
            res.redirect("back");
            return;
        }
        const emailPattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        const phonePattern = /((09|03|07|08|05)+([0-9]{8})\b)/g;

        if (!emailPattern.test(req.body.email)) {
            // console.log(userName);
            req.flash("error", "Vui lòng nhập đúng email.");
            res.redirect("/auth/logout");
            return;
        } 
        if (!phonePattern.test(req.body.phone)) {
            // console.log(userName);
            req.flash("error", "Vui lòng nhập đúng số điện thoại.");
            res.redirect("/auth/logout");
            return;
        } 
        const record = new Auth(req.body);
        await record.save();
        req.flash("success", "Hãy đăng nhập để tiếp tục.");
        res.redirect("/auth/login");
        

    } catch (error) {
        console.error("Error saving user:", error);
        res.redirect("back");
    }
};


module.exports.login = async (req,res) =>{
    const records = await Auth.find({
        deleted: false
    });

    res.render("client/pages/auth/login", {
        pageTitle: "Đăng nhập",
        records: records,
    });
}

module.exports.loginPatch = async (req, res) => {

    try {
        console.log(req.body);
        const name_id = req.body.name_id;
        const password = req.body.password;
        
        const user = await Auth.findOne(
            {name_id: name_id},
            { deleted: false }
        );
        console.log(user);
        if (!user) {
            req.flash("error", "Tài khoản không tồn tại");
            res.redirect("back");
            return;
        }
        if (password !== user.password) {
            req.flash("error", "Sai mật khẩu");
            res.redirect("back");
            return;
        }
        if ( name_id == user.name_id ) {
            
            const userName = await Auth.findOne({
                name_id: name_id,
                deleted: false
            });
            res.cookie("token",userName.token,{ expires: new Date(Date.now() + 90000000)});
            res.redirect("/");
            return;
        }
        else {
            req.flash("error", "Tài khoản không tồn tại");
            res.redirect("back");
            return;
        }


    } catch (error) {
        res.redirect("back");
        
    }
};
module.exports.logout = async(req,res) =>{
    // khi đăng xuất token sẽ mất 
    res.clearCookie("token");
    res.redirect(`/auth/login`);
}