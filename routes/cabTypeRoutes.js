const express = require("express");
const router = express.Router();
const CabType = require("../models/cabType"); // your CabType model
const upload = require("../middlewares/multterMiddleware");

// ✅ GET all cab types
router.get("/", async (req, res) => {
  try {
    const cabTypes = await CabType.find();
    res.status(200).json(cabTypes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ POST new cab type with image
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const cabTypeData = {
      ...req.body,
      image: req.file ? req.file.filename : null, // storing only filename
    };

    const cabType = new CabType(cabTypeData);
    await cabType.save();

    res.status(201).json(cabType);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// ✅ PATCH (update cab type)
router.patch("/:id", async (req, res) => {
  try {
    const cabType = await CabType.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!cabType) {
      return res.status(404).json({ message: "Cab type not found" });
    }

    res.status(200).json(cabType);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE cab type
router.delete("/:id", async (req, res) => {
  try {
    const cabType = await CabType.findByIdAndDelete(req.params.id);

    if (!cabType) {
      return res.status(404).json({ message: "Cab type not found" });
    }

    res.status(200).json({ message: "Cab type deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
