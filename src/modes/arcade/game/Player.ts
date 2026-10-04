import {
  CapsuleGeometry,
  Color,
  DoubleSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PlaneGeometry,
  PointLight,
  RingGeometry,
  SphereGeometry,
  Vector3,
  type CanvasTexture,
} from "three";
import { mouthTexture, RED } from "./textures";
import { BOUNDS, type Collider } from "./types";

const ACCEL = 0.6 * 60; // 0.6 u/s per 60Hz frame
const MAX_SPEED = 7;
const FRICTION = 0.85; // per 60Hz frame when idle
const SPRINT = 1.6;
const JUMP_V = 7;
const GRAVITY = -22;
const RADIUS = 0.55;

const damp = (k: number, dt: number) => 1 - Math.pow(1 - k, dt * 60);

/** Leo's mascot: a jiaozi with glowing eyes, a ω mouth and a red floor ring. */
export class Player {
  readonly root = new Group();
  readonly velocity = new Vector3();
  private body = new Group();
  private bodyMat: MeshStandardMaterial;
  private eyes: Group[] = [];
  private ring: Mesh;
  private pulse: Mesh;
  private pulseMat: MeshBasicMaterial;
  private mouthTex: CanvasTexture;
  private fill: PointLight;

  private vy = 0;
  private grounded = true;
  private jumps = 0;
  private yaw = 0;
  private squash = 0; // spring value: + = squashed, - = stretched
  private squashV = 0;
  private nextBlink = 2;
  private blinkT = -1;
  private pulseT = -1;
  private stride = 0; // run-cycle phase (radians); one hop per π
  speed = 0;

  private reduced: boolean;

  constructor(reduced: boolean) {
    this.reduced = reduced;
    this.bodyMat = new MeshStandardMaterial({ color: "#f3e9dc", roughness: 0.9 });
    const R = RADIUS;
    const shell = new Mesh(new SphereGeometry(R, 40, 24), this.bodyMat);
    shell.scale.set(1.18, 0.8, 1);
    shell.position.y = R * 0.8;
    this.body.add(shell);

    // crimped ridge: 7 pleats arching over the top, left to right
    const pleatGeo = new CapsuleGeometry(0.075, 0.16, 4, 10);
    for (let i = 0; i < 7; i++) {
      const a = Math.PI * (0.16 + (0.68 * i) / 6);
      const p = new Mesh(pleatGeo, this.bodyMat);
      p.position.set(Math.cos(a) * R * 1.12, R * 0.8 + Math.sin(a) * R * 0.78, -0.02);
      p.rotation.z = a - Math.PI / 2;
      p.rotation.x = i % 2 ? 0.35 : -0.35;
      this.body.add(p);
    }

    // eyes: white-hot core in a red halo (bloom turns it into the reference's glow)
    const core = new MeshBasicMaterial({ color: new Color("#ffffff").multiplyScalar(2.2) });
    const halo = new MeshBasicMaterial({ color: new Color(RED).multiplyScalar(1.6) });
    const coreGeo = new SphereGeometry(0.068, 16, 12);
    const haloGeo = new SphereGeometry(0.1, 16, 12);
    for (const sx of [-0.17, 0.17]) {
      const eye = new Group();
      const h = new Mesh(haloGeo, halo);
      h.scale.z = 0.4;
      const c = new Mesh(coreGeo, core);
      c.position.z = 0.03;
      eye.add(h, c);
      eye.position.set(sx, R * 0.86, R * 0.93);
      this.body.add(eye);
      this.eyes.push(eye);
    }

    this.mouthTex = mouthTexture();
    const mouth = new Mesh(
      new PlaneGeometry(0.2, 0.1),
      new MeshBasicMaterial({ map: this.mouthTex, transparent: true, color: new Color("#ffffff").multiplyScalar(1.4), depthWrite: false }),
    );
    mouth.position.set(0, R * 0.62, R * 1.0);
    mouth.rotation.x = -0.25;
    this.body.add(mouth);
    this.body.rotation.order = "YXZ"; // lean around the facing direction, not world X
    this.root.add(this.body);

    // floor ring: a 315° arc that slowly spins
    this.ring = new Mesh(
      new RingGeometry(0.78, 0.92, 64, 1, 0, Math.PI * 1.75),
      new MeshBasicMaterial({ color: new Color(RED).multiplyScalar(1.5), side: DoubleSide, transparent: true, opacity: 0.95 }),
    );
    this.ring.rotation.x = -Math.PI / 2;
    this.ring.position.y = 0.01;
    this.root.add(this.ring);

    this.pulseMat = new MeshBasicMaterial({ color: new Color(RED).multiplyScalar(1.5), side: DoubleSide, transparent: true, opacity: 0, depthWrite: false });
    this.pulse = new Mesh(new RingGeometry(0.82, 0.9, 64), this.pulseMat);
    this.pulse.rotation.x = -Math.PI / 2;
    this.pulse.position.y = 0.012;
    this.root.add(this.pulse);

    // soft key light so the body reads grey in the dark, like the reference
    this.fill = new PointLight("#ffe2dc", 1.8, 5, 2);
    this.fill.position.set(0, 2.2, 1.8);
    this.root.add(this.fill);
  }

