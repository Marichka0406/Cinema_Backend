const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

const Ticket = sequelize.define(
  "Ticket",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    screening_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Screenings",
        key: "id",
      },
    },
    seat_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Seats",
        key: "id",
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
    },
    purchase_date: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "Tickets",
    timestamps: false,
  }
);

module.exports = Ticket;
