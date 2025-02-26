const WHITESPACE = /\s+/;

function parseCustomer(data, { isFileInLatestFormat } = { isFileInLatestFormat: true }) {

    const lineNumber = {
        name: isFileInLatestFormat ? 30 : 29,
        cpfFragment: isFileInLatestFormat ? 34 : 33,
        id: isFileInLatestFormat ? 35 : 34,
    };

    const customer = {};
    customer.name = data[lineNumber.name];
    customer.cpfFragment = data[lineNumber.cpfFragment].split(WHITESPACE)[1];
    customer.id = data[lineNumber.id].split(WHITESPACE)[data[lineNumber.id].split(WHITESPACE).length - 2];
    return customer;
}

function parseInvoice(data, { isFileInLatestFormat } = { isFileInLatestFormat: true }) {
    const lineNumber = {
        datesAndPrice: isFileInLatestFormat ? 37 : 36,
        streetLigthingContribution: 5
    };

    const invoice = {};
    invoice.monthReference = data[lineNumber.datesAndPrice].split(WHITESPACE)[1];
    invoice.dueDate = data[lineNumber.datesAndPrice].split(WHITESPACE)[2];
    invoice.totalPrice = data[lineNumber.datesAndPrice].split(WHITESPACE)[3];
    invoice.streetLigthingContribution = data[lineNumber.streetLigthingContribution].split("Contrib Ilum Publica Municipal")[1].trim();
    return invoice;
}

function parseProduct(data, index) {
    const productName = data[index].split("kWh")[0];
    const numericValues = data[index].split(WHITESPACE).slice(-5);
    
    const product = {};
    product.product = productName;
    product.energyUnit = `${numericValues[0]}kWh`;
    product.energyUnitPrice = numericValues[1];
    product.energyPrice = numericValues[2];
    product.unitTax = numericValues[3];
    return product;
}

function parseFile (data, isFileInLatestFormat) {
    const customer = parseCustomer(data, { isFileInLatestFormat });
    const invoice = parseInvoice(data, { isFileInLatestFormat });

    const energyA = parseProduct(data, 2);
    const energyB = parseProduct(data, 3);
    const energyC = parseProduct(data, 4);
    return { customer, invoice, energyA, energyB, energyC };
}
export default { parseFile };