const express = require("express");
const router = express.Router();

const {
  getUsers,
  updateUser,
  deleteUser,
  getUserById,
  createUser,
} = require("../controller/userController");

router.get("/users", getUsers);

router.get("/users/:id", getUserById);

router.put("/users/:id", updateUser);

router.delete("/users/:id", deleteUser);

router.post("/users", createUser);

module.exports = router;
