import config from "./models/index.cjs";

import customer from "./models/customer.cjs";
import invoice from "./models/invoice.cjs";
import item from "./models/item.cjs";

export const Customer = customer(config.sequelize, config.Sequelize.DataTypes);
export const Invoice = invoice(config.sequelize, config.Sequelize.DataTypes);
export const Item = item(config.sequelize, config.Sequelize.DataTypes);