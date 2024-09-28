const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authMiddleware");
const checkAdmin = require("../middlewares/checkAdmin");
const {
  getEvent,
  getLectures,
  getSeminar,
  getResearch,
  getProject,
} = require("../controllers/facultyController");

router.route("/event").get(authenticateToken, checkAdmin, getEvent);
router.route("/research").get(authenticateToken, checkAdmin, getResearch);
router.route("/seminar").get(authenticateToken, checkAdmin, getSeminar);
router.route("/project").get(authenticateToken, checkAdmin, getProject);
router.route("/lecture").get(authenticateToken, getLectures);
//router.route("/profile").get(authenticateToken, checkAdmin, profile);

module.exports = router;
