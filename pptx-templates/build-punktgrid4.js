/**
 * build-punktgrid4.js — begge oppsettene av punktgrid med fire punkter.
 * Slide 1 = fire pa én rad, slide 2 = 2x2.
 * Egen fil fordi hovedmalene kan vaere apne i PowerPoint.
 */

const pptxgen = require("pptxgenjs");
const light = require("./slides-light");

const pptx = new pptxgen();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "Startuplab";
pptx.company = "Startuplab";

light.featureGrid4(pptx, "rad");
light.featureGrid4(pptx, "kvadrat");

pptx
  .writeFile({ fileName: "Startuplab-punktgrid-fire.pptx" })
  .then(() => console.log("Skrev Startuplab-punktgrid-fire.pptx (rad = slide 1, 2x2 = slide 2)"));
