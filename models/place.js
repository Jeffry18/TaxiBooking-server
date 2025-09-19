const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  city: String,
  name: String,
  description: String,
  rate: Number,
  image: String
});

module.exports = mongoose.model("Place", placeSchema);
