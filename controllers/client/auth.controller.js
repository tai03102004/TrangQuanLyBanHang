const Auth = require("../../models/auth.model");
const md5 = require("md5");
const ForgotPassword = require("../../models/forgot-password.model");
const generateHelper = require("../../helper/generate.js");
const sendMailHelper = require("../../helper/sendMail.js");
const Cart = require("../../models/cart.model");


module.exports.signup = async (req,res) =>{
    const user = await Auth.find(
        { deleted: false }
    );
    res.render("client/pages/auth/logout", {
        pageTitle: "Đăng ký",
        user : user,
    });
};

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
        req.body.password = md5(req.body.password);

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
};

module.exports.loginPatch = async (req, res) => {

    try {
        const name_id = req.body.name_id;
        const password = req.body.password;
        console.log(password);
        const user = await Auth.findOne(
            {name_id: name_id},
            { deleted: false }
        );
        // Lưu user_id vào collection carts
        await Cart.updateOne({
            _id: req.cookies.cartId
        }, {
            user_id: user.id
        });
        
        if (!user) {
            req.flash("error", "Tài khoản không tồn tại");
            res.redirect("back");
            return;
        }
        if ((md5)(password) !== (user.password)) {
            req.flash("error", "Sai mật khẩu");
            res.redirect("back");
            return;
        }
        if ( name_id == user.name_id ) {
            
            const userName = await Auth.findOne({
                name_id: name_id,
                deleted: false
            });
            res.cookie("tokenUser",userName.tokenUser,{ expires: new Date(Date.now() + 90000000)});
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
    res.clearCookie("tokenUser");
    res.redirect(`/auth/login`);
};

//[GET]/auth/password/forgot

module.exports.forgotPassword = async (req, res) => {
    res.render("client/pages/auth/forgot-password", {
        pageTitle: "Lấy lại mật khẩu",
    });
};


// [POST]/auth/password/forgot
module.exports.forgotPasswordPost = async(req, res) => {
    const email = req.body.email;
    // Nếu trong user có tài khoản thì mới có quên mật khẩu
    const user = await Auth.findOne({
        email : email,
        deleted : false,
    });

    if (!user) {
        req.flash("error","Email không tồn tại");
        res.redirect("back");
        return;
    }

    // Việc 1 : Tạo mã OTP và lưu OTP, email và lưu Email vào collection
    // forgot-password : mã otp random 8 chữ số
    const otp = generateHelper.generateRandomNumber(8);
    // email , otp , thời gian cập nhật
    const objectForgotPassword = {
        email : email,
        otp : otp,
        expireAt : Date.now(),
    };
    // Các thuộc tính lưu vào model
    const forgotPassword = new ForgotPassword(objectForgotPassword);
    // Lưu vào model
    await forgotPassword.save();
    // Việc 2 : Gửi mã OTP qua email của user
    // Gửi mã otp về email của mình
    const subject = `Mã OTP xác minh lấy lại mật khẩu`;
    const html = `
        Mã OTP xác minh lấy lại mật khẩu là <b>${otp}</b>. Thời hạn sử dụng là 3 phút. Lưu ý không được để lộ mã OTP.
    `;

    sendMailHelper.sendMail(email, subject, html);
    res.redirect(`/auth/password/otp?email=${email}`);

}

// [GET] / auth/password/otp

module.exports.otpPassword = async (req,res) => {
    const email = req.query.email;

    res.render("client/pages/auth/otp-password", {
        pageTitle : "Nhập mã OTP" ,
        email : email,
    })
};

// [POST]/auth/ password/otp

module.exports.otpPasswordPost = async (req,res) => {
    const email = req.body.email;
    const otp = req.body.otp;
    // email và otp
    const result = await ForgotPassword.findOne({ 
        email: email,
        otp: otp
    });
    
    if (!result) {
        req.flash("error","Mã xác nhận không hợp lệ");
        res.redirect("back");
        return;
    }

    const user = await Auth.findOne({
        email : email
    });

    
    // để khi người ta gửi lại mã otp thì phải có thêm tokenUser để xãc thực chính 
    // xác là người đó . Không F12 có thể thay email khác và nó vẫn thay đổi đc password

    res.cookie("tokenUser",user.tokenUser);

    res.redirect("/auth/password/reset");

}

//[GET]/auth/password/reset
module.exports.resetPassword = async (req,res) => {
    res.render("client/pages/auth/reset-password",{
        pageTitle : "Đổi mật khẩu",
    })
}

// [POST]/auth/password/reset
module.exports.resetPasswordPost = async (req,res) => {
    const password = req.body.password;
    const tokenUser = req.body.tokenUser;
    await Auth.updateOne(
        {
            tokenUser: tokenUser,
        },
        {
            password: md5(password),
        }
    );
    res.redirect("/");
}

// [GET] /user/info
module.exports.info = async (req, res) => {
    res.render("client/pages/auth/info", {
        pageTitle: "Thông tin tài khoản",

    });
}