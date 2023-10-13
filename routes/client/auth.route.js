const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/auth.controller");

router.get("/login",controller.login);
router.post("/login",controller.loginPatch);

router.get("/logout",controller.signup);
router.post("/logout",controller.signupPost);

router.get("/signout",controller.logout);

module.exports = router;