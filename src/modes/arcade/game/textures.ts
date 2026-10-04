import { CanvasTexture, LinearFilter, RepeatWrapping, SRGBColorSpace } from "three";
import { PALETTE } from "../content";

export const RED = PALETTE.red;
export const GOLD = PALETTE.gold;
export const MAGENTA = PALETTE.magenta;
export const JADE = PALETTE.jade;

const DISPLAY = '"Archivo", "Helvetica Neue", Arial, sans-serif';
const MONO = '"JetBrains Mono", ui-monospace, Menlo, monospace';
const ZH = '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';

type FontKind = "display" | "mono" | "zh";

export function setFont(ctx: CanvasRenderingContext2D, kind: FontKind, size: number, weight = 800) {
  const family = kind === "display" ? DISPLAY : kind === "mono" ? MONO : ZH;
  ctx.font = `${weight} ${size}px ${family}`;
  // Archivo is loaded with a wdth axis; 87.5% ≈ the spec's font-stretch 88%
  if ("fontStretch" in ctx) ctx.fontStretch = kind === "display" ? "semi-condensed" : "normal";
}

export function makeCanvas(w: number, h: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d");
  if (!ctx) throw new Error("2D canvas unavailable");
  return [c, ctx];
}

export function toTexture(canvas: HTMLCanvasElement, repeat?: [number, number]): CanvasTexture {
  const t = new CanvasTexture(canvas);
  t.colorSpace = SRGBColorSpace;
  t.anisotropy = 4;
  if (repeat) {
    t.wrapS = t.wrapT = RepeatWrapping;
    t.repeat.set(repeat[0], repeat[1]);
  } else {
    t.minFilter = LinearFilter;
    t.generateMipmaps = false;
  }
  return t;
}

export function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** Faint grid for walls so depth reads in the dark. */
export function gridTexture(repeat: [number, number]): CanvasTexture {
  const [c, ctx] = makeCanvas(256, 256);
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, 256, 256);
  ctx.strokeStyle = "rgba(255,255,255,0.55)";
  ctx.lineWidth = 2;
  ctx.strokeRect(1, 1, 254, 254);
  ctx.strokeStyle = "rgba(255,255,255,0.18)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(128, 0);
  ctx.lineTo(128, 256);
  ctx.moveTo(0, 128);
  ctx.lineTo(256, 128);
  ctx.stroke();
  return toTexture(c, repeat);
}

/** Glowing neon text: a coloured halo pass, then a near-white core. */
export function neonText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  color: string,
  blur = 18,
) {
  ctx.save();
  ctx.shadowColor = color;
  ctx.shadowBlur = blur;
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
  ctx.shadowBlur = blur * 0.4;
  ctx.fillText(text, x, y);
  ctx.restore();
}

export type SignOpts = {
  title: string;
  /** Chinese sub line under the title */
  zh: string;
  color: string;
  width?: number;
  height?: number;
  chevrons?: boolean;
  dim?: boolean;
};

/** District sign: framed panel, big display title, Chinese sub line, red chevrons. */
export function signTexture(o: SignOpts): CanvasTexture {
  const w = o.width ?? 512;
  const h = o.height ?? 256;
  const [c, ctx] = makeCanvas(w, h);
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "rgba(0,0,0,0.85)";
  roundRect(ctx, 6, 6, w - 12, h - 12, 10);
  ctx.fill();
  ctx.save();
  ctx.globalAlpha = o.dim ? 0.5 : 0.8;
  ctx.strokeStyle = o.color;
  ctx.shadowColor = o.color;
  ctx.shadowBlur = 10;
  ctx.lineWidth = 3;
  roundRect(ctx, 10, 10, w - 20, h - 20, 8);
  ctx.stroke();
  // corner ticks
  ctx.fillStyle = o.color;
  ctx.fillRect(w - 46, 18, 22, 6);
  ctx.fillRect(w - 30, h - 34, 8, 12);
  ctx.restore();

  ctx.textBaseline = "middle";
  ctx.textAlign = "left";
  const left = o.chevrons ? 92 : 40;
  fitFont(ctx, o.title.toUpperCase(), w - left - 36, Math.round(h * 0.42));
  ctx.globalAlpha = o.dim ? 0.55 : 1;
  neonText(ctx, o.title.toUpperCase(), left, h * 0.44, o.color, 22);
  setFont(ctx, "zh", Math.round(h * 0.13), 700);
  ctx.globalAlpha = o.dim ? 0.4 : 0.8;
  neonText(ctx, o.zh, left + 4, h * 0.77, o.color, 6);
  // seal-style dot row after the Chinese, instead of the dashed line
  const zhW = ctx.measureText(o.zh).width;
  ctx.globalAlpha = 0.45;
  ctx.fillStyle = o.color;
  for (let i = 0; i < 6; i++) ctx.fillRect(left + 4 + zhW + 22 + i * 14, h * 0.77 - 3, 6, 6);
  ctx.globalAlpha = 1;
  if (o.chevrons) drawChevrons(ctx, 26, h * 0.44, h * 0.18, RED);
  return toTexture(c);
}

