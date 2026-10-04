import {
  AdditiveBlending,
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  CylinderGeometry,
  DoubleSide,
  Fog,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PlaneGeometry,
  PointLight,
  Points,
  PointsMaterial,
  RingGeometry,
  Scene,
  ShaderMaterial,
  SphereGeometry,
  Sprite,
  SpriteMaterial,
  Vector3,
} from "three";
import { Reflector } from "three/examples/jsm/objects/Reflector.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { projects } from "../../../content/leo";
import { LATIN, SECTION_META, SECTIONS, ZH, type Section } from "../content";
import {
  GOLD,
  JADE,
  MAGENTA,
  RED,
  badgeTexture,
  chessboardTexture,
  drawChevrons,
  fitFont,
  glyphStrip,
  gridTexture,
  lanternTexture,
  makeCanvas,
  neonText,
  pisteTexture,
  roundRect,
  setFont,
  signTexture,
  toTexture,
} from "./textures";
import { ROOM, type Collider, type Interactable } from "./types";

const glow = (hex: string, k: number) => new Color(hex).multiplyScalar(k);

/** Floor reflection: blurred, distance-faded, added on top of the glossy floor. */
const ReflectShader = {
  name: "FloorReflect",
  uniforms: {
    color: { value: null },
    tDiffuse: { value: null },
    textureMatrix: { value: null },
    uStrength: { value: 0.38 },
    uBlur: { value: 0.004 },
  },
  vertexShader: /* glsl */ `
    uniform mat4 textureMatrix;
    varying vec4 vUv;
    varying vec3 vWorld;
    void main() {
      vUv = textureMatrix * vec4(position, 1.0);
      vec4 wp = modelMatrix * vec4(position, 1.0);
      vWorld = wp.xyz;
      gl_Position = projectionMatrix * viewMatrix * wp;
    }`,
  fragmentShader: /* glsl */ `
    uniform vec3 color;
    uniform sampler2D tDiffuse;
    uniform float uStrength, uBlur;
    varying vec4 vUv;
    varying vec3 vWorld;
    void main() {
      vec2 uv = vUv.xy / vUv.w;
      // glossy, not mirror: 9-tap blur that widens with distance
      float d = distance(vWorld, cameraPosition);
      float r = uBlur * (0.6 + d * 0.06);
      vec3 c = texture2D(tDiffuse, uv).rgb * 0.24;
      c += texture2D(tDiffuse, uv + vec2( r, 0.0)).rgb * 0.11;
      c += texture2D(tDiffuse, uv + vec2(-r, 0.0)).rgb * 0.11;
      c += texture2D(tDiffuse, uv + vec2(0.0,  r)).rgb * 0.11;
      c += texture2D(tDiffuse, uv + vec2(0.0, -r)).rgb * 0.11;
      c += texture2D(tDiffuse, uv + vec2( r,  r) * 0.7).rgb * 0.08;
      c += texture2D(tDiffuse, uv + vec2(-r,  r) * 0.7).rgb * 0.08;
      c += texture2D(tDiffuse, uv + vec2( r, -r) * 0.7).rgb * 0.08;
      c += texture2D(tDiffuse, uv + vec2(-r, -r) * 0.7).rgb * 0.08;
      float fade = 1.0 - smoothstep(6.0, 38.0, d);
      gl_FragColor = vec4(c * color * uStrength * fade, 1.0);
    }`,
};

type Lantern = { body: MeshStandardMaterial; light: PointLight; base: number };

export type WorldTick = {
  t: number;
  dt: number;
  beat: number;
  musicOn: boolean;
  /** seconds since the afterparty started, or -1 */
  party: number;
  previewColor: string;
};

export class World {
  readonly group = new Group();
  readonly interactables: Interactable[] = [];
  readonly colliders: Collider[] = [];
  readonly reflector: Reflector;

