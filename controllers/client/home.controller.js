const Product = require("../../models/product.model");

// [GET] /

module.exports.index = async (req,res) =>{
    // Hiển thị các danh sách nổi bật

    const productsFeatured = await Product.find({
        featured: "1", // 1 : danh sách nổi bật , 0 : ds ko nổi bật
        deleted:false,
        status:"active"
    });

    res.render('client/pages/home/index.pug',{
        pageTitle: "Home",
    })
}


