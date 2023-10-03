const Product = require("../../models/product.model"); // để lấy các id sản phẩm
// [GET] /products

module.exports.index = async(req,res) =>{
    const product = await Product.find({
        status: "active",
        deleted: false
      }).sort({ position: "desc" }); // Lấy hết dữ liệu trong mongooseDB;

    const newProducts = product.map(item => {
        item.priceNew = ((item.price * (100-item.discountPercentage)) / 100).toFixed(0); // tính tiền giảm giá
        return item;
    });

    res.render("client/pages/products/index.pug" ,{
        pageTitle: "Danh sách sản phẩm",
        product : newProducts, // các item là các id sản phẩm
    });
}
// [GET] /detail

module.exports.detail = async(req,res) =>{
    try{
        const slug = req.params.slug;

        const product = await Product.findOne({
            slug: slug,
            deleted:false,
            status :"active"
        });
        res.render("client/pages/products/detail.pug" ,{
            pageTitle: "Chi tiết sản phẩm",
            product: product
        });

    }
    catch(error){
        res.redirect("/");
    }
}
