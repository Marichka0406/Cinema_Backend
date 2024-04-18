const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js')

const Movie = sequelize.define('Movie', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        unique: true
    },
    description: {
        type: DataTypes.TEXT,
        unique: true
    },
    duration: {
        type: DataTypes.INTEGER
    },
    release_date: {
        type: DataTypes.DATEONLY
    },
  
}, {
    tableName: 'Movies',
    timestamps: false
});

module.exports = Movie