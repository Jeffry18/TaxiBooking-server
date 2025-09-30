const Booking = require("../models/booking");
const User = require("../models/userModel");
const { sendWhatsAppMessage } = require("../controllers/whatsappController");

// Get bookings
exports.getBookings = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    let query = {};
    if (req.role !== "admin") {
      // Normal users only see their own bookings
      query.user = req.userId;
    }

    const bookings = await Booking.find(query).populate("cabType");
    res.json(bookings);
  } catch (err) {
    console.error("Error in getBookings:", err);
    res.status(500).json({ message: err.message });
  }
};

// Add a new booking
exports.addBooking = async (req, res) => {
  try {
    const {
      cabType,
      pickup,
      drop,
      date,
      returnDate,
      time,
      passengerCount,
      extraStops,
      phoneNumber,
    } = req.body;

    // Basic required fields
    const requiredFields = [
      "pickup",
      "drop",
      "date",
      "time",
      "passengerCount",
      "phoneNumber",
    ];
    // cabType is now required
    if (!cabType) {
      requiredFields.push("cabType");
    }
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    // ✅ userId comes from middleware
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized - no userId" });
    }
    console.log("reached here");

    console.log("req.userid", req.user);

    // ✅ fetch user details
    const user = await User.findById(userId).select("username");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newBooking = new Booking({
      username: user.username,
      cabType,
      pickup,
      drop,
      date,
      returnDate,
      time,
      phoneNumber,
      passengerCount: parseInt(passengerCount),
      // tripType,
      //airportTripType: tripType === "airport" ? airportTripType : null,
      extraStops: extraStops || [],
      user: userId,
    });

    console.log("New Booking:", newBooking);

    const savedBooking = await newBooking.save();

    // 🔹 Populate cabType so we can access its name
    const populatedBooking = await Booking.findById(savedBooking._id).populate(
      "cabType"
    );

    // 🔹 Send WhatsApp notification to admin automatically
    sendWhatsAppMessage({
      username: populatedBooking.username,
      pickup: populatedBooking.pickup,
      drop: populatedBooking.drop,
      cabType: populatedBooking.cabType?.name || "N/A",
      passengerCount: populatedBooking.passengerCount,
      date: populatedBooking.date,
      time: populatedBooking.time,
      extraStops: populatedBooking.extraStops || [],
      phoneNumber: populatedBooking.phoneNumber,
    });

    console.log("done");

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

// 🔹 Get 5 most recent bookings for logged-in user
exports.getRecentBookings = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const bookings = await Booking.find({ user: userId })
      .populate("cabType")
      .sort({ createdAt: -1 })
      .limit(5);

    // format response
    const formatted = bookings.map((b) => ({
      _id: b._id,
      pickup: b.pickup,
      drop: b.drop,
      date: b.date,
      returnDate: b.returnDate,
      time: b.time,
      passengerCount: b.passengerCount,
      status: b.status,
      vehicleName: b.cabType?.name || "",
      vehicleType: "Cab Type",
    }));

    res.json(formatted);
  } catch (error) {
    console.error("Error fetching recent bookings:", error);
    res.status(500).json({ message: "Server error" });
  }
};
