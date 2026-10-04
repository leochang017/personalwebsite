<script setup lang="ts">
/** Full-screen green credits panel that slides up; Esc or × closes it. */
import { nextTick, onUnmounted, ref, watch } from "vue";
import { ui } from "../lib/state";
import { gsap, reducedMotion } from "../lib/motion";
import { startScroll, stopScroll } from "../lib/lenis";
import { currentTrack as musicCredit, musicHost } from "../lib/audio";
import { sfx } from "../lib/sfx";

const panel = ref<HTMLElement | null>(null);
const closeBtn = ref<HTMLButtonElement | null>(null);
const visible = ref(false);
let tl: gsap.core.Timeline | null = null;

function onKey(e: KeyboardEvent) {
  if (e.key === "Escape") close();
  if (e.key === "Tab" && panel.value) {
    // keep focus inside the dialog
    const f = panel.value.querySelectorAll<HTMLElement>("button, a[href]");
    if (!f.length) return;
    const first = f[0];
    const last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
}

function open() {
  visible.value = true;
  sfx("open");
  stopScroll();
  window.addEventListener("keydown", onKey);
  nextTick(() => {
    if (!panel.value) return;
    closeBtn.value?.focus();
    tl?.kill();
    const items = Array.from(panel.value.querySelectorAll(".in"));
    if (reducedMotion) {
      tl = gsap.timeline().fromTo(panel.value, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 });
      return;
    }
    tl = gsap
      .timeline()
      .fromTo(panel.value, { yPercent: 100, autoAlpha: 1 }, { yPercent: 0, duration: 0.9, ease: "expo.out" })
      .fromTo(items, { yPercent: 40, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.9, ease: "expo.out", stagger: 0.07 }, 0.2);
  });
}

function close() {
  if (!ui.creditsOpen) return;
  sfx("close");
  window.removeEventListener("keydown", onKey);
  tl?.kill();
  const done = () => {
    visible.value = false;
    ui.creditsOpen = false;
    startScroll();
  };
  if (!panel.value) return done();
  tl = reducedMotion
    ? gsap.timeline({ onComplete: done }).to(panel.value, { autoAlpha: 0, duration: 0.2 })
    : gsap.timeline({ onComplete: done }).to(panel.value, { yPercent: 100, duration: 0.6, ease: "expo.inOut" });
}

watch(
  () => ui.creditsOpen,
  (o) => {
    if (o && !visible.value) open();
  },
);

onUnmounted(() => {
  window.removeEventListener("keydown", onKey);
  tl?.kill();
});
</script>

<template>
  <div
    v-if="visible"
    ref="panel"
    class="credits"
    role="dialog"
    aria-modal="true"
    aria-labelledby="credits-title"
    data-cursor=""
  >
    <button ref="closeBtn" class="close" type="button" aria-label="Close credits" @click="close">×</button>
    <div class="inner">
      <h2 id="credits-title" class="in head"><span class="star">*</span> About this portfolio</h2>
      <p class="in">
        Built as a study of two sites I admire. The editorial mode borrows its rhythm from Léo Parpeix's portfolio; the
          arcade mode borrows its camera, controls and CRT look from Samsy's, with the hall itself (paper lanterns, Chinese
          and Latin signs, a fencing piste, a chessboard) redrawn as my own. Everything on it is my own content.
      </p>
      <p class="in">
        Made with Vue 3, Three.js, GSAP and Lenis. The paper crane that follows your cursor, the dumpling and the whole
          arcade hall are built from primitives in code, with no downloaded models.
      </p>
      <p class="in music">
        Music: "<a :href="musicCredit.url" target="_blank" rel="noopener">{{ musicCredit.title }}</a>" by {{ musicCredit.artist }}
        ({{ musicHost }}), {{ musicCredit.license }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.credits {
  position: fixed;
  inset: 0;
  z-index: 300;
  background: var(--ed-green);
  color: var(--ed-pink);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px var(--pad-x);
  overflow: auto;
}
.close {
  position: absolute;
  top: calc(2.86rem - 22px);
  right: var(--pad-x);
  width: 44px;
  height: 44px;
  font: 300 34px/1 var(--font-body);
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
}
@media (hover: hover) and (pointer: fine) {
  .close:hover {
    transform: rotate(90deg);
  }
}
.close:active {
  transform: scale(0.94);
}
.close:focus-visible {
  outline: 1px solid currentColor;
  outline-offset: 2px;
}
.inner {
  width: min(42vw, 760px);
  display: flex;
  flex-direction: column;
  gap: 1.4em;
  font: 400 clamp(16px, 1.39vw, 36px) / 1.3 var(--font-body);
}
.head {
  margin: 0 0 0.6em;
  font: inherit;
  font-family: var(--font-title);
  font-variation-settings: "wght" 622;
  font-stretch: 92%;
  text-transform: uppercase;
  font-size: clamp(24px, 2.36vw, 68px);
  line-height: 1;
}
.star {
  font-family: var(--font-body);
  margin-right: 0.3em;
}
.inner p {
  margin: 0;
}
.music {
  font-size: 0.8em;
  opacity: 0.8;
}
.music a {
  text-decoration: underline;
  text-underline-offset: 4px;
}
@media (max-width: 799px) {
  .inner {
    width: 100%;
  }
}
</style>
