import { environment as config } from "../config/env";
import seql from "sequelize";
import { Session } from './session';
import { Author } from "./author";
import { User } from "./user";
import { Books } from "./book";
// seql.
// @ts-ignore
const sequelize = new seql(
  config.DB_NAME,
  config.DB_USERNAME,
  config.DB_PASSWORD,
  {
    host: config.DB_HOST,
    dialect: config.DB_DIALECT,
  }
);
const db: any = {
  sequelize,
  Sequelize: sequelize,
  book: null,
  author: null,
  // session: null,
  user: null
};
db.book = Books(sequelize, seql);
db.author = Author(sequelize, seql);
db.session = Session(sequelize, seql);
db.user = User(sequelize, seql);

// @ts-ignore
db.author.hasMany(db.book, {
  as: "books",
});
// @ts-ignore
db.book.belongsTo(db.author, {
  // onDelete: "RESTRICT",
  // onUpdate: "RESTRICT",
  foreignKey: "authorId",
  as: "author",
});
export { db };
