const express = require("express");
const router = express.Router();
const cabVehicleController = require("../controllers/cabVehicleController");
const { uploadSingle } = require("../middlewares/multterMiddleware");

// Add vehicle (with image upload)
router.post("/", uploadSingle("image"), cabVehicleController.addCabVehicle);

// Get all vehicles
router.get("/", cabVehicleController.getCabVehicles);

// Update vehicle (with image upload)
router.put("/:id", uploadSingle("image"), cabVehicleController.updateCabVehicle);

// Delete vehicle
router.delete("/:id", cabVehicleController.deleteCabVehicle);

module.exports = router;
