/**
 * build-stor-rutenett.js — begge «storre bilder»-variantene i én fil.
 *
 * Slide 1 = variant A (innenfor margen), slide 2 = variant B (blor ut i
 * hoyre kant). Egen fil med vilje: hovedmalene kan vaere apne i PowerPoint,
 * og en full ombygging ville overskrevet innhold som er fylt inn manuelt.
 */

const pptxgen = require("pptxgenjs");
const light = require("./slides-light");

const pptx = new pptxgen();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "Startuplab";
pptx.company = "Startuplab";

light.photoGridStor(pptx, "a");
light.photoGridStor(pptx, "b");

pptx
  .writeFile({ fileName: "Startuplab-bilderutenett-storre.pptx" })
  .then(() => console.log("Skrev Startuplab-bilderutenett-storre.pptx (A = slide 1, B = slide 2)"));
