require("dotenv").config();

var mongoose = require("mongoose");
var debug = require("debug")("server:db");

var dbURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/deepmate";

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {});
    debug("MongoDB connected successfully");
  } catch (error) {
    debug("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
