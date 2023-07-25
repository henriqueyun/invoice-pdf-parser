import fs from "fs/promises";
import PDFParser from "pdf2json";

import parser from "./parser.js";
import { FILENAME, LINEBREAK } from "./constants.js";

function createInvoiceFile() {
    const pdfParser = new PDFParser(this, 1);

    pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
    pdfParser.on("pdfParser_dataReady", async () => {
        await fs.writeFile(FILENAME, pdfParser.getRawTextContent());
    });

    pdfParser.loadPDF("./invoices/3004298116-05-2023.pdf");
}

async function parseInvoiceFile() {
    try {
        const raw = await fs.readFile(FILENAME, { encoding: "utf-8"});
        const data = raw.split(LINEBREAK);

        const client = parser.parseClient(data);
        const invoice = parser.parseInvoice(data);
        const energy = parser.parseProduct(data, "Energia Elétrica", 2);
        const energyWithoutICMS = parser.parseProduct(data, "En comp. s/ ICMS", 3);
        const injectedHFPElenergy = parser.parseProduct(data, "Energia injetada HFP", 4);

        return {client, invoice, energy, energyWithoutICMS, injectedHFPElenergy};
    } catch (err) {
        console.error(err);
    }
}

createInvoiceFile();
parseInvoiceFile();