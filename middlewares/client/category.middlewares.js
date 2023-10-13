// để thằng nào cx dùng đc các cha chứa các con

const ProductCategory = require("../../models/product-category.model");

// in ra thằng cha
const createTree= require("../../helper/createTree");

module.exports.category = async (req,res,next) =>{
    const categoryProduct = await ProductCategory.find({
        deleted:false,
    })
    const newProductCategory = createTree(categoryProduct);
    // sử dụng 1 biến layoutCategoryProducts làm biến toàn cục lưu cả thằng cha và con
    res.locals.layoutCategoryProducts = newProductCategory;

    next();
}