  private lanterns: Lantern[] = [];
  private vinyl!: Mesh;
  private speakerRings: Mesh[] = [];
  private hologram!: Mesh;
  private hologramMat!: MeshBasicMaterial;
  private infoBadge!: Sprite;
  private dust!: Points;
  private textures: CanvasTexture[] = [];

  private reduced: boolean;

  constructor(scene: Scene, reflectSize: [number, number], reduced: boolean) {
    this.reduced = reduced;
    scene.background = new Color("#030304");
    scene.fog = new Fog("#030304", 14, 52);
    scene.add(this.group);

    this.reflector = this.buildFloor(reflectSize);
    this.buildWalls();
    this.buildFloorMarkings();
    this.buildLanterns();
    this.buildSigns();
    this.buildWorksWall();
    this.buildDjBooth();
    this.buildSkinStation();
    this.buildDust();
  }

  setReflectorSize(w: number, h: number) {
    this.reflector.getRenderTarget().setSize(w, h);
  }

  update(s: WorldTick) {
    const { t, dt } = s;

    // lanterns: subtle flicker, or the rainbow party
    const partyOn = s.party >= 0 && s.party < 4;
    this.lanterns.forEach((l, i) => {
      let k = 1;
      if (!this.reduced) {
        k += 0.06 * Math.sin(t * 7.3 + i * 1.7) + 0.04 * Math.sin(t * 13.1 + i * 3.1);
        const tick = Math.floor(t * 4) + i * 17;
        if (fract(Math.sin(tick * 12.9898) * 43758.5453) > 0.985) k *= 0.35;
      }
      if (partyOn) {
        const hue = (t * 0.6 + i / 8) % 1;
        l.body.emissive.setHSL(hue, 1, 0.5);
        l.light.color.setHSL(hue, 1, 0.5);
        k *= 1.2 + 0.5 * Math.sin(t * 12 + i);
      } else {
        l.body.emissive.set(RED);
        l.light.color.set(RED);
      }
      l.body.emissiveIntensity = l.base * k;
      l.light.intensity = 0.9 * k;
    });

    // DJ booth reacts to the beat
    this.vinyl.rotation.y -= dt * (s.musicOn ? 3.5 : 0.4);
    const pulse = 1 + s.beat * 0.25;
    for (const r of this.speakerRings) r.scale.setScalar(pulse);

    // skin station hologram previews the next skin
    this.hologram.rotation.y += dt * 0.9;
    this.hologram.position.y = 1.25 + (this.reduced ? 0 : Math.sin(t * 1.6) * 0.06);
    this.hologramMat.color.set(s.previewColor).multiplyScalar(0.55);

    this.infoBadge.position.y = 2.95 + (this.reduced ? 0 : Math.sin(t * 2.2) * 0.05);

    if (!this.reduced) {
      const pos = this.dust.geometry.getAttribute("position");
      if (pos instanceof BufferAttribute) {
        for (let i = 0; i < pos.count; i++) {
          let y = pos.getY(i) + dt * 0.08;
          if (y > 5) y = 0.1;
          pos.setY(i, y);
        }
        pos.needsUpdate = true;
      }
    }
  }

  dispose() {
    this.reflector.dispose();
    for (const t of this.textures) t.dispose();
  }

  // ---------------------------------------------------------------------------

  private tex(t: CanvasTexture) {
    this.textures.push(t);
    return t;
  }

