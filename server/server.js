const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is started" });
});

app.use("/", require("./routes/loginRoutes"));
// app.use("/admin", require("./routes/adminRoutes"));
// app.use("/faculty/:id", require("./routes/facultyRoutes"));

app.listen(port, () => {
  console.log(`Server is started on http://localhost:${port}`);
});
