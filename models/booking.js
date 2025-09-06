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
    time: { type: String, required: true },
    passengerCount: { type: Number, required: true }, // Add this field
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
