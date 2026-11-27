"""Convert the crowd sprite sheets + character cutout into web-sized WebP files.

Usage: python3 scripts/build-footer-assets.py <source-dir>
Source dir must contain crowd-01..04.png (2000x1500, 5x3 grid; crowd-04 holds the friends, see build-friends-sheet.py) and character.png.
"""
import sys
from pathlib import Path
from PIL import Image

src = Path(sys.argv[1] if len(sys.argv) > 1 else "/workspace/footer-assets")
out = Path(__file__).resolve().parent.parent / "public" / "footer"
out.mkdir(parents=True, exist_ok=True)

for name in ["crowd-01", "crowd-02", "crowd-03", "crowd-04"]:
    im = Image.open(src / f"{name}.png").convert("RGBA")
    assert im.size[0] % 5 == 0 and im.size[1] % 3 == 0, f"{name}: bad grid {im.size}"
    assert im.getpixel((0, 0))[3] == 0, f"{name}: background not transparent"
    im.save(out / f"{name}.webp", "WEBP", quality=90, alpha_quality=100, method=6)

ch = Image.open(src / "character.png").convert("RGBA")
ch.save(out / "character.webp", "WEBP", quality=92, alpha_quality=100, method=6)
for f in sorted(out.iterdir()):
    print(f.name, f.stat().st_size)
