const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");
const Actor  = require("../models/actorModel.js")
const Director = require('../models/directorModel.js')
const Genre = require('../models/genreModel.js')

const Movie = sequelize.define(
  "movie",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      unique: true,
    },
    duration: {
      type: DataTypes.INTEGER,
    },
    release_date: {
      type: DataTypes.DATEONLY,
    },
    movie_image:{
      type: DataTypes.STRING
    }
  },
  {
    tableName: "Movies",
    timestamps: false,
  }
); 

module.exports = Movie;
