// @ts-ignore
export const User = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
    },
    password: {
      type: Sequelize.STRING,
      //   notNull: true,
    },
  });
  return User;
}