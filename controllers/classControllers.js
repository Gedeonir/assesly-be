const Class=require('../models/Class');

// Create a new class
exports.createClass = async (req, res) => {
  try {

    const classData = await Class.findOne({ className: req.body.className });
    if(classData){
      return res.status(400).json({ message: "Class already exists" });
    }

    const newClass = await Class.create({
        ...req.body,
    });
    res.status(201).json(newClass);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get all classes
exports.getClasses = async (req, res) => {
  try {
    const classes = await Class.find();
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single class by ID
exports.getClass = async (req, res) => {
  try {    const classData = await Class.findById(req.params.id);
    if (!classData) return res.status(404).json({ message: "Class not found" });
    res.json(classData);
  }
    catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update class
exports.updateClass = async (req, res) => {
  try {
    const classData = await Class.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    if (!classData) return res.status(404).json({ message: "Class not found" });
    res.json(classData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete class
exports.deleteClass = async (req, res) => {
  try {
    const classData = await Class.findByIdAndDelete(req.params.id);
    if (!classData) return res.status(404).json({ message: "Class not found" });
    res.json({ message: "Class deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};