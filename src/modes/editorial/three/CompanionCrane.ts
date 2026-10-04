/**
 * The editorial companion: a small origami paper crane that follows the
 * cursor with spring lag, banks with its velocity, flaps its wings, drops a
 * soft lagging shadow and does a loop when fed.
 *
 * World units == CSS pixels at z = 0 (the camera distance is derived from the
 * viewport height), so screen <-> world mapping is trivial.
 */
import * as THREE from "three";
import { createRenderer, disposeObject, radialTexture } from "./sceneKit";

const PAPER = "#f7f7f7";
const INK = "#022016";

function edged(geo: THREE.BufferGeometry, mat: THREE.Material, lineMat: THREE.LineBasicMaterial) {
  const mesh = new THREE.Mesh(geo, mat);
  const lines = new THREE.LineSegments(new THREE.EdgesGeometry(geo, 1), lineMat);
  mesh.add(lines);
  return mesh;
}

function triangle(a: [number, number, number], b: [number, number, number], c: [number, number, number]) {
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute([...a, ...b, ...c], 3));
  g.computeVertexNormals();
  return g;
}

function buildCrane() {
  const root = new THREE.Group();
  const paper = new THREE.MeshStandardMaterial({
    color: PAPER,
    roughness: 0.85,
    flatShading: true,
    side: THREE.DoubleSide,
  });
  const shade = new THREE.MeshStandardMaterial({
    color: "#e9e6df",
    roughness: 0.9,
    flatShading: true,
    side: THREE.DoubleSide,
  });
  const line = new THREE.LineBasicMaterial({ color: INK });

  // body: flattened diamond (two pyramids)
  const bodyGeo = new THREE.OctahedronGeometry(1, 0);
  bodyGeo.scale(0.95, 0.42, 0.42);
  root.add(edged(bodyGeo, paper, line));

  // neck + head (forward, +x), tail (back, -x): long thin 4-sided cones
  const neckGeo = new THREE.ConeGeometry(0.13, 1.45, 4);
  const neck = edged(neckGeo, shade, line);
  neck.rotation.z = -THREE.MathUtils.degToRad(48);
  neck.position.set(0.95, 0.5, 0);
  root.add(neck);

  const headGeo = new THREE.ConeGeometry(0.08, 0.42, 4);
  const head = edged(headGeo, paper, line);
  head.rotation.z = -THREE.MathUtils.degToRad(125);
  head.position.set(1.62, 0.97, 0);
  root.add(head);

  const tailGeo = new THREE.ConeGeometry(0.13, 1.55, 4);
  const tail = edged(tailGeo, shade, line);
  tail.rotation.z = THREE.MathUtils.degToRad(52);
  tail.position.set(-1.0, 0.5, 0);
  root.add(tail);

  // wings: inner panel hinged on the body ridge, outer tip hinged on the inner
  const makeWing = (side: 1 | -1) => {
    const hinge = new THREE.Group();
    hinge.position.y = 0.18;
    const inner = edged(triangle([-0.75, 0, 0], [0.55, 0, 0], [-0.05, 0, 1.05 * side]), paper, line);
    hinge.add(inner);
    const tipHinge = new THREE.Group();
    tipHinge.position.set(0, 0, 0);
    const tip = edged(triangle([-0.4, 0, 1.05 * side], [-0.05, 0, 1.05 * side], [-0.7, 0, 1.95 * side]), shade, line);
    tipHinge.add(tip);
    hinge.add(tipHinge);
    root.add(hinge);
    return { hinge, tipHinge };
  };
  const right = makeWing(1);
  const left = makeWing(-1);
  return { root, right, left };
}

export interface CraneFrameInfo {
  x: number;
  y: number;
  visible: number;
}

export class CompanionCrane {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(30, 1, 1, 10000);
  private pivot = new THREE.Group(); // position + loop
  private orient = new THREE.Group(); // yaw/bank
  private parts = buildCrane();
  private shadow: THREE.Mesh;
  private crumbs: { mesh: THREE.Mesh; vx: number; vy: number; life: number }[] = [];
  private crumbGeo = new THREE.TetrahedronGeometry(3.2);
  private crumbMat = new THREE.MeshStandardMaterial({ color: "#e7c27a", roughness: 0.8, flatShading: true });

