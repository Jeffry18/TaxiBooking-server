// routes/package.js
const express = require("express");
const upload = require("../middlewares/multterMiddleware");
const { getPackages, createPackage, deletePackage } = require("../controllers/packageController");
const router = express.Router();

router.get("/", getPackages);
router.post("/", upload.single("image"), createPackage);
router.delete("/:id", deletePackage);

module.exports = router;
