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
const jwtMiddleware = require("../middlewares/jwtMiddleware");


// Create a new trip booking
router.post("/",jwtMiddleware, createTrip);

// Get all trip bookings
router.get("/", jwtMiddleware, getTrips);

// Get trips by status
router.get("/status/:status", jwtMiddleware, getTripsByStatus);

// Get trip by ID
router.get("/:id", jwtMiddleware, getTripById);

// Update trip status
router.patch("/:id/status", jwtMiddleware, updateTripStatus);

// Update trip details
router.put("/:id", jwtMiddleware, updateTrip);

// Delete trip
router.delete("/:id", jwtMiddleware, deleteTrip);

module.exports = router;
