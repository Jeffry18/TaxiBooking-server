const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multterMiddleware");
const stateController = require("../controllers/stateController");

// Add a new state
router.post("/", stateController.addState);

// Add a city into a state
router.post("/:stateId/cities", stateController.addCityToState);

// Add a tourist place into a city (with image upload)
router.post("/:stateId/cities/:cityId/places", upload.single("image"), stateController.addPlaceToCity);

// Get all cities of a state
router.get("/:stateId/cities", stateController.getCitiesByState);

// Get all places of a city
router.get("/:stateId/cities/:cityId/places", stateController.getPlacesByCity);

module.exports = router;
