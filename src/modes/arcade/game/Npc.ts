import {
  BoxGeometry,
  CapsuleGeometry,
  Color,
  CylinderGeometry,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  SphereGeometry,
  Sprite,
  SpriteMaterial,
  Vector3,
  type CanvasTexture,
} from "three";
import type { NpcDef, NpcProp } from "../content";
import { badgeTexture } from "./textures";
import type { Collider, Interactable } from "./types";

/** One of Leo's "friends": a small glowing capsule with eyes and a bobbing "!". */
export class Npc {
  readonly root = new Group();
  readonly interactable: Interactable;
  readonly collider: Collider;
  private figure = new Group();
  private badge: Sprite;
  private badgeMat: SpriteMaterial;
  private badgeTex: CanvasTexture;
  private phase = Math.random() * Math.PI * 2;
  private yaw = 0;
  private rotor: Group | null = null;
  private floater: Group | null = null;
  talked = false;

  readonly def: NpcDef;
  private reduced: boolean;

  constructor(def: NpcDef, reduced: boolean) {
    this.def = def;
    this.reduced = reduced;
    const [x, z] = def.position;
    this.root.position.set(x, 0, z);
    const tint = new Color(def.color);

    const body = new Mesh(
      new CapsuleGeometry(0.3, 0.55, 6, 16),
      new MeshStandardMaterial({ color: "#1a1a1e", roughness: 0.55, emissive: tint, emissiveIntensity: 0.32 }),
    );
    body.position.y = 0.6;
    this.figure.add(body);

    const eyeMat = new MeshBasicMaterial({ color: tint.clone().lerp(new Color("#ffffff"), 0.55).multiplyScalar(2.2) });
    const eyeGeo = new SphereGeometry(0.055, 12, 8);
    for (const sx of [-0.11, 0.11]) {
      const e = new Mesh(eyeGeo, eyeMat);
      e.position.set(sx, 0.86, 0.27);
      this.figure.add(e);
    }
    this.buildProp(def.prop, tint);
    this.root.add(this.figure);

    this.badgeTex = badgeTexture("!", def.color);
    this.badgeMat = new SpriteMaterial({ map: this.badgeTex, color: new Color("#ffffff").multiplyScalar(1.5), depthWrite: false });
    this.badge = new Sprite(this.badgeMat);
    this.badge.scale.setScalar(0.42);
    this.badge.position.y = 1.65;
    this.root.add(this.badge);

    this.collider = { x, z, r: 0.45 };
    this.interactable = {
      id: `npc-${def.id}`,
      kind: "npc",
      position: new Vector3(x, 0, z),
      anchor: new Vector3(x, 2.25, z),
      radius: 2,
      label: "Talk",
      sub: def.name,
      auto: false,
      npc: def.id,
    };
  }

