/**
 * Shared Three.js plumbing for the editorial scenes: renderer defaults,
 * deep disposal, procedural textures, cloud blobs and a pausable RAF loop.
 */
import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";

export interface RendererOptions {
  alpha?: boolean;
  shadows?: boolean;
  exposure?: number;
}

export function createRenderer(canvas: HTMLCanvasElement, opts: RendererOptions = {}): THREE.WebGLRenderer {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: opts.alpha ?? false,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = opts.exposure ?? 1.1;
  if (opts.shadows) {
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  }
  if (opts.alpha) renderer.setClearColor(0x000000, 0);
  return renderer;
}

function disposeMaterial(m: THREE.Material) {
  for (const value of Object.values(m)) {
    if (value instanceof THREE.Texture) value.dispose();
  }
  m.dispose();
}

/** Dispose every geometry, material and texture under `root`. */
export function disposeObject(root: THREE.Object3D) {
  root.traverse((obj) => {
    if (obj instanceof THREE.Mesh || obj instanceof THREE.LineSegments || obj instanceof THREE.Points) {
      obj.geometry.dispose();
      const mat = obj.material as THREE.Material | THREE.Material[];
      if (Array.isArray(mat)) mat.forEach(disposeMaterial);
      else disposeMaterial(mat);
    }
    if (obj instanceof THREE.InstancedMesh) obj.dispose();
  });
}

/** Deterministic PRNG so scenes look the same on every visit. */
export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Smooth 2D value noise in [-1, 1]. */
export function makeNoise2D(seed: number) {
  const rand = mulberry32(seed);
  const perm = new Uint8Array(512);
  const vals = new Float32Array(256);
  for (let i = 0; i < 256; i++) {
    perm[i] = i;
    vals[i] = rand() * 2 - 1;
  }
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    const t = perm[i];
    perm[i] = perm[j];
    perm[j] = t;
  }
  for (let i = 0; i < 256; i++) perm[i + 256] = perm[i];
  const at = (x: number, y: number) => vals[perm[(perm[x & 255] + y) & 255]];
  const fade = (t: number) => t * t * (3 - 2 * t);
  return (x: number, y: number) => {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const xf = fade(x - xi);
    const yf = fade(y - yi);
    const a = at(xi, yi);
    const b = at(xi + 1, yi);
    const c = at(xi, yi + 1);
    const d = at(xi + 1, yi + 1);
    return a + (b - a) * xf + (c - a) * yf + (a - b - c + d) * xf * yf;
  };
}

/** Vertical gradient texture (top -> bottom). */
export function gradientTexture(stops: [number, string][], h = 256): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 4;
  c.height = h;
  const ctx = c.getContext("2d");
  if (ctx) {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    stops.forEach(([o, col]) => g.addColorStop(o, col));
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 4, h);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** Soft radial blob (white centre, transparent edge) for fake shadows / glows. */
export function radialTexture(size = 128, inner = 0.15): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d");
  if (ctx) {
    const g = ctx.createRadialGradient(size / 2, size / 2, size * inner, size / 2, size / 2, size / 2);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.55, "rgba(255,255,255,0.65)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** A puffy cloud: a handful of merged spheres, flattened at the bottom. */
export function createCloudGeometry(rand: () => number, puffs = 8): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = [];
  for (let i = 0; i < puffs; i++) {
    const r = 0.55 + rand() * 0.75;
    const g = new THREE.SphereGeometry(r, 18, 14);
    const x = (i / (puffs - 1) - 0.5) * 3.6 + (rand() - 0.5) * 0.5;
    const y = Math.max(0, (1 - Math.abs(x) / 2.2) * 0.6 + rand() * 0.35);
    g.translate(x, y, (rand() - 0.5) * 0.8);
    parts.push(g);
  }
  const merged = mergeGeometries(parts, false);
  parts.forEach((p) => p.dispose());
  const pos = merged.getAttribute("position");
  for (let i = 0; i < pos.count; i++) {
    if (pos.getY(i) < -0.15) pos.setY(i, -0.15 + (pos.getY(i) + 0.15) * 0.25);
  }
  merged.computeVertexNormals();
  return merged;
}

/**
 * requestAnimationFrame loop that only runs while `target` is near the
 * viewport, the tab is visible and `paused()` is false.
 */
export class RenderLoop {
  private raf = 0;
  private last = 0;
  private visible = true;
  private io: IntersectionObserver;
  private disposed = false;
  private frame: (dt: number, time: number) => void;
  private paused: () => boolean;

  constructor(target: Element, frame: (dt: number, time: number) => void, paused: () => boolean = () => false) {
    this.frame = frame;
    this.paused = paused;
    this.io = new IntersectionObserver(
      (entries) => {
        this.visible = entries.some((e) => e.isIntersecting);
        this.resume();
      },
      { rootMargin: "120px 0px" },
    );
    this.io.observe(target);
    document.addEventListener("visibilitychange", this.resume);
  }

  get running() {
    return this.raf !== 0;
  }

  resume = () => {
    if (this.disposed || this.raf || !this.visible || this.paused() || document.hidden) return;
    this.last = performance.now();
    this.raf = requestAnimationFrame(this.tick);
  };

  private tick = (now: number) => {
    this.raf = 0;
    if (this.disposed || !this.visible || this.paused() || document.hidden) return;
    const dt = Math.min(0.05, Math.max(0, (now - this.last) / 1000));
    this.last = now;
    this.frame(dt, now / 1000);
    this.raf = requestAnimationFrame(this.tick);
  };

  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    this.raf = 0;
    this.io.disconnect();
    document.removeEventListener("visibilitychange", this.resume);
  }
}
