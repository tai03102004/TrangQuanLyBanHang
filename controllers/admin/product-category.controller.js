// thông tin của giao diện
const ProductCategory = require("../../models/product-category.model");
// ẩn thông tin
const systemConfig = require("../../config/system");
// 
const createTree = require("../../helper/createTree");

// [GET] /admin/products-category
// trang chính
module.exports.index = async (req, res) => {
    // bản ghi chưa xoá
    let find = {
        deleted: false,
    }
// lấy ra danh sách bản ghi
const records = await ProductCategory.find(find);

// lấy ra thằng cha của bản ghi
const newRecords = createTree(records);

res.render("admin/pages/products-category/index", {
        pageTitle: "Danh mục sản phẩm",
        records: newRecords
    });
}

// [GET] /admin/products-category/create 
// Tạo sản phẩm
module.exports.create = async (req, res) => {
    let find = {
        deleted: false
    }

    const records = await ProductCategory.find(find);

    const newRecords = createTree(records);

    res.render("admin/pages/products-category/create", {
        pageTitle: "Tạo Danh mục sản phẩm",
        records: newRecords
    });
}

// [POST] /admin/products-category/create
module.exports.createPost = async (req, res) => {
    // tăng position nếu ko điền
    if(req.body.position === "") {
        const countRecords = await ProductCategory.countDocuments();
        req.body.position = countRecords + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }
    // req.body : thông tin thêm mới
    const record = new ProductCategory(req.body);
    await record.save(); // lưu vào model
    // link sang trang product-category sau khi đã sửa
    res.redirect(`/${systemConfig.prefixAdmin}/products-category`);
};

// [GET] /admin/products-category/edit/:id
// sửa sản phẩm
module.exports.edit = async (req, res) => {
    const id = req.params.id; // id sản phẩm

    const data = await ProductCategory.findOne({
        _id: id,
        deleted: false
    });// thông tin của ProductCategory

    const records = await ProductCategory.find({
        deleted: false
    });

    const newRecords = createTree(records); // in ra cả cha và con

    res.render("admin/pages/products-category/edit", {
        pageTitle: "Chỉnh sửa Danh mục sản phẩm",
        data: data,
        records: newRecords
    });
}

  // [PATCH] /admin/products-category/edit/:id
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;

    req.body.position = parseInt(req.body.position);

    await ProductCategory.updateOne({ _id: id }, req.body);
    // sửa cái id và body sản phẩm

    res.redirect("back");
}

// [GET] /admin/products-category/detail/:id
// Xem chi tiet
module.exports.detail = async(req,res) =>{
    const id = req.params.id;
    const product = await ProductCategory.findOne({
        _id : id,
        deleted: false
    })
    res.render("admin/pages/products-category/detail",{
        pageTitle : "Chi tiết sản phẩm",
        product: product,
    })
}

// [GET] /admin/products-category/delete/:id

module.exports.deleteItem = async(req, res) => {
    const id = req.params.id; // Lấy ra id
    await ProductCategory.updateOne({ _id: id }, {
        deleted: true, // để ẩn
        deletedAt: new Date() // time delete
    });
    req.flash("success", `Xóa thành công sản phẩm!`);

    res.redirect("back");
}