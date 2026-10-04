<script setup lang="ts">
/**
 * The `····` sound control: four dots that become a live equalizer when on.
 * Clicking opens a small track menu; if sound was off, that first click also
 * turns it on and starts the current track.
 */
import { nextTick, onUnmounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useModeStore } from "../../../stores/mode";
import { ui } from "../lib/state";
import { creditLine, currentTrack, setTrack, tracks } from "../lib/audio";
import { sfx } from "../lib/sfx";

const store = useModeStore();
const { soundOn } = storeToRefs(store);

const open = ref(false);
const wrap = ref<HTMLElement | null>(null);
const menu = ref<HTMLElement | null>(null);
const button = ref<HTMLButtonElement | null>(null);
const menuId = `tracks-${Math.random().toString(36).slice(2, 8)}`;

function onDocDown(e: PointerEvent) {
  if (wrap.value && !wrap.value.contains(e.target as Node)) close(false);
}
function onKey(e: KeyboardEvent) {
  if (e.key === "Escape") {
    e.stopPropagation();
    close(true);
  }
  if ((e.key === "ArrowDown" || e.key === "ArrowUp") && menu.value) {
    e.preventDefault();
    const items = Array.from(menu.value.querySelectorAll<HTMLButtonElement>("button"));
    const i = items.indexOf(document.activeElement as HTMLButtonElement);
    const n = (i + (e.key === "ArrowDown" ? 1 : items.length - 1) + items.length) % items.length;
    items[n]?.focus();
  }
}

function openMenu() {
  open.value = true;
  document.addEventListener("pointerdown", onDocDown, true);
  window.addEventListener("keydown", onKey);
  nextTick(() => menu.value?.querySelector<HTMLButtonElement>('[aria-checked="true"]')?.focus());
}
function close(restoreFocus: boolean) {
  if (!open.value) return;
  open.value = false;
  document.removeEventListener("pointerdown", onDocDown, true);
  window.removeEventListener("keydown", onKey);
  if (restoreFocus) button.value?.focus();
}

function onButton() {
  ui.awaitingFirstClick = false;
  if (!soundOn.value) soundOn.value = true;
  if (open.value) close(true);
  else openMenu();
}

function pick(id: string) {
  setTrack(id);
  if (!soundOn.value) soundOn.value = true;
  sfx("tick");
}
function toggleSound() {
  soundOn.value = !soundOn.value;
}

onUnmounted(() => {
  document.removeEventListener("pointerdown", onDocDown, true);
  window.removeEventListener("keydown", onKey);
});
</script>

<template>
  <span ref="wrap" class="wrap">
    <button
      ref="button"
      class="sound"
      :class="{ on: soundOn }"
      type="button"
      data-sound-toggle
      aria-haspopup="menu"
      :aria-expanded="open"
      :aria-controls="menuId"
      :aria-label="soundOn ? 'Sound on: choose a track' : 'Turn sound on and choose a track'"
      :title="creditLine"
      @click="onButton"
    >
      <span v-for="i in 4" :key="i" class="bar" :style="{ '--i': i }" />
    </button>
    <div v-if="open" :id="menuId" ref="menu" class="menu" role="menu" aria-label="Soundtrack" data-cursor="" data-no-feed>
      <p class="menu-head">Soundtrack</p>
      <button
        v-for="t in tracks"
        :key="t.id"
        class="item"
        type="button"
        role="menuitemradio"
        :aria-checked="t.id === currentTrack.id"
        @click="pick(t.id)"
      >
        <span class="mark" aria-hidden="true">{{ t.id === currentTrack.id ? "●" : "" }}</span>
        <span class="t-title">{{ t.title }}</span>
      </button>
      <button class="item off" type="button" role="menuitemcheckbox" :aria-checked="soundOn" @click="toggleSound">
        <span class="mark" aria-hidden="true" />
        <span>{{ soundOn ? "Sound off" : "Sound on" }}</span>
      </button>
      <p class="menu-credit">{{ creditLine }}</p>
    </div>
  </span>
</template>

<style scoped>
.wrap {
  position: relative;
  display: inline-flex;
}
.menu {
  position: absolute;
  top: calc(100% + 12px);
  right: -6px;
  z-index: 130;
  width: 230px;
  padding: 10px 0 8px;
  background: #fff;
  color: var(--ed-ink);
  border: 1px solid var(--ed-ink);
  text-shadow: none;
  transform-origin: calc(100% - 14px) 0;
  animation: menu-in 0.18s cubic-bezier(0.23, 1, 0.32, 1);
}
@keyframes menu-in {
  from {
    opacity: 0;
    transform: translateY(-4px) scale(0.97);
  }
}
.menu-head {
  margin: 0 14px 6px;
  font: 500 11px/1 var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(2, 32, 22, 0.55);
}
.item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 14px;
  font: 400 13px/1.2 var(--font-body);
  text-align: left;
  cursor: pointer;
  transition: background-color 0.15s ease;
}
@media (hover: hover) and (pointer: fine) {
  .item:hover {
    background: var(--ed-grey);
  }
}
.item:focus-visible {
  outline: none;
  background: var(--ed-grey);
}
.item[aria-checked="true"]:not(.off) {
  font-weight: 600;
}
.mark {
  width: 10px;
  font-size: 8px;
}
.off {
  margin-top: 4px;
  border-top: 1px solid var(--ed-grey);
  padding-top: 10px;
}
.menu-credit {
  margin: 6px 14px 0;
  font: 400 10px/1.35 var(--font-body);
  color: rgba(2, 32, 22, 0.5);
}
@media (prefers-reduced-motion: reduce) {
  .menu {
    animation: none;
  }
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
