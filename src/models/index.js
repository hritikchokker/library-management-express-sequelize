const config = require("../config/env");
const seql = require("sequelize");
// seql.
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
db.session = require("./session")(sequelize, seql);
db.user = require("./user")(sequelize, seql);

db.author.hasMany(db.book, {
  as: "books",
});
db.book.belongsTo(db.author, {
  // onDelete: "RESTRICT",
  // onUpdate: "RESTRICT",
  foreignKey: "authorId",
  as: "author",
});
module.exports = { db };
