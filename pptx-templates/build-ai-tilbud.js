/**
 * build-ai-tilbud.js — AI-tilbudene til partnerne, til partner gathering
 * 20.8.2026. Egen fil, så hovedmalene og Startuplab-eir.pptx blir urørt.
 *
 * Slide 1: trappen «Fra demo til skalering», etter Christinas eget forelegg.
 * Slide 2: de fire AI-initiativene som parallelle tilbud.
 *
 * Teksten på slide 1 er Christinas, kortet ned der spalten er 1,65 tommer
 * bred. Originalen står i kommentar over hver linje som er endret.
 *
 * NAVNEVALG: «Vibecoding», ikke «VibeLabs». Vibelabs er en ekstern leverandør
 * Startuplab kjøper kursene fra (samarbeidsavtale og fakturagrunnlag ligger i
 * brain/), og memory-regelen sier at underleverandørnavn ikke hører i
 * partnervendte decks. Salen i dag er partnere: DNB, Statnett, OBOS,
 * Oslobygg, Hafslund, Telenor med flere.
 */

const pptxgen = require("pptxgenjs");
const light = require("./slides-light");

const pptx = new pptxgen();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "Startuplab";
pptx.company = "Startuplab";

// ── Slide 1: trappen ───────────────────────────────────────────────────
// Nivåene stemmer med brain/partnerprogram.md: heldags grunnkurs med ca. 25
// deltakere, Champions-sertifisering som eget dagskurs for de beste, og
// Pilot-to-Production Bridge.
light.ladderCards(pptx, {
  kicker: "Vibecoding",
  tittel: "Fra demo til [skalering]",
  trinn: [
    {
      navn: "Leadership\nDemo",
      omfang: "60-90 min",
      // Original: «Ledelsen opplever teknologien selv. Det dere ser i dag.»
      // Kuttet til 25 tegn: spalten tar tre linjer à ca. 12 tegn. Andre
      // setningen er sann bare den dagen sliden faktisk vises.
      hva: "Ledelsen prøver det selv.",
    },
    {
      // Bindestreken er satt for hånd. Ordet er 20 tegn og kolonnen tar 12,
      // så PowerPoint delte det som «Inspirasjonsf / oredrag».
      navn: "Inspirasjons-\nforedrag",
      omfang: "30 min",
      // Original: «30 min, 50-300+ ansatte» + «Live demo: fra tom skjerm til
      // ferdig app på 25 min». KUTTET: publikumstallet 50-300. Det fikk ikke
      // plass noe sted uten å ta en fjerde linje, og «25 min» er det tallet
      // som overrasker en sal. Si 50-300 muntlig i stedet.
      hva: "Tom skjerm til app på 25 min.",
    },
    {
      navn: "Level 1\nGrunnkurs",
      omfang: "1 dag, 20-30",
      // Original: «Ikke-tekniske ansatte bygger og deployer live».
      // «ansatte» kuttet for å komme ned på tre linjer, «ikke-tekniske» er
      // beholdt: det er hele poenget med kurset.
      hva: "Ikke-tekniske bygger og deployer.",
    },
    {
      navn: "Level 2\nChampions",
      // Original: «1 dag, topp 25%». «1 dag» kuttet: 16 tegn brakk i to og
      // la seg oppå linjen under. Dagen er den samme som Level 1.
      omfang: "Topp 25 %",
      hva: "Avanserte verktøy og sertifisering.",
    },
    {
      navn: "Pilot til\nproduksjon",
      omfang: "Løpende",
      // Original: «IT-governance, sikkerhet, prototyper blir støttede verktøy»
      hva: "Prototypen blir et støttet verktøy.",
    },
  ],
  bunnlinje: "Dere velger hvor på trappen dere starter, og hvor langt dere går.",
});

// ── Slide 2: de fire initiativene ──────────────────────────────────────
//
// Rekkefølgen er stigende forpliktelse, bestemt av Christina 20.8: det
// lettest sagte ja først, det tyngste sist. Ingen faktalinjer: tid, antall
// deltakere og partnernavn er tatt ut med vilje. Tallene hører i samtalen,
// og partnernavn skal ikke stå foran andre partnere.
light.offerCards(pptx, [
  {
    // Trinn 01 og 02 i trappen, løftet ut som eget tilbud.
    navn: "Demo og foredrag",
    lofte: "Live demo på deres scene, ikke vår.",
  },
  {
    // Het «Vibecoding» først. Beskriver nå tjenesten i stedet for å navngi
    // den, som er samme grep som at leverandørnavnet holdes ute.
    navn: "Kurs i AI-assistert koding",
    lofte: "Bygg med AI, ikke bare snakk om det.",
  },
  {
    // Het «Vibesprint» først, omdøpt av Christina 20.8.
    navn: "AI Sprint",
    // UTKAST: innholdet i sprinten er ikke beskrevet noe sted jeg fant.
    lofte: "Én reell utfordring, fra idé til demo.",
  },
  {
    navn: "CTO Forum",
    // KILDE: CTO Forum konsept.md, «ikke nok en AI-konferanse», lukket forum
    // på CTO-nivå, temaer meldes inn av deltakerne på forhånd.
    lofte: "Teknologiledere, ikke en konferanse.",
  },
]);

pptx
  .writeFile({ fileName: "Startuplab-ai-tilbud.pptx" })
  .then(() => console.log("Skrev Startuplab-ai-tilbud.pptx (trappen + fire kort)"));
