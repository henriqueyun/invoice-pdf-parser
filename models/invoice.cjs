"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Customer);
      this.hasMany(models.Item);
    }
  }
  Invoice.init({
    customerId: DataTypes.NUMBER,
    monthReference: DataTypes.STRING,
    dueDate: DataTypes.DATE,
    streetLigthingContribution: DataTypes.NUMBER,
    totalPrice: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: "Invoice",
  });
  return Invoice;
};