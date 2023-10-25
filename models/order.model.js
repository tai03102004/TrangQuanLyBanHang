const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
{   
    // id của người đăng nhập
    // user_id : String,
    // id sản phẩm trong giỏ hàng
    cart_id : String,
    // THông tin người dùng
    userInfo: {
        fullName : String,
        phone : String,
        address : String,
    },
    // sản phẩm người dùng
    products: [
        {
            product_id : String,
            // ko lưu giá mới vì admin có thể thay đổi giá 
            price : Number,
            discountPercentage : Number,
            quantity : Number,
        }
    ]
},
    { timestamps: true }
);
// Định nghĩa model product (tên model , schema(các thuộc tính models) , tên collection)

const Order = mongoose.model(
    "Order",
    orderSchema,
    "orders"
);

module.exports = Order;
