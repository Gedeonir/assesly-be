const Result = require("../models/Results");
const Assessment = require("../models/Assessment");
const User = require("../models/User");
const Student = require("../models/Student");

function generateStudentNumber() {
  const prefix = "ST"; // Optional prefix
  const year = new Date().getFullYear(); // e.g., 2026
  const randomDigits = Math.floor(1000 + Math.random() * 9000); // 4 random digits
  return `${prefix}${year}${randomDigits}`;
}

// Get student profile
exports.getProfile = async (req, res) => {
  res.json(req.user);
};

// Update student profile
exports.updateProfile = async (req, res) => {
  const updates = req.body;
  const user = await User.findByIdAndUpdate(req.user._id, updates, {
    new: true,
  });
  res.json(user);
};

// Get all assessments for student
exports.getAssessments = async (req, res) => {
  const assessments = await Assessment.find({ className: req.user.className });
  res.json(assessments);
};

// Submit assessment
exports.submitAssessment = async (req, res) => {
  const { answers } = req.body;

  const assessment = await Assessment.findById(req.params.id);
  if (!assessment)
    return res.status(404).json({ message: "Assessment not found" });

  let score = 0;
  assessment.questions.forEach((q) => {
    if (answers[q._id] === q.correctAnswer) score += q.marks;
  });

  const result = await Result.create({
    assessment: assessment._id,
    student: req.user._id,
    answers,
    score,
    total: assessment.questions.reduce((sum, q) => sum + q.marks, 0),
  });

  res.json(result);
};

// Get student results
exports.getResults = async (req, res) => {
  const results = await Result.find({ student: req.user._id }).populate(
    "assessment",
  );
  res.json(results);
};

exports.getAllStudents = async (req, res) => {
  const students = await User.find({ role: "student" })
  .populate({
    path: "studentData",
    populate: {
      path: "className",
      select: "name",
    },
  })
  .select("name email role");
  res.json({
    students,
  });
};

exports.checkIfStudentIsAssignedClass = async (req, res) => {
  const userId = req.params.userid;
  const studentEnrolled = await Student.find({ user: userId })
    .populate("className")
    .populate("user");
  res.json({
    status:true,
    studentEnrolled,
  });
};

exports.assignStudentToClass = async (req, res) => {
  const userID = req.params.userid;
  const { className } = req.body;
  try {
    const studentExist = await Student.findOne({ user: userID });
    if (!studentExist) {
      const enrollmentNumber = generateStudentNumber();
      const newStudent = await Student.create({
        user: userID,
        className,
        enrollmentNumber,
      });

      return res.json({ message: "Class assigned successfully" });
    }

    studentExist.className = className;

    await studentExist.save();
    return res.json({ message: "Class assigned successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
