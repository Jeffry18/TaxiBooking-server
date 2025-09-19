const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  state: String,
  name: String,
  description : String,
  image: String,
  
});

module.exports = mongoose.model("City", citySchema);
