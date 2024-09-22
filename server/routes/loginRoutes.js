const express = require("express");
const router = express.Router();

const {
  register,
  login,
  deleteFaculty,
} = require("../controllers/loginController");

// Register a new faculty
router.post("/register", register);

// Request for login the faculty or admin
router.post("/login", login);

// Deleter the faculty
router.delete("/faculty/:id", deleteFaculty);

module.exports = router;
