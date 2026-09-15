/**
 * build-eir.js — de tre nye malene til EiR-nettverket.
 * Slide 1 = hero, slide 2 = fire personer, slide 3 = seks personer.
 *
 * Egen fil og ikke build.js: hovedmalene kan være åpne i PowerPoint, og en
 * full ombygging ville overskrevet innholdet som fylles inn der nå.
 */

const pptxgen = require("pptxgenjs");
const dark = require("./slides-dark");
const light = require("./slides-light");

const pptx = new pptxgen();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "Startuplab";
pptx.company = "Startuplab";

dark.offeringHero(pptx);
// Fire personer, avrundede firkanter. Seks-varianten ble vist og forkastet
// 20.8.2026: for mye tekst spredt utover. Malen tar fortsatt 3-6.
light.peopleExpertise(pptx, 4, "avrundet");

pptx
  .writeFile({ fileName: "Startuplab-eir.pptx" })
  .then(() => console.log("Skrev Startuplab-eir.pptx (hero + fire personer)"));
