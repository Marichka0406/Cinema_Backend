const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

const Seat = sequelize.define(
  "Seat",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    row_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Rows",
        key: "id",
      },
    },
    number: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "Seats",
    timestamps: false,
  }
);

module.exports = Seat;
