const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: false,
      index: true,
    },

    model: { type: String, required: true },
    number: { type: String, required: true, unique: true }, // registration number
    type: { type: String, required: true },
    capacity: { type: Number, required: true },
    contactNumber: { type: String, required: true },
    imageUrl: { type: String }, // Main image (for backward compatibility)
    images: [{ type: String }], // Array of image filenames
    driver: { type: mongoose.Schema.Types.ObjectId, ref: "Driver" },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vehicle", vehicleSchema);
