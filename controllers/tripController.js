const Trip = require("../models/trip");
const { sendTripEmail } = require("./nodemailerController"); // your existing Nodemailer file


// Create a new trip booking (no login required)
exports.createTrip = async (req, res) => {
  try {
    const tripData = { ...req.body };

    if (req.userId) {
      tripData.user = req.userId;
    }

    // Save trip to database
    const trip = new Trip(tripData);
    const savedTrip = await trip.save();

    // Send email to admin after successful save
    await sendTripEmail(savedTrip);

    console.log("✅ Trip booking created successfully:", savedTrip);
    res.status(201).json({
      success: true,
      message: "Trip booking created successfully!",
      data: savedTrip,
    });
  } catch (err) {
    console.error("❌ Error creating trip booking:", err);
    res.status(400).json({
      success: false,
      message: "Error creating trip booking",
      error: err.message,
    });
  }
};


exports.getTrips = async (req, res) => {
  try {
    const trips = await Trip.find()
      .populate("packageId", "name description duration price image")
      .sort({ date: 1 });

    console.log("Trips fetched");
    res.json({
      success: true,
      data: trips,
    });
  } catch (err) {
    console.error("Error fetching trips:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching trips",
      error: err.message,
    });
  }
};



// Get trip by ID
exports.getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id).populate(
      "packageId",
      "name description duration price image"
    );

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    res.json({
      success: true,
      data: trip,
    });
  } catch (err) {
    console.error("Error fetching trip:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching trip",
      error: err.message,
    });
  }
};


// Update trip status
exports.updateTripStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["pending", "confirmed", "cancelled", "completed"].includes(status)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid status. Must be one of: pending, confirmed, cancelled, completed",
      });
    }

    const trip = await Trip.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("packageId", "name description duration price image");

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    console.log("Trip status updated successfully:", trip);
    res.json({
      success: true,
      message: "Trip status updated successfully",
      data: trip,
    });
  } catch (err) {
    console.error("Error updating trip status:", err);
    res.status(400).json({
      success: false,
      message: "Error updating trip status",
      error: err.message,
    });
  }
};

// Update trip details
exports.updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("packageId", "name description duration price image");

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    console.log("Trip updated successfully:", trip);
    res.json({
      success: true,
      message: "Trip updated successfully",
      data: trip,
    });
  } catch (err) {
    console.error("Error updating trip:", err);
    res.status(400).json({
      success: false,
      message: "Error updating trip",
      error: err.message,
    });
  }
};

// Delete trip
exports.deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findByIdAndDelete(req.params.id);

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    console.log("Trip deleted successfully:", trip);
    res.json({
      success: true,
      message: "Trip deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting trip:", err);
    res.status(500).json({
      success: false,
      message: "Error deleting trip",
      error: err.message,
    });
  }
};

// Get trips by status
exports.getTripsByStatus = async (req, res) => {
  try {
    const { status } = req.params;

    if (!["pending", "confirmed", "cancelled", "completed"].includes(status)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid status. Must be one of: pending, confirmed, cancelled, completed",
      });
    }

    const trips = await Trip.find({ status }).populate(
      "packageId",
      "name description duration price image"
    );

    res.json({
      success: true,
      data: trips,
    });
  } catch (err) {
    console.error("Error fetching trips by status:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching trips by status",
      error: err.message,
    });
  }
};
