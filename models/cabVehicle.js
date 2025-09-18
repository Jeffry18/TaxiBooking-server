// models/vehicleModel.js
const mongoose = require("mongoose");

const cabVehicle = new mongoose.Schema({
  cabTypeName: { type: String, required: true },
  modelName: { type: String, required: true }, // e.g., Innova, Dzire
  capacity: { type: Number, required: true },  // seating capacity
  pricePerKm: { type: Number, required: true }, // pricing
  image: { type: String },
});

module.exports = mongoose.model("cabVehicle", cabVehicle);
