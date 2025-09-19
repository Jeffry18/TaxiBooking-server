const City = require("../models/cities");
const fs = require("fs");
const path = require("path");

// Add City
exports.addCity = async (req, res) => {
  try {
    const { state, name, description } = req.body;
    const image = req.file ? req.file.filename : null;

    const existing = await City.findOne({ name, state });
    if (existing) {
      return res.status(400).json({ error: "City already exists in this state" });
    }

    const city = new City({ state, name, description, image });
    await city.save();

    res.status(201).json({ message: "City added successfully", city });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all Cities
exports.getCities = async (req, res) => {
  try {
    const cities = await City.find();
    res.json(cities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get City by ID
exports.getCityById = async (req, res) => {
  try {
    const city = await City.findById(req.params.id);
    if (!city) return res.status(404).json({ error: "City not found" });
    res.json(city);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete City
exports.deleteCity = async (req, res) => {
  try {
    const deleted = await City.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "City not found" });

    // delete image if exists
    if (deleted.image) {
      const imagePath = path.join(__dirname, "..", "uploads", deleted.image);
      fs.unlink(imagePath, (err) => {
        if (err) console.error("Error deleting city image:", err.message);
      });
    }

    res.json({ message: "City deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update City
exports.updateCity = async (req, res) => {
  try {
    const { state, name, description } = req.body;
    const city = await City.findById(req.params.id);
    if (!city) return res.status(404).json({ error: "City not found" });

    city.state = state || city.state;
    city.name = name || city.name;
    city.description = description || city.description;

    if (req.file) {
      // delete old image
      if (city.image) {
        const oldPath = path.join(__dirname, "..", "uploads", city.image);
        fs.unlink(oldPath, (err) => {
          if (err) console.error("Error deleting old city image:", err.message);
        });
      }
      city.image = req.file.filename;
    }

    await city.save();
    res.json({ message: "City updated successfully", city });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
