<script setup lang="ts">
/**
 * Cursor companions (system cursor stays):
 * - yellow pill "CLICK — TO ENABLE SOUND" until the first click anywhere
 * - the same pill reads a label over [data-cursor="..."] (DRAG, DISCOVER MORE)
 * - a 10px ink dot over links and buttons
 * [data-cursor="none"] hides everything (the ping-pong paddle takes over).
 */
import { computed, onMounted, onUnmounted, ref } from "vue";
import { ui } from "../lib/state";
import { damp } from "../lib/motion";

const pill = ref<HTMLDivElement | null>(null);
const dot = ref<HTMLDivElement | null>(null);
const label = ref("");
const overLink = ref(false);
const hidden = ref(false);
const inWindow = ref(false);

const mode = computed<"pill" | "dot" | "none">(() => {
  if (!inWindow.value || hidden.value || ui.transitioning || ui.creditsOpen || ui.menuOpen || ui.lightboxOpen || !ui.introDone) return "none";
  if (label.value) return "pill";
  if (overLink.value) return "dot";
  if (ui.awaitingFirstClick) return "pill";
  return "none";
});
const pillText = computed(() => label.value || "sound");

let raf = 0;
let last = 0;
const target = { x: -100, y: -100 };
const pos = { x: -100, y: -100 };
const dotPos = { x: -100, y: -100 };

function tick(now: number) {
  const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
  last = now;
  const k = damp(0.12, dt);
  pos.x += (target.x - pos.x) * k;
  pos.y += (target.y - pos.y) * k;
  const kd = damp(0.3, dt);
  dotPos.x += (target.x - dotPos.x) * kd;
  dotPos.y += (target.y - dotPos.y) * kd;
  if (pill.value) pill.value.style.transform = `translate3d(${pos.x}px, ${pos.y + 22}px, 0) translate(-50%, -50%)`;
  if (dot.value) dot.value.style.transform = `translate3d(${dotPos.x}px, ${dotPos.y}px, 0) translate(-50%, -50%)`;
  const settled = Math.abs(target.x - pos.x) < 0.1 && Math.abs(target.y - pos.y) < 0.1 && Math.abs(target.x - dotPos.x) < 0.1;
  raf = settled ? 0 : requestAnimationFrame(tick);
}
function kick() {
  if (!raf) {
    last = performance.now();
    raf = requestAnimationFrame(tick);
  }
}

function inspect(t: EventTarget | null) {
  const el = t instanceof Element ? t : null;
  const cur = el?.closest<HTMLElement>("[data-cursor]");
  const v = cur?.dataset.cursor ?? "";
  hidden.value = v === "none";
  label.value = v === "none" ? "" : v;
  overLink.value = !!el?.closest("a, button, [role='button']");
}

function onMove(e: PointerEvent) {
  if (e.pointerType === "touch") return;
  const first = !inWindow.value;
  inWindow.value = true;
  target.x = e.clientX;
  target.y = e.clientY;
  if (first) {
    pos.x = dotPos.x = target.x;
    pos.y = dotPos.y = target.y;
  }
  inspect(e.target);
  kick();
}
function onOver(e: PointerEvent) {
  inspect(e.target);
}
function onLeave(e: PointerEvent) {
  if (!e.relatedTarget) inWindow.value = false;
}
function onScroll() {
  // content moves under a still cursor: re-evaluate what we're over
  const el = document.elementFromPoint(target.x, target.y);
  inspect(el);
}

onMounted(() => {
  window.addEventListener("pointermove", onMove, { passive: true });
  document.addEventListener("pointerover", onOver, { passive: true });
  document.addEventListener("pointerout", onLeave, { passive: true });
  window.addEventListener("scroll", onScroll, { passive: true });
});
onUnmounted(() => {
  cancelAnimationFrame(raf);
  window.removeEventListener("pointermove", onMove);
  document.removeEventListener("pointerover", onOver);
  document.removeEventListener("pointerout", onLeave);
  window.removeEventListener("scroll", onScroll);
});
</script>

<template>
  <div class="cursor" aria-hidden="true">
    <div ref="pill" class="pill" :class="{ on: mode === 'pill' }">
      <template v-if="pillText === 'sound'">
        <span>Click</span><span class="dash">—</span><span>To enable sound</span>
      </template>
      <span v-else>{{ pillText }}</span>
    </div>
    <div ref="dot" class="dot" :class="{ on: mode === 'dot' }" />
  </div>
</template>

<style scoped>
.cursor {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 500;
}
.pill,
.dot {
  position: fixed;
  left: 0;
  top: 0;
  will-change: transform;
}
.pill {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 8px 14px;
  border-radius: 999px;
  background: var(--ed-yellow);
  color: var(--ed-ink);
  font: 500 11px/1 var(--font-body);
  letter-spacing: 0.01em;
  text-transform: uppercase;
  white-space: nowrap;
}
.pill > span {
  display: inline-block;
  opacity: 0;
  transform: scale(0.9);
  transition:
    opacity 0.2s ease,
    transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
}
.pill {
  opacity: 0;
  scale: 0.9;
  transition:
    opacity 0.2s ease,
    scale 0.3s cubic-bezier(0.23, 1, 0.32, 1);
}
.pill.on {
  opacity: 1;
  scale: 1;
}
.pill.on > span {
  opacity: 1;
  transform: scale(1);
}
.dash {
  opacity: 0.8;
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--ed-ink);
  opacity: 0;
  scale: 0.6;
  transition:
    opacity 0.18s ease,
    scale 0.25s cubic-bezier(0.23, 1, 0.32, 1);
  mix-blend-mode: difference;
  background: #fff;
}
.dot.on {
  opacity: 1;
  scale: 1;
}
</style>
