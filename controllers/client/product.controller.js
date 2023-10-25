const Product = require("../../models/product.model"); // để lấy các id sản phẩm
// [GET] /products
const productsHelper = require("../../helper/products");
const ProductCategory = require("../../models/product-category.model");


module.exports.index = async(req,res) =>{
    const products = await Product.find({
        status: "active",
        deleted: false
      }).sort({ position: "desc" }); // Lấy hết dữ liệu trong mongooseDB;

    const newProducts = productsHelper.priceNewProducts(products);

    res.render("client/pages/products/index.pug" ,{
        pageTitle: "Danh sách sản phẩm",
        products : newProducts, // các item là các id sản phẩm
    });
}

// [GET] /products/:slugCategory
module.exports.category = async (req, res) => {
    try{
        
        const slugCategory = req.params.slugCategory; // tạo ra các slug ngẫu nhiên

        // các sản phẩm trong danh sách sản phẩm admin
        const category = await ProductCategory.findOne({
            slug: slugCategory,
            deleted: false,
            status: "active"
        });

        const getSubCategory = async (parentId) => {
            const subs = await ProductCategory.find({
                parent_id : parentId, // tìm những thằng có id của thằng cha
                status: "active",
                deleted: false,
            });
            let allSub = [...subs]; // lấy ra hết những thằng con

            for (const sub of subs) {
                const childs = await getSubCategory(sub.id)
                // để tìm những thằng con nữa
                allSub = allSub.concat(childs);
                // Lưu lại trong allSub
            }
            return allSub;
        }

        const listSubCategory = await getSubCategory(category.id); // category.id : thằng cha

        // console.log(listSubCategory);

        // in ra thằng con của thằng cha
        const listSubCategoryId = listSubCategory.map ( item=> item.id);

        // mình sẽ thêm 1 cái category bên admin vào sản phẩm 
        const products = await Product.find({
            product_category_id: {
                $in: [category.id , ...listSubCategoryId],
            } ,
            // cái id của sản phầm sẽ là đc thêm mới trong model và lấy giá trị của dssp 
            status: "active",
            deleted: false
        }).sort({ position: "desc" });

        const newProducts = productsHelper.priceNewProducts(products); // giá mới sản phẩm
        
        res.render("client/pages/products/index", {
            pageTitle: category.title,
            products: newProducts
        });
    }
    catch{
        res.redirect("back");
    }
}

// [GET]/ products /detail / :slugProduct

module.exports.detail = async (req, res) => {
    try {

        const slug = req.params.slugProduct; // Lấy ra slug sản phẩm

        const product = await Product.findOne({
            slug: slug,
            deleted: false,
            status: "active"
        });
        // Lấy ra danh mục sản phẩm
        if(product.product_category_id) {
            const category = await ProductCategory.findOne({
                _id: product.product_category_id,
                deleted: false,
                status: "active"
            });
            // Thêm mới 1 category vào product
            product.category = category ;
        } 
        // giá mới 1 sản phẩm
        product.priceNew = productsHelper.priceNewProduct(product);


        res.render("client/pages/products/detail", {
            pageTitle: "Chi tiết sản phẩm",
            product: product
        });
    } catch (error) {
        res.redirect("/");
    }
}