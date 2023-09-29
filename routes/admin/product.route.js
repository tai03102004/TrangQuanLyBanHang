const express = require("express");

const multer = require("multer");
const router = express.Router();

const storageMulterHelper = require("../../helper/storageMulter");
const storage = storageMulterHelper();

const upload = multer({ storage: storage });


const controller = require("../../controllers/admin/product.controller");

router.get("/", controller.index);
router.patch("/change-status/:status/:id", controller.changeStatus); // Cập nhật trạng thái active or inactive
// :id  lấy id từ changeStatus (phần từ động) tương tự status
router.patch("/change-multi", controller.changeMulti);
router.delete("/delete/:id", controller.deleteItem);

router.get("/create", controller.create);

router.post("/create", controller.createPost);

router.post("/create", upload.single("thumbnail"), controller.createPost);


module.exports = router;