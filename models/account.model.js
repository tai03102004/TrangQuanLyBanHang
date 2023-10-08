const mongoose = require("mongoose");
const generate = require("../helper/generate");


const accountSchema = new mongoose.Schema(
{
    fullName: String,
    email : String,
    password: String,
    token: {
        type : String,
        default: generate.generateRandomString(31),
    }, // String random duy nhất để trả về fontend lưu trong Cookie
    phone: String,
    avatar: String,
    role_id: String,
    status: String,
    deleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: Date,
},
    { timestamps: true }
);
// Định nghĩa model product (tên model , schema(các thuộc tính models) , tên collection)

const  Account = mongoose.model(
    "Account",
    accountSchema,
    "accounts"
);

module.exports = Account;
