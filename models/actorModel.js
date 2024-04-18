const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js')

const Actor = sequelize.define('Actor', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: {
        type: DataTypes.STRING       
    },
    last_name: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'Actors',
    timestamps: false
});

module.exports = Actor