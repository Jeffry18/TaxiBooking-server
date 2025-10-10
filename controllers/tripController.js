const Trip = require("../models/trip");

// Create a new trip booking
exports.createTrip = async (req, res) => {
  try {
    // Ensure userId from JWT is added
    const tripData = {...req.body}
    if (req.userId) {
      tripData.user = req.userId;
    }
    

    const trip = new Trip(tripData);
    const savedTrip = await trip.save();

    console.log("Trip booking created successfully:", savedTrip);
    res.status(201).json({
      success: true,
      message: "Trip booking created successfully!",
      data: savedTrip,
    });
  } catch (err) {
    console.error("Error creating trip booking:", err);
    res.status(400).json({
      success: false,
      message: "Error creating trip booking",
      error: err.message,
    });
  }
};

exports.getTrips = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const query = req.role === "admin" ? {} : { user: req.userId }; // ✅ use 'user'
    const trips = await Trip.find(query)
      .populate("packageId", "name description duration price image")
      .sort({ date: 1 }); // optional: upcoming trips first
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
    if (!req.userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    let query = { _id: req.params.id };
    if (req.role !== "admin") {
      query.userId = req.userId;
    }

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
