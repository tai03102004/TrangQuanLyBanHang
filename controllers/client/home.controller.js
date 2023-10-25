const Product = require("../../models/product.model");

const productsHelper = require("../../helper/products");


// [GET] /

module.exports.index = async (req,res) =>{

    // Hiển thị các danh sách nổi bật

    const productsFeatured = await Product.find({
        featured: "1", // 1 : Nổi bật
        deleted: false,
        status: "active"
    }).limit(6); // lấy tối đa 6 sản phẩm

    // Tính ra giá mới của sản phẩm nổi bật
    const newProductsFeatured = productsHelper.priceNewProducts(productsFeatured);
    
    // Hiển thị danh sách sản phẩm mới nhất
    // position mới thêm là lớn nhất nên sẽ là sản phẩm mới nhất
    const productsNew = await Product.find({
        deleted: false,
        status: "active"
    }).sort({ position: "desc" }).limit(6);

    const newProductsNew = productsHelper.priceNewProducts(productsNew);
  // Hết Hiển thị danh sách sản phẩm mới nhất

    res.render('client/pages/home/index.pug',{
        pageTitle: "Home",
        productsFeatured: newProductsFeatured, 
        productsNew: newProductsNew,

    })
}


