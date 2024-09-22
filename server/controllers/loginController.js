const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const connection = require("../config/db");
const asyncHandler = require("express-async-handler");
const { authenticateToken } = require("../middlewares/authMiddleware");
const checkRole = require("../middlewares/roleMiddleware");

// @desc Authennticate the user
// @route POST api/register/
// @access Public
const register = asyncHandler(async (req, res) => {
  const {
    user_id,
    firstname,
    lastname,
    contact,
    email,
    facultyDepartment,
    role,
    password,
  } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  connection.query(
    "INSERT INTO users (user_id, firstname,lastname,contact,email, password,facultyDepartment,role,hashedPassword) VALUES (?, ?,?,?,?,?,?,?,?)",
    [
      user_id,
      firstname,
      lastname,
      contact,
      email,
      password,
      facultyDepartment,
      role || "user",
      hashedPassword,
    ],
    (err) => {
      if (err) return res.status(500).send(err);
      res.status(201).send("User registered");
    }
  );
});

// @desc Login the user
// @route POST api/login
// @public Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  connection.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) return res.status(500).send(err);

      if (
        results.length === 0 ||
        !(await bcrypt.compare(password, results[0].hashedPassword))
      ) {
        return res.status(400).send("Invalid credentials");
      }

      const user = {
        id: results[0].id,
        email: results[0].email,
        firstname: results[0].firstname,
        lastname: results[0].lastname,
      };
      console.log(user);
      const accessToken = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.json({ user, accessToken });
    }
  );
});

// @desc
// @route
// @public
const deleteFaculty = asyncHandler(async (req, res) => {
  "/faculty/:id",
    authenticateToken,
    checkRole(["Admin"]),
    (req, res) => {
      const { id } = req.params;
      connection.query("DELETE FROM users WHERE id = ?", [id], (err) => {
        if (err) return res.status(500).send(err);
        res.send("User deleted");
      });
    };
});

module.exports = { register, login, deleteFaculty };
