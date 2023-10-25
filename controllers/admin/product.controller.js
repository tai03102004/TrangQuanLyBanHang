const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helper/filterStatus.js");
const searchHelper = require("../../helper/search");
const paginationHelper = require("../../helper/pagination");
const systemConfig = require("../../config/system");

// trang danh sách sản phẩm bên admin trả về client
const ProductCategory = require("../../models/product-category.model");

// trả về thành phần cha-con
const createTree = require("../../helper/createTree");


const Account = require("../../models/account.model");


// [GET] /admin/products
module.exports.index = async (req, res) => {
    try{
        let find = {
            deleted: false // chỉ nhận các kiểu deleted là false ;
        };
        // Cập nhật trạng thái sản phẩm
    
         // Lọc sản phẩm // Helper/filterStatus.js
    
        const filterStatus = filterStatusHelper(req.query);
        if(req.query.status) { 
            // tự động thêm find {
            //     status : active or inactive
            // }
            find.status = req.query.status; // các file trong status sẽ lấy ra trạng thái tương ứng 
        }
    
        // Kết thúc lọc
    
        // Tìm kiếm sản phẩm
        let objectSearch = searchHelper(req.query);
        if (req.query.keyword){
            find.title = objectSearch.regex;
        }
        // Kết thúc tìm kiếm sản phẩm
    
        // Pagination
        let initPagination = {
            currentPage: 1, // Trang bắt đầu
            limitItems: 4  // Giới hạn 1 trang
        };
        const countProducts = await Product.count(find);  // Tổng số sản phẩm (deleted: false)
        const objectPagination = paginationHelper(initPagination, req.query, countProducts);
        // End Pagination

        // sort
        let sort = {};

        if(req.query.sortKey && req.query.sortValue ){
            sort[req.query.sortKey] = req.query.sortValue;
        }
        else {
            sort.position = "desc";
        }

        // End sort

        const products = await Product.find(find)
            .sort( sort )  // sắp xếp cái position theo thứ tự giảm dần
            .limit(objectPagination.limitItems) // giới hạn sản phẩm 1 trang
            .skip(objectPagination.skip); // để bỏ qua sản phẩm
        
        // Lặp hết sản phẩm trong products => cập nhâkt id 
        // account_id đã cập nhập truùng với res.locals.user.id
        for (const Product of products){
            // Lấy ra tài khoản của sản phẩm 
            const userCreate = await Account.findOne({
                _id : Product.createBy.account_id 
            });

            if (userCreate){
                Product.createBy.accountFullName = userCreate.fullName; 
                // Thêm accountFullName để in ra tên và ngày đã cập nhật
            }
            // 
            // const userUpdatedId1 = Product.updateBy;

            // console.log(userUpdatedId1);

            const userUpdatedId = Product.updateBy.slice(-1)[0]; // Lấy ra phần tử cuối cùng và account_id 

            // console.log(userUpdatedId);
            if (userUpdatedId){
                // Tìm kiếm duy nhât id xong mình sẽ gán tên vào
                const userUpdated = await Account.findOne({
                    _id: userUpdatedId.account_id
                });
                if(userUpdated) {
                    // Thêm nguời đã sửa
                    userUpdatedId.accountFullName = userUpdated.fullName; 
                }
            }
        }
        


        if(products.length > 0 || countProducts == 0) {
            res.render("admin/pages/products/index", {
                pageTitle: "Danh sách sản phẩm",
                products: products,
                filterStatus: filterStatus,
                keyword: objectSearch.keyword,
                pagination: objectPagination
            });
    
        } else {
            let stringQuery = "";
            for(const key in req.query) {
                if(key != "page") {
                    stringQuery += `&${key}=${req.query[key]}`;
                }
            }
    
            const href = `${req.baseUrl}?page=1${stringQuery}`;
    
            res.redirect(href);
        }
    }
    catch (error) {
        res.redirect("back");
    }
}



    
// [PATCH] /admin/products/changeStatus/:status/:id

