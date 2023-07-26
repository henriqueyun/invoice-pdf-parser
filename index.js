import fs from "fs/promises";
import path from "path";
import PDFParser from "pdf2json";

import parser from "./parser.js";

const LINEBREAK = /\r?\n/;

function createInvoiceFile(filename) {
    return new Promise((resolve, reject) => {
        const pdfParser = new PDFParser(this, 1);
    
        pdfParser.on("pdfParser_dataError", errData => {
            console.error(errData.parserError);
            reject(errData);
        });

        pdfParser.on("pdfParser_dataReady", async (pdfData) => {
            const txtFilename = `${path.basename(filename, ".pdf")}.txt`;
            if (pdfData) {
                await fs.writeFile(txtFilename, pdfParser.getRawTextContent());
                return;
            }
            resolve(txtFilename);
        });

        pdfParser.loadPDF(`./invoices/${filename}`);
    });
}

async function parseInvoiceFile(filename) {
    try {
        const raw = await fs.readFile(filename, { encoding: "utf-8"});
        const data = raw.split(LINEBREAK);

        const client = parser.parseClient(data);
        const invoice = parser.parseInvoice(data);
        const energy = parser.parseProduct(data, "Energia Elétrica", 2);
        const energyWithoutICMS = parser.parseProduct(data, "En comp. s/ ICMS", 3);
        const injectedHFPElenergy = parser.parseProduct(data, "Energia injetada HFP", 4);

        return { client, invoice, energy, energyWithoutICMS, injectedHFPElenergy };
    } catch (err) {
        console.error(err);
    }
}

async function getInvoiceFilenames() {
    try {
        return await fs.readdir("./invoices");
    } catch (err) {
        console.error(err);
    }
}

async function parse() {
    const filenames = await getInvoiceFilenames();
    
    filenames.map(async (filename) => {
        const txtFilename = await createInvoiceFile(filename);
        await parseInvoiceFile(txtFilename);
    });
}

await parse();