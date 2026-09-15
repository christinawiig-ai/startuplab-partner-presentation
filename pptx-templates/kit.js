/**
 * kit.js — delt designsystem for Startuplab-slidemalene.
 *
 * All farge, typografi og plassering bor her, slik at en endring ett sted
 * slår gjennom på alle 15 malene. Verdiene er hentet fra den offisielle
 * brand-paletten i brain/brand-guidelines.md, ikke gjettet.
 */

const path = require("path");

// ── Lerret ─────────────────────────────────────────────────────────────
// LAYOUT_WIDE = 13.333 x 7.5 tommer (16:9)
const W = 13.333;
const H = 7.5;

// Romslige marger. Publikumspresentasjon tåler ikke trange kanter.
const M = { x: 0.85 };

// Vertikalt raster. Alt innhold skal starte og slutte innenfor dette,
// slik at logoen nederst aldri kolliderer med tekst.
const Y = {
  eyebrow: 0.78,
  title: 1.15,
  content: 2.45,
  contentBottom: 6.35, // hardt tak: ingenting under denne linjen
  logo: 6.6,
};

// ── Farger (offisiell SL-palett) ───────────────────────────────────────
const C = {
  red: "FF3333",
  black: "131415",
  deepBlack: "050505",
  darkCard: "161819",
  white: "FFFFFF",
  offWhite: "F7F7F7",
  lightGray: "F0F0F0",
  // #9BA1A5 gir 7:1 mot mørk bakgrunn, men bare 2,6:1 mot hvit. Samme token
  // på begge flater gjorde sekundærteksten uleselig bakerst i salen på de
  // lyse malene, så lys og mørk har hver sin gråtone.
  muted: "9BA1A5",      // kun på mørk bakgrunn
  mutedOnLight: "5A6166", // ~5,8:1 mot hvitt
  stepGray: "5A6166",   // inaktive steg: underordnet rødt, men fortsatt lesbart
  pink: "FFE5EA",
};

// ── Typografi ──────────────────────────────────────────────────────────
// Replica LL = brand-font for overskrifter. Inter = brødtekst.
// Begge er verifisert installert og rendret riktig av PowerPoint.
const F = {
  display: "Replica LL TT Heavy", // plakat-størrelser
  head: "Replica LL TT", // titler (bruk bold: true)
  body: "Inter",
};

// Skalaen er løftet for publikum: minste brødtekst er 18pt, ikke 14-16.
const T = {
  poster: 92,
  cover: 54,
  title: 40,
  lead: 24,
  cardTitle: 23,
  body: 20,
  small: 18,
  caption: 18,
  label: 16, // kun versaler med sperring, aldri løpende tekst
};

// ── Assets ─────────────────────────────────────────────────────────────
const BRAND = path.join(__dirname, "..", "brand-profile");

// Bildene ligger ferdig beskåret og nedskalert i media/, laget av
// prepare-media.py. Originalene er opptil 6240 px brede: legges de rett inn
// blir .pptx-fila 39 MB i stedet for et par, uten at det synes på skjermen.
const MEDIA = path.join(__dirname, "media");

// Logoene er beskåret av prepare-media.py. Originalfilene har 12,5 %
// gjennomsiktig luft i sidene, som gjorde at logoens venstrekant ikke sto på
// linje med teksten under den.
const LOGO = {
  white: path.join(MEDIA, "logo-white.png"),
  red: path.join(MEDIA, "logo-red.png"),
  black: path.join(MEDIA, "logo-black.png"),
};
const LOGO_RATIO = 1128 / 416; // 2.712

/**
 * Avrundede hjørner på bildene som ligger inne på sliden. Skrus på med
 * miljøvariabelen SL_RUNDE=1, se README. Bryter, ikke en kopi av koden, så
 * begge versjoner bygges fra samme kilde.
 *
 * Helflate-bilder (forside, helflate-bilde, halvside-fotoet) rundes ALDRI:
 * de går ut i slidekanten, og et avrundet hjørne der gir en hvit flekk i
 * kanten av lerretet. prepare-media.py lager derfor bare avrundede utgaver
 * av bildene som har en visningsbredde definert.
 */
const RUNDE = process.env.SL_RUNDE === "1";

// Samme fysiske hjørnradius som prepare-media.py bruker på bildene. Endres
// den ene, må den andre endres likt, ellers får figurer og bilder ulik runding.
const RADIUS_TOMMER = 0.13;

/**
 * pptxgenjs tolker rectRadius som en andel mellom 0 og 1 av halve den korteste
 * siden, ikke som tommer. Denne regner om fra ønsket fysisk radius, slik at en
 * liten og en stor figur får samme runding på skjermen.
 */
function rectRadius(korteste) {
  return Math.min(1, RADIUS_TOMMER / (korteste / 2));
}

const photoPath = (name) => path.join(MEDIA, name);

/** Filnavnet for den avrundede utgaven av et bilde. */
function bildeRund(name) {
  return name.replace(/\.(jpg|png)$/i, "-rund.png");
}

