module.exports = (sequelize, Sequelize) => {
  const Author = sequelize.define("author", {
    name: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
    },
  });
  return Author;
};