  private w = 1;
  private h = 1;
  private pos = new THREE.Vector2(-200, 200);
  private prev = new THREE.Vector2(-200, 200);
  private vel = new THREE.Vector2();
  private target = new THREE.Vector2(-200, 200);
  private shadowPos = new THREE.Vector2(-200, 200);
  private yaw = 0.35;
  private facing = 1;
  private loopT = -1;
  private feedTarget: THREE.Vector2 | null = null;
  private feedTimer = 0;
  private vis = 0;
  private visTarget = 0;
  private sizeScale = 30;

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = createRenderer(canvas, { alpha: true, exposure: 1.0 });
    this.renderer.toneMapping = THREE.NoToneMapping;

    const hemi = new THREE.HemisphereLight("#ffffff", "#cfd6d1", 2.1);
    const key = new THREE.DirectionalLight("#ffffff", 1.6);
    key.position.set(-0.4, 1, 0.9);
    this.scene.add(hemi, key);

    this.orient.add(this.parts.root);
    this.pivot.add(this.orient);
    this.scene.add(this.pivot);

    this.shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshBasicMaterial({
        map: radialTexture(128, 0.25),
        color: "#6f6f6f",
        transparent: true,
        opacity: 0.25,
        depthWrite: false,
      }),
    );
    this.shadow.renderOrder = -1;
    this.scene.add(this.shadow);
    this.resize();
  }

  resize() {
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.renderer.setSize(this.w, this.h, false);
    const d = this.h / 2 / Math.tan(THREE.MathUtils.degToRad(15));
    this.camera.aspect = this.w / this.h;
    this.camera.position.set(0, 0, d);
    this.camera.near = d * 0.2;
    this.camera.far = d * 3;
    this.camera.updateProjectionMatrix();
    this.sizeScale = this.w < 800 ? 20 : 30;
  }

  setTarget(x: number, y: number) {
    this.target.set(x, y);
  }

  /** Jump without easing (first appearance). */
  place(x: number, y: number) {
    this.pos.set(x, y);
    this.prev.set(x, y);
    this.shadowPos.set(x + 24, y + 34);
    this.target.set(x, y);
  }

  setVisible(v: boolean) {
    this.visTarget = v ? 1 : 0;
  }

  get isSettled() {
    return this.visTarget === 0 && this.vis < 0.01;
  }

  feed(x: number, y: number) {
    this.feedTarget = new THREE.Vector2(x - 30, y - 30);
    this.feedTimer = 0.55;
    this.loopT = 0;
    // crumbs drop from the click point
    for (let i = 0; i < 6; i++) {
      const m = new THREE.Mesh(this.crumbGeo, this.crumbMat);
      m.position.set(x - this.w / 2, this.h / 2 - y, 20);
      m.rotation.set(Math.random() * 6, Math.random() * 6, 0);
      this.scene.add(m);
      this.crumbs.push({ mesh: m, vx: (Math.random() - 0.5) * 160, vy: 60 + Math.random() * 120, life: 1 });
    }
  }

  frame(dt: number, time: number): CraneFrameInfo {
    const k = (base: number) => 1 - Math.pow(1 - base, dt * 60);
    this.vis += (this.visTarget - this.vis) * k(0.08);

    // feeding: dart to the crumbs first, then follow the cursor again
    let goal = this.target;
    if (this.feedTarget) {
      goal = this.feedTarget;
      this.feedTimer -= dt;
      if (this.feedTimer <= 0) this.feedTarget = null;
    }

    this.prev.copy(this.pos);
    this.pos.x += (goal.x - this.pos.x) * k(0.08);
    this.pos.y += (goal.y - this.pos.y) * k(0.08);
    if (dt > 0) this.vel.set((this.pos.x - this.prev.x) / dt, (this.pos.y - this.prev.y) / dt);
    const speed = this.vel.length();

    // face the way we fly (with hysteresis), 3/4 view towards the camera
    if (this.vel.x > 40) this.facing = 1;
    else if (this.vel.x < -40) this.facing = -1;
    const yawGoal = this.facing > 0 ? 0.42 : Math.PI - 0.42;
    this.yaw += (yawGoal - this.yaw) * k(0.07);

    // idle hover when nearly still
    const idle = Math.max(0, 1 - speed / 120);
    const hoverY = Math.sin(time * 2.3) * 5 * idle;
    const hoverX = Math.cos(time * 1.1) * 3 * idle;

    // loop when fed
    let loopAngle = 0;
    let loopLift = 0;
    if (this.loopT >= 0) {
      this.loopT += dt / 0.95;
      const t = Math.min(1, this.loopT);
      const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      loopAngle = e * Math.PI * 2;
      loopLift = Math.sin(t * Math.PI) * 46;
      if (this.loopT >= 1) this.loopT = -1;
    }

    const s = this.sizeScale * (0.85 + 0.15 * this.vis);
    this.pivot.scale.setScalar(s);
    this.pivot.position.set(
      this.pos.x + hoverX - this.w / 2,
      this.h / 2 - (this.pos.y + hoverY - loopLift),
      0,
    );
    this.orient.rotation.set(0, 0, 0);
    this.orient.rotation.y = this.yaw;
    // bank (roll around the flight axis) from horizontal speed, pitch from vertical
    const bank = THREE.MathUtils.clamp(this.vel.x * 0.0011, -0.6, 0.6);
    const pitch = THREE.MathUtils.clamp(-this.vel.y * 0.0012, -0.5, 0.5);
    this.parts.root.rotation.x = -bank * this.facing * 0.8;
    this.parts.root.rotation.z = pitch + loopAngle;

    // wings: faster, deeper flaps when moving
    const flapSpeed = 9 + Math.min(10, speed / 60);
    const amp = 0.35 + Math.min(0.45, speed / 900);
    const f = Math.sin(time * flapSpeed);
    this.parts.right.hinge.rotation.x = -(0.15 + f * amp);
    this.parts.left.hinge.rotation.x = 0.15 + f * amp;
    const tipF = Math.sin(time * flapSpeed - 0.9) * amp * 0.8;
    this.parts.right.tipHinge.rotation.x = -tipF;
    this.parts.left.tipHinge.rotation.x = tipF;

    // shadow lags more and sits lower-right
    this.shadowPos.x += (this.pos.x + 26 - this.shadowPos.x) * k(0.05);
    this.shadowPos.y += (this.pos.y + 38 - this.shadowPos.y) * k(0.05);
    this.shadow.position.set(this.shadowPos.x - this.w / 2, this.h / 2 - this.shadowPos.y, -60);
    const sw = this.sizeScale * 2.4 * (1 - loopLift / 140);
    this.shadow.scale.set(sw, sw * 0.62, 1);
    (this.shadow.material as THREE.MeshBasicMaterial).opacity = 0.25 * this.vis;

    // crumbs
    for (let i = this.crumbs.length - 1; i >= 0; i--) {
      const c = this.crumbs[i];
      c.life -= dt / 0.9;
      c.vy -= 520 * dt;
      c.mesh.position.x += c.vx * dt;
      c.mesh.position.y += c.vy * dt;
      c.mesh.rotation.x += dt * 6;
      c.mesh.scale.setScalar(Math.max(0.01, c.life));
      if (c.life <= 0) {
        this.scene.remove(c.mesh);
        this.crumbs.splice(i, 1);
      }
    }

    this.pivot.visible = this.vis > 0.01;
    this.renderer.render(this.scene, this.camera);
    return { x: this.pos.x + hoverX, y: this.pos.y + hoverY - loopLift, visible: this.vis };
  }

  dispose() {
    this.crumbs.forEach((c) => this.scene.remove(c.mesh));
    this.crumbs = [];
    this.crumbGeo.dispose();
    this.crumbMat.dispose();
    disposeObject(this.scene);
    this.renderer.dispose();
  }
}