  get position() {
    return this.root.position;
  }
  get onGround() {
    return this.grounded;
  }

  setColor(hex: string) {
    this.bodyMat.color.set(hex);
  }

  place(x: number, z: number, yaw = 0) {
    this.root.position.set(x, 0, z);
    this.velocity.set(0, 0, 0);
    this.vy = 0;
    this.grounded = true;
    this.jumps = 0;
    this.yaw = yaw;
    this.body.rotation.y = yaw;
  }

  update(dt: number, t: number, move: { x: number; z: number }, sprint: boolean, jump: boolean, colliders: Collider[]) {
    const v = this.velocity;
    const moving = move.x !== 0 || move.z !== 0;
    const max = MAX_SPEED * (sprint ? SPRINT : 1);
    if (moving) {
      v.x += move.x * ACCEL * (sprint ? SPRINT : 1) * dt;
      v.z += move.z * ACCEL * (sprint ? SPRINT : 1) * dt;
      const sp = Math.hypot(v.x, v.z);
      const cap = max * Math.min(1, Math.hypot(move.x, move.z) + 0.001);
      if (sp > cap) {
        v.x *= cap / sp;
        v.z *= cap / sp;
      }
    } else {
      const f = Math.pow(FRICTION, dt * 60);
      v.x *= f;
      v.z *= f;
      if (Math.hypot(v.x, v.z) < 0.02) v.set(0, 0, 0);
    }
    this.speed = Math.hypot(v.x, v.z);

    // jump + double jump
    if (jump && this.jumps < 2) {
      this.vy = JUMP_V * (this.jumps === 0 ? 1 : 0.9);
      this.jumps++;
      this.grounded = false;
      this.kick(-0.35);
    }
    const p = this.root.position;
    if (!this.grounded) {
      this.vy += GRAVITY * dt;
      p.y += this.vy * dt;
      if (p.y <= 0) {
        const impact = Math.min(1, -this.vy / 12);
        p.y = 0;
        this.vy = 0;
        this.grounded = true;
        this.jumps = 0;
        this.kick(0.5 * impact + 0.15);
        this.pulseT = 0;
      }
    }

    p.x += v.x * dt;
    p.z += v.z * dt;
    this.collide(colliders);

    // face the direction of travel
    if (this.speed > 0.3) {
      const target = Math.atan2(v.x, v.z);
      let d = target - this.yaw;
      d = Math.atan2(Math.sin(d), Math.cos(d));
      this.yaw += d * damp(0.18, dt);
      this.body.rotation.y = this.yaw;
    }

    this.animate(dt, t);
  }

  dispose() {
    this.mouthTex.dispose();
  }

  // ---------------------------------------------------------------------------

  /** Squash-and-stretch impulse into a critically-ish damped spring. */
  private kick(amount: number) {
    this.squashV += amount * 14;
  }

