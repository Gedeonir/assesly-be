const Assessment = require("../models/Assessment");

// Create a new assessment
exports.createAssessment = async (req, res) => {
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
    const assessments = await Assessment.find({ teacher: req.user._id });
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
