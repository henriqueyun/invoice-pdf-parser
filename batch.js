import fs from "fs/promises";
import path from "path";
import PDFParser from "pdf2json";

import parser from "./parser.js";

const LINEBREAK = /\r?\n/;

const LATEST_FILE_LENGTH = 57;

function createInvoiceFile(filename) {
    return new Promise((resolve, reject) => {
        const pdfParser = new PDFParser(this, 1);
    
        pdfParser.on("error", errData => {
            console.error(errData.parserError);
            reject(errData);
        });

        pdfParser.on("data", async () => {
            const txtFilename = `${path.basename(filename, ".pdf")}.txt`;
            await fs.writeFile(txtFilename, pdfParser.getRawTextContent());
            resolve(txtFilename);
        });

        pdfParser.loadPDF(`./invoices/${filename}`);
    });
}

async function parseInvoiceFile(filename) {
    try {
        const raw = await fs.readFile(filename, { encoding: "utf-8"});
        const data = raw.split(LINEBREAK);

        const isFileInLatestFormat = data.length === LATEST_FILE_LENGTH; 

        return parser.parseFile(data, isFileInLatestFormat);
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

async function parseAllFiles() {
    const filenames = await getInvoiceFilenames();

    return Promise.all(filenames.map(async (filename) => {
        const txtFilename = await createInvoiceFile(filename);
        return await parseInvoiceFile(txtFilename);
    }));
}

export default { parseAllFiles };