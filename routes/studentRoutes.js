const express = require("express");
const router = express.Router();
const { getProfile, updateProfile, getAssessments, submitAssessment, getResults } = require("../controllers/performanceController");
const {protect} = require("../middlewares/authenticationMiddleware");
const {authorizeRoles} = require("../middlewares/roleMiddleware");

router.use(protect);
router.use(authorizeRoles("student"));


router.put("/profile", updateProfile);

router.get("/assessments", getAssessments);
router.post("/assessments/:id/submit", submitAssessment);

router.get("/results", getResults);

module.exports = router;
