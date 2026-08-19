/**
 * slides-light.js — de lyse malene.
 * Disse gir pusterom mellom de mørke og egner seg til innhold publikum
 * skal lese: program, sitat, folk, prosess og tall.
 *
 * Sekundærtekst bruker C.mutedOnLight, ikke C.muted: den lysere gråtonen
 * hører hjemme på mørk bakgrunn og faller under lesbar kontrast på hvitt.
 */

const K = require("./kit");
const { C, F, T, W, H, M, Y } = K;

/** 9 — Agenda: nummererte rader i tre kolonner. */
function agenda(pptx) {
  const s = pptx.addSlide();
  K.fill(s, C.white);

  K.eyebrow(s, "Agenda");
  K.title(s, "Dagens program", { color: C.black });

  const rows = [
    ["01", "Velkommen og formål", "Ove · 10 min"],
    ["02", "Året som gikk", "Christina · 15 min"],
    ["03", "Nye industriprogrammer", "Ola · 15 min"],
    ["04", "Arbeidsøkt i grupper", "Alle · 45 min"],
  ];
  const y0 = Y.content + 0.05, rh = 0.98;
  const metaX = 8.35;

  rows.forEach(([num, rowTitle, meta], i) => {
    const y = y0 + i * rh;
    s.addText(num, {
      x: M.x, y, w: 0.95, h: 0.62,
      fontFace: F.display, fontSize: 28, color: C.red, margin: 0, valign: "middle",
    });
    // Tittelboksen stopper før metakolonnen. Var den bredere, ville en lang
    // programpost legge seg oppå navnet til høyre.
    s.addText(rowTitle, {
      x: M.x + 1.05, y, w: metaX - (M.x + 1.05) - 0.15, h: 0.62,
      fontFace: F.head, fontSize: 26, bold: true, color: C.black, margin: 0, valign: "middle",
    });
    s.addText(meta, {
      x: metaX, y, w: 4.1, h: 0.62,
      fontFace: F.body, fontSize: T.body, color: C.mutedOnLight, margin: 0, valign: "middle",
    });
  });
  K.logo(s, "red");
  s.addNotes(
    "AGENDA. Fire rader er dimensjonert for plassen. Trenger du fem, marker " +
    "alle radene og minsk avstanden mellom dem til ca. 0,8 tommer først, " +
    "ellers havner den nederste raden oppå logoen."
  );
  return s;
}

/** 10 — Tekst og bilde: halv side foto, helt ut til kanten. */
function textPhotoSplit(pptx) {
  const s = pptx.addSlide();
  K.fill(s, C.white);

  const px = 6.95;
  K.photo(s, "split.jpg", { x: px, y: 0, w: W - px, h: H });

  K.eyebrow(s, "Slik jobber vi", { y: 1.95, w: 5.3 });
  s.addText(K.accented("Fra første møte\ntil signert [pilot]", { color: C.black, accent: C.red }), {
    x: M.x, y: 2.38, w: 5.4, h: 1.5,
    fontFace: F.head, fontSize: 34, bold: true, lineSpacingMultiple: 1.02, margin: 0, valign: "top",
  });
  s.addText(
    "Vi matcher partnerens konkrete utfordring mot selskaper vi allerede kjenner, og følger prosessen hele veien til en avtale som står på egne bein.",
    {
      x: M.x, y: 4.15, w: 5.25, h: 1.8,
      fontFace: F.body, fontSize: T.body, color: C.black,
      lineSpacingMultiple: 1.4, margin: 0, valign: "top",
    }
  );
  K.logo(s, "red");
  s.addNotes(
    "TEKST OG BILDE. Bildet går helt ut til kanten med vilje, ikke krymp det inn i en ramme. " +
    "Vil du ha bildet på venstre side: flytt bildet til x = 0 og tekstblokken til høyre halvdel."
  );
  return s;
}

