const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js')

const Seat = sequelize.define('Seat', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    raw_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Raws',
            key: 'id'
        }
    },
    number: {
        type: DataTypes.INTEGER
    }   
}, {
    tableName: 'Seats',
    timestamps: false
});

module.exports = Seat