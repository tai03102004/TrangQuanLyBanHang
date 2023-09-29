const Product = require("../../models/product.model"); // để lấy các id sản phẩm
// [GET] /products

module.exports.index = async(req,res) =>{
    const products = await Product.find({
        status: "active",
        deleted: false
      }).sort({ position: "desc" }); // Lấy hết dữ liệu trong mongooseDB;

    const newProducts = products.map(item => {
        item.priceNew = ((item.price * (100-item.discountPercentage)) / 100).toFixed(0); // tính tiền giảm giá
        return item;
    });

    res.render("client/pages/products/index.pug" ,{
        pageTitle: "Danh sách sản phẩm",
        products : newProducts, // các item là các id sản phẩm
    });
}
