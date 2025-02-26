"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    queryInterface.sequelize.query(`
    ALTER TABLE "Invoices"  DROP CONSTRAINT "Invoices_customer_fkey";
    ALTER TABLE "Customers"  DROP CONSTRAINT "Customers_pkey";
    
    
    ALTER TABLE "Invoices"
    ALTER COLUMN customer TYPE VARCHAR(255) using customer::VARCHAR(255);
    
    ALTER TABLE "Customers"
    ALTER COLUMN id TYPE VARCHAR(255) using id::VARCHAR(255);
    
    ALTER TABLE "Customers" ADD PRIMARY KEY (id);
    
    
    ALTER TABLE "Invoices"
      ADD CONSTRAINT "Invoices_customer_fkey"
      FOREIGN KEY (customer)
      REFERENCES "Customers"(id); 
    `);
  },

  async down(queryInterface) {
    queryInterface.sequelize.query(`
    ALTER TABLE "Invoices"  DROP CONSTRAINT "Invoices_customer_fkey";
    ALTER TABLE "Customers"  DROP CONSTRAINT "Customers_pkey";
    
    
    ALTER TABLE "Invoices"
    ALTER COLUMN customer TYPE BIGINT using customer::BIGINT;
    
    ALTER TABLE "Customers"
    ALTER COLUMN id TYPE BIGINT using id::BIGINT;
    
    ALTER TABLE "Customers" ADD PRIMARY KEY (id);
    
    
    ALTER TABLE "Invoices"
      ADD CONSTRAINT Invoices_customer_fkey
      FOREIGN KEY (customer)
      REFERENCES "Customers"(id);
    `);
  }
};