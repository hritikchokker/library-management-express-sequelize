import { environment as config } from "../config/env";
import { Model, ModelCtor, Sequelize } from "sequelize";
import { Session } from './session';
import { Author } from "./author";
import { User } from "./user";
import { Books } from "./book";

// seql.
const sequelizeInstance = new Sequelize(
  config.DB_NAME,
  config.DB_USERNAME,
  config.DB_PASSWORD,
  {
    host: config.DB_HOST,
    dialect: 'postgres',
  }
);
const db: any = {
  sequelize: sequelizeInstance,
  Sequelize,
  book: null,
  author: null,
  // session: null,
  user: null
};
db.book = Books(sequelizeInstance, Sequelize);
db.author = Author(sequelizeInstance, Sequelize);
db.session = Session(sequelizeInstance, Sequelize);
db.user = User(sequelizeInstance, Sequelize);

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
