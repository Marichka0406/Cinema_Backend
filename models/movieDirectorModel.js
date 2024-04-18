const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

const MovieDirector = sequelize.define(
  "MovieDirector",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    movie_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Movies",
        key: "id",
      },
    },
    director_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Directors",
        key: "id",
      },
    },
  },
  {
    tableName: "MoviesDirectors",
    timestamps: false,
  }
);

module.exports = MovieDirector;
