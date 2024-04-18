const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js')

const MovieGenre = sequelize.define('MovieGenre', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    movie_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Movies',
            key: 'id'
        }
    },
    genre_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Genres',
            key: 'id'
        }
    }
}, {
    tableName: 'MoviesGenres',
    timestamps: false
});

module.exports = MovieGenre