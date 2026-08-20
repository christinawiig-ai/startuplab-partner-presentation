/**
 * slides-dark.js — de dristige, mørke malene.
 * Disse bærer tyngden i en publikumspresentasjon: åpning, seksjonsskift,
 * store bilder, film og tall.
 */

const K = require("./kit");
const { C, F, T, W, H, M, Y } = K;

/** 1 — Forside: helflate-bilde, slør, stor tittel. */
function cover(pptx) {
  const s = pptx.addSlide();
  K.photo(s, "cover.jpg", { x: 0, y: 0, w: W, h: H, helflate: true });
  K.scrim(s, pptx, { transparency: 46 });

  // Hvit, ikke rød: rødt på et mørkt foto blir for svakt til å leses bakerst i salen
  K.eyebrow(s, "Startuplab · Partner Gathering", { y: 3.95, color: C.white });
  s.addText(K.accented("Bygger det [neste] kapittelet", { color: C.white, accent: C.red }), {
    x: M.x, y: 4.38, w: 10.6, h: 1.75,
    fontFace: F.display, fontSize: T.cover, lineSpacingMultiple: 0.92, margin: 0, valign: "top",
  });
  K.logo(s, "white");
  K.footNote(s, "Oslo · januar 2026", { color: C.white });
  s.addNotes(
    "FORSIDE. Bytt bilde: høyreklikk på bildet > Endre bilde > Fra en fil. " +
    "Velg et bilde med et rolig parti nede til venstre, ellers konkurrerer motivet med tittelen. " +
    "Vil du flytte det røde ordet: marker ordet og sett skriftfargen til rød (FF3333)."
  );
  return s;
}

/** 2 — Seksjonsskille: full rød flate, plakat-typografi. */
function sectionDivider(pptx) {
  const s = pptx.addSlide();
  K.fill(s, C.red);

  K.eyebrow(s, "Del to", { y: 2.35, w: W - M.x * 2, color: C.white });
  s.addText("2025\nI KORTE TREKK", {
    x: M.x, y: 2.78, w: W - M.x * 2, h: 2.6,
    fontFace: F.display, fontSize: T.poster, color: C.white,
    lineSpacingMultiple: 0.85, margin: 0, valign: "top",
  });
  K.logo(s, "white");
  s.addNotes(
    "SEKSJONSSKILLE. Bruk mellom hoveddeler så publikum får en pause og vet hvor de er. " +
    "Maks to korte linjer, ellers mister plakaten kraften."
  );
  return s;
}

/** 3 — Utsagn: én setning som skal lande. */
function statement(pptx) {
  const s = pptx.addSlide();
  K.fill(s, C.black);

  K.eyebrow(s, "Vårt standpunkt", { y: 2.15 });
  s.addText(
    K.accented("Vi bygger ikke\npilotprosjekter.\nVi bygger [selskaper].", { color: C.white, accent: C.red }),
    {
      x: M.x, y: 2.6, w: 11.4, h: 2.9,
      fontFace: F.display, fontSize: 52, lineSpacingMultiple: 0.98, margin: 0, valign: "top",
    }
  );
  K.logo(s, "white");
  s.addNotes(
    "UTSAGN. Én setning, maks tre linjer. Dette er sliden du lar henge i stillhet " +
    "et par sekunder før du snakker videre."
  );
  return s;
}

/** 4 — Helflate-bilde med tittel: la fotoet fortelle. */
function fullBleedPhoto(pptx) {
  const s = pptx.addSlide();
  K.photo(s, "fullbleed.jpg", { x: 0, y: 0, w: W, h: H, helflate: true });
  K.scrim(s, pptx, { transparency: 38 });

  // Hvit av samme grunn som på forsiden: rødt drukner i fotoet
  K.eyebrow(s, "Startuplab Summit", { y: 4.3, color: C.white });
  s.addText("Der partnere og gründere\nfaktisk møtes", {
    x: M.x, y: 4.73, w: 9.8, h: 1.5,
    fontFace: F.head, fontSize: T.title, bold: true, color: C.white,
    lineSpacingMultiple: 1.0, margin: 0, valign: "top",
  });
  K.logo(s, "white");
  s.addNotes(
    "HELFLATE-BILDE. Sløret over bildet er en egen firkant: klikk den og juster " +
    "gjennomsiktigheten hvis ditt bilde er lysere eller mørkere enn dette."
  );
  return s;
}

