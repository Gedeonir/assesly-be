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
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    class: {type:mongoose.Schema.Types.ObjectId, ref: "Class"},
    totalMarks: Number,
    duration: Number,
    startDateTime: Date,
    endDateTime: Date,
    questions: [questionSchema],
    doneBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Assessment", assessmentSchema);
