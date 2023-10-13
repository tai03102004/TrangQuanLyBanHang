const mongoose = require("mongoose");
const generate = require("../helper/generate");


const authSchema = new mongoose.Schema(
{
    name: String,
    name_id: String, // Tên đăng nhập
    email : String,
    password: String,
    token: {
        type : String,
        default: generate.generateRandomString(31),
    }, // String random duy nhất để trả về fontend lưu trong Cookie
    phone: String,
    avatar: String,
    deleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: Date,
},
    { timestamps: true }
);
// Định nghĩa model product (tên model , schema(các thuộc tính models) , tên collection)

const  Auth = mongoose.model(
    "Auth",
    authSchema,
    "auth"
);

module.exports = Auth;
