<script setup lang="ts">
/**
 * First-visit preloader (once per session).
 * 1. name / tagline / status row fades in at mid-height with a counter
 * 2. a rounded card tilted -6deg scales 0.6 -> 1 at the centre
 * 3. the card straightens and its clip opens to the full viewport
 * 4. the whole layer cross-dissolves into the hero
 */
import { onMounted, onUnmounted, ref } from "vue";
import { person } from "../../../content/leo";
import { gsap, reducedMotion } from "../lib/motion";

const emit = defineEmits<{ done: [] }>();

const root = ref<HTMLElement | null>(null);
const row = ref<HTMLElement | null>(null);
const card = ref<HTMLElement | null>(null);
const img = ref<HTMLImageElement | null>(null);
const mark = ref<HTMLElement | null>(null);
const count = ref(0);

let tl: gsap.core.Timeline | null = null;

function cardInset() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const w = Math.min(400, vw * 0.62);
  const h = w * (330 / 400);
  const x = (vw - w) / 2;
  const y = (vh - h) / 2;
  return { top: y, right: x, bottom: y, left: x, r: Math.min(40, w * 0.1) };
}

onMounted(() => {
  const el = root.value;
  if (!el || !card.value || !row.value || !img.value || !mark.value) {
    emit("done");
    return;
  }
  if (reducedMotion) {
    tl = gsap.timeline({ onComplete: () => emit("done") });
    tl.to(el, { autoAlpha: 0, duration: 0.4, delay: 0.2 });
    return;
  }

  const c = cardInset();
  const clip = (t: number, r: number, b: number, l: number, rad: number) =>
    `inset(${t}px ${r}px ${b}px ${l}px round ${rad}px)`;
  const state = { t: c.top, r: c.right, b: c.bottom, l: c.left, rad: c.r };
  const applyClip = () => {
    if (card.value) card.value.style.clipPath = clip(state.t, state.r, state.b, state.l, state.rad);
  };
  applyClip();
  const counter = { v: 0 };

  tl = gsap.timeline({ onComplete: () => emit("done") });
  tl.fromTo(Array.from(row.value.children), { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.06, ease: "power2.out" })
    .to(counter, {
      v: 100,
      duration: 1.9,
      ease: "power1.inOut",
      onUpdate: () => {
        count.value = Math.round(counter.v);
      },
    }, 0.1)
    .fromTo(card.value, { scale: 0.6, rotation: -6, autoAlpha: 0 }, { scale: 1, rotation: -6, autoAlpha: 1, duration: 0.95, ease: "expo.out" }, 0.45)
    .fromTo(mark.value, { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.75)
    .to(Array.from(row.value.children), { autoAlpha: 0, duration: 0.45, ease: "power2.out", stagger: 0.03 }, 1.6)
    .to(mark.value, { autoAlpha: 0, duration: 0.3 }, 1.6)
    // straighten + open to the full viewport
    .to(card.value, { rotation: 0, duration: 1.15, ease: "expo.inOut" }, 1.75)
    .to(state, { t: 0, r: 0, b: 0, l: 0, rad: 0, duration: 1.15, ease: "expo.inOut", onUpdate: applyClip }, 1.75)
    .fromTo(img.value, { scale: 1.28 }, { scale: 1, duration: 1.4, ease: "expo.inOut" }, 1.7)
    // cross-dissolve into the hero
    .to(el, { autoAlpha: 0, duration: 0.75, ease: "power2.inOut" }, 2.95);
});

onUnmounted(() => {
  tl?.kill();
});
</script>

<template>
  <div ref="root" class="preloader" aria-hidden="true">
    <div ref="row" class="row">
      <span class="c1">{{ person.name }}</span>
      <span class="c2">{{ person.tagline }}</span>
      <span class="c3"><i class="spin" /> Folding the crane <b>{{ count }}%</b></span>
    </div>
    <div ref="card" class="card">
      <img ref="img" :src="person.heroPoster" alt="" decoding="async" />
    </div>
    <img ref="mark" class="mark" src="/images/dumpling.svg" alt="" />
  </div>
</template>

<style scoped>
.preloader {
  position: fixed;
  inset: 0;
  z-index: 400;
  background: var(--ed-bg);
  overflow: hidden;
}
.row {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  font: 400 clamp(12px, 0.97vw, 28px) / 1.2 var(--font-body);
  color: rgba(2, 32, 22, 0.32);
}
.row > span {
  position: absolute;
  top: 0;
  white-space: nowrap;
}
.c1 {
  left: var(--pad-x);
}
.c2 {
  left: 17.8vw;
}
.c3 {
  left: 66.6vw;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.c3 b {
  font-weight: 400;
  font-variant-numeric: tabular-nums;
}
.spin {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  border: 1px solid currentColor;
  border-right-color: transparent;
  animation: spin 0.9s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.card {
  position: absolute;
  inset: 0;
  will-change: transform, clip-path;
}
.card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.9) sepia(0.08);
}
.mark {
  position: absolute;
  left: 50%;
  top: calc(50% + min(400px, 62vw) * 0.4125 + 18px);
  width: 18px;
  height: 18px;
  margin-left: -9px;
}
@media (max-width: 799px) {
  .c2,
  .c3 {
    display: none !important;
  }
}
</style>
