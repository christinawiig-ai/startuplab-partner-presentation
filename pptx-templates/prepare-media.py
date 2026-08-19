"""
prepare-media.py — lager lette, ferdig beskaarne bildekopier til malene.

Kildebildene er opptil 6240 px brede. Lagt rett inn i en PowerPoint blir fila
titalls megabyte, selv om bildet bare vises i noen faa tommer. Her beskjaeres
hvert bilde til formatet det faktisk skal vises i, og skaleres til ca. 150 dpi
ved den storrelsen. Kjor paa nytt ved behov:

    python prepare-media.py
"""

import os
from PIL import Image, ImageEnhance, ImageStat

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
]


def harmoniser_kort(im, mal_lysstyrke=68, metning=0.45):
    """
    Legger de fem programkortene i samme toneleie.

    Kildebildene spriker kraftig: maalt snittlysstyrke gikk fra 46 til 82, og
    ett av dem er helt uten farge mens et annet er sterkt blaatt. Et halv-
    transparent slor i selve sliden jevner ikke ut det, fordi det legger
    samme mengde svart paa et morkt og et lyst bilde. Her dempes metningen
    forst, og deretter loftes eller senkes hvert bilde til samme snittnivaa.
    """
    im = ImageEnhance.Color(im).enhance(metning)
    naa = ImageStat.Stat(im.convert("L")).mean[0]
    if naa > 1:
        im = ImageEnhance.Brightness(im).enhance(mal_lysstyrke / naa)
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
            ferdig = harmoniser_kort(ferdig)
        ferdig.save(ut_sti, "JPEG", quality=82, optimize=True)
        kb = os.path.getsize(ut_sti) / 1024
        total += kb
        print(f"  {malnavn:26} {b}x{h}  {kb:7.0f} kB")
    beskjaer_logo()
    print(f"\n  Bilder: {total / 1024:.1f} MB i {UT}")


if __name__ == "__main__":
    main()
