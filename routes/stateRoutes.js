const express = require("express");
const router = express.Router();
const { uploadSingle } = require("../middlewares/multterMiddleware"); // <-- multer config
const stateController = require("../controllers/stateController");

// Add state (with image upload)
router.post("/", uploadSingle("image"), stateController.addState);

// Get all states
router.get("/", stateController.getStates);

router.get("/:id", stateController.getStateById); 

// Delete a state
router.delete("/:id", stateController.deleteState);

// Update a state
router.put("/:id", uploadSingle("image"), stateController.updateState);

module.exports = router;
