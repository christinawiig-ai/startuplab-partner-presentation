"""
contact-sheet.py — setter alle rendrede slides i ett rutenett.

Nyttig for aa vurdere helheten: harmoni, veksling mellom morkt og lyst, og om
noen slide skiller seg ut paa feil maate. Kjor etter render.ps1:

    python contact-sheet.py                              # render/ -> oversikt.png
    python contact-sheet.py render-avrundet oversikt-avrundet.png

Mappe og utdatafil tas som argumenter med vilje. Et tidligere forsok byttet
navn paa mappene rundt et kall uten argumenter, og da et av navnebyttene
feilet, laa mappene igjen ombyttet og oversikten ble merket feil.
"""

import os
import re
import sys
from PIL import Image, ImageDraw

HER = os.path.dirname(os.path.abspath(__file__))
RENDER = os.path.join(HER, sys.argv[1] if len(sys.argv) > 1 else "render")
UT = os.path.join(HER, sys.argv[2] if len(sys.argv) > 2 else "oversikt.png")

KOL = 3
MINI_B = 640
MARG = 26
ETIKETT = 30
BAKGRUNN = (228, 230, 232)


def sorteringsnokkel(navn):
    tall = re.findall(r"\d+", navn)
    return int(tall[0]) if tall else 0


def main():
    filer = sorted(
        [f for f in os.listdir(RENDER) if f.lower().endswith(".png")],
        key=sorteringsnokkel,
    )
    if not filer:
        print("  Fant ingen PNG-er i render/. Kjor render.ps1 forst.")
        return

    mini_h = int(MINI_B * 9 / 16)
    rader = (len(filer) + KOL - 1) // KOL
    bredde = KOL * MINI_B + (KOL + 1) * MARG
    hoyde = rader * (mini_h + ETIKETT) + (rader + 1) * MARG

    ark = Image.new("RGB", (bredde, hoyde), BAKGRUNN)
    tegner = ImageDraw.Draw(ark)

    for i, navn in enumerate(filer):
        kol, rad = i % KOL, i // KOL
        x = MARG + kol * (MINI_B + MARG)
        y = MARG + rad * (mini_h + ETIKETT + MARG)

        mini = Image.open(os.path.join(RENDER, navn)).convert("RGB")
        mini = mini.resize((MINI_B, mini_h), Image.LANCZOS)
        ark.paste(mini, (x, y))
        tegner.rectangle([x, y, x + MINI_B - 1, y + mini_h - 1], outline=(200, 203, 206))
        tegner.text((x + 2, y + mini_h + 8), f"{i + 1}", fill=(70, 72, 74))

    ark.save(UT, "PNG", optimize=True)
    print(f"  Skrev {UT}  ({bredde}x{hoyde}, {len(filer)} slides)")


if __name__ == "__main__":
    main()
