const Package = require("../models/Package.js");

const getPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (err) {
    res.status(500).json({ message: "Error fetching packages", error: err.message });
  }
};

const createPackage = async (req, res) => {
  try {
    // Handle file upload - multer adds file info to req.file
    const packageData = { ...req.body };
    if (req.file) {
      packageData.image = req.file.filename; // Store just the filename
      console.log('Package image uploaded successfully, filename:', req.file.filename);
    } else {
      console.log('No package image uploaded');
    }
    
    console.log('Final package data to save:', packageData);
    
    const pkg = new Package(packageData);
    await pkg.save();
    console.log('Package saved successfully:', pkg);
    res.status(201).json(pkg);
  } catch (err) {
    console.error('Error creating package:', err);
    res.status(400).json({ message: "Error creating package", error: err.message });
  }
};

// Delete a package by id
const deletePackage = async (req, res) => {
  try {
    const deleted = await Package.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Package not found" });
    }
    return res.json({ message: "Package deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Error deleting package", error: err.message });
  }
};

module.exports = { getPackages, createPackage, deletePackage };
