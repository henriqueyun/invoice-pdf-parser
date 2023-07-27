"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Items", {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      invoice: {
        type: Sequelize.INTEGER,
        references: {
          model: "Invoices",
          key: "id",
        },
      },
      product: {
        type: Sequelize.STRING,
      },
      energyUnit: {
        type: Sequelize.STRING
      },
      energyUnitPrice: {
        type: Sequelize.DECIMAL(9,8)
      },
      unitTax: {
        type: Sequelize.DECIMAL(9,8)
      },
      energyPrice: {
        type: Sequelize.DECIMAL(8,2)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("Items");
  }
};