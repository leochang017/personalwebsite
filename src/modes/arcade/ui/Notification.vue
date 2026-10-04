<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useArcadeStore } from "../store";
import { useModeStore } from "../../../stores/mode";
import { useAudio } from "../context";
import type { Note } from "../store";
import { LATIN } from "../content";

const store = useArcadeStore();
const { notes } = storeToRefs(store);
const { soundOn } = storeToRefs(useModeStore());
const audio = useAudio();

const current = ref<Note | null>(null);
const visible = ref(false);
let hideTimer = 0;
let remaining = 3500;
let shownAt = 0;

/** Greedy wrap so each line can be revealed through its own clip mask. */
function wrap(text: string, max = 24): string[] {
  const out: string[] = [];
  let line = "";
  for (const word of text.toUpperCase().split(/\s+/)) {
    if (line && (line + " " + word).length > max) {
      out.push(line);
      line = word;
    } else line = line ? `${line} ${word}` : word;
  }
  if (line) out.push(line);
  return out;
}
const lines = computed(() => (current.value ? wrap(current.value.message) : []));

function arm(ms: number) {
  window.clearTimeout(hideTimer);
  remaining = ms;
  shownAt = performance.now();
  hideTimer = window.setTimeout(() => (visible.value = false), ms);
}

function showNext() {
  if (visible.value || current.value) return;
  const next = notes.value[0];
  if (!next) return;
  current.value = next;
  visible.value = true;
  if (soundOn.value && next.kind !== "music") audio?.chime();
  arm(3500);
}

// after the exit transition: drop it from the queue and show the next one
function afterLeave() {
  store.shiftNote();
  current.value = null;
  showNext();
}

watch(() => notes.value.length, showNext, { immediate: true });

// pause the auto-hide while the tab is hidden (nobody saw it)
function onVisibility() {
  if (!visible.value) return;
  if (document.hidden) {
    window.clearTimeout(hideTimer);
    remaining = Math.max(800, remaining - (performance.now() - shownAt));
  } else arm(remaining);
}
document.addEventListener("visibilitychange", onVisibility);
onBeforeUnmount(() => {
  window.clearTimeout(hideTimer);
  document.removeEventListener("visibilitychange", onVisibility);
});
</script>

<template>
  <div class="note-slot" role="status" aria-live="polite">
    <Transition name="note" @after-leave="afterLeave">
      <div v-if="visible && current" :key="current.id" class="note" :data-kind="current.kind">
        <div class="icon" aria-hidden="true">
          <svg v-if="current.kind === 'music'" viewBox="0 0 24 24" width="34" height="34">
            <path d="M4 14v-2a8 8 0 0 1 16 0v2" fill="none" stroke="currentColor" stroke-width="2.2" />
            <rect x="3" y="13.5" width="5" height="7" rx="1.5" fill="currentColor" />
            <rect x="16" y="13.5" width="5" height="7" rx="1.5" fill="currentColor" />
          </svg>
          <svg v-else-if="current.kind === 'party'" viewBox="0 0 24 24" width="32" height="32">
            <path d="M12 2l2.6 6.4L21 9l-5 4.4L17.6 20 12 16.6 6.4 20 8 13.4 3 9l6.4-.6z" fill="currentColor" />
          </svg>
          <svg v-else viewBox="0 0 24 24" width="32" height="32">
            <path d="M4 12.5l5 5L20 6.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="square" />
          </svg>
        </div>
        <div class="body">
          <span class="label">{{ current.label }}</span>
          <span class="jp" lang="la">{{ LATIN.notice }}</span>
          <p class="msg">
            <span v-for="(l, i) in lines" :key="i" class="line">
              <span class="line-in" :style="{ animationDelay: `${120 + i * 70}ms` }">{{ l }}</span>
            </span>
          </p>
          <span v-if="current.sub" class="credit">{{ current.sub }}</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.note-slot {
  position: fixed;
  top: 50px;
  right: 50px;
  width: 260px;
  z-index: 40;
  pointer-events: none;
}
.note {
  display: flex;
  gap: 10px;
  padding: 5px;
  border: 1px solid var(--ar-red);
  border-radius: 3px;
  background: rgba(255, 0, 51, 0.08);
  box-shadow: 0 0 22px rgba(255, 0, 51, 0.18), inset 0 0 18px rgba(255, 0, 51, 0.08);
}
.icon {
  flex: none;
  width: 70px;
  height: 70px;
  display: grid;
  place-items: center;
  background: var(--ar-red);
  color: #12000a;
  border-radius: 2px;
}
.body {
  min-width: 0;
  display: flex;
  flex-direction: column;
  padding: 3px 4px 4px 0;
}
.label {
  align-self: stretch;
  padding: 2px 7px;
  background: var(--ar-red);
  color: #12000a;
  border-radius: 2px;
  font: 800 11px/1.25 var(--font-display);
  font-stretch: 88%;
  letter-spacing: -0.01em;
  text-transform: uppercase;
}
.jp {
  margin-top: 3px;
  font: 600 8px/1 var(--font-mono);
  color: rgba(255, 0, 51, 0.75);
  letter-spacing: 0.08em;
}
.msg {
  margin: 5px 0 0;
  color: #fff;
  font: 800 13px/1.08 var(--font-display);
  font-stretch: 88%;
  letter-spacing: -0.01em;
}
.credit {
  margin-top: 4px;
  font: 500 9px/1.2 var(--font-mono);
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 0.02em;
}
.line {
  display: block;
  overflow: hidden;
}
.line-in {
  display: block;
  transform: translateY(105%);
  animation: line-up 340ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes line-up {
  to {
    transform: translateY(0);
  }
}

/* enter: from +10px / opacity 0, 0.3s expo.out. exit faster. */
.note-enter-active {
  transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1), opacity 300ms cubic-bezier(0.16, 1, 0.3, 1);
}
.note-leave-active {
  transition: transform 200ms cubic-bezier(0.23, 1, 0.32, 1), opacity 200ms cubic-bezier(0.23, 1, 0.32, 1);
}
.note-enter-from,
.note-leave-to {
  opacity: 0;
  transform: translateX(10px);
}

@media (max-width: 640px) {
  .note-slot {
    top: 44px;
    right: 16px;
    width: min(260px, calc(100vw - 32px));
  }
}
@media (prefers-reduced-motion: reduce) {
  .note-enter-from,
  .note-leave-to {
    transform: none;
  }
  .line-in {
    animation: none;
    transform: none;
  }
}
</style>