module.exports.changeStatus = async (req,res) => {
    const  status = req.params.status; // Lấy ra trang thái active or inactive
    const id = req.params.id; // lấy ra id
    const updateBy = {
        account_id : res.locals.user.id, // id người dùng
        updateAt: new Date() // ngày update
    }
    await Product.updateOne({_id: id} , {
        ...req.body, // Lấy ra hết phần tử req.body
        $push: {updateBy : updateBy}
    }); // update lại id và status
    // set chỉ cập nhật lại cái status chứ ko câph nhật id
    req.flash('success', 'Cập nhật trạng thái thành công');

    res.redirect('back');
}

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type; // status : active or inactive
    const ids = req.body.ids.split(", "); // ids lấy ra các mảng id 
    const updateBy = {
        account_id : res.locals.user.id,
        updateAt: new Date()
    }
    switch (type) {
        case "active":
        case "inactive":
            await Product.updateMany({ _id: {$in: ids} }, { status: type }); // đay là mảng nên update many
            req.flash("success", `Cập nhật trạng thái thành công ${ids.length} sản phẩm!`);

            break;
        case "delete-all":
            await Product.updateMany({ _id: {$in: ids} }, {
                deleted: true,
                deleteBy:{
                    account_id : res.locals.user.id,
                    deleteAt: new Date(),
                }
            });
            req.flash("success", `Xóa thành công ${ids.length} sản phẩm!`);

            break;
        case "change-position":
            for (const item of ids) { // lấy ra hết cái ids trong scriptProduct.js
                const [id, position] = item.split("-"); // tách id riêng và position riêng
                await Product.updateOne({_id: id} ,{position: position}, {
                    ...req.body, // Lấy ra hết phần tử req.body
                    $push: {updateBy : updateBy}
                }); // cập nhật id và position
            }
            req.flash("success", `Thay đổi vị trí thành công ${ids.length} sản phẩm!`);

            break;
        default:
            break;
    }

    res.redirect("back");
}

// [DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;

    await Product.updateOne(
        { _id: id }, 
        {
            deleted: true, // để ẩn
            deleteBy:{
                account_id : res.locals.user.id, // để kiểm tra có phải 1 người ko
                deleteAt: new Date(),
            }
        }
    );
    req.flash("success", `Xóa thành công sản phẩm!`);

    res.redirect("back");
}


// [GET] /admin/products/create
// tiêu đề của phần taọ mới sản phẩm
module.exports.create = async (req, res) => {
    const id = req.params.id;
    let find = {
        deleted: false
    }

    const records = await ProductCategory.find(find);

    const newRecords = createTree(records); // tạo ra cha - con

    // console.log(product);

    res.render("admin/pages/products/create", {
        pageTitle: "Tạo mới sản phẩm",
        records: newRecords
    });
};

  // [POST] /admin/products/create
module.exports.createPost = async (req, res) => {
    // Tất cả các thuộc tính trong trang phân quyền
    const permissions = res.locals.role.permissions;
    // console.log(permissions);

    if(permissions.includes("products_create")){
        req.body.price = parseInt(req.body.price);
        req.body.discountPercentage = parseInt(req.body.discountPercentage);
        req.body.stock = parseInt(req.body.stock);

        if(req.body.position === "") {
            const countProducts = await Product.countDocuments();
            req.body.position = countProducts + 1;
        } else {
            req.body.position = parseInt(req.body.position);
        }
        if(req.file && req.file.filename) {
            req.body.thumbnail = `/uploads/${req.file.filename}`;
        }
        
        req.body.createBy = {
            account_id: res.locals.user.id
        }

        const product = new Product(req.body);
        await product.save();
        res.redirect(`/${systemConfig.prefixAdmin}/products`);
    }
    else {
        res.status(403).send('Forbidden: You do not have access to this resource.');
    }

};

// [GET] /admin/products/edit

module.exports.edit = async (req, res) => {
    try{    
        const id = req.params.id;
    
        const product = await Product.findOne({
            _id: id,
            deleted: false
        })
        const records = await ProductCategory.find({
            deleted: false
        });
    
        const newRecords = createTree(records);


        res.render("admin/pages/products/edit", {
            pageTitle: "Tạo mới sản phẩm",
            product: product,
            records: newRecords
        });
    }
    catch(err){
        req.flash("error","Thông tin sản phẩm không tìm thấy");
        res.redirect(`/${systemConfig.prefixAdmin}/products`);
    }
};

// [PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);

    const updateBy = {
        account_id : res.locals.user.id,
        updateAt: new Date()
    }

    req.body.position = parseInt(req.body.position);
    // if(req.file && req.file.filename) {
    //     req.body.thumbnail = `/uploads/${req.file.filename}`;
    // }

    await Product.updateOne({_id: id} , {
        ...req.body, // Lấy ra hết phần tử req.body
        $push: {updateBy : updateBy}
    } );

    req.flash("success","Cập nhật sản phẩm thành công");

    res.redirect("back");
};

// [GET] /admin/products/detail/:id

module.exports.detail = async (req, res) => {

    try{
        const id = req.params.id;
    
        const product = await Product.findOne({
            _id: id,
            deleted: false
        })


        res.render("admin/pages/products/detail", {
            pageTitle: "Chi tiết sản phẩm",
            product: product
        });
    }
    catch(error){
        res.redirect(`/${systemConfig.prefixAdmin}/products`);
        req.flash("error",`Thông tin sản phẩm không tìm thấy`);
    }

};

