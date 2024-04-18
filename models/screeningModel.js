const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js')

const Screening = sequelize.define('Screening', {
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
    hall_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Halls',
            key: 'id'
        }
    },
    date_time: {
        type: DataTypes.DATE
    }  
}, {
    tableName: 'Screenings',
    timestamps: false
});

module.exports = Screening