var express = require("express");
var router = express.Router();
const auth = require("../middleware/auth");

const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");

/* GET users listing. */
router.get("/", getUsers);

router.post("/", createUser);

router.get("/:id", getUser);

router.put("/:id", auth, updateUser);

router.delete("/:id", auth, deleteUser);

module.exports = router;
