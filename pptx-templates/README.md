# Startuplab — slidemaler for PowerPoint

> Sist oppdatert: 20. august 2026 av Claude
> Filer: `Startuplab-slidemaler.pptx` (skarpe hjørner) og
> `Startuplab-slidemaler-avrundet.pptx` (avrundede hjørner). 19 maler, 16:9.

Nitten ferdige slidemaler du kan redigere direkte i PowerPoint. Tanken er at
du slipper å be om små justeringer: du åpner fila, bytter tekst og bilder, og
flytter på ting selv.

**Hver slide har en forklaring i notatfeltet** (Vis > Notater, eller feltet under
sliden). Der står det hva malen er ment for og hvordan du bytter innhold.

## De 19 malene

| # | Mal | Bakgrunn | Til hva |
|---|-----|----------|---------|
| 1 | Forside | Helflate-bilde | Åpningen |
| 2 | Agenda | Lys | Programmet, 4-5 punkter |
| 3 | Seksjonsskille | Rød | Skift mellom hoveddeler |
| 4 | Stort tall | Mørk | Ett tall som skal huskes |
| 5 | Tallrekke | Lys | Tre nøkkeltall side om side |
| 6 | Helflate-bilde | Bilde | La fotoet bære, kort tittel |
| 7 | Tekst og bilde | Lys | Forklaring med ett stort bilde ved siden |
| 8 | Programkort | Mørk | Fem sektorer/programmer/kategorier |
| 9 | Punktgrid | Lys | Seks korte poeng |
| 10 | **Kapittelskille** | Mørk | Nummerert kapittel med indeksrekke |
| 11 | Tekst og bilderutenett | Lys | Fire bilder i 2x2, tekst samlet på siden |
| 12 | Utsagn | Mørk | Én setning som skal lande |
| 13 | Sitat | Lys | Sitat fra partner |
| 14 | Bilderad | Mørk | Tre store liggende bilder med bildetekst |
| 15 | Prosess | Lys | Fire steg på rad |
| 16 | Folk, sirkler | Lys | Fire portretter, runde |
| 17 | Folk, avrundede | Lys | Fire portretter, avrundede firkanter |
| 18 | Film | Sort | Video i full flate |
| 19 | Avslutning | Rød | Takk og kontakt |

Rekkefølgen veksler med vilje mellom mørkt og lyst, så øyet får pause mellom
de tunge slidene. Du kan bruke malene i hvilken rekkefølge du vil.

### De tre måtene å markere et skift

Settet har tre slides som markerer at noe nytt begynner, med vilje ulike:

- **Seksjonsskille (3)** er en helrød plakat. Bruk den til hovedbolkene.
- **Kapittelskille (10)** har kapittelnummeret som et stort grafisk tall med
  rosa kontur, og en indeksrekke som viser hvor i løpet salen er. Rolig nok
  til å tåle at den gjentas fem ganger i samme deck.
- **Utsagn (12)** er ren typografi, én setning som skal lande.

### De to bildemalene

Begge er bygget for at bildeteksten skal kunne leses fra bakerste rad, men de
løser det ulikt:

- **Bilderad (14)** har bildetekst under hvert bilde: overskrift 20 pt hvit,
  forklaring 18 pt grå, maks to linjer. Bruk den når hvert bilde trenger sin
  egen forklaring. Vil du ha fire bilder i stedet for tre: kopier ett
  bildesett og sett bildebredden til 2,6 tommer på alle fire.
- **Tekst og bilderutenett (11)** har fire bilder i 2x2 og all teksten samlet
  på venstre side. Bruk den når bildene hører sammen og én forklaring dekker
  dem. Vil du snu den: marker alle fire bildene og dra dem over, og flytt
  tekstblokken motsatt vei.

## To utgaver: skarpe eller avrundede hjørner

Begge bygges fra samme kode, så en endring slår gjennom i begge.

- `Startuplab-slidemaler.pptx` — skarpe hjørner på alle bilder. Editorielt.
- `Startuplab-slidemaler-avrundet.pptx` — avrundede hjørner på bildene som
  ligger inne på sliden. Mykere.

**Helflate-bilder rundes ikke i noen av utgavene** (forside, helflate-bilde og
halvside-fotoet). De går ut i slidekanten, og et avrundet hjørne der gir en
hvit flekk i kanten av lerretet.

**Begge portrettformene ligger i decket** som slide 16 og 17, i begge
utgavene. Sirkel er et etablert grep for mennesker, avrundet firkant følger
bildeformene. Velg én per presentasjon og slett den andre.

Radien er 0,13 tommer overalt, regnet om per bilde ut fra hvor stort bildet
vises. Rundes hvert bilde med en prosent av sin egen bredde, får et lite kort
og et stort hovedbilde ulike hjørner.

Den avrundede fila er større (5,6 mot 1,9 MB). Runding krever PNG med
gjennomsiktighet, og PNG er tapsfritt. Bildene skaleres derfor ned til det en
projektor faktisk viser før de rundes.

## Slik gjør du de vanligste endringene