/** 11 — Sitat: stort sitat med portrett. */
function quote(pptx) {
  const s = pptx.addSlide();
  K.fill(s, C.offWhite);

  s.addText(
    "«Startuplab er ikke bare et kontor. Det er et fellesskap som forstår hva det vil si å bygge fra null.»",
    {
      x: M.x, y: 1.75, w: 8.1, h: 2.4,
      fontFace: F.head, fontSize: 34, bold: true, color: C.black,
      lineSpacingMultiple: 1.15, margin: 0, valign: "top",
    }
  );
  s.addText("Navn Navnesen", {
    x: M.x, y: 4.35, w: 7, h: 0.44,
    fontFace: F.head, fontSize: 22, bold: true, color: C.black, margin: 0, valign: "middle",
  });
  s.addText("Rolle, Selskap", {
    x: M.x, y: 4.82, w: 7, h: 0.42,
    fontFace: F.body, fontSize: T.body, color: C.mutedOnLight, margin: 0, valign: "middle",
  });

  // Tom plass i stedet for et ekte portrett: et sitat skal komme fra en
  // partner, og en oppdiktet uttalelse skal ikke stå under ansiktet til en
  // navngitt kollega. Høyrekanten flukter med margen, som resten av settet.
  // Litt mørkere enn plassholderen på teamsliden: bakgrunnen her er offwhite,
  // og #F0F0F0 mot #F7F7F7 forsvant nesten helt.
  const d = 2.5;
  s.addShape(pptx.ShapeType.ellipse, {
    x: W - M.x - d, y: 2.05, w: d, h: d,
    fill: { color: "E6E9EB" }, line: { color: "D2D7DA", width: 1 },
  });
  s.addText("Sett inn\nportrett", {
    x: W - M.x - d, y: 2.05 + d / 2 - 0.45, w: d, h: 0.9,
    fontFace: F.body, fontSize: T.caption, color: C.mutedOnLight,
    align: "center", lineSpacingMultiple: 1.2, margin: 0, valign: "middle",
  });
  K.logo(s, "red");
  s.addNotes(
    "SITAT. Hold sitatet under 25 ord, ellers slutter salen å lese før du er ferdig å snakke. " +
    "Både sitatet og navnet er plassholdere: bytt dem før du presenterer. " +
    "Sirkelen er rundt maskert, så et innsatt portrett beholder formen."
  );
  return s;
}

/** 12 — Punktgrid: seks korte poeng med tall. */
function featureGrid(pptx) {
  const s = pptx.addSlide();
  K.fill(s, C.white);

  K.eyebrow(s, "Hva partnerskapet gir");
  K.title(s, "Seks konkrete [leveranser]", { color: C.black });

  const items = [
    ["01", "Matchmaking", "Kuraterte møter med selskaper som treffer."],
    ["02", "Pilotstøtte", "Vi rigger og følger opp piloten til evaluering."],
    ["03", "Innsikt", "Kvartalsvise rapporter fra porteføljen."],
    ["04", "Nettverk", "Tilgang til 4 000+ gründere og fagmiljøer."],
    ["05", "Synlighet", "Profilering på våre arrangementer og kanaler."],
    ["06", "Kompetanse", "Workshops og kurs for teamene deres."],
  ];
  const gapX = 0.55;
  const cw = (W - M.x * 2 - gapX * 2) / 3; // 3.51
  const y0 = Y.content + 0.1, rh = 1.9;

  items.forEach(([num, itemTitle, body], i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = M.x + col * (cw + gapX);
    const y = y0 + row * rh;
    s.addText(num, {
      x, y, w: cw, h: 0.4,
      fontFace: F.display, fontSize: 22, color: C.red, margin: 0, valign: "middle",
    });
    s.addText(itemTitle, {
      x, y: y + 0.42, w: cw, h: 0.46,
      fontFace: F.head, fontSize: T.cardTitle, bold: true, color: C.black, margin: 0, valign: "middle",
    });
    s.addText(body, {
      x, y: y + 0.9, w: cw, h: 0.85,
      fontFace: F.body, fontSize: T.small, color: C.mutedOnLight,
      lineSpacingMultiple: 1.3, margin: 0, valign: "top",
    });
  });
  K.logo(s, "red");
  s.addNotes(
    "PUNKTGRID. Seks er taket. Hold hver beskrivelse til to linjer, ellers " +
    "kolliderer nederste rad med logoen."
  );
  return s;
}

/** 13 — Folk: runde portretter. */
function team(pptx) {
  const s = pptx.addSlide();
  K.fill(s, C.white);

  K.eyebrow(s, "Teamet");
  K.title(s, "Folkene du kommer til å [jobbe med]", { color: C.black });

  // Navn og roller er hentet fra brain/team-og-roller.md, ikke gjettet.
  const people = [
    { name: "Christina Wiig", role: "Head of Corporate Partnerships", file: "portrait-1.jpg" },
    { name: "Anniken Holst", role: "Partner Manager", file: "portrait-2.jpg" },
    { name: "Ola Jacobsen", role: "Partner Manager", file: "portrait-3.jpg" },
    { name: "Navn Navnesen", role: "Rolle her", file: null }, // ledig plass
  ];

  // Raden spenner fra venstre til høyre marg, samme raster som tittelen.
  // Var den sentrert på siden i stedet, stakk ytterkortene utenfor margen.
  const d = 2.45;
  const gap = (W - M.x * 2 - d * 4) / 3;
  const y = 2.5;

  people.forEach((p, i) => {
    const x = M.x + i * (d + gap);
    if (p.file) {
      s.addImage({
        path: K.photoPath(p.file), x, y, w: d, h: d,
        rounding: true, sizing: { type: "cover", w: d, h: d },
      });
    } else {
      s.addShape(pptx.ShapeType.ellipse, {
        x, y, w: d, h: d,
        fill: { color: C.lightGray }, line: { color: "D8DCDF", width: 1 },
      });
      s.addText("Sett inn\nportrett", {
        x, y: y + d / 2 - 0.45, w: d, h: 0.9,
        fontFace: F.body, fontSize: T.caption, color: C.mutedOnLight,
        align: "center", lineSpacingMultiple: 1.2, margin: 0, valign: "middle",
      });
    }
    s.addText(p.name, {
      x, y: y + d + 0.22, w: d, h: 0.4,
      fontFace: F.head, fontSize: 21, bold: true, color: C.black,
      align: "center", margin: 0, valign: "middle",
    });
    s.addText(p.role, {
      x, y: y + d + 0.62, w: d, h: 0.76,
      fontFace: F.body, fontSize: T.small, color: C.mutedOnLight,
      align: "center", lineSpacingMultiple: 1.15, margin: 0, valign: "top",
    });
  });
  K.logo(s, "red");
  s.addNotes(
    "FOLK. Fire portretter spenner fra marg til marg. Bytt portrett: " +
    "høyreklikk > Endre bilde, den runde masken følger med. " +
    "Den grå sirkelen er en ledig plass. Sjekk at rollene stemmer før du presenterer."
  );
  return s;
}

