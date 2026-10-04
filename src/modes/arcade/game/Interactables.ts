import { Vector3, type Camera } from "three";
import type { GameBridge, Interactable } from "./types";

const _v = new Vector3();

/**
 * Proximity for everything you can talk to or open. Tracks the nearest
 * target (for the floating prompt and E) and fires auto-open once per entry.
 */
export class Interactables {
  current: Interactable | null = null;
  private inside = new Set<string>();

  private list: Interactable[];
  private bridge: GameBridge;

  constructor(list: Interactable[], bridge: GameBridge) {
    this.list = list;
    this.bridge = bridge;
  }

  update(p: Vector3, blocked: boolean) {
    let best: Interactable | null = null;
    let bestScore = Infinity;
    for (const it of this.list) {
      const d = Math.hypot(p.x - it.position.x, p.z - it.position.z);
      const within = d <= it.radius;
      if (it.auto) {
        if (within && !this.inside.has(it.id)) {
          this.inside.add(it.id);
          if (!blocked) this.bridge.autoEnter(it);
        } else if (!within) this.inside.delete(it.id);
      }
      const score = d / it.radius;
      if (within && score < bestScore) {
        best = it;
        bestScore = score;
      }
    }
    if (best !== this.current) {
      this.current = best;
      this.bridge.promptChange(best ? { label: best.label, sub: best.sub, kind: best.kind } : null);
    }
  }

  /** After a teleport: count zones we're already standing in as entered, without firing. */
  sync(p: Vector3) {
    this.inside.clear();
    for (const it of this.list) {
      if (it.auto && Math.hypot(p.x - it.position.x, p.z - it.position.z) <= it.radius) this.inside.add(it.id);
    }
  }

  /** Positions the DOM prompt over the current target's anchor. */
  project(el: HTMLElement | null, camera: Camera, w: number, h: number, visible: boolean) {
    if (!el) return;
    const it = this.current;
    if (!it || !visible) {
      if (el.dataset.on !== "0") el.dataset.on = "0";
      return;
    }
    _v.copy(it.anchor).project(camera);
    const on = _v.z < 1 && Math.abs(_v.x) < 1.1 && Math.abs(_v.y) < 1.1;
    el.dataset.on = on ? "1" : "0";
    if (!on) return;
    const x = ((_v.x + 1) / 2) * w;
    const y = ((1 - _v.y) / 2) * h;
    el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
  }
}
