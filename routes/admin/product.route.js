const express = require("express");

const multer = require("multer");
const router = express.Router();

// const storageMulterHelper = require("../../helper/storageMulter");
// const storage = storageMulterHelper();

// upload()
const upload = multer();

const controller = require("../../controllers/admin/product.controller");

const validate = require("../../validates/admin/product.validate");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middlewares");

router.get("/", controller.index);
router.patch("/change-status/:status/:id", controller.changeStatus); // Cập nhật trạng thái active or inactive
// :id  lấy id từ changeStatus (phần từ động) tương tự status
router.patch("/change-multi", controller.changeMulti);
router.delete("/delete/:id", controller.deleteItem);

router.get("/create", controller.create);

router.post(
    "/create", 
    upload.single("thumbnail"), // upload ảnh
    uploadCloud.upload, // đưa ảnh lên cloudinary
    validate.createPost, // phù hợp với tiêu đề 
    controller.createPost
);
// sửa
router.get("/edit/:id",controller.edit);

router.patch(
    "/edit/:id", 
    upload.single("thumbnail"), 
    uploadCloud.upload,
    validate.createPost,
    controller.editPatch 
);
// chi tiết sản phẩm
router.get("/detail/:id",controller.detail);


module.exports = router;