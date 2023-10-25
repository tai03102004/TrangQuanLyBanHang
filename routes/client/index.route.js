const homeRoutes = require("./home.route"); 
const productRoutes = require("./product.route");
const authRoutes = require("./auth.route");
const authMiddlewares = require("../../middlewares/client/auth.middlewares.js"); // để cho khi nhập đúng tk mới đc vào
const authAccount = require("./account.route");
// giỏ hàng
const cartMiddleware = require("../../middlewares/client/cart.middlewares");

// Tìm kiếm sản phẩm
const searchRoutes = require("./search.route");

// Giỏ hàng
// Tìm kiếm sản phẩm
const cartRoutes = require("./cart.route");

const categoryMiddlewares = require("../../middlewares/client/category.middlewares");

// const cartRoutes = require("./cart.route");

// Trang thanh toán
const checkoutRoutes = require("./checkout.route");

module.exports = (app) =>{
    // Trang nào cũng sử dụng
    // app.use(categoryMiddlewares.category);
    // categoryMiddlewares để sửa dụng để trang nào cx in
    app.use(cartMiddleware.cartId);


    app.use('/',categoryMiddlewares.category,authMiddlewares.requireAuth, homeRoutes);
    app.use("/products",categoryMiddlewares.category,authMiddlewares.requireAuth,productRoutes); // có thể sử dụng để gọi path,get,delete ,...
    app.use("/auth",authRoutes);
    // GIỏ hàng
    app.use("/cart",categoryMiddlewares.category,cartRoutes);
    // Trang Đặt hàng
    app.use("/checkout",categoryMiddlewares.category,checkoutRoutes);
    // app.use("/account",authMiddlewares.requireAuth,authAccount);
    app.use("/search",categoryMiddlewares.category,searchRoutes);
}