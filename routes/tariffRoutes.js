const express = require("express");
const router = express.Router();
const tariffController = require("../controllers/tariffController");

// CRUD Routes
router.post("/", tariffController.addTariff);
router.get("/", tariffController.getTariffs);
router.delete("/:id", tariffController.deleteTariff);

module.exports = router;
