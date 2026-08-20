/**
 * build-en-mal.js — bygger én enkelt mal til sin egen fil.
 *
 * Nyttig når hovedfilene er åpne i PowerPoint: da kan de ikke skrives til, og
 * en full ombygging ville uansett overskrevet innhold som er fylt inn manuelt.
 *
 * Bruk:  node build-en-mal.js team5 "Startuplab-teamslide-5-personer.pptx"
 */

const pptxgen = require("pptxgenjs");
const dark = require("./slides-dark");
const light = require("./slides-light");

const MALER = { ...dark, ...light };

const navn = process.argv[2];
const filnavn = process.argv[3] || `${navn}.pptx`;

if (!navn || !MALER[navn]) {
  console.error(`Ukjent mal: ${navn || "(ingen oppgitt)"}`);
  console.error(`Tilgjengelige: ${Object.keys(MALER).sort().join(", ")}`);
  process.exit(1);
}

const pptx = new pptxgen();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "Startuplab";
pptx.company = "Startuplab";
MALER[navn](pptx);

pptx.writeFile({ fileName: filnavn }).then(() => console.log(`Skrev ${filnavn} (mal: ${navn})`));
