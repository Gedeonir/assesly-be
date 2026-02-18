const express = require("express");
const router = express.Router();
const { getProfile, updateProfile } = require("../controllers/performanceController");
const {protect} = require("../middlewares/authenticationMiddleware");
const {authorizeRoles} = require("../middlewares/roleMiddleware");

router.use(protect);
router.use(authorizeRoles("teacher"));

router.get("/profile", getProfile);
router.put("/profile", updateProfile);

module.exports = router;
