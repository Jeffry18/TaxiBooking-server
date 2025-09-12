// routes/package.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const { getPackages, createPackage, deletePackage } = require("../controllers/packageController");
const router = express.Router();

// Multer storage configuration for package images
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

router.get("/", getPackages);
router.post("/", upload.array("images",10), createPackage);
router.delete("/:id", deletePackage);

module.exports = router;
