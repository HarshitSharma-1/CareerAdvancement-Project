const asyncHandler = require("express-async-handler");
const connection = require("../config/db");

const getEvent = asyncHandler(async (req, res) => {
  const query = `SELECT  users.firstname, users.lastname,EventParticipation.*
    FROM EventParticipation 
    JOIN users ON EventParticipation.UserID = users.user_id`;
  connection.query(query, [req.user.user_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

const getResearch = asyncHandler(async (req, res) => {
  const query = `SELECT users.firstname, users.lastname,ResearchPublications.*  
    FROM ResearchPublications 
    JOIN users ON ResearchPublications.UserID = users.user_id`;
  connection.query(query, [req.user.user_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

const getSeminar = asyncHandler(async (req, res) => {
  const query = `SELECT  users.firstname, users.lastname ,Seminars.*
    FROM Seminars 
    JOIN users ON Seminars.UserID = users.user_id`;
  connection.query(query, [req.user.user_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

const getProject = asyncHandler(async (req, res) => {
  const query = `SELECT users.firstname, users.lastname,Projects.*
    FROM Projects 
    JOIN users ON Projects.UserID = users.user_id`;
  connection.query(query, [req.user.user_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

const getLectures = asyncHandler(async (req, res) => {
  const query = `SELECT  users.firstname, users.lastname ,Lectures.*
    FROM Lectures 
    JOIN users ON Lectures.UserID = users.user_id`;
  connection.query(query, [req.user.user_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

const getProfile = asyncHandler(async (req, res) => {});

module.exports = {
  getEvent,
  getLectures,
  getSeminar,
  getResearch,
  getProject,
  getProfile,
};