/** Largest display size (from `start`, stepping down) whose text fits `maxW`. */
export function fitFont(ctx: CanvasRenderingContext2D, text: string, maxW: number, start: number, weight = 800) {
  let size = start;
  for (; size > 16; size -= 4) {
    setFont(ctx, "display", size, weight);
    if (ctx.measureText(text).width <= maxW) break;
  }
  return size;
}

export function drawChevrons(ctx: CanvasRenderingContext2D, x: number, cy: number, s: number, color: string) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = 12;
  ctx.lineWidth = s * 0.32;
  ctx.lineCap = "square";
  for (let i = 0; i < 2; i++) {
    const ox = x + i * s * 0.75;
    ctx.beginPath();
    ctx.moveTo(ox, cy - s);
    ctx.lineTo(ox + s * 0.75, cy);
    ctx.lineTo(ox, cy + s);
    ctx.stroke();
  }
  ctx.restore();
}

/** Small badge sprite: "!" over NPCs, "i" on the info lantern. */
export function badgeTexture(glyph: string, color: string, ring = false): CanvasTexture {
  const s = 128;
  const [c, ctx] = makeCanvas(s, s);
  ctx.clearRect(0, 0, s, s);
  ctx.save();
  ctx.shadowColor = color;
  ctx.shadowBlur = 16;
  if (ring) {
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 9;
    ctx.beginPath();
    ctx.arc(s / 2, s / 2, 38, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.fillStyle = ring ? "#fff" : color;
  setFont(ctx, "display", ring ? 60 : 96);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(glyph, s / 2, s / 2 + 4);
  ctx.restore();
  return toTexture(c);
}

/** The ω mouth decal. */
export function mouthTexture(): CanvasTexture {
  const [c, ctx] = makeCanvas(128, 64);
  ctx.clearRect(0, 0, 128, 64);
  ctx.strokeStyle = "#ffffff";
  ctx.shadowColor = "#ff6680";
  ctx.shadowBlur = 6;
  ctx.lineWidth = 7;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(30, 16);
  ctx.quadraticCurveTo(31, 46, 47, 44);
  ctx.quadraticCurveTo(61, 42, 64, 24);
  ctx.quadraticCurveTo(67, 42, 81, 44);
  ctx.quadraticCurveTo(97, 46, 98, 16);
  ctx.stroke();
  return toTexture(c);
}

/**
 * Paper-lantern skin: vertical ribs that darken toward the seams, so the
 * emissive sphere reads as a pleated red lantern rather than a lit ball.
 */
export function lanternTexture(): CanvasTexture {
  const [c, ctx] = makeCanvas(256, 128);
  const ribs = 12;
  const w = 256 / ribs;
  for (let i = 0; i < ribs; i++) {
    const g = ctx.createLinearGradient(i * w, 0, (i + 1) * w, 0);
    g.addColorStop(0, "#7a0018");
    g.addColorStop(0.5, "#ffffff");
    g.addColorStop(1, "#7a0018");
    ctx.fillStyle = g;
    ctx.fillRect(i * w, 0, w + 1, 128);
  }
  // darker toward the caps
  const v = ctx.createLinearGradient(0, 0, 0, 128);
  v.addColorStop(0, "rgba(0,0,0,0.55)");
  v.addColorStop(0.2, "rgba(0,0,0,0)");
  v.addColorStop(0.8, "rgba(0,0,0,0)");
  v.addColorStop(1, "rgba(0,0,0,0.55)");
  ctx.fillStyle = v;
  ctx.fillRect(0, 0, 256, 128);
  const t = toTexture(c, [1, 1]);
  return t;
}

/* ───────────── Leo's pixel glyphs (replace the generic "invader" strips) ───────────── */

type Bitmap = { rows: string[]; color: string };

/** 11-wide bitmaps; "#" = lit pixel. Dumpling, saber, pawn, helicopter. */
const GLYPHS: Bitmap[] = [
  {
    // dumpling: pleated crescent, two eyes
    color: "#f3e9dc",
    rows: [
      "....#.#.#..",
      "...#.#.#.#.",
      "..#########",
      ".#.........",
      "#..##...##.",
      "#..##...##.",
      "#.........#",
      ".#.......#.",
      "..#######..",
    ],
  },
  {
    // saber: blade rising right, knuckle guard bottom-left
    color: RED,
    rows: [
      "..........#",
      ".........#.",
      "........#..",
      ".......#...",
      "......#....",
      ".....#.....",
      "..###......",
      ".#..##.....",
      ".#..#......",
      "..##.......",
    ],
  },
  {
    // pawn
    color: "#e6e6ee",
    rows: [
      "....###....",
      "...#####...",
      "....###....",
      "...#####...",
      "....###....",
      "....###....",
      "...#####...",
      "..#######..",
      ".#########.",
    ],
  },
  {
    // rubber-band helicopter: rotor, mast, fuselage, tail
    color: GOLD,
    rows: [
      "###########",
      ".....#.....",
      ".....#.....",
      "...#####...",
      "..#######..",
      "..#######..",
      "...###.....",
      ".....######",
      ".........##",
    ],
  },
];

/** Tall strip of Leo's pixel glyphs for the wall panels. */
export function glyphStrip(order: number[] = [0, 1, 2, 3]): CanvasTexture {
  const [c, ctx] = makeCanvas(96, 384);
  ctx.fillStyle = "rgba(0,0,0,0.8)";
  ctx.fillRect(4, 4, 88, 376);
  ctx.strokeStyle = "rgba(255,194,74,0.45)";
  ctx.lineWidth = 2;
  ctx.strokeRect(6, 6, 84, 372);
  const cell = 5;
  const slot = 376 / order.length;
  order.forEach((gi, k) => {
    const g = GLYPHS[gi % GLYPHS.length];
    const hRows = g.rows.length;
    const ox = 48 - (11 * cell) / 2;
    const oy = 4 + slot * k + (slot - hRows * cell) / 2;
    ctx.save();
    ctx.shadowColor = g.color;
    ctx.shadowBlur = 6;
    ctx.fillStyle = g.color;
    g.rows.forEach((row, y) => {
      for (let x = 0; x < row.length; x++) {
        if (row[x] === "#") ctx.fillRect(ox + x * cell, oy + y * cell, cell - 1, cell - 1);
      }
    });
    ctx.restore();
  });
  return toTexture(c);
}

/* ───────────── Floor markings ───────────── */

/** A fencing piste: 14 m × 1.5 m, centre line, on-guard and warning lines. */
export function pisteTexture(): CanvasTexture {
  const W = 128;
  const H = 1024;
  const [c, ctx] = makeCanvas(W, H);
  ctx.clearRect(0, 0, W, H);
  ctx.strokeStyle = "rgba(255,255,255,0.75)";
  ctx.lineWidth = 3;
  ctx.strokeRect(4, 4, W - 8, H - 8);
  const line = (y: number, alpha: number, dashed = false) => {
    ctx.save();
    ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
    if (dashed) ctx.setLineDash([8, 8]);
    ctx.beginPath();
    ctx.moveTo(4, y);
    ctx.lineTo(W - 4, y);
    ctx.stroke();
    ctx.restore();
  };
  line(H / 2, 0.9); // centre
  for (const s of [-1, 1]) {
    line(H / 2 + s * (H / 14) * 2, 0.7); // on-guard lines, 2 m from centre
    line(H / 2 + s * (H / 14) * 5, 0.45, true); // warning lines, 2 m from the ends
  }
  // red end zones
  ctx.fillStyle = "rgba(255,0,51,0.35)";
  ctx.fillRect(4, 4, W - 8, H / 14);
  ctx.fillRect(4, H - 4 - H / 14, W - 8, H / 14);
  return toTexture(c);
}

/** An 8×8 board; light squares glow faintly so it reads in the dark. */
export function chessboardTexture(): CanvasTexture {
  const S = 256;
  const [c, ctx] = makeCanvas(S, S);
  const cell = S / 8;
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      ctx.fillStyle = (x + y) % 2 ? "#0a0a0c" : "#3a3a44";
      ctx.fillRect(x * cell, y * cell, cell, cell);
    }
  }
  ctx.strokeStyle = "rgba(255,255,255,0.6)";
  ctx.lineWidth = 3;
  ctx.strokeRect(1.5, 1.5, S - 3, S - 3);
  return toTexture(c);
}
