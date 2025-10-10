const VehicleModel = require("../models/cabVehicle");
const CabType = require("../models/cabType");

// Add vehicle under cab type using cabType NAME
exports.addCabVehicle = async (req, res) => {
  try {
    const { cabTypeName, modelName, capacity, pricePerKm } = req.body;

    if (!cabTypeName || !modelName || !capacity || !pricePerKm) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Verify cabType exists
    const cabType = await CabType.findOne({ name: cabTypeName });
    if (!cabType) {
      return res.status(404).json({ message: "Cab type not found" });
    }

    // Handle image upload (if any)
    const image = req.file ? req.file.filename : null;

    const newVehicle = new VehicleModel({
      cabTypeName,
      modelName,
      capacity,
      pricePerKm,
      image,
    });

    await newVehicle.save();
    res.status(201).json(newVehicle);
  } catch (error) {
    console.error("Add vehicle error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all vehicles
exports.getCabVehicles = async (req, res) => {
  try {
    const vehicles = await VehicleModel.find();
    res.status(200).json(vehicles);
  } catch (error) {
    console.error("Get vehicles error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a vehicle
exports.updateCabVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const { cabTypeName, modelName, capacity, pricePerKm } = req.body;
    const image = req.file ? req.file.filename : null;
    const updateData = { cabTypeName, modelName, capacity, pricePerKm };
    if (image) updateData.image = image;
    
    const vehicle = await VehicleModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.status(200).json(vehicle);
  } catch (error) {
    console.error("Update vehicle error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a vehicle
exports.deleteCabVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = await VehicleModel.findByIdAndDelete(id);

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.status(200).json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    console.error("Delete vehicle error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
