const homeRoutes = require("./home.route"); 
const productRoutes = require("./product.route");
const authRoutes = require("./auth.route");
const authMiddlewares = require("../../middlewares/client/auth.middlewares.js"); // để cho khi nhập đúng tk mới đc vào
const authAccount = require("./account.route");

const categoryMiddlewares = require("../../middlewares/client/category.middlewares");

module.exports = (app) =>{
    // Trang nào cũng sử dụng
    // app.use(categoryMiddlewares.category);
    // categoryMiddlewares để sửa dụng để trang nào cx in
    app.use('/',categoryMiddlewares.category,authMiddlewares.requireAuth, homeRoutes);
    app.use("/products",categoryMiddlewares.category,authMiddlewares.requireAuth,productRoutes); // có thể sử dụng để gọi path,get,delete ,...
    app.use("/auth",authRoutes);
    app.use("/account",authMiddlewares.requireAuth,authAccount);
}