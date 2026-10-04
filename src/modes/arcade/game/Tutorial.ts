import { Color, Group, Mesh, MeshBasicMaterial, PlaneGeometry, type CanvasTexture, type Vector3 } from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { makeCanvas, RED, roundRect, setFont, toTexture } from "./textures";

type CapId = "up" | "left" | "down" | "right" | "jump";
type Style = "filled" | "outline" | "flash";

const KEY_TO_CAP: Record<string, CapId> = {
  KeyW: "up",
  ArrowUp: "up",
  KeyA: "left",
  ArrowLeft: "left",
  KeyS: "down",
  ArrowDown: "down",
  KeyD: "right",
  ArrowRight: "right",
  Space: "jump",
};

const LAYOUT: { id: CapId; letter: string; x: number; y: number; w: number }[] = [
  { id: "up", letter: "W", x: -1.3, y: 0.78, w: 0.6 },
  { id: "left", letter: "A", x: -2.6, y: 0, w: 0.6 },
  { id: "down", letter: "S", x: -1.3, y: 0, w: 0.6 },
  { id: "right", letter: "D", x: 0, y: 0, w: 0.6 },
  { id: "jump", letter: "SPACE", x: 2.5, y: 0, w: 1.3 },
];

type Cap = {
  id: CapId;
  group: Group;
  bodyMat: MeshBasicMaterial;
  faceMat: MeshBasicMaterial;
  tex: { filled: CanvasTexture; outline: CanvasTexture; flashLetter: CanvasTexture; flashArrow: CanvasTexture };
  baseY: number;
  flash: number; // seconds left of the white flash
  flip: number; // -1 idle, else 0..1 progress
  flipDelay: number;
  out: number; // -1 alive, else seconds into the exit
  arrows: boolean;
};

const RED_GLOW = new Color(RED).multiplyScalar(1.6);
const DARK = new Color("#1a0006");
const WHITE = new Color("#ffffff").multiplyScalar(2.2);

/**
 * Floating red keycaps over the player's head. Letters and arrow glyphs
 * swap every 4s; a pressed key flashes white, and the caps you've used
 * leave. Two directions + one jump completes it.
 */
export class Tutorial {
  readonly group = new Group();
  private caps: Cap[] = [];
  private modeTimer = 0;
  private used = new Set<CapId>();
  private finishing = -1;
  active = true;

  private onComplete: () => void;
  private reduced: boolean;

  constructor(onComplete: () => void, reduced: boolean) {
    this.onComplete = onComplete;
    this.reduced = reduced;
    for (const l of LAYOUT) this.caps.push(this.makeCap(l));
    this.group.rotation.x = -0.28; // tilt toward the follow camera
  }

  place(p: Vector3) {
    this.group.position.set(p.x + 0.2, 2.9, p.z + 0.6);
  }

  onKey(code: string) {
    if (!this.active || this.finishing >= 0) return;
    const id = KEY_TO_CAP[code];
    if (!id) return;
    const cap = this.caps.find((c) => c.id === id);
    if (!cap || cap.out >= 0) return;
    cap.flash = 0.15;
    this.used.add(id);
    const dirs = [...this.used].filter((u) => u !== "jump").length;
    if (dirs >= 2 && this.used.has("jump")) this.finish();
  }

  /** Caps fly up and vanish (also used by SKIP). */
  finish() {
    if (this.finishing >= 0) return;
    this.finishing = 0;
  }

  update(dt: number, t: number, player: Vector3) {
    if (!this.active) return;
    // follow the player loosely; float a little
    const k = 1 - Math.pow(0.86, dt * 60);
    this.group.position.x += (player.x + 0.2 - this.group.position.x) * k;
    this.group.position.z += (player.z + 0.6 - this.group.position.z) * k;
    this.group.position.y = 2.9 + (this.reduced ? 0 : Math.sin(t * 1.4) * 0.05);

    this.modeTimer += dt;
    if (this.modeTimer >= 4 && this.finishing < 0) {
      this.modeTimer = 0;
      this.caps.forEach((c, i) => {
        if (this.reduced) c.arrows = !c.arrows; // swap in place, no flip
        else {
          c.flip = 0;
          c.flipDelay = i * 0.04;
        }
      });
    }

    for (const c of this.caps) this.tickCap(c, dt);

    if (this.finishing >= 0) {
      this.finishing += dt;
      if (this.finishing > 1.0) {
        this.active = false;
        this.group.visible = false;
        this.onComplete();
      }
    }
  }

  dispose() {
    for (const c of this.caps) {
      Object.values(c.tex).forEach((t) => t.dispose());
    }
  }

  // ---------------------------------------------------------------------------

