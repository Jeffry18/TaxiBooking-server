// models/Package.js
const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  duration: { type: String },
  price: { type: Number, required: true },
  image: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model("Package", packageSchema);
