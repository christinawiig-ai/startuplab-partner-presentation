/**
 * build.js — setter sammen de 15 slidemalene til én .pptx.
 *
 * Rekkefolgen under er en dramaturgi, ikke en tilfeldig liste: morkt og
 * lyst veksler, sa oyet far pause mellom de tunge slidene.
 */

const pptxgen = require("pptxgenjs");
const dark = require("./slides-dark");
const light = require("./slides-light");

const pptx = new pptxgen();
pptx.layout = "LAYOUT_WIDE"; // ma settes for forste addSlide
pptx.author = "Startuplab";
pptx.company = "Startuplab";
pptx.title = "Startuplab — slidemaler";

const order = [
  dark.cover,           // 1  morkt
  light.agenda,         // 2  lyst
  dark.sectionDivider,  // 3  rodt
  dark.heroStat,        // 4  morkt
  light.statsRow,       // 5  lyst
  dark.fullBleedPhoto,  // 6  morkt
  light.textPhotoSplit, // 7  lyst
  dark.programCards,    // 8  morkt
  light.featureGrid,    // 9  lyst
  light.photoGrid,      // 10 lyst
  dark.statement,       // 11 morkt
  light.quote,          // 12 lyst
  dark.photoRow,        // 13 morkt — bryter opp tre lyse slides pa rad
  light.timeline,       // 14 lyst
  light.team,           // 15 lyst
  dark.video,           // 16 morkt
  dark.closing,         // 17 rodt
];

order.forEach((fn) => fn(pptx));

pptx
  .writeFile({ fileName: "Startuplab-slidemaler.pptx" })
  .then(() => console.log(`Skrev Startuplab-slidemaler.pptx (${order.length} slides)`));
