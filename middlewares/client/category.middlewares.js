// Lấy ra danh sách sản phẩm cả cha với con
const productCategory = require("../../models/product-category.model");

const createTree = require("../../helper/createTree");

module.exports.category = async (req,res,next) =>{
    const categoryProduct = await productCategory.find({
        deleted: false,
    })
    // Lấy ra thằng cha và con
    const newProductCategory =  createTree(categoryProduct);

    res.locals.layoutCategoryProducts = newProductCategory;

    next();
}