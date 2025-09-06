// controllers/vehicleController.js
const Vehicle = require("../models/vehicle.js");

const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find().populate("driver");
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addVehicle = async (req, res) => {
  try {
    const newVehicle = new Vehicle(req.body);
    const saved = await newVehicle.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ New: update only provided fields (e.g., status = "approved")
const updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },   // only update given fields
      {
        new: true,          // return updated doc
        runValidators: true // validate updates
      }
    );

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.json(vehicle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getVehicles, addVehicle, updateVehicle };