  private buildFloor([w, h]: [number, number]) {
    const len = ROOM.zMax - ROOM.zMin;
    const zMid = (ROOM.zMax + ROOM.zMin) / 2;
    const floor = new Mesh(
      new PlaneGeometry(ROOM.halfW * 2, len),
      new MeshStandardMaterial({ color: "#060607", roughness: 0.15, metalness: 0 }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.z = zMid;
    this.group.add(floor);

    const reflector = new Reflector(new PlaneGeometry(ROOM.halfW * 2, len), {
      shader: ReflectShader,
      textureWidth: w,
      textureHeight: h,
      clipBias: 0.003,
      multisample: 0,
      color: "#ffffff",
    });
    if (reflector.material instanceof ShaderMaterial) {
      reflector.material.transparent = true;
      reflector.material.blending = AdditiveBlending;
      reflector.material.depthWrite = false;
    }
    reflector.rotation.x = -Math.PI / 2;
    reflector.position.set(0, 0.002, zMid);
    reflector.renderOrder = 1;
    this.group.add(reflector);
    return reflector;
  }

  private buildWalls() {
    const len = ROOM.zMax - ROOM.zMin;
    const zMid = (ROOM.zMax + ROOM.zMin) / 2;
    const H = ROOM.height;
    const wallMat = (repeat: [number, number]) => {
      const grid = this.tex(gridTexture(repeat));
      return new MeshStandardMaterial({
        color: "#0b0b0d",
        roughness: 0.85,
        emissive: "#ffffff",
        emissiveMap: grid,
        emissiveIntensity: 0.018,
      });
    };
    const side = new BoxGeometry(0.4, H, len);
    const left = new Mesh(side, wallMat([len / 2, H / 2]));
    left.position.set(-ROOM.halfW - 0.2, H / 2, zMid);
    const right = new Mesh(side, wallMat([len / 2, H / 2]));
    right.position.set(ROOM.halfW + 0.2, H / 2, zMid);
    const back = new Mesh(new BoxGeometry(ROOM.halfW * 2 + 0.8, H, 0.4), wallMat([ROOM.halfW, H / 2]));
    back.position.set(0, H / 2, ROOM.zMin - 0.2);
    this.group.add(left, right, back);

    // thin neon baseboards: depth cue, mirrored in the floor
    const strip = new MeshBasicMaterial({ color: glow(RED, 0.35) });
    const sGeo = new BoxGeometry(0.03, 0.03, len);
    for (const x of [-ROOM.halfW + 0.02, ROOM.halfW - 0.02]) {
      const m = new Mesh(sGeo, strip);
      m.position.set(x, 0.05, zMid);
      this.group.add(m);
    }
  }

  /** A row of red paper lanterns (红灯笼): pleated body, gold caps, tassel. */
  private buildLanterns() {
    const ribs = this.tex(lanternTexture());
    const geo = new SphereGeometry(0.34, 32, 20);
    const capGeo = new CylinderGeometry(0.11, 0.13, 0.07, 16);
    const capMat = new MeshBasicMaterial({ color: glow(GOLD, 1.3) });
    const tasselGeo = new CylinderGeometry(0.02, 0.045, 0.34, 8);
    const knotGeo = new SphereGeometry(0.045, 10, 8);
    const tasselMat = new MeshBasicMaterial({ color: glow(RED, 0.7) });
    const wireGeo = new CylinderGeometry(0.008, 0.008, 5, 4);
    const wireMat = new MeshBasicMaterial({ color: "#1c1c1f" });
    const z = 10;
    for (let i = 0; i < 8; i++) {
      const x = -6 + i * 2;
      const mat = new MeshStandardMaterial({
        color: "#2a0008",
        emissive: RED,
        emissiveMap: ribs,
        emissiveIntensity: 1.5,
        roughness: 0.6,
      });
      const body = new Mesh(geo, mat);
      body.scale.set(1, 0.82, 1);
      body.position.set(x, 2.2, z);
      body.rotation.y = (i % 2 ? 1 : -1) * 0.2;
      const top = new Mesh(capGeo, capMat);
      top.position.set(x, 2.2 + 0.3, z);
      const bottom = new Mesh(capGeo, capMat);
      bottom.rotation.x = Math.PI;
      bottom.position.set(x, 2.2 - 0.3, z);
      const tassel = new Mesh(tasselGeo, tasselMat);
      tassel.position.set(x, 2.2 - 0.52, z);
      const knot = new Mesh(knotGeo, capMat);
      knot.position.set(x, 2.2 - 0.36, z);
      const wire = new Mesh(wireGeo, wireMat);
      wire.position.set(x, 2.2 + 2.8, z);
      const light = new PointLight(RED, 0.9, 5, 2);
      light.position.set(x, 1.9, z + 0.3);
      this.group.add(body, top, bottom, tassel, knot, wire, light);
      this.lanterns.push({ body: mat, light, base: 1.1 });
    }

    // the middle lantern carries the "i": Leo's intro
    this.infoBadge = new Sprite(
      new SpriteMaterial({ map: this.tex(badgeTexture("i", RED, true)), color: glow("#ffffff", 1.6), depthWrite: false }),
    );
    this.infoBadge.scale.setScalar(0.38);
    this.infoBadge.position.set(0, 2.95, z + 0.05);
    this.group.add(this.infoBadge);
    this.interactables.push({
      id: "info",
      kind: "info",
      position: new Vector3(0, 0, z + 0.6),
      anchor: new Vector3(0, 3.35, z),
      radius: 1.7,
      label: "Read",
      sub: "Info",
      auto: false,
    });
  }

  /** Framed, angled plane on a side wall. side = 1 → right wall, -1 → left. */
  private wallPanel(map: CanvasTexture, w: number, h: number, side: 1 | -1, z: number, y: number, k = 1.25) {
    const angle = 0.5;
    const mat = new MeshBasicMaterial({ map, transparent: true, color: glow("#ffffff", k), alphaTest: 0.02 });
    const m = new Mesh(new PlaneGeometry(w, h), mat);
    const halfX = (w / 2) * Math.sin(angle);
    m.position.set(side * (ROOM.halfW - halfX - 0.05), y, z);
    m.rotation.y = side === 1 ? -Math.PI / 2 + angle : Math.PI / 2 - angle;
    this.group.add(m);
    return m;
  }

  private buildSigns() {
    const zs: Record<Section, number> = { about: 7, experience: 1, works: -5, awards: -11, contact: -17 };
    for (const s of SECTIONS) {
      const meta = SECTION_META[s];
      const map = this.tex(signTexture({ title: meta.title, zh: meta.zh, color: meta.color, chevrons: true }));
      this.wallPanel(map, 2.8, 1.4, 1, zs[s], 2.4);
      this.interactables.push({
        id: `sign-${s}`,
        kind: "sign",
        position: new Vector3(9.2, 0, zs[s]),
        anchor: new Vector3(9.6, 3.5, zs[s]),
        radius: 3,
        label: "Open",
        sub: meta.title,
        auto: false,
        section: s,
      });
    }

    // decorative: magenta Chinese place line (Princeton · NJ) high on the right wall
    const [c, ctx] = makeCanvas(1024, 128);
    setFont(ctx, "zh", 68, 700);
    ctx.textBaseline = "middle";
    neonText(ctx, ZH.location, 20, 64, MAGENTA, 16);
    this.wallPanel(this.tex(toTexture(c)), 4, 0.5, 1, 4, 4.3, 1.1);

    // gold name tag with the Latin roles line (student · builder · researcher)
    const [c2, ctx2] = makeCanvas(640, 200);
    ctx2.save();
    ctx2.transform(1, 0, -0.25, 1, 30, 0);
    fitFont(ctx2, "LEO CHANG", 540, 96, 900);
    ctx2.textBaseline = "middle";
    neonText(ctx2, "LEO CHANG", 30, 72, GOLD, 20);
    ctx2.restore();
    setFont(ctx2, "mono", 24, 500);
    ctx2.textBaseline = "middle";
    ctx2.globalAlpha = 0.8;
    neonText(ctx2, LATIN.roles, 36, 156, GOLD, 6);
    ctx2.globalAlpha = 1;
    this.wallPanel(this.tex(toTexture(c2)), 2.6, 0.81, 1, 13, 2.1, 0.9);

    // Leo's pixel glyphs: dumpling, saber, pawn, helicopter
    this.wallPanel(this.tex(glyphStrip([0, 1, 2, 3])), 0.6, 2.4, 1, 10.5, 3.2, 0.8);
    this.wallPanel(this.tex(glyphStrip([3, 2, 1, 0])), 0.6, 2.4, -1, -21, 3, 0.7);

    // left wall: the Latin motto in jade — "dare to know"
    const motto = this.tex(signTexture({ title: LATIN.motto, zh: LATIN.mottoZh, color: JADE, chevrons: true, dim: true }));
    this.wallPanel(motto, 3.2, 1.6, -1, 10.5, 2.3, 0.9);
  }

  /** Floor markings that belong to Leo: a fencing piste by the Fencer, a chessboard under the Chess Player. */
  private buildFloorMarkings() {
    const mark = (map: CanvasTexture, w: number, h: number, x: number, z: number, k: number) => {
      const m = new Mesh(
        new PlaneGeometry(w, h),
        new MeshBasicMaterial({ map, transparent: true, color: glow("#ffffff", k), depthWrite: false }),
      );
      m.rotation.x = -Math.PI / 2;
      m.position.set(x, 0.006, z);
      m.renderOrder = 2;
      this.group.add(m);
    };
    // piste: 14 × 1.5, runs along z next to the Fencer (NPC at 4, 1)
    mark(this.tex(pisteTexture()), 1.5, 14, 5.6, 1, 0.55);
    // board: 2.4 × 2.4 under the Chess Player (NPC at 6.5, -22)
    mark(this.tex(chessboardTexture()), 2.4, 2.4, 6.5, -22, 0.6);
  }

  private buildWorksWall() {
    const zs = [4, -2, -8, -14];
    projects.forEach((p, i) => {
      const z = zs[i] ?? -14 - (i - 3) * 6;
      const [c, ctx] = makeCanvas(512, 320);
      ctx.fillStyle = "rgba(0,0,0,0.9)";
      roundRect(ctx, 6, 6, 500, 308, 8);
      ctx.fill();
      ctx.save();
      ctx.strokeStyle = RED;
      ctx.shadowColor = RED;
      ctx.shadowBlur = 14;
      ctx.lineWidth = 4;
      roundRect(ctx, 12, 12, 488, 296, 6);
      ctx.stroke();
      ctx.restore();
      ctx.textBaseline = "alphabetic";
      setFont(ctx, "mono", 22, 500);
      ctx.fillStyle = RED;
      ctx.fillText(`${String(i + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}`, 36, 56);
      ctx.textAlign = "right";
      ctx.fillText(p.year, 476, 56);
      ctx.textAlign = "left";
      fitFont(ctx, p.title.toUpperCase(), 440, 64);
      neonText(ctx, p.title.toUpperCase(), 36, 150, "#ffffff", 10);
      setFont(ctx, "display", 26);
      neonText(ctx, p.category.toUpperCase(), 36, 196, RED, 8);
      setFont(ctx, "zh", 22, 700);
      ctx.fillStyle = "rgba(255,0,51,0.7)";
      ctx.fillText(ZH.works, 36, 270);
      drawChevrons(ctx, 440, 262, 14, RED);
      this.wallPanel(this.tex(toTexture(c)), 2.2, 1.375, -1, z, 2.1, 1.1);

      this.interactables.push({
        id: `work-${i}`,
        kind: "work",
        position: new Vector3(-9.3, 0, z),
        anchor: new Vector3(-9.6, 3.2, z),
        radius: 2.2,
        label: "Open",
        sub: p.title,
        auto: false,
        section: "works",
        work: i,
      });
    });
  }

  private buildDjBooth() {
    const z = -25.5;
    const g = new Group();
    g.position.set(0, 0, z);
    const dark = new MeshStandardMaterial({ color: "#0c0c0e", roughness: 0.5 });
    const desk = new Mesh(new RoundedBoxGeometry(3.6, 1.0, 1.3, 2, 0.06), dark);
    desk.position.y = 0.5;
    g.add(desk);

    // neon edge strips
    const strip = new MeshBasicMaterial({ color: glow(MAGENTA, 1.6) });
    const top = new Mesh(new BoxGeometry(3.62, 0.03, 0.03), strip);
    top.position.set(0, 1.0, 0.66);
    const bottom = new Mesh(new BoxGeometry(3.62, 0.03, 0.03), strip);
    bottom.position.set(0, 0.06, 0.66);
    g.add(top, bottom);

    // front panel
    const [c, ctx] = makeCanvas(512, 128);
    ctx.textBaseline = "middle";
    setFont(ctx, "display", 72);
    neonText(ctx, "DJ", 24, 66, MAGENTA, 16);
    setFont(ctx, "display", 30);
    neonText(ctx, "REQUEST A TRACK", 140, 52, "#ffffff", 6);
    setFont(ctx, "zh", 24, 700);
    ctx.fillStyle = "rgba(255,59,212,0.75)";
    ctx.fillText(ZH.request, 142, 92);
    const panel = new Mesh(
      new PlaneGeometry(3.2, 0.8),
      new MeshBasicMaterial({ map: this.tex(toTexture(c)), transparent: true, color: glow("#ffffff", 1.1) }),
    );
    panel.position.set(0, 0.5, 0.661);
    g.add(panel);

    // decks: one spinning vinyl, one idle
    const [vc, vctx] = makeCanvas(256, 256);
    vctx.fillStyle = "#050505";
    vctx.fillRect(0, 0, 256, 256);
    for (let r = 120; r > 40; r -= 5) {
      vctx.strokeStyle = r % 10 ? "#151515" : "#202020";
      vctx.lineWidth = 2;
      vctx.beginPath();
      vctx.arc(128, 128, r, 0, Math.PI * 2);
      vctx.stroke();
    }
    vctx.fillStyle = RED;
    vctx.beginPath();
    vctx.arc(128, 128, 36, 0, Math.PI * 2);
    vctx.fill();
    vctx.fillStyle = "#fff";
    vctx.fillRect(124, 98, 8, 22);
    const vinylTex = this.tex(toTexture(vc));
    const vinylMat = new MeshStandardMaterial({ map: vinylTex, roughness: 0.25, emissive: "#ffffff", emissiveMap: vinylTex, emissiveIntensity: 0.4 });
    const discGeo = new CylinderGeometry(0.42, 0.42, 0.03, 48);
    this.vinyl = new Mesh(discGeo, vinylMat);
    this.vinyl.position.set(-0.8, 1.03, 0);
    const idle = new Mesh(discGeo, vinylMat);
    idle.position.set(0.8, 1.03, 0);
    g.add(this.vinyl, idle);

    // speakers with pulsing rings
    const ringMat = new MeshBasicMaterial({ color: glow(MAGENTA, 1.4), side: DoubleSide });
    for (const sx of [-2.6, 2.6]) {
      const box = new Mesh(new RoundedBoxGeometry(0.9, 1.9, 0.9, 2, 0.05), dark);
      box.position.set(sx, 0.95, 0);
      g.add(box);
      for (const [y, r] of [[1.35, 0.26], [0.6, 0.34]] as const) {
        const ring = new Mesh(new RingGeometry(r * 0.78, r, 32), ringMat);
        ring.position.set(sx, y, 0.452);
        g.add(ring);
        this.speakerRings.push(ring);
      }
      this.colliders.push({ x: sx, z, r: 0.7 });
    }

    // sign above
    const sign = this.tex(signTexture({ title: "DJ Booth", zh: ZH.dj, color: MAGENTA, width: 640, height: 220 }));
    const sm = new Mesh(new PlaneGeometry(3.6, 1.24), new MeshBasicMaterial({ map: sign, transparent: true, color: glow("#ffffff", 1.2) }));
    sm.position.set(0, 3.2, -1.6);
    g.add(sm);
    const boothLight = new PointLight(MAGENTA, 1.4, 6, 2);
    boothLight.position.set(0, 2.2, 1.2);
    g.add(boothLight);

    this.group.add(g);
    for (const x of [-1.2, 0, 1.2]) this.colliders.push({ x, z, r: 0.85 });
    this.interactables.push({
      id: "dj",
      kind: "dj",
      position: new Vector3(0, 0, z + 1.9),
      anchor: new Vector3(0, 2.2, z + 0.4),
      radius: 2.4,
      label: "Request",
      sub: "Request a track",
      auto: false,
    });
  }

  private buildSkinStation() {
    const x = 6;
    const z = 15;
    const base = new Mesh(
      new CylinderGeometry(0.55, 0.65, 0.42, 32),
      new MeshStandardMaterial({ color: "#0d0d10", roughness: 0.4 }),
    );
    base.position.set(x, 0.21, z);
    const ring = new Mesh(new RingGeometry(0.42, 0.52, 48), new MeshBasicMaterial({ color: glow(GOLD, 1.5), side: DoubleSide }));
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(x, 0.425, z);
    this.hologramMat = new MeshBasicMaterial({ color: "#ffffff", wireframe: true, transparent: true, opacity: 0.9 });
    this.hologram = new Mesh(new SphereGeometry(0.3, 14, 10), this.hologramMat);
    this.hologram.scale.set(1.15, 0.78, 1);
    this.hologram.position.set(x, 1.25, z);
    const beam = new Mesh(
      new CylinderGeometry(0.42, 0.5, 1.2, 24, 1, true),
      new MeshBasicMaterial({ color: glow(GOLD, 0.25), transparent: true, opacity: 0.25, side: DoubleSide, depthWrite: false, blending: AdditiveBlending }),
    );
    beam.position.set(x, 1.0, z);

    const [c, ctx] = makeCanvas(256, 96);
    ctx.textBaseline = "middle";
    setFont(ctx, "display", 52);
    neonText(ctx, "SKINS", 12, 44, GOLD, 12);
    setFont(ctx, "zh", 22, 700);
    ctx.fillStyle = "rgba(255,194,74,0.75)";
    ctx.fillText(ZH.skins, 172, 48);
    const label = new Sprite(new SpriteMaterial({ map: this.tex(toTexture(c)), color: glow("#ffffff", 1.1), depthWrite: false }));
    label.scale.set(1.1, 0.41, 1);
    label.position.set(x, 2.1, z);

    this.group.add(base, ring, this.hologram, beam, label);
    this.colliders.push({ x, z, r: 0.75 });
    this.interactables.push({
      id: "skins",
      kind: "skins",
      position: new Vector3(x, 0, z),
      anchor: new Vector3(x, 2.6, z),
      radius: 2,
      label: "Change skin",
      sub: "Skin station",
      auto: false,
    });
  }

  private buildDust() {
    const n = 260;
    const pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      pos[i * 3] = (Math.random() * 2 - 1) * ROOM.halfW;
      pos[i * 3 + 1] = Math.random() * 5;
      pos[i * 3 + 2] = ROOM.zMin + Math.random() * (ROOM.zMax - ROOM.zMin - 6);
    }
    const geo = new BufferGeometry();
    geo.setAttribute("position", new BufferAttribute(pos, 3));
    this.dust = new Points(
      geo,
      new PointsMaterial({ color: "#ff6680", size: 0.035, transparent: true, opacity: 0.35, depthWrite: false, blending: AdditiveBlending }),
    );
    this.group.add(this.dust);
  }
}

function fract(x: number) {
  return x - Math.floor(x);
}
