"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Invoices", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customer: {
        type: Sequelize.INTEGER,
        references: {
          model: "Customers",
          key: "id",
        },
      },
      monthReference: {
        type: Sequelize.CHAR(8)
      },
      dueDate: {
        type: Sequelize.DATE
      },
      streetLighthingContribuition: {
        type: Sequelize.DECIMAL(8,2)
      },
      totalPrice: {
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
    await queryInterface.dropTable("Invoices");
  }
};