const jwt = require("jsonwebtoken");
const env = require("../config/env");

exports.decode = (str = "") => {
  return jwt.verify(str, env.JWT_SECRET);
};

exports.createToken = (content) => {
  if (typeof content === "string") {
    return jwt.sign(content, env.JWT_SECRET);
  }
  return jwt.sign(JSON.stringify(content), env.JWT_SECRET);
};
