var bcrypt = require("bcryptjs");

const hashPassword = async (password) => {
  const bcrypt = require("bcrypt");
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error hashing password: " + error.message);
  }
};

const comparePassword = async (password, hash) => {
  const bcrypt = require("bcrypt");
  try {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  } catch (error) {
    throw new Error("Error comparing password: " + error.message);
  }
};

module.exports = {
  hashPassword,
  comparePassword,
};
