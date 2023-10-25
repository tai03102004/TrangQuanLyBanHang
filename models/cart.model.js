const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
{
    user_id: String, // id người dùng
    products: [
        {
            product_id: String, // id sản phẩm
            quantity : Number // Số lương sản phẩm
        }
    ]  // sản phẩm mà thêm vào giỏ hàng
},
    { timestamps: true }
);
// Định nghĩa model product (tên model , schema(các thuộc tính models) , tên collection)

const Cart = mongoose.model(
    "Cart",
    cartSchema,
    "carts"
);

module.exports = Cart;
