const mongoose = require("mongoose");
const generate = require("../helper/generate");


const forgotPasswordSchema = new mongoose.Schema(
{
    email: String,
    otp : String,
    // xoá bản ghi sau 20s
    expireAt : {
        type: Date,
        expires : 20
    }
},
    { timestamps: true }
);
// Định nghĩa model product (tên model , schema(các thuộc tính models) , tên collection)

const ForgotPassword = mongoose.model("ForgotPassword", forgotPasswordSchema, "forgot-password");

module.exports = ForgotPassword;
