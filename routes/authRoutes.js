const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

const { getProfile }=require("../controllers/performanceController");
const { protect } =require("../middlewares/authenticationMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);

module.exports = router;