/** 5 — Film: hele flaten er filmen. */
function video(pptx) {
  const s = pptx.addSlide();
  K.fill(s, C.black);

  // Filmflate i hele slidens bredde, samme format som lerretet
  s.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: W, h: H,
    fill: { color: "000000" }, line: { type: "none" },
  });

  // Avspillingsmerke midt på
  s.addShape(pptx.ShapeType.ellipse, {
    x: W / 2 - 0.55, y: H / 2 - 0.55, w: 1.1, h: 1.1,
    fill: { color: C.red }, line: { type: "none" },
  });
  s.addShape(pptx.ShapeType.triangle, {
    x: W / 2 - 0.17, y: H / 2 - 0.23, w: 0.42, h: 0.46,
    fill: { color: C.white }, line: { type: "none" }, rotate: 90,
  });

  K.eyebrow(s, "Se filmen", { y: 0.78 });
  s.addText(K.accented("Året i [bevegelse]", { color: C.white, accent: C.red }), {
    x: M.x, y: 1.18, w: 10, h: 0.8,
    fontFace: F.head, fontSize: T.title, bold: true, margin: 0, valign: "top",
  });
  K.logo(s, "white");
  s.addNotes(
    "FILM. Slik legger du inn filmen: Sett inn > Video > Denne enheten. " +
    "Dra filmen så den dekker hele flaten, høyreklikk > Send bakover slik at " +
    "tittelen og avspillingsmerket blir liggende oppå. " +
    "Under Avspilling velger du Start automatisk hvis den skal gå av seg selv. " +
    "Slett den røde sirkelen og trekanten når den ekte filmen er på plass."
  );
  return s;
}

/** 6 — Programkort: fem stående bilder med etikett under. */
function programCards(pptx) {
  const s = pptx.addSlide();
  K.fill(s, C.black);

  K.eyebrow(s, "Industriprogrammer");
  K.title(s, "Fem sektorer, ett [nettverk]");

  const items = [
    { label: "Energy", file: "card-energy.jpg" },
    { label: "Ocean", file: "card-ocean.jpg" },
    { label: "Hardware", file: "card-hardware.jpg" },
    { label: "Construction", file: "card-construction.jpg" },
    { label: "Defence", file: "card-defence.jpg" },
  ];
  const gap = 0.28;
  const cw = (W - M.x * 2 - gap * 4) / 5; // 2.10
  const ch = 3.2;
  const cy = Y.content;

  items.forEach((it, i) => {
    const cx = M.x + i * (cw + gap);
    K.photo(s, it.file, { x: cx, y: cy, w: cw, h: ch });
    // Bildene er allerede lagt i samme toneleie av prepare-media.py. Et slør
    // her legger like mye svart på et lyst og et mørkt bilde og jevner derfor
    // ikke ut noe; det er kun der for å dempe kortene mot bakgrunnen.
    K.scrim(s, pptx, { x: cx, y: cy, w: cw, h: ch, transparency: 72 });
    s.addText(it.label, {
      x: cx, y: cy + ch + 0.22, w: cw, h: 0.44,
      fontFace: F.head, fontSize: 19, bold: true, color: C.white,
      align: "center", margin: 0, valign: "middle",
    });
  });
  K.logo(s, "white");
  s.addNotes(
    "PROGRAMKORT. Fem kort er maks på bredden. Trenger du fire, slett ett kort " +
    "og dra de andre utover så mellomrommene blir like. " +
    "Bytter du ut et bilde, kjør prepare-media.py på det først: den legger " +
    "alle kortbildene i samme lysstyrke og fargestyrke, ellers spriker raden."
  );
  return s;
}

