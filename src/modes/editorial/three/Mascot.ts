/**
 * Leo's mascot: a plump 3D dumpling built from primitives.
 * Lathe body, seven capsule pleats fanning from a top knot, a tiny face
 * (dot eyes, smile, blush). Height is ~1 unit at scale 1, origin at the base.
 */
import * as THREE from "three";

export interface DumplingOptions {
  body?: THREE.ColorRepresentation;
  pleat?: THREE.ColorRepresentation;
  blush?: boolean;
  castShadow?: boolean;
  segments?: number;
}

export interface Dumpling {
  group: THREE.Group;
  /** inner group that bobs / turns; put accessories on `group` */
  body: THREE.Group;
  update: (time: number, lookX: number, lookY: number, dt: number) => void;
}

const PROFILE: [number, number][] = [
  [0, 0],
  [0.5, 0],
  [0.8, 0.035],
  [0.97, 0.15],
  [1.04, 0.31],
  [1.01, 0.48],
  [0.9, 0.64],
  [0.7, 0.78],
  [0.46, 0.88],
  [0.22, 0.94],
  [0, 0.96],
];

export function createDumpling(opts: DumplingOptions = {}): Dumpling {
  const segs = opts.segments ?? 56;
  const group = new THREE.Group();
  const body = new THREE.Group();
  group.add(body);

  const dough = new THREE.MeshPhysicalMaterial({
    color: opts.body ?? "#f3e9dc",
    roughness: 0.62,
    sheen: 0.8,
    sheenColor: new THREE.Color("#fff6ea"),
    sheenRoughness: 0.5,
  });
  const pleatMat = new THREE.MeshPhysicalMaterial({
    color: opts.pleat ?? "#ebdcc8",
    roughness: 0.6,
    sheen: 0.6,
    sheenColor: new THREE.Color("#fff6ea"),
  });

  const lathe = new THREE.LatheGeometry(
    PROFILE.map(([x, y]) => new THREE.Vector2(x, y)),
    segs,
  );
  const bun = new THREE.Mesh(lathe, dough);
  bun.castShadow = opts.castShadow ?? true;
  bun.receiveShadow = true;
  body.add(bun);

  // Seven pleats radiating from the top knot, lying along the dome.
  const pleatGeo = new THREE.CapsuleGeometry(0.075, 0.34, 6, 12);
  for (let i = 0; i < 7; i++) {
    const pivot = new THREE.Group();
    pivot.rotation.y = (i / 7) * Math.PI * 2 + 0.3;
    const c = new THREE.Mesh(pleatGeo, pleatMat);
    c.position.set(0.24, 0.925, 0);
    c.rotation.z = 1.3;
    c.rotation.x = 0.18; // a little twist so the pleats read as folds
    c.castShadow = opts.castShadow ?? true;
    pivot.add(c);
    body.add(pivot);
  }
  const knot = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 12), pleatMat);
  knot.position.y = 0.99;
  knot.scale.set(1, 0.7, 1);
  body.add(knot);

  // Face (front = +z)
  const ink = new THREE.MeshBasicMaterial({ color: "#1b1410" });
  const eyeGeo = new THREE.SphereGeometry(0.052, 16, 12);
  const faceY = 0.46;
  const surfaceZ = (x: number, y: number) => {
    // radius of the lathe at height y (linear interp on the profile)
    let r = 1;
    for (let i = 0; i < PROFILE.length - 1; i++) {
      const [x0, y0] = PROFILE[i];
      const [x1, y1] = PROFILE[i + 1];
      if (y >= y0 && y <= y1) {
        r = x0 + ((y - y0) / (y1 - y0 || 1)) * (x1 - x0);
        break;
      }
    }
    return Math.sqrt(Math.max(0, r * r - x * x));
  };
  for (const sx of [-1, 1]) {
    const e = new THREE.Mesh(eyeGeo, ink);
    const x = sx * 0.2;
    e.position.set(x, faceY, surfaceZ(x, faceY) - 0.012);
    e.scale.set(1, 1.15, 0.5);
    e.lookAt(e.position.clone().multiplyScalar(2));
    body.add(e);
  }
  const smile = new THREE.Mesh(new THREE.TorusGeometry(0.075, 0.014, 8, 20, Math.PI), ink);
  smile.position.set(0, faceY - 0.1, surfaceZ(0, faceY - 0.1) - 0.004);
  smile.rotation.z = Math.PI;
  smile.rotation.x = -0.18;
  body.add(smile);

  if (opts.blush ?? true) {
    const blushMat = new THREE.MeshBasicMaterial({
      color: "#f0a998",
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
    });
    const blushGeo = new THREE.CircleGeometry(0.075, 20);
    for (const sx of [-1, 1]) {
      const b = new THREE.Mesh(blushGeo, blushMat);
      const x = sx * 0.36;
      const y = faceY - 0.08;
      b.position.set(x, y, surfaceZ(x, y) + 0.004);
      b.lookAt(new THREE.Vector3(x * 3, y, b.position.z * 3));
      b.scale.set(1.25, 0.8, 1);
      body.add(b);
    }
  }

  let curY = 0;
  let curX = 0;
  const update = (time: number, lookX: number, lookY: number, dt: number) => {
    const k = 1 - Math.pow(1 - 0.06, dt * 60);
    const maxY = THREE.MathUtils.degToRad(8);
    const maxX = THREE.MathUtils.degToRad(4);
    curY += (lookX * maxY - curY) * k;
    curX += (-lookY * maxX - curX) * k;
    body.rotation.y = curY + Math.sin(time * 0.6) * 0.04;
    body.rotation.x = curX;
    const bob = Math.sin(time * 1.6);
    body.position.y = (bob * 0.5 + 0.5) * 0.045;
    body.scale.set(1 - bob * 0.012, 1 + bob * 0.018, 1 - bob * 0.012);
  };

  return { group, body, update };
}
