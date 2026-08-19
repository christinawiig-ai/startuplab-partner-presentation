"""
prepare-media.py — lager lette, ferdig beskaarne bildekopier til malene.

Kildebildene er opptil 6240 px brede. Lagt rett inn i en PowerPoint blir fila
titalls megabyte, selv om bildet bare vises i noen faa tommer. Her beskjaeres
hvert bilde til formatet det faktisk skal vises i, og skaleres til ca. 150 dpi
ved den storrelsen. Kjor paa nytt ved behov:

    python prepare-media.py
"""

import os
from PIL import Image

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
        beskjaer_og_skaler(im, b, h, vpos).save(ut_sti, "JPEG", quality=82, optimize=True)
        kb = os.path.getsize(ut_sti) / 1024
        total += kb
        print(f"  {malnavn:26} {b}x{h}  {kb:7.0f} kB")
    print(f"\n  Sum: {total / 1024:.1f} MB i {UT}")


if __name__ == "__main__":
    main()
