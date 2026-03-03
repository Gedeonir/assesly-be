const express = require("express");
const router = express.Router();
const { getProfile, updateProfile, getAllStudents, assignStudentToClass, checkIfStudentIsAssignedClass } = require("../controllers/performanceController");
const {protect} = require("../middlewares/authenticationMiddleware");
const {authorizeRoles} = require("../middlewares/roleMiddleware");

router.use(protect);
router.use(authorizeRoles("teacher"));

router.get("/profile", getProfile);
router.put("/profile", updateProfile);
router.get("/students",getAllStudents);
router.patch("/students/:userid",assignStudentToClass);
router.get("students/is/enrolled/:userid",checkIfStudentIsAssignedClass)

module.exports = router;
