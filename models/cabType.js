const mongoose = require("mongoose");

const cabTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  seats: { type: String},
  image: { type: String }, // store filename or URL
}, { timestamps: true });

module.exports = mongoose.model("CabType", cabTypeSchema);
