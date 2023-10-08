const express = require("express");
const multer = require("multer");
const router = express.Router();

// upload
const upload = multer();

// đi vào controller trang quản lý sản phẩm
const controller = require("../../controllers/admin/product-category.controller");

// upload ảnh vào cloudinary
const uploadCloud = require("../../middlewares/admin/uploadCloud.middlewares");

// trang chính
router.get("/", controller.index);

// trang thêm mới
router.get("/create", controller.create);

// thêm mới
router.post(
    "/create",
    upload.single("thumbnail"), // upload ảnh
    uploadCloud.upload, // text kiểu word  
    controller.createPost // đi vào thêm mới
);


router.get("/edit/:id", controller.edit); // đi vào chình sửa

// chỉnh sửa
router.patch(
    "/edit/:id",
    upload.single("thumbnail"),
    uploadCloud.upload,
    controller.editPatch
);

// detail : Xem chi tiet
router.get("/detail/:id", controller.detail);

// delete:
router.delete("/delete/:id", controller.deleteItem);

module.exports = router;

