const mongoose = require("mongoose");

const ClickSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      index: true
    },
    ipAddress: String,
    userAgent: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Click", ClickSchema);
