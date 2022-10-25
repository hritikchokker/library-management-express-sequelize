import { Sequelize } from "sequelize";

export const Session = (sequelize: any, Sequelize: any) => {
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
