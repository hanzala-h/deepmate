const PredictionModel = require("../models/Prediction");
const debug = require("debug")("server:predictions");
const axios = require("axios");
const { isDeepStrictEqual } = require("node:util");
const mongoose = require("mongoose");

// ML API call helper
const getPredictionFromAPI = async (inputData) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/v1/predict",
      inputData
    );
    debug("Prediction response:", response.data.prediction);

    return {
      message: "Prediction fetched successfully",
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    debug("Error fetching prediction:", error.message);
    return {
      message: "Failed to fetch prediction",
      status: error.response?.status || 500,
      data: null,
    };
  }
};

// Get all predictions
const getPredictions = async (req, res) => {
  try {
    // const userId = req.user.id; // ✅ This assumes your token contains { id: ... }

    const predictions = await PredictionModel.find({})
      .populate("userId", "-passwordHash")
      .lean();

    res.status(200).json({
      message: "Fetched all predictions",
      data: predictions,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch predictions",
      error: error.message,
    });
  }
};

// Create a prediction
const createPrediction = async (req, res) => {
  const { userId, ...input } = req.body;

  if (!userId || Object.keys(input).length === 0) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingPredictions = await PredictionModel.find({ userId });
    const alreadyExists = existingPredictions.some((p) =>
      isDeepStrictEqual(p.predictionInput, input)
    );

    if (alreadyExists) {
      return res.status(409).json({
        message: "Prediction already exists for this user with the same input",
      });
    }

    const predictionOutput = await getPredictionFromAPI(input);

    if (!predictionOutput?.data) {
      return res.status(502).json({
        message: "Failed to fetch prediction from ML API",
      });
    }

    const newPrediction = new PredictionModel({
      userId,
      predictionInput: input,
      predictionOutput: predictionOutput.data,
      status: "completed",
    });

    await newPrediction.save();

    res.status(201).json({
      message: "Prediction created successfully",
      data: newPrediction,
    });
  } catch (error) {
    debug("Error creating prediction:", error.message);
    res.status(500).json({
      message: "Failed to create prediction",
      error: error.message,
    });
  }
};

// Get a prediction by ID
const getPredictionById = async (req, res) => {
  const { id } = req.params;

  try {
    const prediction = await PredictionModel.findById(id)
      .populate("userId", "-passwordHash")
      .lean();

    if (!prediction) {
      return res.status(404).json({
        message: `Prediction with ID ${id} not found`,
      });
    }

    res.status(200).json({
      message: "Prediction retrieved successfully",
      data: prediction,
    });
  } catch (error) {
    debug("Error fetching prediction:", error.message);
    res.status(500).json({
      message: "Failed to fetch prediction",
      error: error.message,
    });
  }
};

// Update a prediction
const updatePrediction = async (req, res) => {
  const { id } = req.params;
  const { predictionInput: updatedInput, ...rest } = req.body;

  try {
    const prediction = await PredictionModel.findById(id);
    if (!prediction) {
      return res
        .status(404)
        .json({ message: `Prediction with ID ${id} not found` });
    }

    // If input changed, update prediction output
    if (
      updatedInput &&
      !isDeepStrictEqual(updatedInput, prediction.predictionInput)
    ) {
      const newOutput = await getPredictionFromAPI(updatedInput);

      if (!newOutput?.data) {
        return res.status(502).json({
          message: "Failed to fetch updated prediction from ML API",
        });
      }

      prediction.predictionInput = updatedInput;
      prediction.predictionOutput = newOutput.data;
      prediction.status = "updated";
    }

    // Update allowed fields
    const allowedFields = ["status"];
    allowedFields.forEach((field) => {
      if (rest[field] !== undefined) {
        prediction[field] = rest[field];
      }
    });

    await prediction.save();

    res.status(200).json({
      message: "Prediction updated successfully",
      data: prediction,
    });
  } catch (error) {
    debug("Error updating prediction:", error.message);
    res.status(500).json({
      message: "Failed to update prediction",
      error: error.message,
    });
  }
};

// Delete a prediction
const deletePrediction = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await PredictionModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        message: `Prediction with ID ${id} not found`,
      });
    }

    res.status(200).json({
      message: "Prediction deleted successfully",
      data: deleted,
    });
  } catch (error) {
    debug("Error deleting prediction:", error.message);
    res.status(500).json({
      message: "Failed to delete prediction",
      error: error.message,
    });
  }
};

module.exports = {
  getPredictions,
  createPrediction,
  getPredictionById,
  updatePrediction,
  deletePrediction,
};
