const express = require("express");
const multer = require("multer")
const path = require("path")
const cabTpye = require("../models/cabType")
const { getCabTypes, createCabType, deleteCabType } = require("../controllers/cabTypeController");
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


router.get("/", getCabTypes);
router.post("/", upload.single("image"), createCabType);
router.delete("/:id", deleteCabType);

module.exports = router;
