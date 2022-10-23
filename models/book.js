module.exports = (sequelize, Sequelize) => {
  const Books = sequelize.define("book", {
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
  return Books;
};
