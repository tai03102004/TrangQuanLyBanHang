// [GET] / search

const Product = require("../../models/product.model");
const productHelper = require("../../helper/products.js");

module.exports.index = async(req,res) => {
    const keyword = req.query.keyword;
    let newProducts = [];
    if (keyword) {

        // Xóa khoảng trắng thừa trong từ khóa

        const cleanedKeyword = keyword.replace(/\s+/g, ' ').trim();

        // Tạo biểu thức chính quy với từ khóa đã được làm sạch
        const keywordRegex = new RegExp(cleanedKeyword, "i");

        const products = await Product.find({
            title: keywordRegex,
            deleted: false,
            status : "active",
        });

        newProducts = productHelper.priceNewProducts(products);
        
    }
    res.render("client/pages/search/index" , {
        pageTitle : "Kết quả tìm kiếm",
        keyword : keyword,
        products : newProducts,
    }) 
}