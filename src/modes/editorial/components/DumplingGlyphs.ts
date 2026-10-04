/**
 * One shared WebGL renderer drawing a tiny rotating dumpling into every
 * inline glyph slot (setViewport + setScissor per slot) on a fixed,
 * transparent, full-viewport canvas.
 */
import * as THREE from "three";
import { createDumpling, type Dumpling } from "../three/Mascot";
import { createRenderer, disposeObject } from "../three/sceneKit";

export class DumplingGlyphs {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
  private mascot: Dumpling;
  private slots: HTMLElement[] = [];

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = createRenderer(canvas, { alpha: true, exposure: 1.05 });
    this.renderer.setScissorTest(true);
    this.mascot = createDumpling({ body: "#f6dccb", pleat: "#efcfbb", castShadow: false, segments: 40 });
    this.mascot.group.position.y = -0.48;
    this.scene.add(this.mascot.group);
    this.scene.add(new THREE.HemisphereLight("#fff8f0", "#2c5a45", 2.0));
    const key = new THREE.DirectionalLight("#ffffff", 2.0);
    key.position.set(2, 3, 4);
    this.scene.add(key);
    this.camera.position.set(0, 0.35, 4.3);
    this.camera.lookAt(0, 0, 0);
    this.resize();
  }

  setSlots(slots: HTMLElement[]) {
    this.slots = slots;
  }

  resize() {
    // updateStyle=true: the canvas CSS box follows innerWidth/innerHeight exactly. A 100vw/100vh box
    // would be taller than the visible viewport on iOS Safari and stretch every glyph off its slot.
    this.renderer.setSize(window.innerWidth, window.innerHeight, true);
  }

  render(time: number, scroll: number) {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    this.renderer.setScissor(0, 0, vw, vh);
    this.renderer.setViewport(0, 0, vw, vh);
    this.renderer.clear();
    this.slots.forEach((el, i) => {
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh || r.width < 2) return;
      const size = Math.max(r.width, r.height) * 1.25;
      const x = r.left + r.width / 2 - size / 2;
      const y = vh - (r.top + r.height / 2 + size / 2);
      this.renderer.setViewport(x, y, size, size);
      this.renderer.setScissor(x, y, size, size);
      const g = this.mascot.body;
      g.rotation.y = time * 0.7 + i * 1.7 + scroll * 0.0035;
      g.rotation.x = Math.sin(time * 0.9 + i) * 0.18;
      g.rotation.z = Math.sin(time * 0.6 + i * 2) * 0.12;
      this.renderer.render(this.scene, this.camera);
    });
  }

  dispose() {
    disposeObject(this.scene);
    this.renderer.dispose();
  }
}
