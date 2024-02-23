const PDFMerger = require('pdf-merger-js');

const merger = new PDFMerger();

async function mergePdf(pdf, pages, nameToSave) {
   try {
    await merger.add(`public/temp/${pdf}`, ...pages);
    await merger.save(`public/temp/${nameToSave}.pdf`); //save under given name and reset the internal document
} catch (error) {
    throw error;
   }
}

module.exports = {
    mergePdf
}