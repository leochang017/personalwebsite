<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useArcadeStore } from "../store";
import { useModeStore } from "../../../stores/mode";
import { computed } from "vue";
import { QUESTS, creditFor } from "../content";
import { blurAfterPointer, useHoverBlip } from "../context";
import Notification from "./Notification.vue";
import Joystick from "./Joystick.vue";

defineProps<{
  frameMs: number;
  fps: number;
  tutorialActive: boolean;
  coarse: boolean;
  ready: boolean;
}>();
const emit = defineEmits<{ skip: []; move: [x: number, y: number]; jump: [] }>();

const store = useArcadeStore();
const { doneCount, questsOpen, currentTrack } = storeToRefs(store);
const tooltip = computed(() => creditFor(currentTrack.value).tooltip);
const mode = useModeStore();
const { soundOn } = storeToRefs(mode);
const hover = useHoverBlip();

function toggleQuests(e: MouseEvent) {
  store.questsOpen = !store.questsOpen;
  if (!store.questsOpen) blurAfterPointer(e);
}
function toggleSound(e: MouseEvent) {
  mode.soundOn = !mode.soundOn;
  blurAfterPointer(e);
}
function skip(e: MouseEvent) {
  emit("skip");
  blurAfterPointer(e);
}
</script>

<template>
  <div class="hud" :class="{ ready }">
    <p class="stats" aria-hidden="true">
      WEBGL · {{ Math.round(fps) }} FPS · {{ frameMs.toFixed(1) }} MS
    </p>

    <button
      type="button"
      class="quests-chip"
      :aria-expanded="questsOpen"
      aria-controls="arcade-quests"
      :aria-label="`Quests, ${doneCount} of ${QUESTS.length} completed`"
      @click="toggleQuests"
      @pointerenter="hover"
    >
      <span class="q-label">Quests</span>
      <span class="q-count">{{ doneCount }}/{{ QUESTS.length }}</span>
      <span class="q-dots" aria-hidden="true">
        <i v-for="q in QUESTS" :key="q.id" :class="{ on: store.questDone[q.id] }" />
      </span>
    </button>

    <Notification />

    <Transition name="skip">
      <button v-if="tutorialActive" type="button" class="skip" aria-label="Skip tutorial" @click="skip" @pointerenter="hover">
        Skip
      </button>
    </Transition>

    <button
      type="button"
      class="sound"
      :class="{ on: soundOn }"
      :aria-pressed="soundOn"
      :aria-label="soundOn ? 'Mute sound' : 'Turn sound on'"
      :title="tooltip"
      @click="toggleSound"
      @pointerenter="hover"
    >
      <span v-if="soundOn" class="bars" aria-hidden="true"><i /><i /><i /><i /></span>
      <span v-else class="dots" aria-hidden="true">....</span>
    </button>

    <Joystick v-if="coarse" @move="(x, y) => emit('move', x, y)" @jump="emit('jump')" />
  </div>
</template>

<style scoped>
.hud {
  opacity: 0;
  transition: opacity 600ms ease 300ms;
}
.hud.ready {
  opacity: 1;
}
.stats {
  position: fixed;
  top: calc(18px + env(safe-area-inset-top));
  right: calc(82px + env(safe-area-inset-right));
  margin: 0;
  z-index: 40;
  font: 400 11px/1 var(--font-mono);
  color: var(--ar-red);
  white-space: nowrap;
  pointer-events: none;
}
.quests-chip {
  position: fixed;
  top: calc(20px + env(safe-area-inset-top));
  left: calc(20px + env(safe-area-inset-left));
  z-index: 40;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 34px;
  padding: 0 12px;
  background: var(--ar-red);
  color: #12000a;
  border-radius: 4px;
  font: 800 13px/1 var(--font-display);
  font-stretch: 88%;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: 0 0 18px rgba(255, 0, 51, 0.35);
  transition: transform 140ms cubic-bezier(0.23, 1, 0.32, 1), box-shadow 160ms ease;
}
.q-count {
  font: 700 12px/1 var(--font-mono);
}
.q-dots {
  display: inline-flex;
  gap: 3px;
}
.q-dots i {
  width: 5px;
  height: 5px;
  border: 1px solid #12000a;
  border-radius: 1px;
}
.q-dots i.on {
  background: #12000a;
}
.skip {
  position: fixed;
  left: 50%;
  bottom: calc(20px + env(safe-area-inset-bottom));
  z-index: 40;
  width: 120px;
  height: 35px;
  margin-left: -60px;
  border-radius: 999px;
  background: var(--ar-red);
  color: #000;
  font: 800 13px/1 var(--font-display);
  font-stretch: 88%;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: 0 0 16px rgba(255, 0, 51, 0.4);
  transition: transform 140ms cubic-bezier(0.23, 1, 0.32, 1), opacity 200ms ease;
}
.sound {
  position: fixed;
  right: calc(30px + env(safe-area-inset-right));
  bottom: calc(25px + env(safe-area-inset-bottom));
  z-index: 40;
  width: 50px;
  height: 35px;
  display: grid;
  place-items: center;
  border-radius: 4px;
  background: var(--ar-red);
  color: #12000a;
  cursor: pointer;
  box-shadow: 0 0 16px rgba(255, 0, 51, 0.35);
  transition: transform 140ms cubic-bezier(0.23, 1, 0.32, 1);
}
.dots {
  font: 800 16px/1 var(--font-display);
  letter-spacing: 1px;
  transform: translateY(3px);
}
.bars {
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 14px;
}
.bars i {
  width: 3px;
  height: 14px;
  background: currentColor;
  transform-origin: bottom;
  animation: eq 900ms ease-in-out infinite alternate;
}
.bars i:nth-child(2) { animation-duration: 620ms; animation-delay: -200ms; }
.bars i:nth-child(3) { animation-duration: 780ms; animation-delay: -450ms; }
.bars i:nth-child(4) { animation-duration: 540ms; animation-delay: -120ms; }
@keyframes eq {
  0% { transform: scaleY(0.25); }
  100% { transform: scaleY(1); }
}

.quests-chip:active,
.skip:active,
.sound:active {
  transform: scale(0.97);
}
@media (hover: hover) and (pointer: fine) {
  .quests-chip:hover,
  .sound:hover,
  .skip:hover {
    box-shadow: 0 0 26px rgba(255, 0, 51, 0.6);
  }
}
.quests-chip:focus-visible,
.skip:focus-visible,
.sound:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 3px;
}

.skip-leave-active {
  transition: opacity 200ms ease, transform 200ms cubic-bezier(0.23, 1, 0.32, 1);
}
.skip-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

@media (max-width: 640px) {
  .stats {
    top: calc(12px + env(safe-area-inset-top));
    right: calc(16px + env(safe-area-inset-right));
    font-size: 9px;
  }
  .quests-chip {
    top: calc(30px + env(safe-area-inset-top));
    left: calc(16px + env(safe-area-inset-left));
  }
}
@media (prefers-reduced-motion: reduce) {
  .bars i {
    animation: none;
    transform: scaleY(0.7);
  }
  .bars i:nth-child(2n) {
    transform: scaleY(1);
  }
}
</style>
