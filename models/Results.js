const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assessment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assessment",
      required: true,
    },
    score: Number,
    percentage: Number,
    grade: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Result", resultSchema);
