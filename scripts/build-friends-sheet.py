"""Key the friend drawings off their green screen and pack them into crowd-04.png.

Usage: python3 scripts/build-friends-sheet.py [friends-dir] [out-dir]
  friends-dir  contains raw/<name>.jpg (figure on green chroma background); cut-outs are written
               to <friends-dir>/<name>.png (400x500 RGBA cells) plus friends-preview.png
  out-dir      receives crowd-04.png (2000x1500, 5x3 grid of 400x500 cells), default /workspace/footer-assets

Order in the sheet is row-major and matches FRIENDS in components/CrowdScene.tsx.
"""
import sys
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage as ndi

FRIENDS = ["tayyab", "ammar", "ibrahim", "hashir", "mujtuba", "abdullah", "hadi", "khurshid"]
CELL_W, CELL_H = 400, 500
FIG_H, FIG_MAX_W, BASELINE = 456, 380, 484  # figure height, width cap, y of the feet inside the cell

src = Path(sys.argv[1] if len(sys.argv) > 1 else "/workspace/footer-assets/friends")
out_dir = Path(sys.argv[2] if len(sys.argv) > 2 else "/workspace/footer-assets")


def smoothstep(x, lo, hi):
    t = np.clip((x - lo) / (hi - lo), 0.0, 1.0)
    return t * t * (3 - 2 * t)


def bg_model(rgb):
    """Per-pixel background colour, bilinearly interpolated from the four corner patches."""
    h, w, _ = rgb.shape
    p = 24
    corners = [rgb[:p, :p], rgb[:p, -p:], rgb[-p:, :p], rgb[-p:, -p:]]
    c = [np.median(x.reshape(-1, 3), axis=0) for x in corners]
    ys = np.linspace(0, 1, h)[:, None, None]
    xs = np.linspace(0, 1, w)[None, :, None]
    top = c[0] * (1 - xs) + c[1] * xs
    bot = c[2] * (1 - xs) + c[3] * xs
    return top * (1 - ys) + bot * ys


def key(path):
    rgb = np.asarray(Image.open(path).convert("RGB"), dtype=np.float32)
    bg = bg_model(rgb)
    excess = lambda a: a[..., 1] - np.maximum(a[..., 0], a[..., 2])
    e, eb = excess(rgb), np.maximum(excess(bg), 1.0)
    # Neutral (grey/black/white) artwork has no green excess; a mix with background has a share
    # proportional to the background's coverage, so alpha = 1 - e/eb.
    alpha = 1.0 - np.clip(e / eb, 0, 1)
    alpha = smoothstep(alpha, 0.10, 0.90)
    # Recover the foreground colour of partially covered edge pixels: F = (C - (1-a) B) / a.
    a3 = np.maximum(alpha[..., None], 1e-3)
    fg = np.clip((rgb - (1 - alpha[..., None]) * bg) / a3, 0, 255)
    # Despill: the foreground may not be greener than its brightest red/blue channel.
    fg[..., 1] = np.minimum(fg[..., 1], np.maximum(fg[..., 0], fg[..., 2]))
    gray = fg @ np.array([0.299, 0.587, 0.114], dtype=np.float32)
    # Keep real drawing parts (figure, motion lines) but drop JPEG specks.
    labels, n = ndi.label(alpha > 0.5)
    if n:
        sizes = ndi.sum(np.ones_like(alpha), labels, index=np.arange(1, n + 1))
        keep = np.isin(labels, 1 + np.flatnonzero(sizes >= 60))
        alpha = np.where(ndi.binary_dilation(keep, iterations=3), alpha, 0.0)
    # Pull the matte in a hair so no light halo survives on dark outlines.
    alpha = np.clip((alpha - 0.04) / 0.96, 0, 1)
    gray = np.where(alpha > 0, gray, 0)
    rgba = np.dstack([gray, gray, gray, alpha * 255]).astype(np.uint8)
    return Image.fromarray(rgba, "RGBA")


def to_cell(img):
    bbox = img.getchannel("A").point(lambda v: 255 if v > 24 else 0).getbbox()
    fig = img.crop(bbox)
    s = min(FIG_H / fig.height, FIG_MAX_W / fig.width)
    size = (max(1, round(fig.width * s)), max(1, round(fig.height * s)))
    fig = fig.convert("RGBa").resize(size, Image.LANCZOS).convert("RGBA")
    cell = Image.new("RGBA", (CELL_W, CELL_H), (0, 0, 0, 0))
    cell.alpha_composite(fig, ((CELL_W - size[0]) // 2, BASELINE - size[1]))
    return cell


cells = {}
for name in FRIENDS:
    cells[name] = to_cell(key(src / "raw" / f"{name}.jpg"))
    cells[name].save(src / f"{name}.png")

sheet = Image.new("RGBA", (CELL_W * 5, CELL_H * 3), (0, 0, 0, 0))
for i, name in enumerate(FRIENDS):
    sheet.alpha_composite(cells[name], ((i % 5) * CELL_W, (i // 5) * CELL_H))
out_dir.mkdir(parents=True, exist_ok=True)
sheet.save(out_dir / "crowd-04.png")

# Contact sheet: each cut-out on white, black and a green check so fringes show up.
tile_w, tile_h = 200, 250
prev = Image.new("RGB", (tile_w * 8, tile_h * 3), "white")
d = ImageDraw.Draw(prev)
for row, bg in enumerate([(255, 255, 255), (0, 0, 0), (40, 200, 60)]):
    for i, name in enumerate(FRIENDS):
        t = Image.new("RGBA", (tile_w, tile_h), bg + (255,))
        t.alpha_composite(cells[name].resize((tile_w, tile_h), Image.LANCZOS))
        prev.paste(t.convert("RGB"), (i * tile_w, row * tile_h))
for i, name in enumerate(FRIENDS):
    d.text((i * tile_w + 6, 4), name, fill=(200, 0, 0))
prev.save(src / "friends-preview.png")
print("ok", [n for n in FRIENDS])