/** Filnavnet for et bilde, avrundet utgave når bryteren står på. */
function bildeFil(name) {
  return RUNDE ? bildeRund(name) : name;
}

// ── Byggeklosser ───────────────────────────────────────────────────────

/**
 * Liten kicker med versaler over en tittel.
 * Bokstavavstanden er valgt visuelt: 2,5 spriket, 1,8 leser fortsatt som en
 * etikett uten å falle fra hverandre.
 */
function eyebrow(slide, text, { x = M.x, y = Y.eyebrow, w = 9, color } = {}) {
  slide.addText(String(text).toUpperCase(), {
    x, y, w, h: 0.32,
    fontFace: F.body, fontSize: T.label, bold: true,
    color: color || C.red, charSpacing: 1.8, margin: 0, valign: "middle",
  });
}

/** Standard slide-tittel. Sett aksentordet i [klammer]. */
function title(slide, text, { y = Y.title, w = 11.4, color = C.white, size = T.title } = {}) {
  slide.addText(accented(text, { color, accent: C.red }), {
    x: M.x, y, w, h: 0.85,
    fontFace: F.head, fontSize: size, bold: true,
    lineSpacingMultiple: 1.0, margin: 0, valign: "top",
  });
}

/** Startuplab-signaturen, nede til venstre. h er synlig høyde på merket. */
function logo(slide, variant = "white", { x = M.x, y = Y.logo, h = 0.34 } = {}) {
  slide.addImage({ path: LOGO[variant], x, y, w: h * LOGO_RATIO, h });
}

/**
 * Bilde som fyller rammen sin (beskjærer, forvrenger aldri).
 * `helflate: true` for bilder som går ut i slidekanten: de skal aldri rundes.
 */
function photo(slide, file, { x, y, w, h, helflate = false }) {
  const navn = helflate ? file : bildeFil(file);
  // De avrundede utgavene er ferdig beskåret til riktig format, så cover-
  // beskjæring der ville bare vært en omregning uten virkning.
  const sizing = helflate || !RUNDE ? { type: "cover", w, h } : undefined;
  slide.addImage({ path: photoPath(navn), x, y, w, h, sizing });
}

/**
 * Halvtransparent slør over et bilde, så tekst holder kontrast.
 * Eget options-objekt hver gang: pptxgenjs muterer dem.
 */
function scrim(slide, pptx, { x = 0, y = 0, w = W, h = H, transparency = 50, color = C.deepBlack } = {}) {
  slide.addShape(pptx.ShapeType.rect, {
    x, y, w, h,
    fill: { color, transparency },
    line: { type: "none" },
  });
}

/** Heldekkende flatfarge-bakgrunn. */
function fill(slide, color) {
  slide.background = { color };
}

/**
 * Deler "Ord med [aksent] i" til rike tekstbiter, så ett ord kan stå rødt.
 * Skriv aksenten i klammer: "Industry Program [Update]".
 *
 * Linjeskift må styres med breakLine på forrige bit, ikke med "\n" inne i
 * teksten: et "\n" avslutter avsnittet, og da havner den fargede biten
 * etter det på en helt egen linje. Det ga feil brekk på flere slides før
 * denne funksjonen håndterte linjeskiftene selv.
 */
function accented(text, { color, accent, ...rest }) {
  const runs = [];
  String(text)
    .split(/(\[[^\]]+\])/)
    .filter(Boolean)
    .forEach((part) => {
      const isAccent = part.startsWith("[") && part.endsWith("]");
      const raw = isAccent ? part.slice(1, -1) : part;
      const runColor = isAccent ? accent : color;

      raw.split("\n").forEach((line, i) => {
        if (i > 0 && runs.length) runs[runs.length - 1].options.breakLine = true;
        // Hopp over tomme biter. Star linjeskiftet rett foran et farget ord
        // ("...gjorde\n[mest] av"), gir splittingen en tom tekstbit, og en
        // tom tekstbit gjor at PowerPoint nekter a apne fila i det hele tatt.
        // Linjeskiftet er allerede tatt vare pa av breakLine over.
        if (line === "") return;
        runs.push({ text: line, options: { ...rest, color: runColor, breakLine: false } });
      });
    });
  return runs;
}

/**
 * Løftet bunnlinje: én setning som deler grunnlinje med logoen.
 *
 * Til en avsluttende påstand som skal leses, men ikke konkurrere med
 * innholdet over. Ligger under contentBottom med vilje: det er den eneste
 * plassen på sliden hvor det er rom til en hel setning når innholdsflaten
 * alt er full. Starter etter logoen og slutter i høyre marg, høyrestilt,
 * slik at den ikke ser ut som en løs setning midt i luften.
 */
