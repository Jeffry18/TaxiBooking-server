const Booking = require("../models/booking");

// Get all bookings
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("vehicle");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new booking
exports.addBooking = async (req, res) => {
  try {
    const { vehicle, pickup, drop, date, returnDate, time, passengerCount, tripType, airportTripType } = req.body;

    // Basic required fields
    const requiredFields = ["vehicle", "pickup", "drop", "date", "time", "passengerCount", "tripType"];
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    // Round trip requires returnDate
    if (tripType === "round" && !returnDate) {
      missingFields.push("returnDate");
    }

    // Airport trip requires airportTripType
    if (tripType === "airport" && !airportTripType) {
      missingFields.push("airportTripType");
    }

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    const newBooking = new Booking({
      vehicle,
      pickup,
      drop,
      date,
      returnDate: tripType === "round" ? returnDate : null,
      time,
      passengerCount: parseInt(passengerCount),
      tripType,
      airportTripType: tripType === "airport" ? airportTripType : null,
    });

    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    res.status(400).json({
      message: err.message || "Failed to create booking",
    });
  }
};


// Update booking status
exports.updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a booking
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json({ message: "Booking deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
