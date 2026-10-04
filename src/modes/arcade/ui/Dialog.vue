<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useArcadeStore } from "../store";
import { useModeStore } from "../../../stores/mode";
import { useAudio } from "../context";

const CPS = 28; // characters per second

const store = useArcadeStore();
const { dialog } = storeToRefs(store);
const { soundOn } = storeToRefs(useModeStore());
const audio = useAudio();

const index = ref(0);
const shown = ref(0);
let raf = 0;
let startedAt = 0;

const line = computed(() => dialog.value?.lines[index.value] ?? "");
const typing = computed(() => shown.value < line.value.length);
const isLast = computed(() => !!dialog.value && index.value >= dialog.value.lines.length - 1);

function type() {
  cancelAnimationFrame(raf);
  shown.value = 0;
  startedAt = performance.now();
  const full = line.value.length;
  const step = (now: number) => {
    const n = Math.min(full, Math.floor(((now - startedAt) / 1000) * CPS));
    if (n !== shown.value) {
      // a short blip every 3 characters
      if (soundOn.value && Math.floor(n / 3) > Math.floor(shown.value / 3)) audio?.blip();
      shown.value = n;
    }
    if (n < full) raf = requestAnimationFrame(step);
  };
  raf = requestAnimationFrame(step);
}

/** E / click: finish the line, then next line, then close. */
function advance() {
  if (!dialog.value) return;
  if (typing.value) {
    cancelAnimationFrame(raf);
    shown.value = line.value.length;
    return;
  }
  if (isLast.value) {
    store.finishDialog();
    return;
  }
  index.value++;
  type();
}

watch(dialog, (d, prev) => {
  if (d && d !== prev) {
    index.value = 0;
    type();
  } else if (!d) cancelAnimationFrame(raf);
});

onBeforeUnmount(() => cancelAnimationFrame(raf));
defineExpose({ advance });
</script>

<template>
  <Transition name="dlg">
    <section
      v-if="dialog"
      class="dialog"
      role="dialog"
      aria-modal="false"
      :aria-label="`${dialog.name} says`"
      @click="advance"
    >
      <header>
        <span class="name" :style="{ '--npc': dialog.color }">{{ dialog.name }}</span>
        <span class="count">{{ index + 1 }}/{{ dialog.lines.length }}</span>
      </header>
      <p class="text">
        <span aria-hidden="true">{{ line.slice(0, shown) }}</span><span class="ghost" aria-hidden="true">{{ line.slice(shown) }}</span>
        <span class="sr">{{ line }}</span>
      </p>
      <footer>
        <button type="button" class="next" :aria-label="isLast ? 'Close dialog' : 'Next line'" @click.stop="advance">
          <kbd>E</kbd>
          <span>{{ typing ? "Skip" : isLast ? "Close" : "Next" }}</span>
          <span class="caret" :class="{ wait: !typing }" aria-hidden="true">▸</span>
        </button>
      </footer>
    </section>
  </Transition>
</template>

<style scoped>
.dialog {
  position: fixed;
  left: 50%;
  bottom: calc(84px + env(safe-area-inset-bottom));
  width: min(560px, calc(100vw - 32px));
  transform: translateX(-50%);
  z-index: 45;
  padding: 14px 18px 12px;
  background: rgba(0, 0, 0, 0.88);
  border: 1px solid var(--ar-red);
  border-radius: 3px;
  box-shadow: 0 0 28px rgba(255, 0, 51, 0.2);
  color: #fff;
  cursor: pointer;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 8px;
}
.name {
  font: 800 15px/1 var(--font-display);
  font-stretch: 88%;
  text-transform: uppercase;
  color: var(--ar-red);
  text-shadow: 0 0 10px rgba(255, 0, 51, 0.6);
}
.name::before {
  content: "";
  display: inline-block;
  width: 7px;
  height: 7px;
  margin-right: 8px;
  border-radius: 50%;
  background: var(--npc);
  box-shadow: 0 0 8px var(--npc);
  vertical-align: 2px;
}
.count {
  font: 500 11px/1 var(--font-mono);
  color: rgba(255, 0, 51, 0.7);
}
.text {
  position: relative;
  margin: 0;
  min-height: 3em;
  font: 400 15px/1.5 var(--font-body);
}
.ghost {
  color: transparent;
}
.sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 6px;
}
.next {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 6px;
  font: 500 11px/1 var(--font-mono);
  color: var(--ar-red);
  text-transform: uppercase;
  cursor: pointer;
  border-radius: 2px;
  transition: transform 140ms cubic-bezier(0.23, 1, 0.32, 1);
}
.next:active {
  transform: scale(0.97);
}
.next:focus-visible {
  outline: 1px solid var(--ar-red);
  outline-offset: 2px;
}
kbd {
  padding: 1px 5px;
  border: 1px solid var(--ar-red);
  border-radius: 2px;
  font: inherit;
}
.caret.wait {
  animation: nudge 900ms ease-in-out infinite;
}
@keyframes nudge {
  50% {
    transform: translateX(3px);
  }
}

.dlg-enter-active {
  transition: opacity 220ms cubic-bezier(0.23, 1, 0.32, 1), transform 220ms cubic-bezier(0.23, 1, 0.32, 1);
}
.dlg-leave-active {
  transition: opacity 150ms cubic-bezier(0.23, 1, 0.32, 1), transform 150ms cubic-bezier(0.23, 1, 0.32, 1);
}
.dlg-enter-from,
.dlg-leave-to {
  opacity: 0;
  transform: translate(-50%, 12px);
}
@media (prefers-reduced-motion: reduce) {
  .dlg-enter-from,
  .dlg-leave-to {
    transform: translateX(-50%);
  }
  .caret.wait {
    animation: none;
  }
}
</style>
