<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";

const emit = defineEmits<{ move: [x: number, y: number]; jump: [] }>();

const OUTER = 110;
const KNOB = 48;
const MAX = (OUTER - KNOB) / 2;

const base = ref<HTMLElement | null>(null);
const knob = ref<HTMLElement | null>(null);
const active = ref(false);
let pointerId = -1;
let cx = 0;
let cy = 0;

function setKnob(dx: number, dy: number) {
  if (knob.value) knob.value.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
}

function track(e: PointerEvent) {
  let dx = e.clientX - cx;
  let dy = e.clientY - cy;
  const d = Math.hypot(dx, dy);
  if (d > MAX) {
    dx = (dx / d) * MAX;
    dy = (dy / d) * MAX;
  }
  setKnob(dx, dy);
  emit("move", dx / MAX, dy / MAX);
}

function onDown(e: PointerEvent) {
  if (pointerId !== -1 || !base.value) return; // ignore extra fingers
  pointerId = e.pointerId;
  base.value.setPointerCapture(e.pointerId);
  const r = base.value.getBoundingClientRect();
  cx = r.left + r.width / 2;
  cy = r.top + r.height / 2;
  active.value = true;
  if (knob.value) knob.value.style.transition = "none";
  track(e);
}
function onMove(e: PointerEvent) {
  if (e.pointerId === pointerId) track(e);
}
function onUp(e: PointerEvent) {
  if (e.pointerId !== pointerId) return;
  pointerId = -1;
  active.value = false;
  // release springs home
  if (knob.value) knob.value.style.transition = "transform 220ms cubic-bezier(0.32, 0.72, 0, 1)";
  setKnob(0, 0);
  emit("move", 0, 0);
}
onBeforeUnmount(() => emit("move", 0, 0));
</script>

<template>
  <div class="touch-controls">
    <div
      ref="base"
      class="stick"
      :class="{ active }"
      role="application"
      aria-label="Movement joystick"
      @pointerdown.prevent="onDown"
      @pointermove="onMove"
      @pointerup="onUp"
      @pointercancel="onUp"
    >
      <div ref="knob" class="knob" />
    </div>
    <button type="button" class="jump" aria-label="Jump" @pointerdown.prevent="emit('jump')">Jump</button>
  </div>
</template>

<style scoped>
.stick {
  position: fixed;
  left: 24px;
  bottom: 96px; /* above the shared mode switch */
  width: 110px;
  height: 110px;
  z-index: 30;
  border-radius: 50%;
  border: 1px solid rgba(255, 0, 51, 0.7);
  background: rgba(255, 0, 51, 0.12);
  display: grid;
  place-items: center;
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
  transition: background-color 120ms ease;
}
.stick.active {
  background: rgba(255, 0, 51, 0.2);
}
.knob {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 0, 51, 0.4);
  box-shadow: 0 0 16px rgba(255, 0, 51, 0.6);
  pointer-events: none;
  will-change: transform;
}
.jump {
  position: fixed;
  right: 24px;
  bottom: 84px; /* above the sound toggle */
  width: 72px;
  height: 72px;
  z-index: 30;
  border-radius: 50%;
  background: rgba(255, 0, 51, 0.4);
  border: 1px solid rgba(255, 0, 51, 0.8);
  color: #fff;
  font: 800 13px/1 var(--font-display);
  font-stretch: 88%;
  text-transform: uppercase;
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
  transition: transform 100ms cubic-bezier(0.23, 1, 0.32, 1);
}
.jump:active {
  transform: scale(0.94);
}
</style>
