const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

// GET all bookings
router.get("/", bookingController.getBookings);

// POST new booking
router.post("/", bookingController.addBooking);

// PATCH update booking
router.patch("/:id", bookingController.updateBooking);

// DELETE booking
router.delete("/:id", bookingController.deleteBooking);

module.exports = router;
