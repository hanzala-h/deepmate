var express = require("express");
var router = express.Router();
const auth = require("../middleware/auth");

const {
  getPredictions,
  createPrediction,
  getPredictionById,
  updatePrediction,
  deletePrediction,
} = require("../controllers/predictions");

router.get("/", auth, getPredictions);
router.post("/", auth, createPrediction);
router.get("/:id", getPredictionById);
router.put("/:id", auth, updatePrediction);
router.delete("/:id", auth, deletePrediction);

module.exports = router;
