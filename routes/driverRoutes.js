const express = require("express");
const router = express.Router();
const driverController = require("../controllers/driverController");
const upload = require("../middlewares/multterMiddleware");

// ✅ GET all drivers
router.get("/", driverController.getDrivers);

// ✅ GET single driver by ID
router.get("/:id", driverController.getDriverById);

// ✅ POST new driver with image
router.post("/", upload.single("image"), driverController.createDriver);

// ✅ PATCH (update driver)
router.patch("/:id", driverController.updateDriver);

// ✅ DELETE driver
router.delete("/:id", driverController.deleteDriver);

module.exports = router;
