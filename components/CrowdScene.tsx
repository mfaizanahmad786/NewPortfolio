"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

/**
 * Animated crowd footer scene, built per Aswin Panengal's "Personal crowd footer" notes:
 * giant name → rear canvas → still character → front canvas. Pedestrians are static sprites
 * cut from 5×3 sprite sheets that slide and bob; the character never moves.
 */

const SHEETS = [
  "/footer/crowd-01.webp",
  "/footer/crowd-02.webp",
  "/footer/crowd-03.webp",
  "/footer/crowd-04.webp", // the friends, row-major in the order below
];
const FRIEND_SHEET = 3;
// Friend order: tayyab, ammar, ibrahim, hashir, mujtuba, abdullah, hadi, khurshid (see scripts/build-friends-sheet.py).
// Friends are full-body drawings while the crowd is waist-up, so they are scaled up to the
// crowd's head size and cropped at the waist (rear row) or by the scene edge (front row).
const FRIEND_BOOST = 1.5;
const FRIEND_CROP = { rear: 0.62, front: 0.8 };
const COLS = 5;
const ROWS = 3;
const CHARACTER = { src: "/footer/character.webp", width: 370, height: 1129 };

type Sprite = { img: HTMLImageElement; sx: number; sy: number; sw: number; sh: number; scale: number; friend?: number };

type Walker = {
  sprite: number;
  row: "rear" | "front";
  canvas: "back" | "front";
  phase: number; // 0..1 position along the loop
  crossing: number; // seconds to travel one viewport width
  size: number; // multiplier on the row height
  bobAmp: number; // px
  bobPhase: number;
  bobRate: number; // bobs per second
};

