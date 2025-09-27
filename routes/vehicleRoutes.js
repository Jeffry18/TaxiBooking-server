const express = require("express");
const router = express.Router();
const vehicleController = require("../controllers/vehicleController");
const upload = require("../middlewares/multterMiddleware");
const jwtMiddleware = require("../middlewares/jwtMiddleware");

// GET all vehicles
router.get("/",jwtMiddleware, vehicleController.getVehicles);

// GET single vehicle by ID
router.get("/:id",jwtMiddleware, vehicleController.getVehicleById);

// POST new vehicle with image
router.post("/",jwtMiddleware, upload.single("image"), vehicleController.addVehicle);

// PATCH route for updating vehicle status
router.patch("/:id",jwtMiddleware, vehicleController.updateVehicle);

// DELETE vehicle
router.delete("/:id",jwtMiddleware, vehicleController.deleteVehicle);

module.exports = router;
