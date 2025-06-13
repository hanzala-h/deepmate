var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var predictionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  predictionInput: {
    type: Object,
    required: true,
  },
  predictionOutput: {
    type: Object,
    required: false,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Prediction", predictionSchema);
