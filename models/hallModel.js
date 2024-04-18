const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

const Hall = sequelize.define(
  "Hall",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    tableName: "Halls",
    timestamps: false,
  }
);

module.exports = Hall;
