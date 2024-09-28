const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authMiddleware");
const checkUser = require("../middlewares/checkUser");
const {
  getEvent,
  postEvent,
  getLectures,
  postLectures,
  getSeminar,
  postSeminar,
  getResearch,
  postResearch,
  getProject,
  postProject,
  getProfile,
} = require("../controllers/facultyController");

router
  .route("/event")
  .post(authenticateToken, checkUser, postEvent)
  .get(authenticateToken, checkUser, getEvent);

router
  .route("/research")
  .post(authenticateToken, checkUser, postResearch)
  .get(authenticateToken, checkUser, getResearch);
router
  .route("/seminar")
  .post(authenticateToken, checkUser, postSeminar)
  .get(authenticateToken, checkUser, getSeminar);
router
  .route("/project")
  .post(authenticateToken, checkUser, postProject)
  .get(authenticateToken, checkUser, getProject);
router
  .route("/lecture")
  .post(authenticateToken, checkUser, postLectures)
  .get(authenticateToken, checkUser, getLectures);

router.route("/profile").get(authenticateToken, checkUser, getProfile);

module.exports = router;
