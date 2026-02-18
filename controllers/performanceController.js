const Result = require("../models/Results");
const Assessment = require("../models/Assessment");
const User = require("../models/User");

// Get student profile
exports.getProfile = async (req, res) => {
  res.json(req.user);
};

// Update student profile
exports.updateProfile = async (req, res) => {
  const updates = req.body;
  const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true });
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
  if (!assessment) return res.status(404).json({ message: "Assessment not found" });

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
  const results = await Result.find({ student: req.user._id }).populate("assessment");
  res.json(results);
};
