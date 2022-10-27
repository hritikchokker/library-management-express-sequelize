const jwt = require("jsonwebtoken");
const env = require("../config/env");

exports.decode = (str = "") => {
  return jwt.decode(str, env.JWT_SECRET);
};

exports.checkForExpiry = (exp) => {
  return Date.now() >= new Date(exp).toISOString();
};

exports.createToken = (content, otherConfig = { expiresIn: "1h" }) => {
  return jwt.sign(content, env.JWT_SECRET, otherConfig);
};
