const { scrypt, randomBytes } = require("crypto");
const { promisify } = require("util");

const scryptAsync = promisify(scrypt);
const toHash = async (password) => {
  const salt = randomBytes(8).toString("hex");
  const buf = await scryptAsync(password, salt, 64);
  return `${buf.toString("hex")}.${salt}`;
};

const compare = async (storedPassword, suppliedPassword) => {
  const [hash, salt] = storedPassword.split(".");
  const buf = await scryptAsync(suppliedPassword, salt, 64);
  return buf.toString("hex") === hash;
};

module.exports = { toHash, compare };
