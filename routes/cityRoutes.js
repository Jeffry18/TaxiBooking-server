const express = require("express");
const router = express.Router();
const { uploadSingle } = require("../middlewares/multterMiddleware"); // your multer config
const cityController = require("../controllers/cityController");

// Add City (with image)
router.post("/", uploadSingle("image"), cityController.addCity);

// Get all Cities
router.get("/", cityController.getCities);

// Get City by ID
router.get("/:id", cityController.getCityById);

// Update City (with new image optional)
router.put("/:id", uploadSingle("image"), cityController.updateCity);

// Delete City
router.delete("/:id", cityController.deleteCity);

module.exports = router;
