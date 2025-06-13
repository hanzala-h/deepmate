const userModel = require("../models/User");
const debug = require("debug")("server:users");
const { hashPassword } = require("../utils/password"); // your utility

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await userModel.find().select("-passwordHash");
    res.status(200).json({
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (error) {
    debug("Error retrieving users:", error.message);
    res.status(500).json({
      message: "Failed to retrieve users",
      error: error.message,
    });
  }
};

const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check for existing email or username
    const existingUser = await userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      let message = "Email or username already in use";
      if (existingUser.email === email && existingUser.username === username) {
        message = "Both email and username are already in use";
      } else if (existingUser.email === email) {
        message = "Email is already in use";
      } else if (existingUser.username === username) {
        message = "Username is already in use";
      }

      return res.status(400).json({ message });
    }

    const newUser = new userModel({
      username,
      email,
      passwordHash: password,
    });

    await newUser.save();

    const { passwordHash, ...userData } = newUser.toObject();

    res.status(201).json({
      message: "User created successfully",
      data: userData,
    });
  } catch (error) {
    debug("Error creating user:", error.message);
    res.status(500).json({
      message: "Failed to create user",
      error: error.message,
    });
  }
};

// Get single user by ID
const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userModel.findById(id).select("-passwordHash");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        data: null,
      });
    }

    res.status(200).json({
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error) {
    debug("Error retrieving user:", error.message);
    res.status(500).json({
      message: "Failed to retrieve user",
      error: error.message,
    });
  }
};

// Update user
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  try {
    const updateFields = { username, email };

    if (password) {
      updateFields.passwordHash = await hashPassword(password);
    }

    const updatedUser = await userModel
      .findByIdAndUpdate(id, updateFields, { new: true })
      .select("-passwordHash");

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
        data: null,
      });
    }

    res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    debug("Error updating user:", error.message);
    res.status(500).json({
      message: "Failed to update user",
      error: error.message,
    });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await userModel
      .findByIdAndDelete(id)
      .select("-passwordHash");
    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found",
        data: null,
      });
    }

    res.status(200).json({
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (error) {
    debug("Error deleting user:", error.message);
    res.status(500).json({
      message: "Failed to delete user",
      error: error.message,
    });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
