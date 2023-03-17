const jwt = require("jsonwebtoken");

const sign = (payload) =>
  jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" });

module.exports = { sign };
