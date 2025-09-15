const express = require("express");
const router = express.Router();
const Package = require("../models/package"); // ✅ import your Package model
const upload = require("../middlewares/multterMiddleware");

// ✅ GET all packages
router.get("/", async (req, res) => {
  try {
    const packages = await Package.find();
    res.status(200).json(packages);
  } catch (err) {
    console.error("Error fetching packages:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ POST new package with image
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const packageData = {
      ...req.body,
      image: req.file ? req.file.filename : null, // store filename
    };

    const newPackage = new Package(packageData);
    await newPackage.save();

    res.status(201).json(newPackage);
  } catch (err) {
    console.error("Error creating package:", err);
    res.status(400).json({ error: err.message });
  }
});

// ✅ PATCH (update package details)
router.patch("/:id", async (req, res) => {
  try {
    const updatedPackage = await Package.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedPackage) {
      return res.status(404).json({ message: "Package not found" });
    }

    res.status(200).json(updatedPackage);
  } catch (err) {
    console.error("Error updating package:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE package
router.delete("/:id", async (req, res) => {
  try {
    const deletedPackage = await Package.findByIdAndDelete(req.params.id);

    if (!deletedPackage) {
      return res.status(404).json({ message: "Package not found" });
    }

    res.status(200).json({ message: "Package deleted successfully" });
  } catch (err) {
    console.error("Error deleting package:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
