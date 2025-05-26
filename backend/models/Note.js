const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
    // user + title + content + color + pinned + tags // 
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "#ffffff",
    },
    pinned: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
