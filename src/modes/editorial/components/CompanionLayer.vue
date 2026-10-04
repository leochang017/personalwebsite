<script setup lang="ts">
/**
 * Fullscreen transparent canvas hosting the paper-crane companion.
 * The crane only lives inside registered title blocks ("zones"): it fades in
 * while one is in view, follows the cursor inside it, and is fed by clicks.
 */
import { onMounted, onUnmounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useModeStore } from "../../../stores/mode";
import { companionLines } from "../../../content/leo";
import { CompanionCrane } from "../three/CompanionCrane";
import { RenderLoop } from "../three/sceneKit";
import { companionBus } from "../lib/state";
import { sfx } from "../lib/sfx";

const canvas = ref<HTMLCanvasElement | null>(null);
const label = ref<HTMLDivElement | null>(null);
const line = ref("");
const talking = ref(false);

const { switching } = storeToRefs(useModeStore());

let crane: CompanionCrane | null = null;
let loop: RenderLoop | null = null;
let io: IntersectionObserver | null = null;
const ratios = new Map<Element, number>();
let pointer: { x: number; y: number } | null = null;
let placed = false;
let talkTimer = 0;
let lastLine = -1;
let offBus: (() => void) | null = null;
let offFeed: (() => void) | null = null;

function visibleZones(): DOMRect[] {
  const out: { r: number; rect: DOMRect }[] = [];
  ratios.forEach((r, el) => {
    if (r >= 0.28) out.push({ r, rect: el.getBoundingClientRect() });
  });
  return out.sort((a, b) => b.r - a.r).map((o) => o.rect);
}

function inside(r: DOMRect, x: number, y: number) {
  return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
}

function computeTarget(zones: DOMRect[]) {
  if (!crane || zones.length === 0) return;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  if (pointer) {
    const hit = zones.find((z) => inside(z, pointer!.x, pointer!.y));
    if (hit) {
      crane.setTarget(pointer.x - 48, pointer.y - 36);
      return;
    }
  }
  // clamp towards the most visible zone (intersected with the viewport)
  const z = zones[0];
  const left = Math.max(z.left, 0) + 80;
  const right = Math.min(z.right, vw) - 80;
  const top = Math.max(z.top, 0) + 90;
  const bottom = Math.min(z.bottom, vh) - 90;
  const px = pointer ? pointer.x : vw * 0.68;
  const py = pointer ? pointer.y : vh * 0.42;
  crane.setTarget(
    Math.min(Math.max(px, left), Math.max(left, right)),
    Math.min(Math.max(py, top), Math.max(top, bottom)),
  );
}

function frame(dt: number, time: number) {
  if (!crane) return;
  const zones = visibleZones();
  const active = zones.length > 0;
  if (active && !placed) {
    const z = zones[0];
    crane.place(Math.min(window.innerWidth - 120, Math.max(z.left, 0) + window.innerWidth * 0.72), Math.max(z.top, 0) + 160);
    placed = true;
  }
  crane.setVisible(active);
  computeTarget(zones);
  const info = crane.frame(dt, time);
  if (label.value) {
    const lw = label.value.offsetWidth;
    const lx = Math.min(info.x + 26, window.innerWidth - lw - 16);
    label.value.style.transform = `translate3d(${Math.max(16, lx)}px, ${Math.max(12, info.y - 58)}px, 0)`;
  }
  if (talking.value) {
    talkTimer -= dt;
    if (talkTimer <= 0 || !active) talking.value = false;
  }
  if (!active && crane.isSettled) idle = true;
}

let idle = false;

function observe() {
  io?.disconnect();
  ratios.clear();
  io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => ratios.set(e.target, e.intersectionRatio));
      if (visibleZones().length > 0) {
        idle = false;
        loop?.resume();
      }
    },
    { threshold: [0, 0.15, 0.28, 0.4, 0.6, 0.8, 1] },
  );
  companionBus.zones.forEach((z) => io!.observe(z));
}

function onMove(e: PointerEvent) {
  pointer = { x: e.clientX, y: e.clientY };
  if (idle && visibleZones().length > 0) {
    idle = false;
    loop?.resume();
  }
}

function speak() {
  let i = Math.floor(Math.random() * companionLines.length);
  if (i === lastLine) i = (i + 1) % companionLines.length;
  lastLine = i;
  line.value = companionLines[i];
  talking.value = false;
  requestAnimationFrame(() => {
    talking.value = true;
  });
  talkTimer = 2.2;
}

function feedAt(x: number, y: number) {
  if (!crane) return;
  const zones = visibleZones();
  if (!zones.some((z) => inside(z, x, y))) return;
  crane.feed(x, y);
  sfx("craneHit");
  speak();
  idle = false;
  loop?.resume();
}

function onClick(e: MouseEvent) {
  const t = e.target as Element | null;
  if (t?.closest("a, button, input, textarea, select, [data-no-feed]")) return;
  feedAt(e.clientX, e.clientY);
}

function onResize() {
  crane?.resize();
}

onMounted(() => {
  if (!canvas.value) return;
  try {
    crane = new CompanionCrane(canvas.value);
  } catch {
    crane = null;
    return;
  }
  loop = new RenderLoop(canvas.value, frame, () => switching.value || idle);
  observe();
  offBus = companionBus.onChange(observe);
  offFeed = companionBus.onFeed(feedAt);
  window.addEventListener("pointermove", onMove, { passive: true });
  window.addEventListener("click", onClick);
  window.addEventListener("resize", onResize);
  loop.resume();
});

watch(switching, (s) => {
  if (!s) loop?.resume();
});

onUnmounted(() => {
  offBus?.();
  offFeed?.();
  io?.disconnect();
  window.removeEventListener("pointermove", onMove);
  window.removeEventListener("click", onClick);
  window.removeEventListener("resize", onResize);
  loop?.dispose();
  crane?.dispose();
  crane = null;
});
</script>

<template>
  <canvas ref="canvas" class="companion" aria-hidden="true" />
  <div ref="label" class="speech" :class="{ on: talking }" aria-live="polite">
    <span class="bubble">{{ line }}</span>
  </div>
</template>

<style scoped>
.companion {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: 50;
  pointer-events: none;
}
.speech {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 51;
  pointer-events: none;
  will-change: transform;
}
.bubble {
  display: inline-block;
  padding: 7px 12px 6px;
  border: 1px solid var(--ed-ink);
  border-radius: 999px;
  background: var(--ed-bg);
  color: var(--ed-ink);
  font: 500 12px/1.2 var(--font-body);
  letter-spacing: 0.02em;
  text-transform: uppercase;
  white-space: nowrap;
  box-shadow: 0 6px 18px rgba(2, 32, 22, 0.1);
  opacity: 0;
  transform: translateY(6px) scale(0.96);
  transform-origin: 0% 100%;
  transition:
    opacity 0.25s ease,
    transform 0.35s cubic-bezier(0.23, 1, 0.32, 1);
}
.speech.on .bubble {
  opacity: 1;
  transform: translateY(0) scale(1);
}
</style>
