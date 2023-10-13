const express = require('express');
const router = express.Router();

// Truy cập đến controler để đi ra view
const controller = require("../../controllers/client/home.controller");

router.get("/",controller.index);

module.exports = router;