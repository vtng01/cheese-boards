const { DataTypes, Model } = require("sequelize");
const db = require("../db/db");

class Cheese extends Model {}

Cheese.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  { sequelize: db }
);

module.exports = Cheese;
