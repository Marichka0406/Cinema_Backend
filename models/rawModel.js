const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

const Raw = sequelize.define(
  "Raw",
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
    tableName: "Raws",
    timestamps: false,
  }
);

module.exports = Raw;
