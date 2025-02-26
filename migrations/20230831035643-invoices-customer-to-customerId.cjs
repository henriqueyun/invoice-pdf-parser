"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.removeConstraint("Invoices", "Invoices_customer_fkey");
    await queryInterface.renameColumn("Invoices", "customer", "customerId");
    await queryInterface.addConstraint("Invoices", {
      type: "foreign key",
      fields: ["customerId"],
      references: {
        table: "Customers",
        field: "id"
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint("Invoices", "Invoices_customer_fkey");
    await queryInterface.renameColumn("Invoices", "customerId", "customer");
    await queryInterface.addConstraint("Invoices", {
      type: "foreign key",
      fields: ["customer"],
      references: {
        table: "Customers",
        field: "id"
      }
    });
  }
};