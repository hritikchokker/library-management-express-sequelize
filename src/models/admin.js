module.exports = (sequelize, Sequelize) => {
  const Admin = sequelize.define("admin", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
    }
  });
  return Admin;
};
