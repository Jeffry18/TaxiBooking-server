const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multterMiddleware"); // your multer config
const cityController = require("../controllers/cityController");

// Add City (with image)
router.post("/", upload.single("image"), cityController.addCity);

// Get all Cities
router.get("/", cityController.getCities);

// Get City by ID
router.get("/:id", cityController.getCityById);

// Update City (with new image optional)
router.put("/:id", upload.single("image"), cityController.updateCity);

// Delete City
router.delete("/:id", cityController.deleteCity);

module.exports = router;