  /** The small thing each friend carries, built from primitives in the NPC's colour. */
  private buildProp(prop: NpcProp, tint: Color) {
    if (prop === "none") return;
    const lit = new MeshBasicMaterial({ color: tint.clone().multiplyScalar(1.6) });
    const dark = new MeshStandardMaterial({ color: "#15151a", roughness: 0.6, emissive: tint, emissiveIntensity: 0.15 });
    const g = new Group();
    switch (prop) {
      case "saber": {
        // blade held low and forward on the right, bell guard at the hand
        const blade = new Mesh(new CylinderGeometry(0.012, 0.02, 0.9, 6), lit);
        blade.position.set(0, 0.45, 0);
        const guard = new Mesh(new SphereGeometry(0.075, 12, 8), dark);
        const grip = new Mesh(new CylinderGeometry(0.03, 0.03, 0.14, 6), dark);
        grip.position.y = -0.09;
        g.add(blade, guard, grip);
        g.position.set(0.36, 0.5, 0.1);
        g.rotation.set(-0.55, 0, -0.25);
        break;
      }
      case "paper": {
        // a folded newspaper under the arm
        const sheet = new Mesh(new BoxGeometry(0.34, 0.24, 0.05), new MeshBasicMaterial({ color: "#d9d9d2" }));
        const fold = new Mesh(new BoxGeometry(0.34, 0.012, 0.055), new MeshBasicMaterial({ color: "#2a2a2e" }));
        fold.position.y = 0.02;
        g.add(sheet, fold);
        g.position.set(-0.36, 0.55, 0.08);
        g.rotation.set(0, 0.25, 0.15);
        break;
      }
      case "book": {
        const cover = new Mesh(new BoxGeometry(0.22, 0.3, 0.06), lit);
        const pages = new Mesh(new BoxGeometry(0.2, 0.28, 0.062), new MeshBasicMaterial({ color: "#f0ead8" }));
        pages.position.x = 0.012;
        g.add(cover, pages);
        g.position.set(-0.33, 0.6, 0.12);
        g.rotation.set(0.2, 0, 0.3);
        break;
      }
      case "rotor": {
        // a rubber-band helicopter rotor turning above the head
        this.rotor = new Group();
        const mast = new Mesh(new CylinderGeometry(0.012, 0.012, 0.26, 6), dark);
        mast.position.y = 0.13;
        const bladeGeo = new BoxGeometry(0.62, 0.012, 0.06);
        const b1 = new Mesh(bladeGeo, lit);
        const b2 = new Mesh(bladeGeo, lit);
        b2.rotation.y = Math.PI / 2;
        this.rotor.add(b1, b2);
        this.rotor.position.y = 0.27;
        g.add(mast, this.rotor);
        g.position.set(0, 1.1, 0);
        break;
      }
      case "pawn": {
        const base = new Mesh(new CylinderGeometry(0.1, 0.12, 0.05, 16), lit);
        const stem = new Mesh(new CylinderGeometry(0.045, 0.08, 0.16, 12), lit);
        stem.position.y = 0.1;
        const collar = new Mesh(new CylinderGeometry(0.08, 0.08, 0.025, 12), lit);
        collar.position.y = 0.19;
        const head = new Mesh(new SphereGeometry(0.065, 14, 10), lit);
        head.position.y = 0.26;
        g.add(base, stem, collar, head);
        g.position.set(0.38, 0.42, 0.14);
        break;
      }
      case "chip": {
        // a photonic chip: dark die with a glowing trace grid
        const die = new Mesh(new BoxGeometry(0.3, 0.03, 0.3), dark);
        const traces = new Group();
        const tGeo = new BoxGeometry(0.26, 0.006, 0.01);
        for (let i = -2; i <= 2; i++) {
          const a = new Mesh(tGeo, lit);
          a.position.set(0, 0.018, i * 0.05);
          const b = new Mesh(tGeo, lit);
          b.rotation.y = Math.PI / 2;
          b.position.set(i * 0.05, 0.018, 0);
          traces.add(a, b);
        }
        g.add(die, traces);
        g.position.set(0.34, 0.62, 0.16);
        g.rotation.set(0.5, -0.4, 0);
        break;
      }
      case "bolt": {
        // a small lightning bolt (the microgrid) floating at the shoulder
        const seg = new BoxGeometry(0.05, 0.16, 0.03);
        const s1 = new Mesh(seg, lit);
        s1.position.set(0.03, 0.12, 0);
        s1.rotation.z = 0.5;
        const s2 = new Mesh(seg, lit);
        s2.position.set(-0.03, 0, 0);
        s2.rotation.z = -0.5;
        const s3 = new Mesh(seg, lit);
        s3.position.set(0.03, -0.12, 0);
        s3.rotation.z = 0.5;
        g.add(s1, s2, s3);
        g.position.set(0.4, 0.95, 0.05);
        this.floater = g;
        break;
      }
    }
    this.figure.add(g);
  }

  setTalked(v: boolean) {
    this.talked = v;
    this.badgeMat.opacity = v ? 0.22 : 1;
  }

  update(t: number, dt: number, player: Vector3) {
    const bob = this.reduced ? 0 : Math.sin(t * 2 + this.phase) * 0.04;
    this.figure.position.y = bob;
    if (this.rotor) this.rotor.rotation.y += dt * (this.reduced ? 1.5 : 9);
    if (this.floater && !this.reduced) this.floater.position.y = 0.95 + Math.sin(t * 2.6 + this.phase) * 0.05;
    this.badge.position.y = 1.65 + (this.reduced ? 0 : Math.sin(t * 3 + this.phase) * 0.08);

    // turn to face the player when they come close, else idle toward the camera
    const dx = player.x - this.root.position.x;
    const dz = player.z - this.root.position.z;
    const near = dx * dx + dz * dz < 25;
    const target = near ? Math.atan2(dx, dz) : 0;
    let d = target - this.yaw;
    d = Math.atan2(Math.sin(d), Math.cos(d));
    this.yaw += d * (1 - Math.pow(0.9, dt * 60));
    this.figure.rotation.y = this.yaw;
  }

  dispose() {
    this.badgeTex.dispose();
  }
}