  private collide(colliders: Collider[]) {
    const p = this.root.position;
    for (const c of colliders) {
      const dx = p.x - c.x;
      const dz = p.z - c.z;
      const min = c.r + RADIUS * 0.9;
      const d2 = dx * dx + dz * dz;
      if (d2 < min * min && d2 > 1e-6) {
        const d = Math.sqrt(d2);
        p.x = c.x + (dx / d) * min;
        p.z = c.z + (dz / d) * min;
        // remove the velocity component pushing into the collider
        const nx = dx / d;
        const nz = dz / d;
        const vn = this.velocity.x * nx + this.velocity.z * nz;
        if (vn < 0) {
          this.velocity.x -= vn * nx;
          this.velocity.z -= vn * nz;
        }
      }
    }
    p.x = Math.max(-BOUNDS.x, Math.min(BOUNDS.x, p.x));
    p.z = Math.max(BOUNDS.zMin, Math.min(BOUNDS.zMax, p.z));
  }

  private animate(dt: number, t: number) {
    // spring: stiffness 260, damping ratio ~0.55 (it's a toy, a little wobble is the point)
    const k = 260;
    const c = 2 * 0.55 * Math.sqrt(k);
    this.squashV += (-k * this.squash - c * this.squashV) * dt;
    this.squash += this.squashV * dt;
    if (!this.grounded) this.squash += (Math.max(-0.18, -this.vy * 0.02) - this.squash) * damp(0.2, dt);

    const breathe = this.reduced ? 0 : Math.sin(t * Math.PI * 2 * 1.2) * 0.02;

    // run cycle: a dumpling has no legs, so it hops. Stride phase advances with
    // ground speed; each stride is a small arc with a landing squash and a
    // side-to-side waddle, all fading in with speed so starting/stopping is soft.
    const run = this.reduced || !this.grounded ? 0 : Math.min(1, Math.max(0, (this.speed - 0.4) / 4));
    const prevPhase = this.stride;
    this.stride += dt * (5.2 + this.speed * 0.9) * (this.speed > 0.4 ? 1 : 0);
    const hop = Math.abs(Math.sin(this.stride)) * 0.09 * run;
    const landed = run > 0.2 && Math.floor(prevPhase / Math.PI) !== Math.floor(this.stride / Math.PI);
    if (landed) this.kick(0.12 * run);
    this.body.position.y = hop;
    const waddle = Math.sin(this.stride) * 0.09 * run;

    const sy = 1 - this.squash + breathe;
    const sxz = 1 + this.squash * 0.6 - breathe * 0.5;
    this.body.scale.set(sxz, sy, sxz);
    // lean into the run, rock with the stride
    this.body.rotation.x = this.reduced ? 0 : Math.min(0.18, this.speed * 0.02);
    this.body.rotation.z = waddle;
    // the ring breathes with each stride, so the floor "hears" the hops
    const ringHop = 1 + Math.abs(Math.sin(this.stride)) * 0.05 * run;

    // blink every 3–5s: eyes squash to 10% for 90ms
    this.nextBlink -= dt;
    if (this.nextBlink <= 0 && this.blinkT < 0) {
      this.blinkT = 0;
      this.nextBlink = 3 + Math.random() * 2;
    }
    let ey = 1;
    if (this.blinkT >= 0) {
      this.blinkT += dt;
      ey = 0.1;
      if (this.blinkT > 0.09) this.blinkT = -1;
    }
    for (const e of this.eyes) e.scale.y = ey;

    // ring spins; landing sends out a pulse that expands + fades
    this.ring.rotation.z += dt * 0.6;
    const ringScale = (this.root.position.y > 0 ? 1 - Math.min(0.3, this.root.position.y * 0.15) : 1) * ringHop;
    this.ring.scale.setScalar(ringScale);
    this.ring.position.y = 0.01 - this.root.position.y; // stays on the floor while we jump
    this.pulse.position.y = 0.012 - this.root.position.y;
    if (this.pulseT >= 0) {
      this.pulseT += dt;
      const u = Math.min(1, this.pulseT / 0.45);
      const e = 1 - Math.pow(1 - u, 3);
      this.pulse.scale.setScalar(1 + e * 1.3);
      this.pulseMat.opacity = 0.85 * (1 - u);
      if (u >= 1) this.pulseT = -1;
    }
  }
}
