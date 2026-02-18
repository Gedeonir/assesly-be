const express = require("express");
const router = express.Router();
const { createAssessment, getAssessments, getAssessment, updateAssessment } = require("../controllers/assesmentController");
const {protect} = require("../middlewares/authenticationMiddleware");
const {authorizeRoles} = require("../middlewares/roleMiddleware");

router.use(protect);
router.use(authorizeRoles("teacher"));

router.post("/", createAssessment);
router.get("/", getAssessments);
router.get("/:id", getAssessment);
router.put("/:id", updateAssessment);

module.exports = router;
