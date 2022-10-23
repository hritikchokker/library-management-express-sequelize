const config = require("../config/env");
const seql = require("sequelize");

const sequelize = new seql(
  config.DB_NAME,
  config.DB_USERNAME,
  config.DB_PASSWORD,
  {
    host: config.DB_HOST,
    dialect: config.DB_DIALECT,
  }
);
const db = {};

db.sequelize = sequelize;
db.Sequelize = sequelize;

db.book = require("./book")(sequelize, seql);
db.author = require("./author")(sequelize, seql);

module.exports = { db };
