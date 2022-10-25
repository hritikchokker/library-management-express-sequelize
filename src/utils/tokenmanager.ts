const jwt = require("jsonwebtoken");
const env = require("../config/env");

export const decode = (str = "") => {
  return jwt.verify(str, env.JWT_SECRET);
};

export const createToken = (content: string | unknown) => {
  if (typeof content === "string") {
    return jwt.sign(content, env.JWT_SECRET);
  }
  return jwt.sign(JSON.stringify(content), env.JWT_SECRET);
};
