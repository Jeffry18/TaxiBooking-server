const express = require("express");
const multer = require("multer");
const path = require("path");
const { getCabTypes, createCabType, deleteCabType } = require("../controllers/cabTypeController");

const router = express.Router();

// Multer config for cab images
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "../uploads")),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

router.get("/", getCabTypes);
router.post("/", upload.single("image"), createCabType);
router.delete("/:id", deleteCabType);

module.exports = router;
