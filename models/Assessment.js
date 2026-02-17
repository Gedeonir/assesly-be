const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["mcq", "short"],
    required: true,
  },
  question: String,
  options: [String],
  correctAnswer: String,
  marks: Number,
});

const assessmentSchema = new mongoose.Schema(
  {
    title: String,
    subject: String,
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    class: String,
    totalMarks: Number,
    duration: Number,
    questions: [questionSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Assessment", assessmentSchema);
