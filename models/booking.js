const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },
    pickup: { type: String, required: true },
    drop: { type: String, required: true },
    date: { type: String, required: true },
    returnDate: { type: String },
    time: { type: String, required: true },
    passengerCount: { type: Number, required: true },
    tripType: {
      type: String,
      enum: ["oneway", "round", "local", "airport"],
      required: true,
    },
    airportTripType: {
      type: String,
      enum: ["pickup", "drop"], // optional
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

  },
  { timestamps: true }
);


module.exports = mongoose.model("Booking", bookingSchema);