/** 14 — Prosess: fire steg på rad. */
function timeline(pptx) {
  const s = pptx.addSlide();
  K.fill(s, C.white);

  K.eyebrow(s, "Slik går vi frem");
  K.title(s, "Fire steg fra idé til pilot", { color: C.black });

  const steps = [
    ["01", "Kartlegg", "Vi finner utfordringen som er verdt å løse."],
    ["02", "Match", "Vi henter inn selskapene som treffer den."],
    ["03", "Pilot", "Vi rigger et forsøk med tydelige kriterier."],
    ["04", "Skaler", "Det som virker, settes i drift."],
  ];
  const gap = 0.6;
  const cw = (W - M.x * 2 - gap * 3) / 4; // 2.88
  const y = Y.content + 0.2;

  steps.forEach(([num, stepTitle, body], i) => {
    const x = M.x + i * (cw + gap);
    // Rødt markerer hvor du er. De øvrige skal være underordnet, men fortsatt
    // lesbare fra bakerste rad: en nesten hvit gråtone forsvant på projektor.
    s.addText(num, {
      x, y, w: cw, h: 1.0,
      fontFace: F.display, fontSize: 56, color: i === 0 ? C.red : C.stepGray,
      margin: 0, valign: "top",
    });
    s.addText(stepTitle, {
      x, y: y + 1.02, w: cw, h: 0.5,
      fontFace: F.head, fontSize: 25, bold: true, color: C.black, margin: 0, valign: "middle",
    });
    s.addText(body, {
      x, y: y + 1.55, w: cw, h: 1.1,
      fontFace: F.body, fontSize: T.small, color: C.mutedOnLight,
      lineSpacingMultiple: 1.3, margin: 0, valign: "top",
    });
  });
  K.logo(s, "red");
  s.addNotes(
    "PROSESS. Det røde tallet viser hvor i løpet du er. Flytt den røde fargen til " +
    "neste steg hvis du gjenbruker sliden lenger ut i presentasjonen."
  );
  return s;
}

/** 15 — Tallrekke: tre tall side om side. */
function statsRow(pptx) {
  const s = pptx.addSlide();
  K.fill(s, C.offWhite);

  // Samme tittelhøyde som de øvrige malene. Lå den lavere, hoppet
  // overskriften synlig når man bladde mellom slidene.
  K.eyebrow(s, "Startuplab i tall");
  K.title(s, "Tretten år, oppsummert i [tre tall]", { color: C.black });

  const stats = [
    ["4 000+", "selskaper i nettverket"],
    ["200+", "investeringer gjort"],
    ["12,2 mrd", "kroner i omsetning"],
  ];
  const gap = 0.8;
  const cw = (W - M.x * 2 - gap * 2) / 3; // 3.67
  const y = 3.25;

  stats.forEach(([value, label], i) => {
    const x = M.x + i * (cw + gap);
    s.addText(value, {
      x, y, w: cw, h: 1.3,
      fontFace: F.display, fontSize: 56, color: C.red,
      lineSpacingMultiple: 0.9, margin: 0, valign: "top",
    });
    s.addText(label, {
      x, y: y + 1.28, w: cw, h: 0.9,
      fontFace: F.head, fontSize: 22, bold: true, color: C.black,
      lineSpacingMultiple: 1.15, margin: 0, valign: "top",
    });
  });
  K.logo(s, "red");
  s.addNotes(
    "TALLREKKE. Tre tall er maks. Rund av: publikum husker 4 000, ikke 4 037. " +
    "Hold hver verdi kort, lange verdier brekker over to linjer og dytter etiketten ned."
  );
  return s;
}

module.exports = { agenda, textPhotoSplit, quote, featureGrid, team, timeline, statsRow };
