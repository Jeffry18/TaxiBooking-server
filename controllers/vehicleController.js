// controllers/vehicleController.js
const Vehicle = require("../models/vehicle.js");
const path = require("path");
const fs = require("fs");

const getVehicles = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    let query = {};
    if (req.role !== "admin") {
      query.user = req.userId;
    }

    const vehicles = await Vehicle.find(query)
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getVehicleById = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    let query = { _id: req.params.id };
    if (req.role !== "admin") {
      query.user = req.userId;
    }
    const vehicle = await Vehicle.findById(req.params.id).populate("driver");
    if (!vehicle) return res.status(404).json({ error: "Vehicle not found" });
    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addVehicle = async (req, res) => {
  try {
    // Handle file upload - multer adds file info to req.file
    const vehicleData = { ...req.body };
    if (req.userId) {
      vehicleData.user = req.userId;
    }
    if (req.file) {
      vehicleData.imageUrl = req.file.filename; // Store just the filename
      console.log('File uploaded successfully, filename:', req.file.filename);
    } else {
      console.log('No file uploaded');
    }
    
    const newVehicle = new Vehicle(vehicleData);
    const saved = await newVehicle.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error('Error creating vehicle:', error);
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

const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    // If vehicle has an image, delete it from uploads
    if (vehicle.imageUrl) {
      const imagePath = path.join(__dirname, "..", "uploads", vehicle.imageUrl);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Error deleting vehicle image:", err.message);
        }
      });
    }

    res.json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    console.error("Delete vehicle error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getVehicles, getVehicleById, addVehicle, updateVehicle, deleteVehicle };
