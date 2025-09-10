const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const jwtMiddleware = require("../middlewares/jwtMiddleware");

// GET all bookings
router.get("/", bookingController.getBookings);

// 🔹 GET recent bookings of logged-in user
router.get("/recent", jwtMiddleware, bookingController.getRecentBookings);

// POST new booking
router.post("/", bookingController.addBooking);

// PATCH update booking
router.patch("/:id", bookingController.updateBooking);

// DELETE booking
router.delete("/:id", bookingController.deleteBooking);

module.exports = router;
