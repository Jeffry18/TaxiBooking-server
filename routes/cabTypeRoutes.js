const express = require("express");
const router = express.Router();
const cabTypeController = require("../controllers/cabTypeController");
const { uploadSingle } = require("../middlewares/multterMiddleware");

// ✅ GET all cab types
router.get("/", cabTypeController.getCabTypes);

// ✅ POST new cab type with image
router.post("/", uploadSingle("image"), cabTypeController.createCabType);

// ✅ PATCH (update cab type)
router.patch("/:id",uploadSingle("image"), cabTypeController.updateCabType);

// ✅ DELETE cab type
router.delete("/:id", cabTypeController.deleteCabType);

module.exports = router;
