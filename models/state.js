const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
});

module.exports = mongoose.model("State", stateSchema);
