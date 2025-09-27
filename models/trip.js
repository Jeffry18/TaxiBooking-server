// models/trip.js
const e = require("express");
const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  // Customer Information
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },

  // Trip Details
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  passengers: {
    type: Number,
    required: true,
    min: 1,
    max: 8
  },



  // Package Information
  packageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Package",
    required: true
  },
  packageName: {
    type: String,
    required: true
  },
  packagePrice: {
    type: Number,
    required: true
  },

  // Additional Information
  specialRequests: {
    type: String,
    trim: true
  },

  // Booking Status
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
tripSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Trip", tripSchema);

