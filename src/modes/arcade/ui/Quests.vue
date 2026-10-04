<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useArcadeStore } from "../store";
import { LATIN, QUESTS } from "../content";
import { useFocusTrap, useHoverBlip } from "../context";

const store = useArcadeStore();
const { questsOpen, questDone, doneCount, allDone } = storeToRefs(store);
const hover = useHoverBlip();
const root = ref<HTMLElement | null>(null);
useFocusTrap(root, questsOpen, () => (store.questsOpen = false));
</script>

<template>
  <Transition name="pop">
    <div v-if="questsOpen" class="scrim" @pointerdown.self="store.questsOpen = false">
      <section
        id="arcade-quests"
        ref="root"
        class="quests"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quests-title"
      >
        <header>
          <h2 id="quests-title">Quests <span class="count">{{ doneCount }}/{{ QUESTS.length }}</span></h2>
          <button type="button" class="close" aria-label="Close quests" data-autofocus @click="store.questsOpen = false" @pointerenter="hover">✕</button>
        </header>
        <p class="jp" lang="la">{{ LATIN.quests }}</p>
        <ol>
          <li v-for="(q, i) in QUESTS" :key="q.id" :class="{ done: questDone[q.id] }">
            <span class="box" aria-hidden="true">
              <svg v-if="questDone[q.id]" viewBox="0 0 16 16" width="12" height="12">
                <path d="M2.5 8.5l3.5 3.5 7.5-8" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="square" />
              </svg>
            </span>
            <span class="num">{{ String(i + 1).padStart(2, "0") }}</span>
            <span class="text">{{ q.label }}</span>
            <span class="sr">{{ questDone[q.id] ? "(done)" : "(not done)" }}</span>
          </li>
        </ol>
        <p v-if="allDone" class="secret">Afterparty unlocked.</p>
      </section>
    </div>
  </Transition>
</template>

<style scoped>
.scrim {
  position: fixed;
  inset: 0;
  z-index: 55;
}
.quests {
  position: absolute;
  top: 62px;
  left: 20px;
  width: min(340px, calc(100vw - 40px));
  padding: 14px 16px 16px;
  background: rgba(0, 0, 0, 0.92);
  border: 1px solid var(--ar-red);
  border-radius: 3px;
  box-shadow: 0 0 30px rgba(255, 0, 51, 0.2);
  color: #fff;
  transform-origin: top left;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
h2 {
  margin: 0;
  font: 800 24px/1 var(--font-display);
  font-stretch: 88%;
  text-transform: uppercase;
  color: var(--ar-red);
  text-shadow: 0 0 12px rgba(255, 0, 51, 0.5);
}
.count {
  font: 500 12px/1 var(--font-mono);
  vertical-align: 4px;
  margin-left: 6px;
}
.close {
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  color: var(--ar-red);
  border: 1px solid rgba(255, 0, 51, 0.5);
  border-radius: 2px;
  cursor: pointer;
  transition: transform 140ms cubic-bezier(0.23, 1, 0.32, 1);
}
.close:active {
  transform: scale(0.95);
}
.close:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 2px;
}
.jp {
  margin: 4px 0 12px;
  font: 600 9px/1 var(--font-mono);
  color: rgba(255, 0, 51, 0.7);
  letter-spacing: 0.08em;
}
ol {
  list-style: none;
  margin: 0;
  padding: 0;
}
li {
  display: grid;
  grid-template-columns: 16px 22px 1fr;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
  border-top: 1px solid rgba(255, 0, 51, 0.18);
  font: 400 13px/1.35 var(--font-body);
  color: rgba(255, 255, 255, 0.78);
}
li.done {
  color: #fff;
}
li.done .text {
  text-decoration: line-through;
  text-decoration-color: rgba(255, 0, 51, 0.7);
}
.box {
  width: 16px;
  height: 16px;
  display: grid;
  place-items: center;
  border: 1px solid var(--ar-red);
  border-radius: 2px;
  color: #12000a;
}
li.done .box {
  background: var(--ar-red);
  box-shadow: 0 0 10px rgba(255, 0, 51, 0.7);
}
.num {
  font: 500 10px/1 var(--font-mono);
  color: var(--ar-red);
}
.sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
}
.secret {
  margin: 12px 0 0;
  font: 800 13px/1 var(--font-display);
  font-stretch: 88%;
  text-transform: uppercase;
  color: #ffc24a;
  text-shadow: 0 0 12px rgba(255, 194, 74, 0.6);
}

/* popover from the chip: scale from its top-left corner */
.pop-enter-active .quests {
  transition: transform 180ms cubic-bezier(0.23, 1, 0.32, 1), opacity 180ms cubic-bezier(0.23, 1, 0.32, 1);
}
.pop-leave-active .quests {
  transition: transform 130ms cubic-bezier(0.23, 1, 0.32, 1), opacity 130ms cubic-bezier(0.23, 1, 0.32, 1);
}
.pop-enter-active,
.pop-leave-active {
  transition: opacity 180ms;
}
.pop-enter-from .quests,
.pop-leave-to .quests {
  opacity: 0;
  transform: scale(0.96);
}
@media (prefers-reduced-motion: reduce) {
  .pop-enter-from .quests,
  .pop-leave-to .quests {
    transform: none;
  }
}
</style>
