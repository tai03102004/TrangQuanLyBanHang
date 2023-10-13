//   để khi vào trang chính phải đăng nhập ko bị out ra
// Lưu ý có thể F12 để thêm token
// xử lý tiếp

const systemConfig = require("../../config/system");
// Lấy ra tài khoản
const Account = require("../../models/account.model");
const Role = require("../../models/roles.model");

module.exports.requireAuth = async (req,res,next) =>{
    // console.log(req.cookies.token);
    
    if (!req.cookies.token){
        res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
        return;
    }

    const user = await Account.findOne({
        token : req.cookies.token,
    })
    // nếu tài khoản có token đúngv với database thì vào đc
    
    if (!user){
        res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
        return;
    }
    // để lấy id của người phân quyền từ đó có thể cho người đó phù hợp với các lựa chọn
    const role = await Role.findOne({
        _id : user.role_id
    }).select("title permissions");

    // để dùng user toàn cục(Đưa thông tin người dùng đã lưu ở Cookie : Token)
    res.locals.user = user;
    
    // biến dùng để lấy ra các quyền của tài khoản đó 
    res.locals.role = role;

    next();
}