const express = require("express");
const router = express.Router();
const cabVehicleController = require("../controllers/cabVehicleController");
const upload = require("../middlewares/multterMiddleware");

// Add vehicle (with image upload)
router.post("/", upload.single("image"), cabVehicleController.addCabVehicle);

// Get all vehicles
router.get("/", cabVehicleController.getCabVehicles);

// Delete vehicle
router.delete("/:id", cabVehicleController.deleteCabVehicle);

module.exports = router;
