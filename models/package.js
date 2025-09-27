// models/Package.js
const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  duration: { type: String },
  price: { type: Number, required: true },
  cabtype: { type: String, required: true },
  city: { type: String, required: true },
  destination: { type: String, required: true },
  month: { type: String, required: true },
  image: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model("Package", packageSchema);
