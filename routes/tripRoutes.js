// routes/tripRoutes.js
const express = require("express");
const router = express.Router();
const {
  createTrip,
  getTrips,
  getTripById,
  updateTripStatus,
  updateTrip,
  deleteTrip,
  getTripsByStatus
} = require("../controllers/tripController");


// Create a new trip booking
router.post("/", createTrip);

// Get all trip bookings
router.get("/", getTrips);

// Get trips by status
router.get("/status/:status", getTripsByStatus);

// Get trip by ID
router.get("/:id", getTripById);

// Update trip status
router.patch("/:id/status", updateTripStatus);

// Update trip details
router.put("/:id", updateTrip);

// Delete trip
router.delete("/:id", deleteTrip);

module.exports = router;
