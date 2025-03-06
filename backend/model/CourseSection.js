const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseSectionSchema = new mongoose.Schema(
  {
    sectionName: { type: String, required: true },

    sectionsCompleted: [
      {
        section: { type: Schema.Types.ObjectId, ref: "CourseSection" },
        completed: Boolean,
      },
    ],

    estimatedTime: Number,
    isCompleted: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref:'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CourseSection", courseSectionSchema);
