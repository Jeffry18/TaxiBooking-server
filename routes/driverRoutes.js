const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  getDrivers,
  createDriver,
  updateDriver
} = require("../controllers/driverController");

// Multer storage (reusing your setup)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Use Multer in POST route
router.get("/", getDrivers);
router.post("/", upload.single("image"), createDriver); // 👈 handles file upload
router.patch("/:id", updateDriver);

module.exports = router;
