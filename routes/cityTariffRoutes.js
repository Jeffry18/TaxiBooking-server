const express = require("express");
const router = express.Router();
const cityTariffController = require("../controllers/cityTariffController");

router.post("/", cityTariffController.createCityTariff);
router.get("/", cityTariffController.getCityTariffs);
router.put("/:id", cityTariffController.updateCityTariff);
router.delete("/:id", cityTariffController.deleteCityTariff);

module.exports = router;
