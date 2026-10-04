<script setup lang="ts">
/**
 * Line-by-line clip-mask reveal: each rendered line slides up from beneath
 * its own overflow mask (cubic-bezier(.6,0,.25,1), 0.06s stagger).
 * Pass `lines` for explicit line breaks, or `text` to measure lines.
 * trigger="view" reveals when it enters the viewport (IntersectionObserver,
 * with a 2s safety net that forces the final state); trigger="intro" waits
 * for the preloader to finish. The hidden start state is only ever applied
 * by JS after mount, so the text is readable without JS.
 */
import { nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { splitLines, type SplitLinesResult } from "../lib/splitText";
import { EASE_REVEAL, gsap, reducedMotion } from "../lib/motion";
import { ui } from "../lib/state";
import { revealOnce } from "../lib/reveal";

const props = withDefaults(
  defineProps<{
    tag?: string;
    text?: string;
    lines?: string[];
    trigger?: "view" | "intro" | "manual";
    stagger?: number;
    duration?: number;
    delay?: number;
  }>(),
  { tag: "p", trigger: "view", stagger: 0.06, duration: 1.1, delay: 0 },
);

const el = ref<HTMLElement | null>(null);
let split: SplitLinesResult | null = null;
let tween: gsap.core.Tween | null = null;
let done = false;
let lastWidth = 0;
let stopWatch: (() => void) | null = null;
let safety = 0;

function finish() {
  if (!done) tween?.progress(1);
}

function targets(): HTMLElement[] {
  if (!el.value) return [];
  if (props.lines) return Array.from(el.value.querySelectorAll<HTMLElement>(".rt-line"));
  return split?.lines ?? [];
}

function build() {
  if (!el.value || reducedMotion) return;
  if (!props.lines) split = splitLines(el.value);
  const t = targets();
  gsap.set(t, { yPercent: 110 });
  const vars: gsap.TweenVars = {
    yPercent: 0,
    duration: props.duration,
    ease: EASE_REVEAL,
    stagger: props.stagger,
    delay: props.delay,
    paused: true,
    onComplete: () => {
      done = true;
    },
  };
  tween = gsap.to(t, vars);
  if (props.trigger === "view") {
    stopWatch?.();
    stopWatch = revealOnce(el.value, () => tween?.play(), finish, { safetyMs: 2000 + props.delay * 1000 });
  }
  if (props.trigger === "intro" && ui.introDone) playIntro();
}

function playIntro() {
  tween?.play();
  window.clearTimeout(safety);
  safety = window.setTimeout(finish, 2000 + props.delay * 1000);
}

/** Play manually (trigger="manual"). */
function play(delay = 0) {
  if (!tween) return;
  tween.delay(delay);
  tween.play();
}

function onResize() {
  if (!el.value || props.lines) return;
  const w = el.value.clientWidth;
  if (Math.abs(w - lastWidth) < 2) return;
  lastWidth = w;
  if (done) {
    // revealed already: drop the masks, the text reflows naturally
    split?.revert();
    split = null;
    return;
  }
  stopWatch?.();
  tween?.kill();
  split?.revert();
  split = null;
  build();
}

watch(
  () => ui.introDone,
  (v) => {
    if (v && props.trigger === "intro") playIntro();
  },
);

onMounted(async () => {
  await nextTick();
  try {
    await document.fonts.ready;
  } catch {
    /* fonts API unavailable */
  }
  if (!el.value) return;
  lastWidth = el.value.clientWidth;
  build();
  window.addEventListener("resize", onResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", onResize);
  stopWatch?.();
  window.clearTimeout(safety);
  tween?.kill();
});

defineExpose({ play });
</script>

<template>
  <component :is="tag" ref="el" class="rt">
    <template v-if="lines">
      <span v-for="(l, i) in lines" :key="i" class="rt-mask"><span class="rt-line">{{ l }}</span></span>
    </template>
    <template v-else>{{ text }}</template>
  </component>
</template>

<style scoped>
.rt-mask {
  display: block;
  overflow: hidden;
  padding-bottom: 0.15em;
  margin-bottom: -0.15em;
}
.rt-line {
  display: block;
  will-change: transform;
}
</style>
