const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

const UserRole = sequelize.define(
  "UserRole",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    role: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    tableName: "UserRoles",
    timestamps: false,
  }
);

module.exports = UserRole;
