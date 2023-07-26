"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Items", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
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
        type: Sequelize.INTEGER,
        references: {
          model: "Products",
          key: "id",
        },
      },
      energyUnit: {
        type: Sequelize.CHAR(3)
      },
      energyUnityPrice: {
        type: Sequelize.DECIMAL(1,8)
      },
      unitTax: {
        type: Sequelize.DECIMAL(1,8)
      },
      energyPrice: {
        type: Sequelize.INTEGER
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