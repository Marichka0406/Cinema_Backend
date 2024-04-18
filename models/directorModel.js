const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js')

const Director = sequelize.define('Director', {
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
    tableName: 'Directors',
    timestamps: false
});

module.exports = Director