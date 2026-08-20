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

const photoPath = (name) => path.join(MEDIA, name);

// ── Byggeklosser ───────────────────────────────────────────────────────

/** Liten kicker med versaler over en tittel. */
function eyebrow(slide, text, { x = M.x, y = Y.eyebrow, w = 9, color } = {}) {
  slide.addText(String(text).toUpperCase(), {
    x, y, w, h: 0.32,
    fontFace: F.body, fontSize: T.label, bold: true,
    color: color || C.red, charSpacing: 2.5, margin: 0, valign: "middle",
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

/** Bilde som fyller rammen sin (beskjærer, forvrenger aldri). */
function photo(slide, file, { x, y, w, h }) {
  slide.addImage({
    path: photoPath(file), x, y, w, h,
    sizing: { type: "cover", w, h },
  });
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

/** Liten notis nede til høyre, f.eks. sted og dato. */
function footNote(slide, text, { color = C.muted } = {}) {
  slide.addText(text, {
    x: W - 5.35, y: Y.logo - 0.02, w: 4.5, h: 0.44,
    fontFace: F.body, fontSize: T.caption, color,
    align: "right", margin: 0, valign: "middle",
  });
}

module.exports = {
  W, H, M, Y, C, F, T, LOGO, LOGO_RATIO, MEDIA, BRAND,
  photoPath, eyebrow, title, logo, photo, scrim, fill, accented, footNote,
};
