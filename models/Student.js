const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    className: {
      type: String,
      required: true,
    },
    enrollmentNumber: {
      type: String,
      required: true,
    },
    attendancePercentage: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
