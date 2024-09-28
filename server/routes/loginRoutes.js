const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getProfile,
} = require("../controllers/loginController");
const authenticateToken = require("../middlewares/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authenticateToken, getProfile);

module.exports = router;
