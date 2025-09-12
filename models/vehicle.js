const mongoose = require("mongoose")

const vehicleSchema = new mongoose.Schema({
  model: { type: String, required: true },
  number: { type: String, required: true, unique: true }, // registration number
  type: { type: String, required: true },
  capacity: { type: Number, required: true },
  contactNumber: { type: String, required: true },
  imageUrl: { type: String },
  driver: { type: mongoose.Schema.Types.ObjectId, ref: "Driver" },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, { timestamps: true })

module.exports = mongoose.model("Vehicle", vehicleSchema)
