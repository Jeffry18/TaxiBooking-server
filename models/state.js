const mongoose = require("mongoose");

const TouristPlaceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  rate: { type: Number },
  image: { type: String }, // store filename from multer
});

const CitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  places: [TouristPlaceSchema], // nested tourist places
});

const StateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  cities: [CitySchema], // nested cities
});

module.exports = mongoose.model("State", StateSchema);
