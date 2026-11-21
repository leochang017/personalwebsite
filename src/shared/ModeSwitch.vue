<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useModeStore } from "../stores/mode";
const store = useModeStore();
const { mode, switching } = storeToRefs(store);
</script>

<template>
  <button
    class="mode-switch"
    :class="mode"
    :disabled="switching"
    @click="store.toggle()"
  >
    <span class="dot" />
    <span class="v">{{ mode === "editorial" ? "Change to Arcade Mode" : "Change to Professional Mode" }}</span>
    <span class="arrow">⇄</span>
  </button>
</template>

<style scoped>
.mode-switch {
  position: fixed;
  left: calc(20px + env(safe-area-inset-left));
  bottom: calc(20px + env(safe-area-inset-bottom));
  z-index: 9000;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 9px 14px 9px 12px;
  border-radius: 999px;
  border: 1px solid;
  font: 500 12px/1 var(--font-body);
  letter-spacing: 0.02em;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s, color 0.3s, border-color 0.3s;
}
.mode-switch:hover { transform: translateY(-2px); }
.mode-switch:active { transform: scale(0.97); }
.mode-switch:disabled { opacity: 0.6; cursor: default; }
.dot { width: 8px; height: 8px; border-radius: 50%; background: currentColor; }
.v { font-size: 12px; font-weight: 600; white-space: nowrap; }
.arrow { opacity: 0.7; font-size: 14px; }

/* same corner in both modes (bottom-left); the editorial footer leaves room for it */
.mode-switch.editorial {
  background: rgba(247, 247, 247, 0.85);
  color: #022016;
  border-color: rgba(2, 32, 22, 0.25);
}
.mode-switch.arcade {
  background: rgba(10, 0, 4, 0.75);
  color: #ff0033;
  border-color: rgba(255, 0, 51, 0.5);
  font-family: var(--font-mono);
  box-shadow: 0 0 18px rgba(255, 0, 51, 0.25);
}
.mode-switch.arcade .dot { box-shadow: 0 0 8px #ff0033; }

/* phones: the label is long, so tighten the pill to stay clear of the corner controls */
@media (max-width: 480px) {
  .mode-switch {
    left: calc(12px + env(safe-area-inset-left));
    gap: 8px;
    padding: 9px 12px 9px 10px;
    letter-spacing: 0;
  }
  .v { font-size: 11px; }
  .arrow { display: none; }
}
</style>
