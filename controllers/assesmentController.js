const Assessment = require("../models/Assessment");

// Create a new assessment
exports.createAssessment = async (req, res) => {
  if (!req.body.title || !req.body.class || !req.body.totalMarks || !req.body.duration) {
    return res.status(400).json({ message: "Title, class, total marks, and duration are required" });
  }

  if(!req.body.questions || req.body.questions.length === 0) {
    return res.status(400).json({ message: "Assessment must have at least one question" });
  }

  try {
    const assessment = await Assessment.create({
      ...req.body,
      teacher: req.user._id,
    });
    res.status(201).json(assessment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all assessments (for teacher)
exports.getAssessments = async (req, res) => {
  try {
    const assessments = await Assessment.find({ teacher: req.user._id }).populate("class");
    res.json(assessments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single assessment by ID
exports.getAssessment = async (req, res) => {
  try {
    const assessment = await Assessment.findById(req.params.id);
    if (!assessment) return res.status(404).json({ message: "Assessment not found" });
    res.json(assessment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update assessment
exports.updateAssessment = async (req, res) => {
  try {
    const assessment = await Assessment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!assessment) return res.status(404).json({ message: "Assessment not found" });
    res.json(assessment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
