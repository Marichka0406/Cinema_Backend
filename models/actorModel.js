const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");
const Movie = require('../models/movieModel.js');

const Actor = sequelize.define(
  "actor",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "Actors",
    timestamps: false,
  }
);


module.exports = Actor;
