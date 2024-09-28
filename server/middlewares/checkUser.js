const checkUser = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(403).json({ message: "Access denied. Faculty only." });
  }
  next();
};

module.exports = checkUser;
