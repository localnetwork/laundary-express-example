const { query } = require("../config/db");
const getUsers = async (req, res) => {
  console.log("hello from controller");

  const results = await query({
    sql: "SELECT * FROM users",
  });

  console.log("results", results);

  res.json(results);
};

const getUserById = async (req, res) => {
  const id = parseInt(req.params.id);

  const results = await query({
    sql: "SELECT * FROM users WHERE id = ?",
    values: [id],
  });

  if (results.length === 0) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(results[0]);
};

const updateUser = async (req, res) => {
  const id = parseInt(req.params.id);

  const { name } = req.body;

  if (name.length === 0) {
    return res.status(422).json({ message: "Name is required." });
  }

  try {
    const results = await query({
      sql: "UPDATE users SET name = ? WHERE id = ?",
      values: [name, id],
    });

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User updated successfully.",
      data: {
        name,
      },
    });
  } catch (error) {}
};

const deleteUser = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const results = await query({
      sql: "DELETE FROM users WHERE id = ?",
      values: [id],
    });

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User deleted successfully.",
    });
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (req, res) => {
  const { name } = req.body;

  if (!name || name.length === 0) {
    return res.status(422).json({ message: "Name is required." });
  }
  try {
    const results = await query({
      sql: "INSERT INTO users (name) VALUES (?)",
      values: [name],
    });
    return res.status(200).json({
      message: "User created successfully",
      data: {
        id: results.insertId,
        name,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getUsers,
  updateUser,
  deleteUser,
  getUserById,
  createUser,
};
