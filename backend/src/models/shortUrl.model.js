const mongoose = require("mongoose");

const ShortUrlSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    longUrl: {
      type: String,
      required: true,
      unique: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("ShortUrl", ShortUrlSchema);
