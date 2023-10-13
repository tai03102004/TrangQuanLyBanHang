//   để khi vào trang chính phải đăng nhập ko bị out ra
// Lưu ý có thể F12 để thêm token
// xử lý tiếp

// Lấy ra tài khoản

const Auth = require("../../models/auth.model");

module.exports.requireAuth = async (req,res,next) =>{
    // console.log(req.cookies.token);
    
    const user = await Auth.findOne({
        token : req.cookies.token,
    })
    // console.log(user);
    
    // để lấy id của người phân quyền từ đó có thể cho người đó phù hợp với các lựa chọn

    // để dùng user toàn cục
    res.locals.user = user;

    next();
}