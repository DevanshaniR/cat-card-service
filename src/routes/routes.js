const express = require("express");
const healthController = require("../controllers/healthController");
const catController = require("../controllers/catController");

const router = express.Router();

router.get("/health", healthController.health);
router.post("/saveImage", catController.saveImage);
router.post("/blend", catController.blendImages);

module.exports = router;
