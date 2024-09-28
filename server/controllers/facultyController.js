const asyncHandler = require("express-async-handler");
const connection = require("../config/db");

const getEvent = asyncHandler(async (req, res) => {
  const query = "SELECT * FROM eventparticipation WHERE UserId = ?";
  connection.query(query, [req.user.user_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

const getResearch = asyncHandler(async (req, res) => {
  const query = "SELECT * FROM ResearchPublications WHERE UserId = ?";
  connection.query(query, [req.user.user_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

const getSeminar = asyncHandler(async (req, res) => {
  const query = "SELECT * FROM Seminars WHERE UserId = ?";
  connection.query(query, [req.user.user_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

const getProject = asyncHandler(async (req, res) => {
  const query = "SELECT * FROM Projects WHERE UserId = ?";
  connection.query(query, [req.user.user_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

const getLectures = asyncHandler(async (req, res) => {
  const { EventName, Organizer, Role, EventDate, Location } = req.body;
  const query = "SELECT * FROM Lectures WHERE UserId = ?";
  connection.query(query, [req.user.user_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

const postEvent = asyncHandler(async (req, res) => {
  const { EventName, Organizer, Role, EventDate, Location } = req.body;

  const query =
    "INSERT INTO EventParticipation (UserID,EventName,Organizer,Role,EventDate,Location) VALUES (?,?,?,?,?,?)";
  connection.query(
    query,
    [req.user.user_id, EventName, Organizer, Role, EventDate, Location],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).send("Event created");
    }
  );
});

const postResearch = asyncHandler(async (req, res) => {
  const {
    PublicationTitle,
    Authors,
    JornalConferenceName,
    PublicationDate,
    DOILink,
    TypeOfPublication,
    Indexing,
  } = req.body;

  const query =
    "INSERT INTO ResearchPublications (UserId,PublicationTitle,Authors,JournalConferenceName,PublicationDate,DOILink,TypeOfPublication,Indexing) VALUES (? ,?,?,?,?,?,?,?);";
  connection.query(
    query,
    [
      req.user.user_id,
      PublicationTitle,
      Authors,
      JornalConferenceName,
      PublicationDate,
      DOILink,
      TypeOfPublication,
      Indexing,
    ],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).send("Research created");
    }
  );
});

const postSeminar = asyncHandler(async (req, res) => {
  const {
    SeminarTitle,
    HostInstitution,
    SeminarDate,
    TypeOfSeminar,
    Duration,
    DurationUnit,
  } = req.body;

  const query =
    "INSERT INTO Seminars (UserId,SeminarTitle,HostInstitution,SeminarDate,TypeOfSeminar,Duration,DurationUnit) VALUES (?,?,?,?,?,?,?)";
  connection.query(
    query,
    [
      req.user.user_id,
      SeminarTitle,
      HostInstitution,
      SeminarDate,
      TypeOfSeminar,
      Duration,
      DurationUnit,
    ],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).send("Seminar created");
    }
  );
});

const postProject = asyncHandler(async (req, res) => {
  const {
    ProjectTitle,
    FundingAgency,
    ProjectType,
    StartDate,
    EndDate,
    TeamMembers,
    ProjectOutcomeLink,
    Budget,
  } = req.body;

  const query =
    "INSERT INTO Projects (UserId,ProjectTitle,FundingAgency,ProjectType,StartDate,EndDate,TeamMembers,ProjectOutcomeLink,Budget) VALUES (? ,?,?,?,?,?,?,?,?);";
  connection.query(
    query,
    [
      req.user.user_id,
      ProjectTitle,
      FundingAgency,
      ProjectType,
      StartDate,
      EndDate,
      TeamMembers,
      ProjectOutcomeLink,
      Budget,
    ],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).send("Project created");
    }
  );
});

const postLectures = asyncHandler(async (req, res) => {
  const {
    LectureTitle,
    CourseProgramName,
    Institution,
    LectureDate,
    Duration,
    DurationUnit,
  } = req.body;

  const query =
    "INSERT INTO Lectures (UserId,LectureTitle,CourseProgramName,Institution,LectureDate,Duration,DurationUnit) VALUES (? ,?,?,?,?,?,?);";
  connection.query(
    query,
    [
      req.user.user_id,
      LectureTitle,
      CourseProgramName,
      Institution,
      LectureDate,
      Duration,
      DurationUnit,
    ],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).send("Lecture created");
    }
  );
});

const getProfile = asyncHandler(async (req, res) => {});

module.exports = {
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
};