function rng(seed: number) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load ${src}`));
    img.src = src;
  });
}

/** Validate the 5×3 grid, then trim every cell to its non-transparent bounds. */
function sliceSheet(img: HTMLImageElement, src: string, friends = false): Omit<Sprite, "scale">[] {
  const { naturalWidth: w, naturalHeight: h } = img;
  if (w % COLS !== 0 || h % ROWS !== 0 || Math.abs(w / h - 4 / 3) > 0.02) {
    console.error(`[crowd] ${src} is ${w}×${h}; expected an exact 5×3 grid on a 4:3 canvas. Regenerate the sheet.`);
    return [];
  }
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return [];
  ctx.drawImage(img, 0, 0);
  const data = ctx.getImageData(0, 0, w, h).data;
  const alphaAt = (x: number, y: number) => data[(y * w + x) * 4 + 3];
  // An opaque background means the sheet would render as a white rectangle.
  const corners = [alphaAt(0, 0), alphaAt(w - 1, 0), alphaAt(0, h - 1), alphaAt(w - 1, h - 1)];
  if (corners.every((a) => a > 200)) {
    console.error(`[crowd] ${src} has an opaque background. Regenerate it with real transparency.`);
    return [];
  }
  const cw = w / COLS;
  const ch = h / ROWS;
  const out: Omit<Sprite, "scale">[] = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      let minX = cw, minY = ch, maxX = -1, maxY = -1;
      const x0 = c * cw;
      const y0 = r * ch;
      for (let y = 0; y < ch; y++) {
        const row = (y0 + y) * w;
        for (let x = 0; x < cw; x++) {
          if (data[(row + x0 + x) * 4 + 3] > 24) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }
      if (maxX < 0 || maxX - minX < 20 || maxY - minY < 20) {
        continue; // unused cell (the friends sheet holds 8 of 15)
      }
      out.push({
        img,
        sx: x0 + minX,
        sy: y0 + minY,
        sw: maxX - minX + 1,
        sh: maxY - minY + 1,
        friend: friends ? out.length : undefined,
      });
    }
  }
  return out;
}

/**
 * Normalize figure scale. Drawn height is `rowHeight * clamped`, not the source
 * pixel height, so 400–470px v2 figures land at the same on-screen size as the
 * earlier ~360–430px sheets and stay in scale with the character (365px desktop,
 * ~220–260px mobile). Relative size is pulled toward the median, within ±12%.
 */
function normalize(raw: Omit<Sprite, "scale">[]): Sprite[] {
  if (!raw.length) return [];
  const heights = raw.map((s) => s.sh).sort((a, b) => a - b);
  const median = heights[Math.floor(heights.length / 2)];
  return raw.map((s) => {
    const rel = s.sh / median;
    const clamped = Math.min(1.12, Math.max(0.88, rel));
    // draw height = rowHeight * walker.size * clamped  (s.sh cancels out)
    return { ...s, scale: clamped / s.sh };
  });
}

/**
 * Build both rows. Counts come from the row's loop length and figure width so the crowd stays
 * dense at any viewport. Friends are placed deterministically: half in each row, evenly spaced,
 * so every friend is on screen in every crossing.
 */
function buildWalkers(sprites: Sprite[], counts: { rear: number; front: number }, mobile: boolean): Walker[] {
  const rand = rng(mobile ? 7 : 1337);
  const crowd: number[] = [];
  const friends: number[] = [];
  sprites.forEach((s, i) => (s.friend === undefined ? crowd : friends).push(i));
  friends.sort((a, b) => (sprites[a].friend as number) - (sprites[b].friend as number));
  // Shuffled crowd order; consumed round-robin so neighbours differ.
  for (let i = crowd.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [crowd[i], crowd[j]] = [crowd[j], crowd[i]];
  }
  let cursor = 0;
  const nextCrowd = () => crowd[cursor++ % crowd.length];
  // Even friends go to the rear row, odd to the front, interleaved so rows differ.
  const friendsFor = (row: "rear" | "front") => friends.filter((_, k) => (row === "rear" ? k % 2 === 0 : k % 2 === 1));

  const walkers: Walker[] = [];
  const make = (row: "rear" | "front", n: number) => {
    const mine = friendsFor(row);
    const slots = new Map<number, number>();
    mine.forEach((sprite, k) => slots.set(Math.floor(((k + 0.5) * n) / Math.max(1, mine.length)) % n, sprite));
    for (let i = 0; i < n; i++) {
      const friend = slots.get(i);
      walkers.push({
        sprite: friend ?? nextCrowd(),
        row,
        phase: (i + (rand() - 0.5) * 0.24) / n,
        // A couple of rear walkers are drawn over the character; never friends.
        canvas: row === "front" ? "front" : friend === undefined && i % 9 === 4 ? "front" : "back",
        crossing: 10 + rand() * 6,
        size: row === "rear" ? 0.94 + rand() * 0.12 : 0.96 + rand() * 0.1,
        bobAmp: 2 + rand() * 6,
        bobPhase: rand() * Math.PI * 2,
        bobRate: 1.8 + rand() * 0.5,
      });
    }
  };
  make("rear", Math.max(counts.rear, 4));
  make("front", Math.max(counts.front, 4));
  return walkers;
}

export function CrowdScene({ name, description }: { name: string; description: string }) {
  const descId = useId();
  const sceneRef = useRef<HTMLButtonElement>(null);
  const backRef = useRef<HTMLCanvasElement>(null);
  const frontRef = useRef<HTMLCanvasElement>(null);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [ready, setReady] = useState(false);
  const pausedRef = useRef(false);
  const kickRef = useRef<() => void>(() => {});

  const toggle = useCallback(() => {
    if (reduced) return;
    pausedRef.current = !pausedRef.current;
    setPaused(pausedRef.current);
    kickRef.current();
  }, [reduced]);

  useEffect(() => {
    const scene = sceneRef.current;
    const back = backRef.current;
    const front = frontRef.current;
    if (!scene || !back || !front) return;
    const backCtx = back.getContext("2d");
    const frontCtx = front.getContext("2d");
    if (!backCtx || !frontCtx) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduce = motionQuery.matches;
    setReduced(reduce);

    let disposed = false;
    let sprites: Sprite[] = [];
    let walkers: Walker[] = [];
    let mobile = false;
    let width = 0;
    let height = 0;
    let elapsed = 0; // seconds of animation actually played
    let last: number | null = null;
    let frame = 0;
    let visible = true;
    let tabVisible = document.visibilityState === "visible";

    const metrics = () => {
      const charH = Math.min(mobile ? Math.min(260, Math.max(220, window.innerHeight * 0.3)) : 365, height - 24);
      const charBottom = height - 12;
      return {
        rearH: charH * (mobile ? 0.54 : 0.47),
        rearBottom: charBottom - charH * (mobile ? 0.4 : 0.43),
        frontH: charH * (mobile ? 0.84 : 0.78),
        frontTop: charBottom - charH * (mobile ? 0.5 : 0.55),
      };
    };

    // Row geometry shared by drawing and density: loop = one screen plus a sprite on each side.
    const layout = () => {
      const m = metrics();
      const crowdSprites = sprites.filter((sp) => sp.friend === undefined);
      const aspect = crowdSprites.length
        ? crowdSprites.reduce((sum, sp) => sum + sp.sw / sp.sh, 0) / crowdSprites.length
        : 0.7;
      const padRear = m.rearH * 1.1;
      const padFront = m.frontH * 1.1;
      const loopRear = width + padRear * 2;
      const loopFront = width + padFront * 2;
      // Spacing in figure widths: ~0.8 on desktop so shoulders overlap and gaps stay rare. Phones
      // are looser so the character is never buried on a 390px-wide scene.
      const gap = mobile ? { rear: 1.1, front: 1.7 } : { rear: 0.78, front: 0.8 };
      const cap = mobile ? { rear: 12, front: 8 } : { rear: 30, front: 18 };
      return {
        m,
        padRear,
        padFront,
        loopRear,
        loopFront,
        counts: {
          rear: Math.min(cap.rear, Math.ceil(loopRear / (m.rearH * aspect * gap.rear))),
          front: Math.min(cap.front, Math.ceil(loopFront / (m.frontH * aspect * gap.front))),
        },
      };
    };

    const draw = () => {
      backCtx.clearRect(0, 0, width, height);
      frontCtx.clearRect(0, 0, width, height);
      if (!sprites.length || !width) return;
      const { m, padRear, padFront, loopRear, loopFront } = layout();
      for (const w of walkers) {
        const s = sprites[w.sprite % sprites.length];
        const rear = w.row === "rear";
        const rowH = rear ? m.rearH : m.frontH;
        const crop = s.friend === undefined ? 1 : rear ? FRIEND_CROP.rear : FRIEND_CROP.front;
        const boost = s.friend === undefined ? 1 : FRIEND_BOOST;
        const sh = s.sh * crop; // visible slice of the sprite (top part for friends)
        // Draw height is independent of source pixels: rowHeight * size * normalized scale.
        const dh = rowH * w.size * s.scale * s.sh * boost * crop;
        const dw = dh * (s.sw / sh);
        const pad = rear ? padRear : padFront;
        const loop = rear ? loopRear : loopFront;
        const speed = width / w.crossing;
        const dir = rear ? 1 : -1; // rear walks right, front walks left (nobody is mirrored)
        let x = (w.phase * loop + dir * speed * elapsed) % loop;
        if (x < 0) x += loop;
        x -= pad;
        const bob = w.bobAmp * Math.abs(Math.sin(Math.PI * w.bobRate * elapsed + w.bobPhase));
        const y = rear ? m.rearBottom - dh - bob : m.frontTop - bob;
        const ctx = w.canvas === "back" ? backCtx : frontCtx;
        ctx.drawImage(s.img, s.sx, s.sy, s.sw, sh, x - dw / 2, y, dw, dh);
      }
    };

    const running = () => !reduce && !pausedRef.current && visible && tabVisible && sprites.length > 0;

    const tick = (now: number) => {
      frame = 0;
      if (!running()) {
        last = null;
        return;
      }
      if (last !== null) elapsed += Math.min(0.1, (now - last) / 1000);
      last = now;
      draw();
      frame = requestAnimationFrame(tick);
    };

    const kick = () => {
      if (running() && !frame) {
        last = null;
        frame = requestAnimationFrame(tick);
      } else if (!running() && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
        last = null;
      }
    };
    kickRef.current = kick;

    const resize = () => {
      const rect = scene.getBoundingClientRect();
      const nextMobile = window.innerWidth < 600;
      width = rect.width;
      height = rect.height;
      const wasMobile = mobile;
      mobile = nextMobile;
      if (sprites.length) {
        const counts = layout().counts;
        const have = (row: Walker["row"]) => walkers.filter((w) => w.row === row).length;
        if (wasMobile !== mobile || !walkers.length || counts.rear !== have("rear") || counts.front !== have("front")) {
          walkers = buildWalkers(sprites, counts, mobile);
        }
      }
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      for (const [canvas, ctx] of [[back, backCtx], [front, frontCtx]] as const) {
        canvas.width = Math.max(1, Math.round(width * dpr));
        canvas.height = Math.max(1, Math.round(height * dpr));
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.imageSmoothingQuality = "high";
      }
      draw();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(scene);
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) load();
        kick();
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(scene);
    const onVisibility = () => {
      tabVisible = document.visibilityState === "visible";
      kick();
    };
    document.addEventListener("visibilitychange", onVisibility);
    const onMotion = () => {
      reduce = motionQuery.matches;
      setReduced(reduce);
      draw();
      kick();
    };
    motionQuery.addEventListener("change", onMotion);

    let started = false;
    const load = () => {
      if (started) return;
      started = true;
      Promise.allSettled(SHEETS.map(loadImage)).then(onLoaded);
    };
    const onLoaded = (results: PromiseSettledResult<HTMLImageElement>[]) => {
      if (disposed) return;
      const raw = results.flatMap((r, i) => {
        if (r.status === "rejected") {
          console.error(`[crowd] ${r.reason}`);
          return [];
        }
        return sliceSheet(r.value, SHEETS[i], i === FRIEND_SHEET);
      });
      sprites = normalize(raw);
      if (!sprites.length) return; // links and character stay; scene is just empty
      walkers = buildWalkers(sprites, layout().counts, mobile);
      // Static layout under reduced motion: a mid-stride moment with people around the character.
      elapsed = reduce ? 4.2 : 0;
      setReady(true);
      resize();
      kick();
    };

    return () => {
      disposed = true;
      if (frame) cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      motionQuery.removeEventListener("change", onMotion);
      kickRef.current = () => {};
    };
  }, []);

  return (
    <>
      <p id={descId} className="sr-only">
        {description}
      </p>
      <button
        ref={sceneRef}
        type="button"
        className="footer-crowd-scene"
        aria-label={reduced ? `${name} Crowd scene` : `${name} ${paused ? "Resume" : "Pause"} crowd animation`}
        aria-describedby={descId}
        aria-pressed={reduced ? undefined : paused}
        disabled={reduced}
        data-ready={ready}
        data-paused={paused}
        onClick={toggle}
        style={{ ["--name-chars" as string]: name.length }}
      >
        <span className="footer-crowd-name" aria-hidden="true">
          {name}
        </span>
        <canvas ref={backRef} className="footer-crowd-layer footer-crowd-back" aria-hidden="true" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="footer-crowd-portrait"
          src={CHARACTER.src}
          alt=""
          width={CHARACTER.width}
          height={CHARACTER.height}
          loading="lazy"
          decoding="async"
        />
        <canvas ref={frontRef} className="footer-crowd-layer footer-crowd-front" aria-hidden="true" />
      </button>
    </>
  );
}
