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
  K.photo(s, "split.jpg", { x: px, y: 0, w: W - px, h: H, helflate: true });

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
  s.addShape(K.RUNDE ? pptx.ShapeType.roundRect : pptx.ShapeType.ellipse, {
    x: W - M.x - d, y: 2.05, w: d, h: d,
    ...(K.RUNDE ? { rectRadius: K.rectRadius(d) } : {}),
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

/**
 * 16 — Tekst og bilderutenett: forklaring på én side, fire liggende bilder
 * i 2x2 på den andre. Samme vertikale rytme som «tekst og bilde», så de to
 * delte oppsettene harmonerer med hverandre.
 */
function photoGrid(pptx) {
  const s = pptx.addSlide();
  K.fill(s, C.white);

  // Tekstsiden. Følger samme høyder som textPhotoSplit, ikke toppmargen,
  // fordi dette er et delt oppsett og ikke en full-bredde tittel.
  K.eyebrow(s, "Året som gikk", { y: 1.95, w: 4.8 });
  s.addText(K.accented("Fire ting vi gjorde\n[mest] av", { color: C.black, accent: C.red }), {
    x: M.x, y: 2.38, w: 4.7, h: 1.5,
    fontFace: F.head, fontSize: 34, bold: true, lineSpacingMultiple: 1.02, margin: 0, valign: "top",
  });
  // Tre linjer. Fem linjer her presset den nederste linjen ned mot logoen.
  s.addText(
    "Samlinger, befaringer og matchmaking gjennom hele året. 42 arrangementer i alt.",
    {
      x: M.x, y: 4.15, w: 4.6, h: 1.6,
      fontFace: F.body, fontSize: T.body, color: C.black,
      lineSpacingMultiple: 1.4, margin: 0, valign: "top",
    }
  );

  // Rutenettet. Toppen flukter med kickeren til venstre, og høyre kant med
  // margen, så begge sider henger på samme raster.
  const gx = 6.1;
  const gap = 0.3;
  const iw = (W - M.x - gx - gap) / 2; // 3.04
  const ih = iw * 2 / 3; // liggende 3:2
  const gy = 1.95;

  ["grid-1.jpg", "grid-2.jpg", "grid-3.jpg", "grid-4.jpg"].forEach((file, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    K.photo(s, file, {
      x: gx + col * (iw + gap),
      y: gy + row * (ih + gap),
      w: iw, h: ih,
    });
  });
  K.logo(s, "red");
  s.addNotes(
    "TEKST OG BILDERUTENETT. Fire liggende bilder i 2x2 med forklaringen samlet " +
    "på venstre side, i stedet for bildetekst under hvert bilde. " +
    "Bytt bilde: høyreklikk > Endre bilde, utsnittet beholdes. " +
    "Vil du ha bildene til venstre og teksten til høyre: marker alle fire " +
    "bildene og dra dem over, og flytt tekstblokken motsatt vei. " +
    "Kjør prepare-media.py på nye bilder, så får de samme lysstyrke som de andre."
  );
  return s;
}

/**
 * Rutenett med større bilder. Samme innhold som photoGrid, men plassen er
 * flyttet fra tekstkolonnen til bildene. Tittelen er derfor 30 pt og
 * brødteksten 18, ned fra 34 og 20, fortsatt over grensen for lesbarhet i sal.
 *
 * `variant` er "a" (bildene holder seg innenfor margen) eller "b" (høyre
 * kolonne blør ut i lerretkanten, samme grep som fotoet på «tekst og bilde»).
 */
function photoGridStor(pptx, variant = "b") {
  const s = pptx.addSlide();
  K.fill(s, C.white);

  const tekstW = 3.8;
  K.eyebrow(s, "Året som gikk", { y: 2.05, w: tekstW });
  s.addText(K.accented("Fire ting vi\ngjorde [mest] av", { color: C.black, accent: C.red }), {
    x: M.x, y: 2.45, w: tekstW, h: 1.7,
    fontFace: F.head, fontSize: 30, bold: true, lineSpacingMultiple: 1.02, margin: 0, valign: "top",
  });
  s.addText(
    "Samlinger, befaringer og matchmaking gjennom hele året. 42 arrangementer i alt.",
    {
      x: M.x, y: 4.35, w: tekstW, h: 1.7,
      fontFace: F.body, fontSize: T.small, color: C.black,
      lineSpacingMultiple: 1.4, margin: 0, valign: "top",
    }
  );

  const blor = variant === "b";
  const gx = 4.95;
  const gap = 0.28;
  // Variant A stopper på høyremargen, B går ut i lerretkanten.
  const iw = ((blor ? W : W - M.x) - gx - gap) / 2;
  const ih = iw * 2 / 3; // liggende 3:2
  const gy = (H - (ih * 2 + gap)) / 2; // sentrert loddrett

  [1, 2, 3, 4].forEach((n, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    s.addImage({
      path: K.photoPath(`stor-${blor ? "b" : "a"}-${n}-rund.png`),
      x: gx + col * (iw + gap),
      y: gy + row * (ih + gap),
      w: iw, h: ih,
    });
  });
  K.logo(s, "red");
  s.addNotes(
    `RUTENETT MED STØRRE BILDER, variant ${variant.toUpperCase()}. ` +
    (blor
      ? "Høyre kolonne går ut i lerretkanten med vilje. De to bildene har " +
        "skarpe høyrehjørner: et avrundet hjørne ute i kanten gir en hvit flekk. "
      : "Bildene stopper på høyremargen, som resten av settet. ") +
    "Plassen er tatt fra tekstkolonnen, så hold teksten kort: tittelen tåler " +
    "to linjer og brødteksten tre. " +
    "Bytt bilde: høyreklikk > Endre bilde, den avrundede formen følger med."
  );
  return s;
}

/**
 * Punktgrid med fire punkter, som «seks konkrete leveranser» men kortere.
 *
 * `oppsett` er "rad" (fire på én rad) eller "kvadrat" (2x2). Fire punkter
 * fyller ikke tre kolonner pent, så det trengs et eget oppsett og ikke bare
 * færre elementer i det gamle: rad gir smale kolonner og korte beskrivelser,
 * kvadrat gir brede kolonner og plass til to fulle linjer per punkt.
 */
function featureGrid4(pptx, oppsett = "rad") {
  const rad = oppsett === "rad";
  const s = pptx.addSlide();
  K.fill(s, C.white);

  K.eyebrow(s, "Hva partnerskapet gir");
  K.title(s, "Fire konkrete [leveranser]", { color: C.black });

  const items = [
    ["01", "Matchmaking", "Kuraterte møter med selskaper som treffer utfordringen din."],
    ["02", "Pilotstøtte", "Vi rigger og følger opp piloten til evaluering."],
    ["03", "Nettverk", "Tilgang til 4 000+ gründere og fagmiljøer."],
    ["04", "Kompetanse", "Workshops og kurs for teamene deres."],
  ];

  const kolonner = rad ? 4 : 2;
  const gapX = rad ? 0.55 : 0.75;
  const cw = (W - M.x * 2 - gapX * (kolonner - 1)) / kolonner;
  const y0 = rad ? 2.85 : 2.65;
  const rh = 2.0;

  items.forEach(([num, itemTitle, body], i) => {
    const col = i % kolonner, row = Math.floor(i / kolonner);
    const x = M.x + col * (cw + gapX);
    const y = y0 + row * rh;
    // Én rad gir ledig høyde, så tallet og tittelen settes større der.
    s.addText(num, {
      x, y, w: cw, h: 0.46,
      fontFace: F.display, fontSize: rad ? 28 : 22, color: C.red, margin: 0, valign: "middle",
    });
    s.addText(itemTitle, {
      x, y: y + 0.5, w: cw, h: 0.5,
      fontFace: F.head, fontSize: rad ? 25 : T.cardTitle, bold: true, color: C.black,
      margin: 0, valign: "middle",
    });
    s.addText(body, {
      x, y: y + 1.04, w: cw, h: 1.2,
      fontFace: F.body, fontSize: rad ? 19 : T.small, color: C.mutedOnLight,
      lineSpacingMultiple: 1.3, margin: 0, valign: "top",
    });
  });
  K.logo(s, "red");
  s.addNotes(
    `PUNKTGRID MED FIRE, oppsett ${rad ? "én rad" : "2x2"}. ` +
    (rad
      ? "Kolonnene er smale, så hold beskrivelsen til to eller tre korte linjer."
      : "Brede kolonner gir plass til to fulle linjer per punkt. Bruk dette " +
        "oppsettet når beskrivelsene er lengre enn én setning.") +
    " Trenger du seks punkter, bruk malen «seks konkrete leveranser» i stedet."
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

/**
 * 13 — Folk: portretter på rad.
 *
 * `form` er "sirkel" eller "avrundet". Begge finnes i decket med vilje: sirkel
 * er et etablert grep for mennesker, avrundet firkant er renere og følger
 * bildeformene i den avrundede utgaven. Formen styres her, ikke av
 * SL_RUNDE-bryteren, slik at begge er tilgjengelige i begge utgavene.
 */
function team(pptx, form = "sirkel") {
  const rund = form === "avrundet";
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
      if (rund) {
        // Ferdig maskert PNG: PowerPoint kan runde hjørnene på en figur,
        // men ikke på et bilde, så formen må ligge i selve fila.
        s.addImage({
          path: K.photoPath(K.bildeRund(p.file)), x, y, w: d, h: d,
        });
      } else {
        s.addImage({
          path: K.photoPath(p.file), x, y, w: d, h: d,
          rounding: true, sizing: { type: "cover", w: d, h: d },
        });
      }
    } else {
      s.addShape(rund ? pptx.ShapeType.roundRect : pptx.ShapeType.ellipse, {
        x, y, w: d, h: d,
        ...(rund ? { rectRadius: K.rectRadius(d) } : {}),
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
    `FOLK, ${rund ? "avrundede firkanter" : "sirkler"}. Decket har begge formene, ` +
    "så bruk den som passer resten av presentasjonen din, og slett den andre. " +
    "Fire portretter spenner fra marg til marg. Bytt portrett: høyreklikk > " +
    "Endre bilde, formen følger med. Den grå plassen er ledig. " +
    "Sjekk at rollene stemmer før du presenterer."
  );
  return s;
}

/**
 * Folk, fem på rad med avrundede hjørner.
 *
 * Egen mal og ikke en variant av fire-på-rad: med fem portretter må både
 * bildebredden, mellomrommet og navnestørrelsen ned, ellers sprekker navnene
 * ut av kolonnene sine. Portrettene har egne bildefiler fordi hjørnradiusen
 * regnes ut fra visningsbredden, som er smalere her.
 */
function team5(pptx) {
  const s = pptx.addSlide();
  K.fill(s, C.white);

  K.eyebrow(s, "Teamet");
  K.title(s, "Folkene du kommer til å [jobbe med]", { color: C.black });

  // Navn og roller er hentet fra brain/team-og-roller.md, ikke gjettet.
  const people = [
    { name: "Christina Wiig", role: "Head of Corporate Partnerships", file: "portrait5-1.jpg" },
    { name: "Anniken Holst", role: "Partner Manager", file: "portrait5-2.jpg" },
    { name: "Ola Jacobsen", role: "Partner Manager", file: "portrait5-3.jpg" },
    { name: "Navn Navnesen", role: "Rolle her", file: null },
    { name: "Navn Navnesen", role: "Rolle her", file: null },
  ];

  const gap = 0.4;
  const d = (W - M.x * 2 - gap * 4) / 5; // 2.01
  const y = 2.5;

  people.forEach((p, i) => {
    const x = M.x + i * (d + gap);
    if (p.file) {
      s.addImage({ path: K.photoPath(K.bildeRund(p.file)), x, y, w: d, h: d });
    } else {
      s.addShape(pptx.ShapeType.roundRect, {
        x, y, w: d, h: d, rectRadius: K.rectRadius(d),
        fill: { color: C.lightGray }, line: { color: "D8DCDF", width: 1 },
      });
      s.addText("Sett inn\nportrett", {
        x, y: y + d / 2 - 0.45, w: d, h: 0.9,
        fontFace: F.body, fontSize: T.caption, color: C.mutedOnLight,
        align: "center", lineSpacingMultiple: 1.2, margin: 0, valign: "middle",
      });
    }
    // 20 pt, ikke 21 som i fire-på-rad: kolonnen er 0,44 tommer smalere,
    // og «Christina Wiig» ville ellers ligget helt ut i kanten.
    s.addText(p.name, {
      x, y: y + d + 0.2, w: d, h: 0.38,
      fontFace: F.head, fontSize: 20, bold: true, color: C.black,
      align: "center", margin: 0, valign: "middle",
    });
    // Rolleboksen er 0,32 tommer bredere enn portrettet og sentrert over det.
    // Med bare portrettbredden brakk «Head of Corporate Partnerships» til tre
    // linjer mens naboene hadde én, og raden ble skjev. Teksten er sentrert,
    // så det er fortsatt 0,08 tommer luft mellom nabobokser.
    s.addText(p.role, {
      x: x - 0.16, y: y + d + 0.58, w: d + 0.32, h: 0.8,
      fontFace: F.body, fontSize: T.small, color: C.mutedOnLight,
      align: "center", lineSpacingMultiple: 1.15, margin: 0, valign: "top",
    });
  });
  K.logo(s, "red");
  s.addNotes(
    "FOLK, FEM PÅ RAD. Bytt portrett: høyreklikk > Endre bilde, den avrundede " +
    "formen følger med. Hold rollene korte: kolonnene er smalere enn på " +
    "fire-på-rad, og en lang rolle brekker til tre linjer. " +
    "formen følger med. De to grå plassene er ledige. " +
    "Trenger du seks, blir bildene for små på denne bredden: bruk to rader " +
    "på tre i stedet. Sjekk at rollene stemmer før du presenterer."
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

/**
 * Folk med kompetanse: portrett, navn og hvor de kommer fra. Hva de kan
 * hjelpe med står ikke på kortene, men samlet i emneraden under tittelen.
 * Bygget for EiR-nettverket, men fungerer for enhver gruppe eksterne folk
 * salen skal få tilgang til.
 *
 * Forskjellen fra team-malene: der står rollen personen har hos oss, her
 * står selskapet personen kommer fra. Ellers er formen den samme, med vilje.
 *
 * `antall` er 3 til 6, alt på én rad. Portrettet fyller kolonnen, så det blir
 * mindre for hver person du legger til: 2,62 tommer på fire, 1,69 på seks.
 *
 * Hvorfor kompetansen ikke står per person: den ble prøvd som en tredje linje
 * på hvert kort først, og resultatet var fire spalter med seks tekstlinjer
 * hver, altså bokstaver strødd utover hele flaten. Kompetansen er dessuten
 * felles for gruppen, ikke et kjennetegn ved den enkelte, så den hører til i
 * én linje øverst. Da kan portrettene bli store og kortene korte.
 *
 * Alt er venstrestilt mot kolonnekanten, ikke sentrert som team-malene.
 * Portrettet er en firkant som fyller kolonnen, så teksten under har en ekte
 * kant å stå på, og fire harde venstrekanter gir raden en rytme sentrert
 * tekst ikke gir.
 *
 * Tekstboksen er bredere enn kolonnen og stikker inn i mellomrommet til
 * høyre: «Christian Sæterhaug» er 2,57 tommer i 20 pt og brakk i to på en
 * kolonne som er 2,62 bred, siden tekstboksen har egen innvendig marg.
 *
 * Begge tekstlinjene har fast y. Da står selskapet på linje tvers over raden
 * selv om ett navn skulle brekke i to.
 */
function peopleExpertise(pptx, antall = 4, form = "avrundet") {
  // Fra fem personer og opp er kolonnen for smal til at navnet får plass på
  // én linje, og da må navnet få to linjer å brekke i.
  const tett = antall >= 5;
  // Sjekken må stå før addSlide. Sto den lenger ned, ved dataene den
  // egentlig handler om, ble en tom slide liggende igjen i decket når den
  // kastet.
  if (antall < 3 || antall > 6) {
    throw new Error(`peopleExpertise: antall må være 3-6, fikk ${antall}`);
  }
  const s = pptx.addSlide();
  K.fill(s, C.white);

  K.eyebrow(s, "Executives in Residence");
  // Ingen rødt ord i tittelen, og ingen røde punkter i emneraden: logoen
  // nede til venstre er sidens ene røde element.
  K.title(s, "The people you get access to", { color: C.black });

  // Emneraden bærer kompetansen for hele gruppen. Ordene er destillert fra
  // Expertise-feltet til de fire personene under, ikke funnet opp: salg,
  // go-to-market, kapital, merkevare, produkt og ledelse dekker det de fire
  // faktisk er tagget med i Notion.
  K.topicRow(s, ["Sales", "Go-to-market", "Fundraising", "Brand", "Product", "Leadership"], { y: 2.08 });

  // Navn og «previous job» er hentet fra EiR-basen i Notion 20.8.2026, ikke
  // gjettet. Utvalget er én per fagområde, slik at raden viser bredden.
  //
  // Selskapslinjene er kortet ned til komma-form («ECM, DNB Carnegie» og ikke
  // «Global Co-Head of ECM Execution @ DNB Carnegie»): den fulle tittelen fra
  // Notion tar tre linjer og sprenger kortet.
  const alle = [
    { name: "Katherine Barrios", from: "CCO & CMO, Xeneta" },
    { name: "Christian Sæterhaug", from: "VP New Markets, Gelato" },
    { name: "Stefan Slemdal", from: "ECM, DNB Carnegie" },
    { name: "Monica Beate Tvedt", from: "Group CTO, Forte" },
    { name: "Anna-Karin Østlie", from: "Group CEO, Kantega" },
    { name: "Mats Lyngstad", from: "Founder, inzpire.me" },
  ];
  // De fire første dekker markedsføring, salg, kapital og teknologi. Nummer
  // fem og seks legger til skalering og merkevare.
  const people = alle.slice(0, antall);

  // `av` er avstanden fra bunnen av portrettet til toppen av hver tekstboks.
  // En linje 18 pt med 1,15 linjeavstand er 0,29 tommer, og navnet i 20 pt er
  // 0,32, så tallene under gir 0,04 luft mellom navn og selskap: de skal lese
  // som én blokk, ikke som to påstander.
  const oppsett = tett
    ? { gap: 0.3, y: 2.5, navnH: 0.6, av: { navn: 0.16, firma: 0.8 }, tillegg: 0.3, navnPt: T.small }
    : { gap: 0.38, y: 2.72, navnH: 0.36, av: { navn: 0.18, firma: 0.54 }, tillegg: 0.3, navnPt: 20 };
  const firmaH = 0.6;

  const cw = (W - M.x * 2 - oppsett.gap * (antall - 1)) / antall;
  // Portrettet fyller kolonnen, men bare opp til det taket innholdsflaten
  // tåler. Uten taket vokser portrettet når det er færre personer, fordi
  // kolonnen blir bredere, og da havner nederste tekstlinje oppå bunnlinjen.
  // Taket er regnet ut av de samme avstandene som teksten bruker, ikke satt
  // fast, så det følger med hvis avstandene endres.
  const dTak = Y.contentBottom - oppsett.y - oppsett.av.firma - firmaH;
  const d = Math.min(cw, dTak);
  const y = oppsett.y;
  const tw = cw + oppsett.tillegg;

  people.forEach((p, i) => {
    const x = M.x + i * (cw + oppsett.gap);
    K.portraitPlaceholder(s, pptx, { x, y, d, form });
    s.addText(p.name, {
      x, y: y + d + oppsett.av.navn, w: tw, h: oppsett.navnH,
      fontFace: F.head, fontSize: oppsett.navnPt, bold: true, color: C.black,
      lineSpacingMultiple: 1.1, margin: 0, valign: "top",
    });
    s.addText(p.from, {
      x, y: y + d + oppsett.av.firma, w: tw, h: firmaH,
      fontFace: F.body, fontSize: T.small, color: C.mutedOnLight,
      lineSpacingMultiple: 1.15, margin: 0, valign: "top",
    });
  });

  K.logo(s, "red");
  K.bottomLine(s, "They are always open to discuss and help our network, both startups and partners.");
  s.addNotes(
    `FOLK MED KOMPETANSE, ${antall} på rad. ` +
    "Portrettene er tomme plassholdere. Slik setter du inn dine egne og " +
    "beholder den avrundede formen: dra bildet inn på sliden, marker det, " +
    "Bildeformat > Beskjær > Beskjær til figur > avrundet rektangel. Legg det " +
    "over plassholderen og slett plassholderen.\n\n" +
    "Emneraden under tittelen er kompetansen, og den er felles for gruppen, " +
    "ikke per person. Det er den som gjør at kortene bare trenger navn og " +
    "selskap, og at portrettene får være store. Legger du kompetanse inn per " +
    "person igjen, får du fire spalter med seks tekstlinjer, og sliden faller " +
    "fra hverandre. Hold raden på seks ord eller færre.\n\n" +
    (tett
      ? "Kolonnene er smale her, så hold selskapet under ca. 30 tegn. Trenger " +
        "du mer plass, bruk fire-på-rad: der er kolonnen nesten en tomme bredere " +
        "og portrettet 2,62 mot 1,69."
      : "Dette er den romsligste varianten. Portrettet er 2,62 tommer, og " +
        "selskapet tåler to linjer. Trenger du fem eller seks personer, bytt " +
        "antallet: portrettene krymper, men raden holder.") +
    "\n\nNavn og selskap er hentet fra EiR-basen i Notion 20.8.2026, og utvalget " +
    "er én person per fagområde slik at raden viser bredden. Bytt til dem som " +
    "passer salen, og sjekk at stillingene fortsatt stemmer før du presenterer."
  );
  return s;
}

/**
 * Tilbudskort: tre eller fire tilbud side om side, hvert med bilde, navn,
 * ett løfte og en faktalinje.
 *
 * Forskjellen fra programkort-malen (mørk, fem sektorer): der er bildene
 * etiketter under et bilde, her har hvert kort et løfte og en faktalinje, så
 * salen kan se hva tilbudet er uten at noen forklarer det.
 *
 * Faktalinjen (`fakta`) er valgfri per kort. Uten den blir kortet to nivåer,
 * og plassen som frigjøres går til bildet, ikke til mer tekst: bildet er det
 * som skiller de fire tilbudene fra hverandre på avstand. Bildet er 3:2 med
 * faktalinje og 4:3 uten.
 *
 * Navn og løfte har fast y. Da står løftene på linje tvers over raden selv om
 * ett navn tar to linjer og resten én.
 */
function offerCards(pptx, tilbud) {
  if (tilbud.length < 3 || tilbud.length > 4) {
    throw new Error(`offerCards: tåler 3-4 kort, fikk ${tilbud.length}`);
  }
  const s = pptx.addSlide();
  K.fill(s, C.white);

  K.eyebrow(s, "Høstens program");
  K.title(s, "Fire veier inn på AI", { color: C.black });

  const harFakta = tilbud.some((t) => t.fakta);
  const gap = 0.38;
  const cw = (W - M.x * 2 - gap * (tilbud.length - 1)) / tilbud.length;
  // Liggende bilde, ikke kvadratisk: kurs- og sprintbilder er folk i et rom,
  // og kvadratisk beskjærer bort halve bordet.
  const bh = cw / (harFakta ? 1.5 : 1.3333);
  const y = harFakta ? 2.5 : 2.48;
  // Navnet får to linjer når faktalinjen er borte. «Kurs i AI-assistert
  // koding» er 26 tegn og tar to linjer i en spalte på 2,92 tommer.
  const navnH = harFakta ? 0.38 : 0.72;

  tilbud.forEach((t, i) => {
    const x = M.x + i * (cw + gap);
    K.mediaPlaceholder(s, pptx, { x, y, w: cw, h: bh });
    s.addText(t.navn, {
      x, y: y + bh + 0.18, w: cw + 0.3, h: navnH,
      fontFace: F.head, fontSize: 23, bold: true, color: C.black,
      lineSpacingMultiple: 1.1, margin: 0, valign: "top",
    });
    // 0,32 og ikke 0,2: navneboksen rommer to linjer, og på kortet som
    // faktisk bruker begge («Kurs i AI-assistert koding») lå andre linje
    // nesten inntil løftet. Kortene med ettlinjet navn får til gjengjeld en
    // større luke, som er prisen for at løftene står på linje tvers over raden.
    s.addText(t.lofte, {
      x, y: y + bh + 0.32 + navnH, w: cw + 0.3, h: 0.66,
      fontFace: F.body, fontSize: T.small, color: C.black,
      lineSpacingMultiple: 1.15, margin: 0, valign: "top",
    });
    if (t.fakta) {
      s.addText(t.fakta, {
        x, y: y + bh + 1.08 + navnH, w: cw + 0.3, h: 0.32,
        fontFace: F.body, fontSize: T.small, color: C.mutedOnLight, margin: 0, valign: "middle",
      });
    }
  });

  K.logo(s, "red");
  K.bottomLine(s, "Alle fire ligger i partnerprogrammet. Spør oss hvilken som passer teamet deres.");
  s.addNotes(
    "TILBUDSKORT. Fire tilbud side om side: bilde, navn og ett løfte. Malen " +
    "tåler tre eller fire.\n\n" +
    "Bildene er tomme plassholdere. Dra inn dine egne, marker bildet, " +
    "Bildeformat > Beskjær > Beskjær til figur > avrundet rektangel, og legg " +
    "det over plassholderen.\n\n" +
    "Hold løftet på maks to linjer, ca. 46 tegn. Lengre løfte tar en tredje " +
    "linje, og da er raden fire tekstblokker der bildene skulle gjort jobben.\n\n" +
    "Malen har også en valgfri faktalinje under løftet, til ett tall eller én " +
    "referanse. Den er tom her med vilje: tid og antall deltakere hører i " +
    "samtalen, ikke på sliden. Legger du den inn igjen, krymper bildene fra " +
    "4:3 til 3:2 for å gi plass.\n\n" +
    "Har du bare bilder til noen av kortene, la de andre stå som grå " +
    "plassholdere heller enn å fylle dem med et bilde som ikke viser tilbudet. " +
    "En tom plassholder leser som «kommer», et feil bilde leser som feil."
  );
  return s;
}

/**
 * Trappen: nummererte kort på rad med piler mellom, og et fotobånd under.
 * Til et tilbud som har trinn, der salen skal se hele stigen på ett blikk.
 *
 * Kortene har ekte rammer, og det er ikke pynt. Hvert kort har fire
 * tekstnivåer (nummer, navn, omfang, hva som skjer), og fem kort med fire
 * nivåer er tjue tekstblokker på én flate. Uten rammer leser det som
 * bokstaver strødd utover, som er nøyaktig innvendingen mot folke-veggen
 * tidligere i dag. Rammen grupperer, og da tåler flaten tettheten.
 *
 * Hvorfor båndet under er lavt: forelegget er en nettside, ikke 16:9. Der
 * ligger tre bilder i 3:2 under kortene. På en slide er innholdsflaten 3,9
 * tommer, kortene tar 2,6 av dem, og tre bilder i 3:2 ville trengt 2,4. Med
 * 18 pt som gulv i kortene er det bildene som må gi seg, ikke teksten. 1,09
 * tommer gir et bånd i 3,4:1, som er et bevisst format og ikke et klemt 3:2.
 *
 * Rødt tre steder (aksentordet, numrene, logoen) bryter «ett rødt element per
 * slide». Det er med vilje: forelegget fra Christina har det slik, numrene er
 * trappen sin rytme, og de leser som struktur og ikke som utrop.
 */
function ladderCards(pptx, { tittel, kicker, trinn, bunnlinje, bilder = 3 }) {
  if (trinn.length < 3 || trinn.length > 5) {
    throw new Error(`ladderCards: tåler 3-5 trinn, fikk ${trinn.length}`);
  }
  const s = pptx.addSlide();
  // Kortene er hvite, så flaten under dem må være brutt hvit. På rent hvitt
  // forsvinner kortene og bare hårstreken står igjen.
  K.fill(s, C.offWhite);

  K.eyebrow(s, kicker);
  K.title(s, tittel, { color: C.black });

  const gap = 0.42;
  const cw = (W - M.x * 2 - gap * (trinn.length - 1)) / trinn.length;
  const cy = 2.42;
  const pad = 0.17;
  const tw = cw - pad * 2;
  // Høydene er målt på render, ikke regnet fra punktstørrelsen. En tekstboks
  // i PowerPoint har egen innvendig marg, så 19 pt i to linjer trenger 0,62
  // tommer og ikke 0,58, og med 0,56 la navnet seg oppå omfanget på fire av
  // fem kort. Bunnen av kroppsteksten bestemmer korthøyden.
  const rad = { nr: 0.16, navn: 0.58, omfang: 1.22, hva: 1.54 };
  const hoyde = { nr: 0.4, navn: 0.62, omfang: 0.28, hva: 0.92 };
  const ch = rad.hva + hoyde.hva + 0.18;

  trinn.forEach((t, i) => {
    const x = M.x + i * (cw + gap);
    s.addShape(pptx.ShapeType.roundRect, {
      x, y: cy, w: cw, h: ch, rectRadius: K.rectRadius(Math.min(cw, ch)),
      fill: { color: C.white }, line: { color: "E3E6E8", width: 1 },
    });
    s.addText(String(i + 1).padStart(2, "0"), {
      x: x + pad, y: cy + rad.nr, w: tw, h: hoyde.nr,
      fontFace: F.display, fontSize: 26, color: C.red, margin: 0, valign: "middle",
    });
    s.addText(t.navn, {
      x: x + pad, y: cy + rad.navn, w: tw, h: hoyde.navn,
      fontFace: F.head, fontSize: 19, bold: true, color: C.black,
      lineSpacingMultiple: 1.1, margin: 0, valign: "top",
    });
    s.addText(t.omfang, {
      x: x + pad, y: cy + rad.omfang, w: tw, h: hoyde.omfang,
      fontFace: F.body, fontSize: T.label, color: C.mutedOnLight, margin: 0, valign: "middle",
    });
    s.addText(t.hva, {
      x: x + pad, y: cy + rad.hva, w: tw, h: hoyde.hva,
      fontFace: F.body, fontSize: T.small, color: C.black,
      lineSpacingMultiple: 1.15, margin: 0, valign: "top",
    });

    // Pilen står i mellomrommet, ikke inne i kortet, og er grå: den skal vise
    // retning uten å konkurrere med de røde numrene.
    if (i < trinn.length - 1) {
      s.addText("→", {
        x: x + cw, y: cy + ch / 2 - 0.2, w: gap, h: 0.4,
        fontFace: F.body, fontSize: 20, color: C.mutedOnLight,
        align: "center", margin: 0, valign: "middle",
      });
    }
  });

  // Fotobåndet fyller resten av innholdsflaten, ned til den harde bunnlinjen.
  const by = cy + ch + 0.22;
  const bgap = 0.3;
  const bw = (W - M.x * 2 - bgap * (bilder - 1)) / bilder;
  const bh = Y.contentBottom - by;
  for (let i = 0; i < bilder; i++) {
    K.mediaPlaceholder(s, pptx, {
      x: M.x + i * (bw + bgap), y: by, w: bw, h: bh,
      tekst: "Sett inn bilde",
    });
  }

  K.logo(s, "red");
  if (bunnlinje) K.bottomLine(s, bunnlinje);
  s.addNotes(
    `TRAPPEN, ${trinn.length} trinn. Nummererte kort med piler mellom, og et ` +
    "fotobånd under. Bruk den når tilbudet har trinn og salen skal se hele " +
    "stigen på ett blikk. Malen tåler tre til fem trinn.\n\n" +
    "Bildene er tomme plassholdere. Dra inn dine egne, marker bildet, " +
    "Bildeformat > Beskjær > Beskjær til figur > avrundet rektangel.\n\n" +
    "Båndet er lavt med vilje. Forelegget er en nettside der bildene ligger i " +
    "3:2 under kortene, men på 16:9 er det ikke plass til både kort og " +
    "3:2-bilder uten å gå under 18 pt i kortene. Velg bilder der motivet ligger " +
    "midt i høyden: et bånd i 3,4:1 beskjærer bort topp og bunn.\n\n" +
    "Tekstgrenser, og de er trange fordi kolonnen bare er 1,65 tommer bred: " +
    "ca. 13 tegn per linje. Navnet maks to linjer, omfanget én, og «hva som " +
    "skjer» maks tre (ca. 36 tegn). Lengre tekst dytter kortet ned i " +
    "fotobåndet.\n\n" +
    "Pass på lange sammensatte ord. Ett ord på mer enn 13 tegn får ikke plass " +
    "på en linje, og PowerPoint deler det midt i uten bindestrek: " +
    "«Inspirasjonsforedrag» ble «Inspirasjonsf / oredrag». Sett bindestreken " +
    "selv der ordet skal deles, med linjeskift etter: «Inspirasjons-» og så " +
    "«foredrag» på neste linje.\n\n" +
    "Trenger du ikke bilder, sett `bilder: 0`. Da står kortene alene, og du kan " +
    "gjøre dem høyere."
  );
  return s;
}

module.exports = { agenda, textPhotoSplit, quote, featureGrid, team, team5, timeline, statsRow, photoGrid, photoGridStor, featureGrid4, peopleExpertise, offerCards, ladderCards };
