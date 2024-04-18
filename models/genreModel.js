const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

const Genre = sequelize.define(
  "Genre",
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
    tableName: "Genres",
    timestamps: false,
  }
);

module.exports = Genre;
