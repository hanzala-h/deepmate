const mongoose = require("mongoose");
const { hashPassword } = require("../utils/password");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
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

userSchema.pre("save", async function (next) {
  if (!this.isModified("passwordHash")) return next();
  this.passwordHash = await hashPassword(this.passwordHash);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
