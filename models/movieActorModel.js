const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

const MovieActor = sequelize.define(
  "MovieActor",
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
    actor_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Actors",
        key: "id",
      },
    },
  },
  {
    tableName: "MoviesActors",
    timestamps: false,
  }
);

module.exports = MovieActor;
