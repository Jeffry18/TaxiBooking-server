const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multterMiddleware"); // your multer config
const placeController = require("../controllers/placeController");

// Add Place (with image)
router.post("/", upload.single("image"), placeController.addPlace);

// Get all Places
router.get("/", placeController.getPlaces);

// Get Place by ID
router.get("/:id", placeController.getPlaceById);

// Update Place (with new image optional)
router.put("/:id", upload.single("image"), placeController.updatePlace);

// Delete Place
router.delete("/:id", placeController.deletePlace);

module.exports = router;
