"""Recolour the yellow sneakers on the footer character to the site accent emerald.

Usage: python3 scripts/recolor-character-shoes.py <character.png|webp> [out.png|webp]

Run it on the existing public/footer/character.webp (a copy of the original is fine) so every pixel
outside the sneakers stays exactly as it was; a .webp output is written losslessly for that reason.

Only the yellow connected regions in the feet (bottom of the figure) are touched. Hue is moved
to the accent hue and saturation/value are scaled so the base yellow lands on the accent colour
(#0f9d6e) while shadows and highlights keep their relative shading. Alpha is never modified.
"""
import colorsys
import sys
from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage

ACCENT = "#0f9d6e"
src = Path(sys.argv[1])
dst = Path(sys.argv[2]) if len(sys.argv) > 2 else src

ah, as_, av = colorsys.rgb_to_hsv(*[int(ACCENT[i : i + 2], 16) / 255 for i in (1, 3, 5)])

im = Image.open(src).convert("RGBA")
a = np.asarray(im).astype(np.float64) / 255
rgb, alpha = a[..., :3], a[..., 3]
mx, mn = rgb.max(-1), rgb.min(-1)
sat = np.where(mx > 0, (mx - mn) / np.maximum(mx, 1e-6), 0)
d = np.maximum(mx - mn, 1e-6)
r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
hue = np.where(mx == r, ((g - b) / d) % 6, np.where(mx == g, (b - r) / d + 2, (r - g) / d + 4)) * 60

yellow = (alpha > 0.02) & (hue > 30) & (hue < 80) & (sat > 0.2)
# Keep only the sneakers: yellow regions whose centroid is in the feet.
labels, n = ndimage.label(ndimage.binary_dilation(yellow, iterations=2))
h_img = im.height
feet = np.zeros_like(yellow)
for i in range(1, n + 1):
    ys, xs = np.where(labels == i)
    if ys.mean() > h_img * 0.88 and len(ys) > 400:
        feet |= labels == i
mask = feet & yellow
# Soft weight so anti-aliased edge pixels blend instead of leaving a yellow fringe.
w = np.clip((sat - 0.2) / 0.25, 0, 1) * mask

# Reference yellow (the sneaker base) maps exactly onto the accent.
v = mx
ref_v = np.percentile(v[mask], 90)
ref_s = np.percentile(sat[mask], 90)
new_h = np.full_like(v, ah)
new_s = np.clip(sat / ref_s, 0, 1) * as_
new_v = np.clip(v / ref_v, 0, 1) * av

# HSV -> RGB (vectorised)
hh = new_h * 6
i = np.floor(hh).astype(int) % 6
f = hh - np.floor(hh)
p = new_v * (1 - new_s)
q = new_v * (1 - f * new_s)
t = new_v * (1 - (1 - f) * new_s)
conds = [i == k for k in range(6)]
nr = np.select(conds, [new_v, q, p, p, t, new_v])
ng = np.select(conds, [t, new_v, new_v, q, p, p])
nb = np.select(conds, [p, p, t, new_v, new_v, q])
new = np.stack([nr, ng, nb], -1)

out = rgb * (1 - w[..., None]) + new * w[..., None]
res = np.concatenate([out, alpha[..., None]], -1)
out_im = Image.fromarray(np.clip(res * 255 + 0.5, 0, 255).astype(np.uint8), "RGBA")
if dst.suffix.lower() == ".webp":
    out_im.save(dst, "WEBP", lossless=True, quality=100, method=6, exact=True)
else:
    out_im.save(dst)
print(f"recoloured {int(mask.sum())} px")
