"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Invoice);
    }
  }
  Customer.init({
    name: DataTypes.STRING,
    cpfFragment: DataTypes.STRING
  }, {
    sequelize,
    modelName: "Customer",
  });
  return Customer;
};