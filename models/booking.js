const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    username: { type: String, required: false },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: false,
    },
    cabType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CabType",
      required: true,
    },
    pickup: { type: String, required: true },
    drop: { type: String, required: true },
    date: { type: String, required: true },
    returnDate: { type: String },
    time: { type: String, required: true },
    passengerCount: { type: Number, required: true },
    phoneNumber: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    extraStops: [{ type: String }],

  },
  { timestamps: true }
);


module.exports = mongoose.model("Booking", bookingSchema);
