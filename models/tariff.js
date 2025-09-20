const mongoose = require("mongoose");

const tariffSchema = new mongoose.Schema(
  {
    cabType: {
      type: String,
      required: true,
      trim: true, // Example: Sedan, SUV, Mini
    },
    seats: {
      type: Number,
      required: true,
      min: 1,
    },
    rate: {
      type: Number,
      required: true, // base rate for allowed kilometers
    },
    allowedKm: {
      type: Number,
      required: true, // e.g., 80 KM
    },
    extraKmRate: {
      type: Number,
      required: true, // rate per KM beyond allowedKm
    },
    details: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tariff", tariffSchema);
