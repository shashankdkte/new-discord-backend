const express = require("express");
const authController = require("./../controllers/auth/authController")
const router = express.Router();

router.post("/register",authController.controllers.postRegister)
router.post("/login",authController.controllers.postLogin)


module.exports = router;