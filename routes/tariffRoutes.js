const express = require("express");
const router = express.Router();
const tariffController = require("../controllers/tariffController");

// CRUD Routes
router.post("/", tariffController.addTariff);
router.get("/", tariffController.getTariffs);
router.put("/:id", tariffController.updateTariff);
router.delete("/:id", tariffController.deleteTariff);

module.exports = router;
