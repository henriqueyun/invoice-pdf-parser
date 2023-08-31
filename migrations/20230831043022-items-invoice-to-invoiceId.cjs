"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.removeConstraint("Items", "Items_invoice_fkey");
    await queryInterface.renameColumn("Items", "invoice", "invoiceId");
    await queryInterface.addConstraint("Items", {
      type: "foreign key",
      fields: ["invoiceId"],
      references: {
        table: "Invoices",
        field: "id"
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint("Items", "Items_invoice_fkey");
    await queryInterface.renameColumn("Items", "invoiceId", "invoice");
    await queryInterface.addConstraint("Items", {
      type: "foreign key",
      fields: ["invoice"],
      references: {
        table: "Invoices",
        field: "id"
      }
    });
  }
};