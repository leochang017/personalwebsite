<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import { storeToRefs } from "pinia";
import { useModeStore } from "./stores/mode";
import ModeSwitch from "./shared/ModeSwitch.vue";

const EditorialApp = defineAsyncComponent(() => import("./modes/editorial/EditorialApp.vue"));
const ArcadeApp = defineAsyncComponent(() => import("./modes/arcade/ArcadeApp.vue"));

const store = useModeStore();
const { mode, switching } = storeToRefs(store);
</script>

<template>
  <!-- One mode mounted at a time. The router drives pages inside each mode. -->
  <EditorialApp v-if="mode === 'editorial'" key="editorial" />
  <ArcadeApp v-else key="arcade" />
  <ModeSwitch />
  <div class="mode-veil" :class="{ on: switching }" aria-hidden="true" />
</template>

<style>
.mode-veil {
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: #000;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.45s ease;
}
.mode-veil.on {
  opacity: 1;
  pointer-events: auto;
}
</style>