/** 7 — Stort tall: ett tall som gjør inntrykk. */
function heroStat(pptx) {
  const s = pptx.addSlide();
  K.fill(s, C.black);

  K.eyebrow(s, "Siden 2012", { y: 2.0 });
  s.addText("200+", {
    x: M.x, y: 2.32, w: 6.4, h: 2.1,
    fontFace: F.display, fontSize: 150, color: C.red,
    lineSpacingMultiple: 0.8, margin: 0, valign: "top",
  });
  s.addText("investeringer i norske\ntidligfaseselskaper", {
    x: M.x, y: 4.32, w: 6.2, h: 1.15,
    fontFace: F.head, fontSize: 27, bold: true, color: C.white,
    lineSpacingMultiple: 1.05, margin: 0, valign: "top",
  });
  s.addText(
    "Porteføljen har passert 12,2 milliarder kroner i samlet omsetning. Tallet hentes fra Northbase og oppdateres hvert kvartal.",
    {
      x: 7.9, y: 2.32, w: 4.55, h: 2.3,
      fontFace: F.body, fontSize: T.body, color: C.muted,
      lineSpacingMultiple: 1.35, margin: 0, valign: "top",
    }
  );
  K.logo(s, "white");
  s.addNotes(
    "STORT TALL. Ett tall per slide. Skal publikum huske to tall, bruk to slides. " +
    "Teksten til høyre er der for å oppgi kilde og forbehold, ikke for et nytt poeng."
  );
  return s;
}

/**
 * 9 — Kapittelskille: stort kapittelnummer med rosa omriss, tittel og en
 * indeksrekke som viser hvor i presentasjonen salen er.
 *
 * Skiller seg fra de to andre dramatiske malene med vilje: seksjonsskillet
 * er en rød plakat, utsagnet er ren typografi, og denne har et grafisk tall
 * med kontur. Tallet er dempet og rosa slik at rødt fortsatt er den eneste
 * aksentfargen på sliden.
 */
function chapter(pptx) {
  const s = pptx.addSlide();
  K.fill(s, C.black);

  // Kapittelnummeret. Svak kropp pluss rosa kant: et hult tall alene blir
  // bare en tynn strek på en så stor flate og forsvinner på projektor.
  // Tallet blør ut av høyre kant med hensikt.
  s.addText("02", {
    x: 6.9, y: 0.15, w: 7.4, h: 6.4,
    fontFace: F.display, fontSize: 400,
    color: "24272A",
    outline: { color: C.pink, size: 1.5 },
    margin: 0, valign: "middle",
  });

  K.eyebrow(s, "Kapittel", { y: 2.7 });
  s.addText("Velkommen", {
    x: M.x, y: 3.1, w: 6.6, h: 1.2,
    fontFace: F.display, fontSize: 60, color: C.white, margin: 0, valign: "top",
  });

  // Indeksrekken i én tekstboks. Ett tall per boks krever at man regner
  // bredden selv, og er anslaget noen hundredeler for trangt, brekker
  // tallet i to linjer.
  const kapitler = ["01", "02", "03", "04", "05"];
  const naa = 1; // 0-indeksert
  const rekke = [];
  kapitler.forEach((nr, i) => {
    rekke.push({
      text: nr,
      options: { fontSize: 26, color: i === naa ? C.red : C.muted, breakLine: false },
    });
    if (i < kapitler.length - 1) {
      rekke.push({ text: "   ", options: { fontSize: 26, breakLine: false } });
    }
  });
  s.addText(rekke, {
    x: M.x, y: 4.65, w: 7, h: 0.55,
    fontFace: F.display, margin: 0, valign: "middle",
  });

  K.logo(s, "white");
  s.addNotes(
    "KAPITTELSKILLE. To ting å endre per kapittel: det store tallet til høyre, " +
    "og hvilket tall i rekken som er rødt (marker det og sett rød FF3333, og sett " +
    "det forrige tilbake til grå 9BA1A5). " +
    "Kickeren står bare «Kapittel», så du slipper å endre den også. Vil du heller " +
    "ha temaet for delen der, skriv det inn. " +
    "Har du flere eller færre enn fem kapitler, legg til eller slett tall i rekken."
  );
  return s;
}

