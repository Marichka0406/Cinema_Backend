const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

const Row = sequelize.define(
  "Row",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    hall_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Halls",
        key: "id",
      },
    },
    number: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "Rows",
    timestamps: false,
  }
);

module.exports = Row;
