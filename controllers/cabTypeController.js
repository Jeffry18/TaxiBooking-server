const CabType = require("../models/cabType");
const path = require("path");
const fs = require("fs");



// Get all cab types
const getCabTypes = async (req, res) => {
  try {
    const cabTypes = await CabType.find();
    res.json(cabTypes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching cab types", error: err.message });
  }
};

// Create cab type
const createCabType = async (req, res) => {
  try {
    const cabData = { ...req.body };


    if (req.file) {
      cabData.image = req.file.filename; // store uploaded image filename
    }

    const cabType = new CabType(cabData);
    await cabType.save();
    res.status(201).json(cabType);
  } catch (err) {
    res.status(400).json({ message: "Error creating cab type", error: err.message });
  }
};

// Update cab type
const updateCabType = async (req, res) => {
  try {
    const updated = await CabType.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: "Cab type not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Error updating cab type", error: err.message });
  }
};

// Delete cab type
const deleteCabType = async (req, res) => {
  try {
    const cabType = await CabType.findByIdAndDelete(req.params.id);

    if (!cabType) {
      return res.status(404).json({ message: "Cab type not found" });
    }

    // If cab type has an image, delete it from uploads folder
    if (cabType.image) {
      const imagePath = path.join(__dirname, "..", "uploads", cabType.image);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Error deleting cab type image:", err.message);
        }
      });
    }

    return res.json({ message: "Cab type deleted successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error deleting cab type", error: err.message });
  }
};

module.exports = { getCabTypes, createCabType, updateCabType, deleteCabType };
