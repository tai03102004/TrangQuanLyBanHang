// Trang phân quyền
const mongoose = require("mongoose");
// Lấy thông tin , kiểu dữ liệu là các object;
const rolesSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        permissions : {
            type : Array,
            default : [] // backend nhận đc các tick lưu vào 1 mảng
        }, // lưu các giá trị ("Xem bài viết","Thêm mới bài viết"  , ...)
        deleted: {
            type: Boolean, // true : product đã bị xoá , false : ko
            default: false, // mặc định tài liệu chưa bị xoá 
        },
        deletedAt: Date, // ghi thời điểm xoá
    },
    { timestamps: true } // nó sẽ tạo ra 2 trường (createdAt : time tạo product) , (updatedAt : thời gian cập nhật sản phẩm)
);
// Định nghĩa model product (tên model , schema , tên collection)
const Role = mongoose.model("Roles", rolesSchema, "roles");

module.exports = Role;