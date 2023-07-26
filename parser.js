const WHITESPACE = /\s+/;

function parseClient(data) {
    const client = {};
    client.name = data[30];
    client.cpfFragment = data[34].split(WHITESPACE)[1];
    client.clientId = data[35].split(WHITESPACE)[data[35].split(WHITESPACE).length - 2];
    return client;
}

function parseInvoice(data) {
    const invoice = {};
    invoice.monthReference = data[37].split(WHITESPACE)[1];
    invoice.dueDate = data[37].split(WHITESPACE)[2];
    invoice.totalPrice = data[37].split(WHITESPACE)[2];
    invoice.streetLigthingContribution = data[5].split("Contrib Ilum Publica Municipal")[1].trim();
    return invoice;
}

function parseProduct(data, productName, index) {
    const line = data[index].split(productName).slice(1).join("");
    const product = {};
    product.id = productName;
    product.energyUnity = line.split(WHITESPACE)[0];
    product.energyUnityPrice = line.split(WHITESPACE)[1];
    product.energyUnity = line.split(WHITESPACE)[2];
    product.energyPrice = line.split(WHITESPACE)[3];
    product.unitTax = line.split(WHITESPACE)[4];
    return product;
}

export default { parseClient, parseInvoice, parseProduct };