  private tickCap(c: Cap, dt: number) {
    // white flash on press, then a used cap lifts away
    if (c.flash > 0) {
      c.flash -= dt;
      if (c.flash <= 0 && this.used.has(c.id) && c.out < 0) c.out = 0;
    }

    // letters ⇄ arrows: a quick card flip (scale.x through ~0) with the swap at the midpoint
    let sx = 1;
    if (c.flip >= 0) {
      if (c.flipDelay > 0) c.flipDelay -= dt;
      else {
        const before = c.flip < 0.5;
        c.flip += dt / 0.3;
        if (before && c.flip >= 0.5) c.arrows = !c.arrows;
        if (c.flip >= 1) c.flip = -1;
        else sx = Math.max(0.04, Math.abs(Math.cos(c.flip * Math.PI)));
      }
    }

    const style: Style = c.flash > 0 ? "flash" : c.arrows ? "outline" : "filled";
    this.applyStyle(c, style);

    let y = c.baseY;
    let opacity = 1;
    let s = 1;
    // a used cap keeps its own short exit; the rest leave together in the finale
    const own = c.out >= 0;
    const exit = own ? c.out : this.finishing;
    if (exit >= 0) {
      // ease-in on the way out: it leaves under its own momentum
      const dur = own ? 0.35 : 0.8;
      const u = Math.min(1, exit / dur);
      const e = u * u * u;
      y += e * (own ? 0.9 : 4);
      opacity = 1 - u;
      s = 1 - e * 0.35;
      if (own) c.out += dt;
    }
    c.group.position.y = y;
    c.group.scale.set(sx * s, s, s);
    c.group.visible = opacity > 0.01;
    c.bodyMat.opacity = opacity;
    c.faceMat.opacity = opacity;
  }

  private applyStyle(c: Cap, style: Style) {
    if (style === "flash") {
      c.bodyMat.color.copy(WHITE);
      c.faceMat.map = c.arrows ? c.tex.flashArrow : c.tex.flashLetter;
    } else if (style === "outline") {
      c.bodyMat.color.copy(DARK);
      c.faceMat.map = c.tex.outline;
    } else {
      c.bodyMat.color.copy(RED_GLOW);
      c.faceMat.map = c.tex.filled;
    }
  }

  private makeCap(l: (typeof LAYOUT)[number]): Cap {
    const group = new Group();
    group.position.set(l.x, l.y, 0);
    const bodyMat = new MeshBasicMaterial({ color: RED_GLOW.clone(), transparent: true });
    const body = new Mesh(new RoundedBoxGeometry(l.w, 0.6, 0.22, 3, 0.09), bodyMat);
    const tex = {
      filled: capTexture(l.letter, l.id, l.w, "filled", false),
      outline: capTexture(l.letter, l.id, l.w, "outline", true),
      flashLetter: capTexture(l.letter, l.id, l.w, "flash", false),
      flashArrow: capTexture(l.letter, l.id, l.w, "flash", true),
    };
    const faceMat = new MeshBasicMaterial({ map: tex.filled, transparent: true, color: new Color("#ffffff").multiplyScalar(1.35), depthWrite: false });
    const face = new Mesh(new PlaneGeometry(l.w, 0.6), faceMat);
    face.position.z = 0.112;
    group.add(body, face);
    this.group.add(group);
    return { id: l.id, group, bodyMat, faceMat, tex, baseY: l.y, flash: 0, flip: -1, flipDelay: 0, out: -1, arrows: false };
  }
}

function capTexture(letter: string, id: CapId, w: number, style: Style, arrow: boolean): CanvasTexture {
  const H = 128;
  const W = Math.round((w / 0.6) * H);
  const [c, ctx] = makeCanvas(W, H);
  ctx.clearRect(0, 0, W, H);
  const fg = style === "filled" ? "#14000a" : RED;
  const bg = style === "filled" ? RED : style === "flash" ? "#ffffff" : "#0d0003";
  ctx.fillStyle = bg;
  roundRect(ctx, 0, 0, W, H, 20);
  ctx.fill();
  if (style === "outline") {
    ctx.strokeStyle = RED;
    ctx.shadowColor = RED;
    ctx.shadowBlur = 10;
    ctx.lineWidth = 9;
    roundRect(ctx, 8, 8, W - 16, H - 16, 14);
    ctx.stroke();
    ctx.shadowBlur = 0;
  }
  ctx.fillStyle = fg;
  if (arrow && id !== "jump") {
    drawArrow(ctx, W / 2, H / 2, 30, id);
  } else {
    setFont(ctx, "display", letter.length > 1 ? 54 : 70, 900);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(letter, W / 2, H / 2 + 4);
  }
  return toTexture(c);
}

/** Block arrow like the reference's arrow caps. */
function drawArrow(ctx: CanvasRenderingContext2D, cx: number, cy: number, s: number, dir: CapId) {
  const angle = { up: 0, right: Math.PI / 2, down: Math.PI, left: -Math.PI / 2, jump: 0 }[dir];
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);
  ctx.beginPath();
  ctx.moveTo(0, -s);
  ctx.lineTo(s * 0.85, -s * 0.05);
  ctx.lineTo(s * 0.32, -s * 0.05);
  ctx.lineTo(s * 0.32, s);
  ctx.lineTo(-s * 0.32, s);
  ctx.lineTo(-s * 0.32, -s * 0.05);
  ctx.lineTo(-s * 0.85, -s * 0.05);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}
