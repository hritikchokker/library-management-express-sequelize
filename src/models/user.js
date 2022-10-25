module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "user",
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        // set(value) {
        //   this.setDataValue("password", toHash(value));
        // },
        // get(value){

        // }
      },
    },
    {
      defaultScope: {
        attributes: { exclude: ["password"] },
      },
    }
  );
  return User;
};
