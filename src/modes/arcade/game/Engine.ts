import {
  HalfFloatType,
  Material,
  Mesh,
  NoToneMapping,
  Points,
  Scene,
  Sprite,
  Texture,
  Vector2,
  WebGLRenderer,
  WebGLRenderTarget,
} from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { NPCS, SKINS } from "../content";
import type { ChipAudio } from "./audio";
import { CameraRig } from "./CameraRig";
import { CrtPass } from "./CrtPass";
import { Input } from "./Input";
import { Interactables } from "./Interactables";
import { Npc } from "./Npc";
import { Player } from "./Player";
import { Tutorial } from "./Tutorial";
import type { GameBridge, SpawnId } from "./types";
import { World } from "./World";

export type EngineOptions = {
  reducedMotion: boolean;
  coarse: boolean;
  audio: ChipAudio;
};

export type InitialState = {
  skin: number;
  tutorialDone: boolean;
  talked: string[];
};

type Tween = { dur: number; t: number; step: (u: number) => void; done?: () => void };

const SPAWNS: Record<SpawnId, { x: number; z: number; yaw: number }> = {
  home: { x: 0, z: 13, yaw: 0 },
  about: { x: 8.4, z: 7.8, yaw: 1.2 },
  experience: { x: 8.4, z: 1.8, yaw: 1.2 },
  work: { x: -7, z: 1, yaw: -0.9 },
  awards: { x: 8.4, z: -10.2, yaw: 1.2 },
};

const easeOutCubic = (u: number) => 1 - Math.pow(1 - u, 3);
const easeOutExpo = (u: number) => (u >= 1 ? 1 : 1 - Math.pow(2, -10 * u));
const easeInCubic = (u: number) => u * u * u;

/**
 * Renderer + post chain + game loop. The Vue layer owns state; the engine
 * reports through the GameBridge and exposes a few imperative commands.
 */
export class Engine {
  readonly input: Input;
  private renderer: WebGLRenderer;
  private scene = new Scene();
  private rig: CameraRig;
  private composer: EffectComposer;
  private bloom: UnrealBloomPass;
  private output: OutputPass;
  private crt: CrtPass;
  private world: World | null = null;
  private player: Player | null = null;
  private npcs: Npc[] = [];
  private tutorial: Tutorial | null = null;
  private inter: Interactables | null = null;

  private raf = 0;
  private last = 0;
  private elapsed = 0;
  private pauses = new Set<string>(["boot"]);
  private tweens: Tween[] = [];
  private teleporting = false;
  private partyStart = -1;
  private promptEl: HTMLElement | null = null;
  private width = 1;
  private height = 1;
  private pr = 1;
  private scale = 1;
  private statT = 0;
  private statFrames = 0;
  private statCost = 0;
  private previewSkin = 1;
  private lastJoyKey: string | null = null;

  private canvas: HTMLCanvasElement;
  private bridge: GameBridge;
  private opts: EngineOptions;

  constructor(canvas: HTMLCanvasElement, bridge: GameBridge, opts: EngineOptions) {
    this.canvas = canvas;
    this.bridge = bridge;
    this.opts = opts;
    this.renderer = new WebGLRenderer({ canvas, antialias: false, powerPreference: "high-performance" });
    this.renderer.toneMapping = NoToneMapping;
    this.renderer.setClearColor("#030304");
    this.pr = Math.min(window.devicePixelRatio || 1, 1.5);
    this.scale = opts.coarse ? 0.85 : 1;
    this.renderer.setPixelRatio(this.pr);
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.renderer.setSize(this.width, this.height);

    this.rig = new CameraRig(this.width / this.height, opts.reducedMotion);

    const cpr = this.pr * this.scale;
    const rt = new WebGLRenderTarget(this.width * cpr, this.height * cpr, {
      type: HalfFloatType,
      samples: opts.coarse ? 0 : 4,
    });
    this.composer = new EffectComposer(this.renderer, rt);
    this.composer.setPixelRatio(cpr);
    this.composer.setSize(this.width, this.height);
    this.composer.addPass(new RenderPass(this.scene, this.rig.camera));
    this.bloom = new UnrealBloomPass(new Vector2(this.width * cpr, this.height * cpr), 0.55, 0.45, 0.4);
    this.composer.addPass(this.bloom);
    this.output = new OutputPass();
    this.composer.addPass(this.output);
    this.crt = new CrtPass();
    this.crt.dpr = this.pr;
    this.crt.power = 0.02;
    this.crt.blink = 1;
    this.crt.setReducedMotion(opts.reducedMotion);
    this.composer.addPass(this.crt);

    this.input = new Input({
      action: (a) => {
        if (this.bridge.uiAction(a)) return;
        if (a === "interact") this.interactNearest();
      },
      keyDown: (code) => {
        if (!this.bridge.uiBlocking()) this.tutorial?.onKey(code);
      },
    });

    if (document.hidden) this.pauses.add("hidden");
    window.addEventListener("resize", this.onResize);
    document.addEventListener("visibilitychange", this.onVisibility);
    canvas.addEventListener("wheel", this.onWheel, { passive: true });
  }

