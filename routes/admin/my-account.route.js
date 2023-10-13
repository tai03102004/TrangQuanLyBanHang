const express = require("express");
const multer = require("multer");

const router = express.Router();

const upload = multer();

const controller = require("../../controllers/admin/my-account.controller.js");

const uploadCloud = require("../../middlewares/admin/uploadCloud.middlewares");


router.get("/",controller.index);

router.get("/edit",controller.edit);

router.patch(
    "/edit",
    upload.single("avatar"),
    uploadCloud.upload,
    controller.editPatch
);


module.exports = router;