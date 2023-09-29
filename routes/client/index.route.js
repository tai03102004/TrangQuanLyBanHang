const homeRoutes = require("./home.route"); 
const productRoutes = require("./product.route");

module.exports = (app) =>{
    app.use('/', homeRoutes);
    app.use("/products",productRoutes); // có thể sử dụng để gọi path,get,delete ,...
}