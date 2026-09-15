/**
 * build.js — setter sammen slidemalene til én .pptx.
 *
 * Rekkefolgen under er en dramaturgi, ikke en tilfeldig liste: morkt og
 * lyst veksler, sa oyet far pause mellom de tunge slidene.
 *
 * ADVARSEL: dette skriptet OVERSKRIVER Startuplab-slidemaler.pptx. Har du
 * fylt inn eget innhold i den fila, ta en kopi forst. Skal du bare legge til
 * eller justere EN mal, bygg den til en egen fil i stedet: se build-eir.js.
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
  dark.chapter,         // 10 morkt — kapittelskille midt i settet
  light.photoGrid,      // 11 lyst
  dark.statement,       // 12 morkt
  light.quote,          // 13 lyst
  dark.photoRow,        // 14 morkt — bryter opp tre lyse slides pa rad
  light.timeline,                     // 15 lyst
  // Begge portrettformene ligger i decket. Christina velger per presentasjon.
  (p) => light.team(p, "sirkel"),     // 16 lyst
  (p) => light.team(p, "avrundet"),   // 17 lyst
  // EiR-blokken: hero-sliden er mork med vilje og bryter opp de lyse slidene
  // rundt seg, i tillegg til at den introduserer folke-veggen.
  //
  // Bare fire personer her. Seks-varianten ble bygget, vist og forkastet
  // 20.8.2026: for mye tekst spredt utover flaten. Malen tar fortsatt 3-6,
  // sa bytt tallet under hvis du trenger et annet antall.
  dark.offeringHero,                                    // 18 morkt
  (p) => light.peopleExpertise(p, 4, "avrundet"),       // 19 lyst
  dark.video,                                           // 20 morkt
  dark.closing,                                         // 21 rodt
];

order.forEach((fn) => fn(pptx));

// To utgaver fra samme kilde. SL_RUNDE=1 gir avrundede hjorner paa bildene
// som ligger inne paa sliden; helflate-bildene rundes aldri.
const filnavn = require("./kit").RUNDE
  ? "Startuplab-slidemaler-avrundet.pptx"
  : "Startuplab-slidemaler.pptx";

pptx.writeFile({ fileName: filnavn }).then(() => console.log(`Skrev ${filnavn} (${order.length} slides)`));
