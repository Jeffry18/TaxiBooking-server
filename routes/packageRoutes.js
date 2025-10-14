const express = require("express");
const router = express.Router();
const packageController = require("../controllers/packageController");
const { uploadSingle } = require("../middlewares/multterMiddleware");

// ✅ GET all packages
router.get("/", packageController.getPackages);

// ✅ GET single package by ID
router.get("/:id", packageController.getPackageById);

// ✅ POST new package with image
router.post("/", uploadSingle("image"), packageController.createPackage);

// ✅ PATCH (update package details)
router.put("/:id", uploadSingle("image"), packageController.updatePackage);

// ✅ DELETE package
router.delete("/:id", packageController.deletePackage);

module.exports = router;