/**
 * 9 — Bilderad: overskrift og tre store liggende hovedbilder med bildetekst.
 * Teksten ligger under bildene, ikke oppå dem, så den holder full kontrast
 * og kan leses fra bakerste rad.
 */
function photoRow(pptx) {
  const s = pptx.addSlide();
  K.fill(s, C.black);

  K.eyebrow(s, "Året i bilder");
  K.title(s, "Tre øyeblikk fra [2025]");

  const items = [
    {
      file: "row-1.jpg",
      label: "Fullt hus",
      detail: "Over 400 deltakere på Demo Day i Forskningsparken.",
    },
    {
      file: "row-2.jpg",
      label: "Nye koblinger",
      detail: "Partnere og gründere møttes på tolv matchmaking-runder.",
    },
    {
      file: "row-3.jpg",
      label: "Ut i felt",
      detail: "Befaring med partnerne i Energy-programmet.",
    },
  ];

  const gap = 0.4;
  const iw = (W - M.x * 2 - gap * 2) / 3; // 3.61
  const ih = iw * 2 / 3; // liggende 3:2
  const iy = Y.content; // gir bildeteksten under nok luft ned til logoen

  items.forEach((it, i) => {
    const x = M.x + i * (iw + gap);
    K.photo(s, it.file, { x, y: iy, w: iw, h: ih });
    s.addText(it.label, {
      x, y: iy + ih + 0.2, w: iw, h: 0.46,
      fontFace: F.head, fontSize: 20, bold: true, color: C.white,
      margin: 0, valign: "middle",
    });
    s.addText(it.detail, {
      x, y: iy + ih + 0.68, w: iw, h: 0.72,
      fontFace: F.body, fontSize: T.small, color: C.muted,
      lineSpacingMultiple: 1.3, margin: 0, valign: "top",
    });
  });
  K.logo(s, "white");
  s.addNotes(
    "BILDERAD. Bildeteksten ligger under bildet, ikke oppå det, nettopp for å " +
    "være lesbar fra bakerste rad. Overskriften i hvitt er 20 pt, forklaringen 18 pt. " +
    "Bytt bilde: høyreklikk > Endre bilde, utsnittet beholdes. " +
    "Vil du ha fire bilder i stedet for tre: marker et bilde med tekstene under, " +
    "kopier settet, og sett bildebredden til 2,6 tommer på alle fire. " +
    "Hold forklaringen til to linjer, ellers treffer den logoen. " +
    "Kjør prepare-media.py på nye bilder, så legges de i samme lysstyrke som de andre."
  );
  return s;
}

/** 8 — Avslutning: rød flate, venstrestilt blokk. */
function closing(pptx) {
  const s = pptx.addSlide();
  K.fill(s, C.red);

  // Større blokk enn før: den forrige dekket bare venstre halvdel av en helt
  // tom rød flate og virket underdimensjonert som siste bilde i en presentasjon.
  const logoW = 5.8;
  s.addImage({ path: K.LOGO.white, x: M.x, y: 2.25, w: logoW, h: logoW / K.LOGO_RATIO });
  s.addText("Empowering Tech Founders to Go Further", {
    x: M.x, y: 4.62, w: 11, h: 0.7,
    fontFace: F.head, fontSize: 32, color: C.white, margin: 0, valign: "middle",
  });
  s.addText("startuplab.no", {
    x: M.x, y: 5.5, w: 10, h: 0.5,
    fontFace: F.body, fontSize: 22, color: C.white, margin: 0, valign: "middle",
  });
  s.addNotes(
    "AVSLUTNING. La den stå på skjermen mens du tar spørsmål. " +
    "Legg til e-post eller kontaktperson på linjen under nettadressen hvis salen skal kunne følge opp."
  );
  return s;
}

module.exports = { cover, sectionDivider, statement, fullBleedPhoto, video, programCards, heroStat, chapter, photoRow, closing };