**Bytte bilde:** høyreklikk bildet > Endre bilde > Fra en fil. Beskjæringen og
formen beholdes, også de runde portrettene.

**Bytte det røde ordet i en tittel:** marker ordet, sett skriftfarge til rød.
Fargen heter `FF3333` under Flere farger > Egendefinert.

**Sløret over bildene** (så hvit tekst er lesbar) er en egen firkant oppå
bildet. Klikk den, høyreklikk > Formater figur > Gjennomsiktighet. Er ditt
bilde lysere enn originalen, dra gjennomsiktigheten ned.

**Legge inn film (slide 18):** Sett inn > Video > Denne enheten. Dra filmen så
den dekker flaten, høyreklikk > Send bakover, slik at tittelen blir liggende
oppå. Slett den røde sirkelen og trekanten når filmen er på plass.

## Regler som holder settet harmonisk

- Ikke gå under 18 pt på tekst noen skal lese. Publikum sitter langt bak.
  De små versal-etikettene over titlene er 16 pt, som er nedre grense og kun
  fordi de er korte og har full kontrast.
- Én rød ting per slide. Rødt som brukes overalt slutter å bety noe.
- Grå tekst på lys bakgrunn må være den mørke gråtonen (`5A6166`), ikke den
  lyse (`9BA1A5`). Den lyse hører hjemme på mørk bakgrunn og blir uleselig
  fra bakerste rad når den brukes på hvitt.
- Hold bunnen av sliden fri (under 16,1 cm fra toppen), ellers kolliderer
  teksten med logoen.
- Tall rundes av: salen husker 4 000, ikke 4 037.

## Fonter

Malene bruker **Replica LL** (Startuplabs merkevarefont, til overskrifter) og
**Inter** (brødtekst). Begge er installert på denne maskinen.

Skal noen andre åpne fila og redigere den, må de ha de samme fontene, ellers
bytter PowerPoint dem ut og teksten flytter litt på seg. Replica ligger i
`brand-profile/fonts/Replica (Primary)/`. Skal fila bare vises, ikke redigeres,
er det tryggere å sende PDF.

## Bygge malene på nytt

Malene genereres fra kode, så et bytte av farge eller fontstørrelse kan gjøres
ett sted og slå gjennom på alle 19.

```bash
cd pptx-templates
npm install                # engangs
python prepare-media.py    # engangs, eller når du bytter kildebilder
node build.js              # skriver Startuplab-slidemaler.pptx
```

Avrundet utgave (samme kode, bryter satt med miljøvariabel):

```powershell
$env:SL_RUNDE = "1"; node build.js; Remove-Item Env:\SL_RUNDE
```

Visuell kontroll (renderer alle slides til PNG via PowerPoint, og setter dem i
et rutenett så helheten kan vurderes på ett blikk):

```powershell
powershell -File render.ps1 -Pptx Startuplab-slidemaler.pptx -Out render
python contact-sheet.py render oversikt.png
python contact-sheet.py render-avrundet oversikt-avrundet.png
powershell -File export-pdf.ps1 -Pptx Startuplab-slidemaler.pptx
```

| Fil | Innhold |
|-----|---------|
| `kit.js` | Farger, fonter, størrelser, marger, byggeklosser |
| `slides-dark.js` | De mørke og røde malene |
| `slides-light.js` | De lyse malene |
| `build.js` | Rekkefølgen slidene settes sammen i |
| `prepare-media.py` | Beskjærer og skalerer bilder, og klipper luft av logoene |
| `render.ps1` | Renderer til PNG for visuell kontroll |
| `contact-sheet.py` | Setter alle slides i ett rutenett (`oversikt.png`) |
| `export-pdf.ps1` | Eksporterer til PDF |

Endrer du noe i `kit.js`, slår det gjennom på alle malene. Det er der du bytter
merkevarefarge eller justerer skriftstørrelser samlet.

## Verdt å vite

- Bildene i malene er ekte Startuplab-bilder fra januar-samlingen, brukt som
  plassholdere. Bytt dem ut med bilder som passer ditt innhold.
- Teksten er også plassholdertekst. Den viser hvor mye tekst hver mal tåler,
  som er et poeng i seg selv: skriver du mye mer, sprekker layouten.
- Fjerde portrett på slide 16 og 17 er en tom grå sirkel med vilje, klar til å byttes.
  Navn og roller på de tre andre er hentet fra `brain/team-og-roller.md`.
  **Sjekk at rollene fortsatt stemmer før du presenterer.**
- Sitatsliden har med vilje ingen navngitt person. Et sitat bør komme fra en
  partner, og en plassholdertekst skal ikke stå under ansiktet til en kollega.
- Kontaktlinjen på siste slide har bare nettadressen. Legg til e-post selv,
  jeg ville ikke gjette på en adresse.
- Bytter du et av bildene på programkort-sliden, kjør `prepare-media.py`
  på det nye bildet. Den legger alle fem i samme lysstyrke og fargestyrke,
  som er det som gjør at raden ser ut som ett sett.
