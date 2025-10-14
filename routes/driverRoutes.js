const express = require("express");
const router = express.Router();
const driverController = require("../controllers/driverController");
const { uploadSingle } = require("../middlewares/multterMiddleware");
const jwtMiddleware = require("../middlewares/jwtMiddleware");

// ✅ GET all drivers
router.get("/",jwtMiddleware, driverController.getDrivers);

// ✅ GET single driver by ID
router.get("/:id",jwtMiddleware, driverController.getDriverById);

// ✅ POST new driver with image
router.post("/",jwtMiddleware, uploadSingle("image"), driverController.createDriver);

// ✅ PATCH (update driver)
router.patch("/:id",jwtMiddleware, driverController.updateDriver);

// ✅ DELETE driver
router.delete("/:id",jwtMiddleware, driverController.deleteDriver);

module.exports = router;
