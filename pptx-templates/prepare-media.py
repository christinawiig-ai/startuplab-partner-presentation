"""
prepare-media.py — lager lette, ferdig beskaarne bildekopier til malene.

Kildebildene er opptil 6240 px brede. Lagt rett inn i en PowerPoint blir fila
titalls megabyte, selv om bildet bare vises i noen faa tommer. Her beskjaeres
hvert bilde til formatet det faktisk skal vises i, og skaleres til ca. 150 dpi
ved den storrelsen. Kjor paa nytt ved behov:

    python prepare-media.py
"""

import os
from PIL import Image, ImageDraw, ImageEnhance, ImageStat

# Fysisk hjornradius i tommer paa den ferdige sliden. Radiusen regnes om til
# piksler per bilde ut fra hvor stort bildet vises, slik at et lite kort og et
# stort hovedbilde faar samme runding paa skjermen. Rundes hvert bilde med en
# prosent av sin egen bredde i stedet, blir hjornene ulike.
RADIUS_TOMMER = 0.13

HER = os.path.dirname(os.path.abspath(__file__))
KILDE = os.path.join(HER, "..", "corp-partner-gathering-jan26", "assets")
UT = os.path.join(HER, "media")

# (kildefil, malfil, bredde px, hoyde px, vertikal beskjaeringsposisjon 0-1)
JOBBER = [
    # Helflate 16:9
    ("vibelabs-workshop.jpg", "cover.jpg", 2000, 1125, 0.5),
    ("summit-roundtable.png", "fullbleed.jpg", 2000, 1125, 0.5),
    # Halv side, staaende
    ("summit-speeddating.png", "split.jpg", 1000, 1175, 0.5),
    # Programkort, staaende 2.10 x 3.35 tommer
    ("energy-stock.jpg", "card-energy.jpg", 440, 700, 0.5),
    ("image8.jpg", "card-ocean.jpg", 440, 700, 0.5),
    ("hardware-stock.jpg", "card-hardware.jpg", 440, 700, 0.5),
    ("construction-stock.jpg", "card-construction.jpg", 440, 700, 0.5),
    ("image7.jpg", "card-defence.jpg", 440, 700, 0.5),
    # Runde portretter, kvadratiske. 0.28 loefter utsnittet mot ansiktet.
    ("christina.jpg", "portrait-1.jpg", 600, 600, 0.28),
    ("anniken.jpg", "portrait-2.jpg", 600, 600, 0.28),
    ("ola.jpg", "portrait-3.jpg", 600, 600, 0.28),
    # Bilderad, liggende 3:2
    ("image62.png", "row-1.jpg", 800, 533, 0.5),
    ("image16.png", "row-2.jpg", 800, 533, 0.5),
    ("image13.png", "row-3.jpg", 800, 533, 0.5),
    # 2x2-rutenett, liggende 3:2. Fire tydelig ulike scener: publikum,
    # atrium, moterom, felt. To av dem finnes ogsa paa andre slides, men i
    # helt andre storrelser, og alle bildene er plassholdere.
    ("image96.png", "grid-1.jpg", 660, 440, 0.5),
    ("image62.png", "grid-2.jpg", 660, 440, 0.5),
    ("summit-roundtable.png", "grid-3.jpg", 660, 440, 0.5),
    ("image13.png", "grid-4.jpg", 660, 440, 0.5),
]


def harmoniser(im, mal_lysstyrke, metning=1.0, styrke=1.0):
    """
    Legger bilder som staar side om side i samme toneleie.

    Kildebildene spriker kraftig: paa programkortene gikk maalt snitt-
    lysstyrke fra 46 til 82, og ett av dem var helt uten farge mens et annet
    var sterkt blaatt. Et halvtransparent slor i selve sliden jevner ikke ut
    det, fordi det legger samme mengde svart paa et morkt og et lyst bilde.

    `styrke` styrer hvor langt mot maalet hvert bilde trekkes. Kortene tar
    hele veien (de skal vaere en dempet, ensartet rad), mens hovedbildene tar
    bare delvis: trekkes et kveldsbilde helt opp til snittet, blir det flatt.
    """
    if metning != 1.0:
        im = ImageEnhance.Color(im).enhance(metning)
    naa = ImageStat.Stat(im.convert("L")).mean[0]
    if naa > 1:
        faktor = mal_lysstyrke / naa
        im = ImageEnhance.Brightness(im).enhance(1 + (faktor - 1) * styrke)
    return im


def beskjaer_og_skaler(im, mal_b, mal_h, vpos):
    """Beskjaerer til malformatet uten aa forvrenge, og skalerer ned."""
    kilde_forhold = im.width / im.height
    mal_forhold = mal_b / mal_h

    if kilde_forhold > mal_forhold:
        # For bredt: kutt i sidene, behold midten
        ny_b = int(im.height * mal_forhold)
        venstre = (im.width - ny_b) // 2
        boks = (venstre, 0, venstre + ny_b, im.height)
    else:
        # For hoyt: kutt i hoyden, styrt av vpos
        ny_h = int(im.width / mal_forhold)
        topp = int((im.height - ny_h) * vpos)
        boks = (0, topp, im.width, topp + ny_h)

    return im.crop(boks).resize((mal_b, mal_h), Image.LANCZOS)


