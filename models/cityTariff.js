const mongoose = require("mongoose");

const cityTariffSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
    trim: true,
  },
  cabType: {
    type: String,
    required: true, // e.g. Sedan, SUV
  },
  seats: {
    type: Number,
    required: true,
  },
  ratePerDay: {
    type: Number,
    required: true,
  },
  allowedKm: {
    type: Number,
    required: true,
  },
  extraKmRate: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("CityTariff", cityTariffSchema);
