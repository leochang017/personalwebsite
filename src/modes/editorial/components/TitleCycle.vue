<script setup lang="ts">
/**
 * Giant uppercase title that cycles between line sets every `interval` ms.
 * Each change is a per-line crossfade + slide (old lines up 20px and out,
 * new lines in from 20px below; 0.6s expo.out, 0.08s stagger) with no 3D
 * transforms, so no in-between frame ever looks garbled. Only the visible
 * set is exposed to assistive tech. Static under prefers-reduced-motion.
 */
import { onMounted, onUnmounted, ref } from "vue";
import { gsap, reducedMotion } from "../lib/motion";
import { revealOnce } from "../lib/reveal";

const props = withDefaults(
  defineProps<{
    sets: string[][];
    interval?: number;
    align?: "center" | "left";
    revealOnView?: boolean;
  }>(),
  { interval: 4000, align: "center", revealOnView: true },
);

const root = ref<HTMLElement | null>(null);
const current = ref(0);

let tl: gsap.core.Timeline | null = null;
let call: gsap.core.Tween | null = null;
let io: IntersectionObserver | null = null;
let stopReveal: (() => void) | null = null;
let inView = false;

function linesOf(i: number): HTMLElement[] {
  if (!root.value) return [];
  return Array.from(root.value.querySelectorAll<HTMLElement>(`.tc-set[data-i="${i}"] .tc-line`));
}

function schedule() {
  call?.kill();
  if (props.sets.length < 2 || reducedMotion) return;
  call = gsap.delayedCall(props.interval / 1000, () => {
    if (inView && !document.hidden) flip();
    else schedule();
  });
}

function flip() {
  const from = current.value;
  const to = (from + 1) % props.sets.length;
  tl?.kill();
  tl = gsap.timeline({ onComplete: schedule });
  tl.to(linesOf(from), { y: -20, autoAlpha: 0, duration: 0.6, ease: "expo.out", stagger: 0.08 }, 0).fromTo(
    linesOf(to),
    { y: 20, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, duration: 0.6, ease: "expo.out", stagger: 0.08 },
    0.12,
  );
  current.value = to;
}

onMounted(() => {
  if (!root.value) return;
  props.sets.forEach((_, i) => {
    if (i > 0) gsap.set(linesOf(i), { autoAlpha: 0 });
  });
  if (reducedMotion) return;

  io = new IntersectionObserver(([e]) => {
    inView = e.isIntersecting;
  });
  io.observe(root.value);

  if (props.revealOnView) {
    const first = linesOf(0);
    const intro = gsap.fromTo(
      first,
      { y: 20, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.9, ease: "expo.out", stagger: 0.08, paused: true, onComplete: schedule },
    );
    stopReveal = revealOnce(root.value, () => intro.play(), () => {
      if (intro.progress() < 1) intro.progress(1);
    });
  } else {
    schedule();
  }
});

onUnmounted(() => {
  tl?.kill();
  call?.kill();
  io?.disconnect();
  stopReveal?.();
});
</script>

<template>
  <div ref="root" class="tc" :class="`a-${align}`">
    <div v-for="(set, i) in sets" :key="i" class="tc-set" :data-i="i" :aria-hidden="i !== current">
      <span v-for="(line, li) in set" :key="li" class="tc-line">{{ line }}</span>
    </div>
  </div>
</template>

<style scoped>
.tc {
  position: relative;
  display: grid;
  font-family: var(--font-title);
  font-variation-settings: "wght" 622;
  font-stretch: 92%;
  text-transform: uppercase;
  line-height: 0.92;
  letter-spacing: -0.01em;
}
.tc-set {
  grid-area: 1 / 1;
  display: flex;
  flex-direction: column;
}
.a-center .tc-set {
  align-items: center;
  text-align: center;
}
.a-left .tc-set {
  align-items: flex-start;
}
.tc-line {
  display: block;
  white-space: nowrap;
  will-change: transform, opacity;
}
@media (max-width: 799px) {
  .tc-line {
    white-space: normal;
  }
}
</style>