  /** Builds the world. Call after fonts are ready so canvas text renders in Archivo. */
  build(initial: InitialState, spawn: SpawnId) {
    const rs = this.reflectSize();
    this.world = new World(this.scene, rs, this.opts.reducedMotion);
    this.player = new Player(this.opts.reducedMotion);
    this.player.setColor(SKINS[initial.skin]?.color ?? SKINS[0].color);
    this.previewSkin = (initial.skin + 1) % SKINS.length;
    this.scene.add(this.player.root);

    const list = [...this.world.interactables];
    const colliders = this.world.colliders;
    for (const def of NPCS) {
      const npc = new Npc(def, this.opts.reducedMotion);
      npc.setTalked(initial.talked.includes(def.id));
      this.scene.add(npc.root);
      this.npcs.push(npc);
      list.push(npc.interactable);
      colliders.push(npc.collider);
    }
    this.inter = new Interactables(list, this.bridge);

    const s = SPAWNS[spawn];
    this.player.place(s.x, s.z, s.yaw);
    this.inter.sync(this.player.position);
    this.rig.snap(this.player.position);

    if (!initial.tutorialDone) {
      this.tutorial = new Tutorial(() => {
        this.bridge.tutorialState(false);
        this.bridge.tutorialComplete();
      }, this.opts.reducedMotion);
      this.tutorial.place(this.player.position);
      this.scene.add(this.tutorial.group);
    }

    // compile shaders up front so the first visible frame doesn't hitch
    this.renderer.compile(this.scene, this.rig.camera);
  }

  /** Starts the loop with the CRT power-on: vertical 0.02→1 over 0.5s, white flash 0.1s. */
  start() {
    this.crt.blink = 0;
    this.crt.flash = 1;
    this.tween(0.1, (u) => (this.crt.flash = 1 - u));
    this.tween(0.5, (u) => (this.crt.power = 0.02 + 0.98 * easeOutExpo(u)));
    if (this.tutorial) this.bridge.tutorialState(true);
    this.setPaused("boot", false);
  }

  setPaused(reason: string, on: boolean) {
    const was = this.pauses.size > 0;
    if (on) this.pauses.add(reason);
    else this.pauses.delete(reason);
    const now = this.pauses.size > 0;
    if (was && !now) {
      this.last = performance.now();
      this.raf = requestAnimationFrame(this.loop);
    } else if (!was && now) {
      cancelAnimationFrame(this.raf);
      this.raf = 0;
      this.input.reset();
    }
  }

  /** CRT power-off for the mode switch; pauses once the tube is dark. */
  powerOff() {
    this.tween(0.32, (u) => {
      const e = easeInCubic(u);
      this.crt.power = 1 - 0.996 * e;
      this.crt.flash = e * 0.7;
    }, () => {
      this.tween(0.12, (u) => (this.crt.blink = u), () => this.setPaused("switching", true));
    });
  }

  /** Route change while mounted: 0.3s black blink, move, blink back. */
  teleport(spawn: SpawnId, onArrive?: () => void) {
    const s = SPAWNS[spawn];
    const p = this.player;
    if (!p) return;
    this.teleporting = true;
    this.tween(0.12, (u) => (this.crt.blink = u), () => {
      p.place(s.x, s.z, s.yaw);
      this.inter?.sync(p.position);
      this.rig.snap(p.position);
      this.tutorial?.place(p.position);
      this.tween(0.18, (u) => (this.crt.blink = 1 - easeOutCubic(u)), () => {
        this.teleporting = false;
        onArrive?.();
      });
    });
  }

  interactNearest() {
    const target = this.inter?.current;
    if (target && !this.bridge.uiBlocking()) this.bridge.interact(target);
  }

  skipTutorial() {
    this.tutorial?.finish();
  }

  setSkin(i: number) {
    this.player?.setColor(SKINS[i].color);
    this.previewSkin = (i + 1) % SKINS.length;
  }

  setTalked(ids: string[]) {
    for (const n of this.npcs) n.setTalked(ids.includes(n.def.id));
  }

  party() {
    this.partyStart = this.elapsed;
  }

  setPromptElement(el: HTMLElement | null) {
    this.promptEl = el;
  }

