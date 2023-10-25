const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/auth.controller");
const validate = require("../../validates/client/user.validate");
const authMiddleware = require("../../middlewares/client/auth.middlewares");
const userMiddleware = require("../../middlewares/client/user.middlewares");


router.get("/login",controller.login);
router.post("/login",controller.loginPatch);

router.get("/logout",controller.signup);
router.post("/logout",controller.signupPost);

router.get("/signout",controller.logout);

router.get("/password/forgot",controller.forgotPassword);

router.post(
    "/password/forgot",
    validate.forgotPasswordPost,
    controller.forgotPasswordPost
);

router.get("/password/otp", controller.otpPassword);

router.post("/password/otp", controller.otpPasswordPost);

router.get("/password/reset",controller.resetPassword);

router.post(
    "/password/reset",
    validate.resetPasswordPost,
    controller.resetPasswordPost,
)

router.get("/info", userMiddleware.requireAuth, controller.info);

module.exports = router;