module.exports = (sequelize, Sequelize) => {
  const Session = sequelize.define("session", {
    isActive: {
      type: Sequelize.BOOLEAN,
      default: true,
    },
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
    },
    expiresIn: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
  });
  return Session;
};