def beskjaer_logo():
    """
    Logo-PNG-ene har 12,5 % gjennomsiktig luft i sidene og 23,7 % topp og bunn.
    Plasseres de som de er, staar ikke venstrekanten paa logoen paa linje med
    teksten under. Her klippes luften bort en gang for alle, saa plasseringen
    i malene kan vaere rett frem.
    """
    kilde = os.path.join(HER, "..", "brand-profile", "logo", "png")
    for variant in ("white", "red", "black"):
        sti = os.path.join(kilde, f"SL_signature_{variant}.png")
        if not os.path.exists(sti):
            print(f"  MANGLER  {sti}")
            continue
        im = Image.open(sti).convert("RGBA")
        boks = im.getbbox()  # ramme rundt alt som ikke er gjennomsiktig
        klippet = im.crop(boks)
        ut_sti = os.path.join(UT, f"logo-{variant}.png")
        klippet.save(ut_sti, "PNG", optimize=True)
        forhold = klippet.width / klippet.height
        print(f"  logo-{variant}.png{'':13} {klippet.width}x{klippet.height}  forhold {forhold:.3f}")


# Hvor bredt bildet vises paa sliden, i tommer. Bare bilder som ligger INNE
# paa sliden staar her. Helflate-bilder (cover, fullbleed, split) er utelatt
# med vilje: runder man et bilde som gaar ut i slidekanten, faar man hvite
# hjorner i kanten av lerretet.
VISNINGSBREDDE = {
    "card-": 2.10,
    "portrait-": 2.45,
    "row-": 3.611,
    "grid-": 3.041,
}


def visningsbredde(malnavn):
    for prefiks, bredde in VISNINGSBREDDE.items():
        if malnavn.startswith(prefiks):
            return bredde
    return None


# Lerretsbredde i tommer og projektorbredde i piksler, brukt til aa regne ut
# hvor mange piksler et bilde faktisk trenger. 1.2 er slark for skarpere skjermer.
LERRET_TOMMER = 13.333
PROJEKTOR_PX = 1920
SLARK = 1.2


def lag_avrundet(im, vis_bredde, malnavn):
    """Skriver en PNG med avrundede hjorner og alfakanal ved siden av JPEG-en.
    PowerPoint kan runde hjornene paa en figur, men ikke paa et bilde, saa
    formen maa bakes inn i fila.

    PNG er tapsfritt og dermed tungt, saa bildet skaleres forst ned til det
    en projektor faktisk kan vise. Et kort som er 2,1 tommer bredt paa et
    13,3 tommers lerret dekker rundt 300 px av en 1920 px framvisning; da er
    440 px bortkastet vekt.
    """
    mal_bredde = round(vis_bredde / LERRET_TOMMER * PROJEKTOR_PX * SLARK)
    if im.width > mal_bredde:
        ny_hoyde = round(im.height * mal_bredde / im.width)
        im = im.resize((mal_bredde, ny_hoyde), Image.LANCZOS)

    radius = max(2, round(RADIUS_TOMMER / vis_bredde * im.width))
    maske = Image.new("L", im.size, 0)
    ImageDraw.Draw(maske).rounded_rectangle([0, 0, im.width - 1, im.height - 1], radius=radius, fill=255)
    rund = im.convert("RGBA")
    rund.putalpha(maske)
    ut_sti = os.path.join(UT, os.path.splitext(malnavn)[0] + "-rund.png")
    rund.save(ut_sti, "PNG", optimize=True)
    return radius, os.path.getsize(ut_sti) / 1024


def main():
    os.makedirs(UT, exist_ok=True)
    total = 0
    for kildenavn, malnavn, b, h, vpos in JOBBER:
        sti = os.path.join(KILDE, kildenavn)
        if not os.path.exists(sti):
            print(f"  MANGLER  {kildenavn}")
            continue
        im = Image.open(sti)
        if im.mode in ("RGBA", "P", "LA"):
            im = im.convert("RGB")
        ut_sti = os.path.join(UT, malnavn)
        ferdig = beskjaer_og_skaler(im, b, h, vpos)
        if malnavn.startswith("card-"):
            # Dempet, ensartet rad: hele veien til maalet
            ferdig = harmoniser(ferdig, mal_lysstyrke=68, metning=0.45, styrke=1.0)
        elif malnavn.startswith(("row-", "grid-")):
            # Hovedbilder: behold fargen, jevn ut bare det groveste spriket
            ferdig = harmoniser(ferdig, mal_lysstyrke=98, metning=0.92, styrke=0.6)
        ferdig.save(ut_sti, "JPEG", quality=82, optimize=True)
        kb = os.path.getsize(ut_sti) / 1024
        total += kb
        vis = visningsbredde(malnavn)
        if vis:
            radius, rund_kb = lag_avrundet(ferdig, vis, malnavn)
            total += rund_kb
            print(f"  {malnavn:26} {b}x{h}  {kb:7.0f} kB   + avrundet (r={radius} px)")
        else:
            print(f"  {malnavn:26} {b}x{h}  {kb:7.0f} kB")
    beskjaer_logo()
    print(f"\n  Bilder: {total / 1024:.1f} MB i {UT}")


if __name__ == "__main__":
    main()
