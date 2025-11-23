const express = require("express");
const { register, login, getUsers ,currentUser} = require("../controllers/userController");
const validateToken = require("../middleware/TokenHandler");
const router = express.Router();
const {adminDetails} = require("../controllers/adminDocsController");
const { forgotPassword, verifyOTP, resetPassword } = require("../controllers/forgotPassword");

router.post("/register",register).post("/login", login);
router.get("/registered", getUsers).get("/currentUser", validateToken, currentUser).get("/allCounts", adminDetails);
router.post("/forgotPass", forgotPassword).post("/verifyOtp", verifyOTP).post("/resetPass", resetPassword);

module.exports = router;