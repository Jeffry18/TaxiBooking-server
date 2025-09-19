const Place = require("../models/place");
const fs = require("fs");
const path = require("path");

// Add Place
exports.addPlace = async (req, res) => {
  try {
    const { city, name, description, rate } = req.body;
    const image = req.file ? req.file.filename : null;

    const existing = await Place.findOne({ name, city });
    if (existing) {
      return res.status(400).json({ error: "Place already exists in this city" });
    }

    const place = new Place({ city, name, description, rate, image });
    await place.save();

    res.status(201).json({ message: "Place added successfully", place });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all Places
exports.getPlaces = async (req, res) => {
  try {
    const places = await Place.find();
    res.json(places);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Place by ID
exports.getPlaceById = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) return res.status(404).json({ error: "Place not found" });
    res.json(place);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Place
exports.deletePlace = async (req, res) => {
  try {
    const deleted = await Place.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Place not found" });

    // delete image if exists
    if (deleted.image) {
      const imagePath = path.join(__dirname, "..", "uploads", deleted.image);
      fs.unlink(imagePath, (err) => {
        if (err) console.error("Error deleting place image:", err.message);
      });
    }

    res.json({ message: "Place deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Place
exports.updatePlace = async (req, res) => {
  try {
    const { city, name, description, rate } = req.body;
    const place = await Place.findById(req.params.id);
    if (!place) return res.status(404).json({ error: "Place not found" });

    place.city = city || place.city;
    place.name = name || place.name;
    place.description = description || place.description;
    place.rate = rate || place.rate;

    if (req.file) {
      // delete old image
      if (place.image) {
        const oldPath = path.join(__dirname, "..", "uploads", place.image);
        fs.unlink(oldPath, (err) => {
          if (err) console.error("Error deleting old place image:", err.message);
        });
      }
      place.image = req.file.filename;
    }

    await place.save();
    res.json({ message: "Place updated successfully", place });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
