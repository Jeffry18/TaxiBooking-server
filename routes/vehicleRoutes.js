const express = require("express");
const router = express.Router();
const vehicleController = require("../controllers/vehicleController");
const upload = require("../middlewares/multterMiddleware");

// GET all vehicles
router.get("/", vehicleController.getVehicles);

// GET single vehicle by ID
router.get("/:id", vehicleController.getVehicleById);

// POST new vehicle with image
router.post("/", upload.single("image"), vehicleController.addVehicle);

// PATCH route for updating vehicle status
router.patch("/:id", vehicleController.updateVehicle);

// DELETE vehicle
router.delete("/:id", vehicleController.deleteVehicle);

module.exports = router;
