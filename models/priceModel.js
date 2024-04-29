const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

const Price = sequelize.define(
  "Price",
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
    row_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Rows",
        key: "id",
      },
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
    },
  },
  {
    tableName: "Prices",
    timestamps: false,
  }
);

module.exports = Price;
