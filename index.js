import { Customer, Invoice, Item } from "./db.js";

import batch from "./batch.js";

async function insertIntoDatabase() {
    try {
        const invoices = await batch.parseAllFiles();
        await Promise.all(invoices.map(async (data) => {
            if (!(await Customer.findByPk(data.customer.id))) {
                const customer = Customer.build({ ...data.customer });
                try {
                    await customer.save();
                } catch (err) {
                    if (err.name === "SequelizeUniqueConstraintError") {
                        console.error(`customer ${customer.id} already exists, skipping insertion...`);
                    } else {
                        console.error(err);
                    }
                }
            }

            const invoice = Invoice.build({
                ...data.invoice,
                totalPrice: parseFloat(data.invoice.totalPrice.replace(",", ".")),
                streetLigthingContribution: parseFloat(data.invoice.streetLigthingContribution.replace(",", ".")),
                customer: data.customer.id
            });
            await invoice.save();

            const energyA = Item.build({
                ...data.energyA,
                energyPrice: parseFloat(data.energyA.energyPrice.replace(",", ".")),
                energyUnitPrice: parseFloat(data.energyA.energyUnitPrice.replace(",", ".")),
                unitTax: parseFloat(data.energyA.unitTax.replace(",", ".")),
                invoice: invoice.id
            });
            await energyA.save();

            const energyB = Item.build({
                ...data.energyB,
                energyPrice: parseFloat(data.energyB.energyPrice.replace(",", ".")),
                energyUnitPrice: parseFloat(data.energyB.energyUnitPrice.replace(",", ".")),
                unitTax: parseFloat(data.energyB.unitTax.replace(",", ".")),
                invoice: invoice.id
            });
            await energyB.save();

            const energyC = Item.build({
                ...data.energyC,
                energyPrice: parseFloat(data.energyC.energyPrice.replace(",", ".")),
                energyUnitPrice: parseFloat(data.energyC.energyUnitPrice.replace(",", ".")),
                unitTax: parseFloat(data.energyC.unitTax.replace(",", ".")),
                invoice: invoice.id
            });
            await energyC.save();

        }));
    } catch (err) {
        console.error(err);
    }
}

insertIntoDatabase();