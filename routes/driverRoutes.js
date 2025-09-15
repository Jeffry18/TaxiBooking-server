const express = require("express");
const router = express.Router();
const Driver = require("../models/driver"); // import your Driver model
const upload = require("../middlewares/multterMiddleware");

// ✅ GET all drivers
router.get("/", async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.status(200).json(drivers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ POST new driver with image
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const driverData = {
      ...req.body,
      imageUrl: req.file ? req.file.filename : null, // save filename
    };

    const driver = new Driver(driverData);
    await driver.save();

    res.status(201).json(driver);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// ✅ PATCH (update driver)
router.patch("/:id", async (req, res) => {
  try {
    const driver = await Driver.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    res.status(200).json(driver);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE driver
router.delete("/:id", async (req, res) => {
  try {
    const driver = await Driver.findByIdAndDelete(req.params.id);

    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    res.status(200).json({ message: "Driver deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