function bottomLine(slide, text, { color = C.mutedOnLight, y = Y.logo - 0.03 } = {}) {
  // Logoen er 0,92 tommer bred ved standardhøyde. 1,55 gir luft nok til at
  // en lang setning ikke ser ut som en del av merket.
  const x = M.x + 1.55;
  slide.addText(text, {
    x, y, w: W - x - M.x, h: 0.44,
    fontFace: F.body, fontSize: T.small, color,
    align: "right", margin: 0, valign: "middle",
  });
}

/**
 * Tynn rad med emneord, skilt av røde punkter.
 *
 * Til kompetanse som gjelder en gruppe og ikke enkeltpersonene i den. Uten
 * denne raden må hvert kort gjenta de samme fagområdene, og kortene blir
 * for tekstunge til å leses fra bakerste rad.
 *
 * Punktene har som standard samme farge som ordene. Røde punkter ble prøvd
 * først, men på en lys slide er logoen alt rød, og på den mørke hero-sliden
 * er ett ord i tittelen rødt: da ble punktene den tredje røde tingen, og de
 * leste som støv i stedet for som skilletegn. Send inn `dot: C.red` bare på
 * en slide som ikke har noe annet rødt.
 *
 * Sperringen er 0,6 og ikke 1,8 som i kickeren over titlene. Kickeren er tre
 * ord og tåler å spres. Denne raden er seks til åtte ord med skilletegn
 * mellom, og med samme sperring lå bokstavene så løst at raden leste som
 * enkeltord strødd utover i stedet for som én linje.
 */
function topicRow(slide, topics, { y, x = M.x, w = W - M.x * 2, color = C.mutedOnLight, dot, align = "left" } = {}) {
  const runs = [];
  topics.forEach((t, i) => {
    if (i > 0) runs.push({ text: "  ·  ", options: { color: dot || color, bold: true } });
    runs.push({ text: String(t).toUpperCase(), options: { color } });
  });
  slide.addText(runs, {
    x, y, w, h: 0.3,
    fontFace: F.body, fontSize: T.label, bold: true, charSpacing: 0.6,
    align, margin: 0, valign: "middle",
  });
}

/**
 * Plassholder for et portrett som ikke er valgt ennå. `form` er "avrundet"
 * eller "sirkel", samme to formene som team-malene bruker.
 *
 * Egen funksjon fordi den brukes av flere folk-maler, og fordi teksten inne
 * i formen må skaleres ned når formen er liten.
 */
function portraitPlaceholder(slide, pptx, { x, y, d, form = "avrundet" }) {
  const rund = form === "avrundet";
  slide.addShape(rund ? pptx.ShapeType.roundRect : pptx.ShapeType.ellipse, {
    x, y, w: d, h: d,
    ...(rund ? { rectRadius: rectRadius(d) } : {}),
    fill: { color: C.lightGray }, line: { color: "D8DCDF", width: 1 },
  });
  // Under ca. 1,3 tommer er det ikke plass til to linjer inne i formen.
  const smal = d < 1.3;
  slide.addText(smal ? "Portrett" : "Sett inn\nportrett", {
    x, y: y + d / 2 - (smal ? 0.2 : 0.45), w: d, h: smal ? 0.4 : 0.9,
    fontFace: F.body, fontSize: smal ? 12 : T.caption, color: C.mutedOnLight,
    align: "center", lineSpacingMultiple: 1.2, margin: 0, valign: "middle",
  });
}

/**
 * Plassholder for et bilde som ikke er valgt ennå, i fritt format.
 * Egen funksjon og ikke portraitPlaceholder: den er kvadratisk og sentrerer
 * teksten etter én diameter, mens denne skal tåle liggende bildeflater.
 */
function mediaPlaceholder(slide, pptx, { x, y, w, h, tekst = "Sett inn bilde", form = "avrundet" }) {
  const rund = form === "avrundet";
  slide.addShape(rund ? pptx.ShapeType.roundRect : pptx.ShapeType.rect, {
    x, y, w, h,
    ...(rund ? { rectRadius: rectRadius(Math.min(w, h)) } : {}),
    fill: { color: C.lightGray }, line: { color: "D8DCDF", width: 1 },
  });
  slide.addText(tekst, {
    x, y: y + h / 2 - 0.2, w, h: 0.4,
    fontFace: F.body, fontSize: T.caption, color: C.mutedOnLight,
    align: "center", margin: 0, valign: "middle",
  });
}

/** Liten notis nede til høyre, f.eks. sted og dato. */
function footNote(slide, text, { color = C.muted } = {}) {
  slide.addText(text, {
    x: W - 5.35, y: Y.logo - 0.02, w: 4.5, h: 0.44,
    fontFace: F.body, fontSize: T.caption, color,
    align: "right", margin: 0, valign: "middle",
  });
}

module.exports = {
  W, H, M, Y, C, F, T, LOGO, LOGO_RATIO, MEDIA, BRAND, RUNDE, rectRadius,
  photoPath, bildeFil, bildeRund, eyebrow, title, logo, photo, scrim, fill, accented, footNote,
  bottomLine, topicRow, portraitPlaceholder, mediaPlaceholder,
};
