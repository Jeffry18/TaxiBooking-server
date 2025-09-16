const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const jwtMiddleware = require("../middlewares/jwtMiddleware");

// GET all bookings
router.get("/",jwtMiddleware, bookingController.getBookings);

// 🔹 GET recent bookings of logged-in user
router.get("/recent", jwtMiddleware, bookingController.getRecentBookings);

// POST new booking
router.post("/",jwtMiddleware, bookingController.addBooking);

// PATCH update booking
router.patch("/:id",jwtMiddleware, bookingController.updateBooking);

// DELETE booking
router.delete("/:id",jwtMiddleware, bookingController.deleteBooking);

module.exports = router;
