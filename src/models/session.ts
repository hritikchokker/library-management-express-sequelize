import { Sequelize } from "sequelize";

export const Session = (sequelize: Sequelize, Sequelize: Sequelize) => {
  const Session = sequelize.define("session", {
    isActive: {
      type: Sequelize.BOOLEAN,
      default: true,
    },
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
    },
  });
  return Session;
}
