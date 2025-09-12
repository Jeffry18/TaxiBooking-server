const express = require("express");
const upload = require("../middlewares/multterMiddleware");
const { getCabTypes, createCabType, deleteCabType } = require("../controllers/cabTypeController");

const router = express.Router();

router.get("/", getCabTypes);
router.post("/", upload.single("image"), createCabType);
router.delete("/:id", deleteCabType);

module.exports = router;
