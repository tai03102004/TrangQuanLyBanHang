const systemConfig = require("../../config/system"); // /admin
const dashboardRoutes = require("./dashboard.route");// Trang chính
const productRoutes = require("./product.route"); // Trang sản phẩm

const productCategoryRoutes = require("./product-category.route");  // quản lý ds sản phẩm
const roleRoutes = require("./roles.route"); // Trang phân quyền

const accountRoutes = require("./account.route"); // Trang tài khoản

const authRoutes = require("./auth.route"); // Trang đăng nhập 

const myAccount = require("./my-account.route"); // Trang thông tin tài khoản 


const authMiddlewares = require("../../middlewares/admin/auth.middlewares.js"); // để cho khi nhập đúng tk mới đc vào

module.exports = (app) =>{

    const PATH_ADMIN = "/" + systemConfig.prefixAdmin;

    app.use(PATH_ADMIN + "/dashboard", authMiddlewares.requireAuth ,dashboardRoutes);

    app.use(PATH_ADMIN + "/products" , authMiddlewares.requireAuth ,productRoutes);

    app.use(PATH_ADMIN + "/products-category",authMiddlewares.requireAuth , productCategoryRoutes);
    app.use(PATH_ADMIN + "/roles", authMiddlewares.requireAuth, roleRoutes);

    app.use(PATH_ADMIN + "/accounts",authMiddlewares.requireAuth, accountRoutes);
    // vì ai cũng có thể vào nên ko phải phải thêm private
    app.use(PATH_ADMIN + "/auth", authRoutes);

    app.use(PATH_ADMIN + "/my-account",authMiddlewares.requireAuth, myAccount);

}
