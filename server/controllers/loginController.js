const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const connection = require("../config/db");
const asyncHandler = require("express-async-handler");

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
        user_id: results[0].user_id,
        email: results[0].email,
        firstname: results[0].firstname,
        lastname: results[0].lastname,
        role: results[0].role,
      };
      console.log(user);
      const accessToken = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: "3h",
      });

      res.json({ user, accessToken });
    }
  );
});

// @desc Login the user
// @route POST api/login
// @public Public
const getProfile = asyncHandler(async (req, res) => {
  connection.query(
    "SELECT firstname,lastname,email,contact,facultyDepartment FROM users WHERE user_id = ?",
    [req.user.user_id],
    async (err, results) => {
      if (err) return res.status(500).send(err);
      res.status(200).send(results);
    }
  );
});

// @desc
// @route
// @public
// const deleteFaculty = asyncHandler(async (req, res) => {
//  const userId = req.user.user_id;
//   const query = 'DELETE FROM users WHERE user_id = ?';

//   connection.query(query, [userId], (err, results) => {
//     if (err) return res.status(500).json({ error: 'Database error' });

//     if (results.affectedRows === 0) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.json({ message: 'Profile deleted successfully' });

// });

module.exports = { register, login, getProfile };
