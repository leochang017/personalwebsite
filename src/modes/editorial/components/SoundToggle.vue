<script setup lang="ts">
/**
 * The `····` sound control: four dots that become a live equalizer when on.
 * Toggles the interface sounds; this mode has no soundtrack.
 */
import { storeToRefs } from "pinia";
import { useModeStore } from "../../../stores/mode";
import { ui } from "../lib/state";

const store = useModeStore();
const { soundOn } = storeToRefs(store);

function toggle() {
  ui.awaitingFirstClick = false;
  soundOn.value = !soundOn.value;
}
</script>

<template>
  <span class="wrap">
    <button
      class="sound"
      :class="{ on: soundOn }"
      type="button"
      data-sound-toggle
      :aria-pressed="soundOn"
      aria-label="Interface sounds"
      :title="soundOn ? 'Sound on' : 'Sound off'"
      @click="toggle"
    >
      <span v-for="i in 4" :key="i" class="bar" :style="{ '--i': i }" />
    </button>
  </span>
</template>

<style scoped>
.wrap {
  position: relative;
  display: inline-flex;
}
.sound {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  height: 20px;
  padding: 0 2px;
  cursor: pointer;
  color: inherit;
}
.sound:active {
  transform: scale(0.94);
}
.bar {
  width: 2px;
  height: 12px;
  background: currentColor;
  border-radius: 1px;
  transform: scaleY(0.17);
  transform-origin: 50% 50%;
  transition: transform 0.35s cubic-bezier(0.23, 1, 0.32, 1);
}
.on .bar {
  animation: eq 0.9s cubic-bezier(0.6, 0, 0.25, 1) infinite alternate;
  animation-delay: calc(var(--i) * -0.23s);
}
.on .bar:nth-child(2) {
  animation-duration: 0.7s;
}
.on .bar:nth-child(3) {
  animation-duration: 1.1s;
}
.on .bar:nth-child(4) {
  animation-duration: 0.8s;
}
@keyframes eq {
  0% {
    transform: scaleY(0.2);
  }
  50% {
    transform: scaleY(1);
  }
  100% {
    transform: scaleY(0.45);
  }
}
@media (prefers-reduced-motion: reduce) {
  .on .bar {
    animation: none;
  }
  .on .bar:nth-child(odd) {
    transform: scaleY(1);
  }
  .on .bar:nth-child(even) {
    transform: scaleY(0.55);
  }
}
.sound:focus-visible {
  outline: 1px solid currentColor;
  outline-offset: 4px;
}
</style>
