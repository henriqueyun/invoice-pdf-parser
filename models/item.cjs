"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  }
  Item.init({
    invoiceId: DataTypes.NUMBER,
    product: DataTypes.STRING,
    energyUnit: DataTypes.STRING,
    energyUnitPrice: DataTypes.NUMBER,
    unitTax: DataTypes.NUMBER,
    energyPrice: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: "Item",
  });
  return Item;
};