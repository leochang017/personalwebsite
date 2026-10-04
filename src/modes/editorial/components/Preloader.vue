<script setup lang="ts">
/**
 * First-visit preloader (once per session). No text: just the picture.
 * 1. a rounded card tilted -6deg scales 0.6 -> 1 at the centre, showing the
 *    hero video's exact first frame (public/video/hero-hd-poster.jpg)
 * 2. the card straightens and its clip opens to the full viewport
 * 3. the whole layer cross-dissolves into the hero, which is holding that
 *    same first frame and only starts playing once this emits "done"
 */
import { onMounted, onUnmounted, ref } from "vue";
import { person } from "../../../content/leo";
import { gsap, reducedMotion } from "../lib/motion";

const emit = defineEmits<{ done: [] }>();

const root = ref<HTMLElement | null>(null);
const card = ref<HTMLElement | null>(null);
const img = ref<HTMLImageElement | null>(null);
const mark = ref<HTMLElement | null>(null);

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
  if (!el || !card.value || !img.value || !mark.value) {
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
  tl = gsap.timeline({ onComplete: () => emit("done") });
  tl.fromTo(card.value, { scale: 0.6, rotation: -6, autoAlpha: 0 }, { scale: 1, rotation: -6, autoAlpha: 1, duration: 0.95, ease: "expo.out" }, 0.45)
    .fromTo(mark.value, { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.75)
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
    <div ref="card" class="card">
      <img ref="img" :src="person.heroPoster" alt="" decoding="async" />
      <div class="fade" aria-hidden="true" />
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
.card {
  position: absolute;
  inset: 0;
  will-change: transform, clip-path;
}
.card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
/* identical to HeroVideo's bottom gradient so the dissolve has nothing to change */
.card .fade {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 30%;
  background: linear-gradient(180deg, rgba(2, 32, 22, 0) 0%, rgba(2, 32, 22, 0.35) 100%);
  pointer-events: none;
}
.mark {
  position: absolute;
  left: 50%;
  top: calc(50% + min(400px, 62vw) * 0.4125 + 18px);
  width: 18px;
  height: 18px;
  margin-left: -9px;
}
</style>