  dispose() {
    cancelAnimationFrame(this.raf);
    this.raf = 0;
    this.input.dispose();
    window.removeEventListener("resize", this.onResize);
    document.removeEventListener("visibilitychange", this.onVisibility);
    this.canvas.removeEventListener("wheel", this.onWheel);

    this.world?.dispose();
    this.player?.dispose();
    this.npcs.forEach((n) => n.dispose());
    this.tutorial?.dispose();

    const geometries = new Set<{ dispose(): void }>();
    const materials = new Set<Material>();
    this.scene.traverse((o) => {
      if (o instanceof Mesh || o instanceof Points) {
        geometries.add(o.geometry);
        const m: Material | Material[] = o.material;
        (Array.isArray(m) ? m : [m]).forEach((x) => materials.add(x));
      } else if (o instanceof Sprite) {
        materials.add(o.material);
      }
    });
    geometries.forEach((g) => g.dispose());
    materials.forEach((m) => {
      for (const v of Object.values(m)) if (v instanceof Texture) v.dispose();
      m.dispose();
    });
    this.scene.clear();

    for (const pass of this.composer.passes) pass.dispose();
    this.composer.dispose();
    this.renderer.dispose();
    this.renderer.forceContextLoss();
  }

  // ---------------------------------------------------------------------------

  private loop = (now: number) => {
    this.raf = requestAnimationFrame(this.loop);
    const dt = Math.min(0.05, Math.max(0, (now - this.last) / 1000));
    this.last = now;
    const t0 = performance.now();
    this.elapsed += dt;
    this.tick(dt);
    this.composer.render(dt);
    this.stats(dt, performance.now() - t0);
  };

  private tick(dt: number) {
    const t = this.elapsed;
    const player = this.player;
    const world = this.world;
    if (!player || !world) return;
    const blocked = this.bridge.uiBlocking() || this.teleporting;

    const move = blocked ? { x: 0, z: 0 } : this.input.axis();
    const jump = this.input.consumeJump() && !blocked;
    const sprint = !blocked && this.input.sprint && (move.x !== 0 || move.z !== 0);
    player.update(dt, t, move, sprint, jump, world.colliders);

    // joystick counts toward the tutorial like the keys do
    const joyKey = blocked ? null : this.input.joystickKey();
    if (joyKey && joyKey !== this.lastJoyKey) this.tutorial?.onKey(joyKey);
    this.lastJoyKey = joyKey;

    for (const n of this.npcs) n.update(t, dt, player.position);
    this.tutorial?.update(dt, t, player.position);
    this.inter?.update(player.position, blocked);

    world.update({
      t,
      dt,
      beat: this.opts.audio.beat(),
      musicOn: this.opts.audio.playing,
      party: this.partyStart >= 0 ? t - this.partyStart : -1,
      previewColor: SKINS[this.previewSkin].color,
    });

    this.rig.update(dt, t, player.position, sprint && player.speed > 7.2);
    this.runTweens(dt);
    this.crt.time = t;
    this.inter?.project(this.promptEl, this.rig.camera, this.width, this.height, !blocked);
  }

  private tween(dur: number, step: (u: number) => void, done?: () => void) {
    this.tweens.push({ dur, t: 0, step, done });
    // tweens must run even before the loop starts (e.g. power-on queued at boot)
  }

  private runTweens(dt: number) {
    if (!this.tweens.length) return;
    const list = this.tweens;
    this.tweens = [];
    for (const tw of list) {
      tw.t += dt;
      const u = Math.min(1, tw.t / tw.dur);
      tw.step(u);
      if (u < 1) this.tweens.push(tw);
      else tw.done?.();
    }
  }

  private stats(dt: number, cost: number) {
    this.statT += dt;
    this.statFrames++;
    this.statCost += cost;
    if (this.statT >= 0.5) {
      this.bridge.stats(this.statCost / this.statFrames, this.statFrames / this.statT);
      this.statT = 0;
      this.statFrames = 0;
      this.statCost = 0;
    }
  }

  private reflectSize(): [number, number] {
    const k = this.pr * 0.5;
    return [Math.round(this.width * k), Math.round(this.height * k)];
  }

  private onResize = () => {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.renderer.setSize(this.width, this.height);
    this.composer.setSize(this.width, this.height);
    this.rig.resize(this.width / this.height);
    const [w, h] = this.reflectSize();
    this.world?.setReflectorSize(w, h);
    if (this.pauses.size > 0 && !this.pauses.has("hidden")) this.composer.render(0);
  };

  private onVisibility = () => this.setPaused("hidden", document.hidden);

  private onWheel = (e: WheelEvent) => {
    if (!this.bridge.uiBlocking()) this.rig.onWheel(e.deltaY);
  };
}
