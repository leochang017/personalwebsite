<script setup lang="ts">
/** Number that counts up from 0 the first time it scrolls into view. */
import { onMounted, onUnmounted, ref } from "vue";
import { gsap, reducedMotion } from "../lib/motion";

const props = withDefaults(defineProps<{ to: number; suffix?: string; duration?: number }>(), { suffix: "", duration: 1.6 });
const el = ref<HTMLElement | null>(null);
const shown = ref(reducedMotion ? props.to : 0);
let tw: gsap.core.Tween | null = null;

onMounted(() => {
  if (!el.value || reducedMotion) return;
  const o = { v: 0 };
  tw = gsap.to(o, {
    v: props.to,
    duration: props.duration,
    ease: "power2.out",
    onUpdate: () => {
      shown.value = Math.round(o.v);
    },
    scrollTrigger: { trigger: el.value, start: "top 92%", once: true },
  });
});
onUnmounted(() => {
  tw?.scrollTrigger?.kill();
  tw?.kill();
});
</script>

<template>
  <span ref="el" class="count" :aria-label="`${to}${suffix}`"><span aria-hidden="true">{{ shown }}{{ suffix }}</span></span>
</template>

<style scoped>
.count {
  font-variant-numeric: tabular-nums;
}
</style>
