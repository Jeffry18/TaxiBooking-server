const express = require("express");
const router = express.Router();
const Vehicle = require("../models/vehicle");
const upload = require("../middlewares/multterMiddleware");

// GET all vehicles
router.get("/", async (req, res) => {
  try {
    const vehicles = await Vehicle.find().populate("driver");
    res.status(200).json(vehicles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// POST new vehicle with image
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const vehicleData = {
      ...req.body,
      imageUrl: req.file ? req.file.filename : null,
    };

    const vehicle = new Vehicle(vehicleData);
    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// Add PATCH route for updating vehicle status
router.patch("/:id", async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.status(200).json(vehicle);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
