const Package = require("../models/package");
const path = require("path");
const fs = require("fs");

const getPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (err) {
    res.status(500).json({ message: "Error fetching packages", error: err.message });
  }
};

const getPackageById = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) return res.status(404).json({ error: "Package not found" });
    res.json(pkg);
  } catch (err) {
    res.status(500).json({ error: err.message });
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

//update a package by id
const updatePackage = async (req, res) => {
  try {
    const packageData = { ...req.body };

    // If a new file was uploaded, delete the old image file (if any)
    if (req.file) {
      // Find existing package to know old image filename
      const existing = await Package.findById(req.params.id);
      if (existing && existing.image) {
        const oldImagePath = path.join(__dirname, "..", "uploads", existing.image);
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            // Log error but continue - deletion failure should not block update
            console.error("Failed to delete old package image:", err.message);
          } else {
            console.log("Old package image deleted:", existing.image);
          }
        });
      }

      packageData.image = req.file.filename; // Update image to new filename
      console.log('Package image uploaded successfully, filename:', req.file.filename);
    } else {
      console.log('No new package image uploaded');
    }

    const updated = await Package.findByIdAndUpdate(req.params.id, packageData, { new: true });
    if (!updated) {
      return res.status(404).json({ message: "Package not found" });
    }
    console.log('Package updated successfully:', updated);
    return res.json(updated);
  }
  catch (err) {
    console.error('Error updating package:', err);
    return res.status(400).json({ message: "Error updating package", error: err.message });
  }
};

// Delete a package by id
const deletePackage = async (req, res) => {
  try {
    const deleted = await Package.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Package not found" });
    }

    // If the package has an image, remove it from /uploads
    if (deleted.image) {
      const imagePath = path.join(__dirname, "..", "uploads", deleted.image);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Error deleting package image:", err.message);
        }
      });
    }

    return res.json({ message: "Package deleted successfully" });
  } catch (err) {
    console.error("Delete package error:", err);
    return res
      .status(500)
      .json({ message: "Error deleting package", error: err.message });
  }
};

module.exports = { getPackages, getPackageById, createPackage, updatePackage, deletePackage };