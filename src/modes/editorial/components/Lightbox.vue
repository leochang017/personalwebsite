<script setup lang="ts">
/**
 * Full-screen photo lightbox. One item: a single centred image on a white
 * bordered panel. Several items: a horizontal snap-scrolling strip with
 * prev/next buttons, a counter, arrow keys and wheel-to-horizontal.
 * Esc / backdrop / × close; focus is trapped; page scroll is locked.
 */
import { computed, nextTick, onUnmounted, ref, watch } from "vue";
import { gsap, reducedMotion } from "../lib/motion";
import { startScroll, stopScroll } from "../lib/lenis";
import { ui } from "../lib/state";
import type { LightboxItem } from "../lib/types";
import { sfx } from "../lib/sfx";

const props = defineProps<{ open: boolean; title: string; items: LightboxItem[] }>();
const emit = defineEmits<{ close: [] }>();

const visible = ref(false);
const root = ref<HTMLElement | null>(null);
const strip = ref<HTMLElement | null>(null);
const closeBtn = ref<HTMLButtonElement | null>(null);
const index = ref(0);
const isGallery = computed(() => props.items.length > 1);
const counter = computed(() => `${String(index.value + 1).padStart(2, "0")} / ${String(props.items.length).padStart(2, "0")}`);

let returnFocus: HTMLElement | null = null;
let tl: gsap.core.Timeline | null = null;
let wheelLock = 0;

function panels(): HTMLElement[] {
  return Array.from(strip.value?.querySelectorAll<HTMLElement>(".panel") ?? []);
}

function go(i: number) {
  const list = panels();
  const n = Math.max(0, Math.min(list.length - 1, i));
  const el = list[n];
  if (!el || !strip.value) return;
  const left = el.offsetLeft - (strip.value.clientWidth - el.offsetWidth) / 2;
  strip.value.scrollTo({ left, behavior: reducedMotion ? "auto" : "smooth" });
  if (n !== index.value) sfx("photoNext");
  index.value = n;
}

function onStripScroll() {
  const s = strip.value;
  if (!s) return;
  const mid = s.scrollLeft + s.clientWidth / 2;
  let best = 0;
  let dist = Infinity;
  panels().forEach((p, i) => {
    const d = Math.abs(p.offsetLeft + p.offsetWidth / 2 - mid);
    if (d < dist) {
      dist = d;
      best = i;
    }
  });
  index.value = best;
}

/** vertical wheel moves one photo at a time; native horizontal scroll is left alone */
function onWheel(e: WheelEvent) {
  if (Math.abs(e.deltaX) >= Math.abs(e.deltaY)) return;
  e.preventDefault();
  const now = performance.now();
  if (now < wheelLock || Math.abs(e.deltaY) < 4) return;
  wheelLock = now + 380;
  go(index.value + (e.deltaY > 0 ? 1 : -1));
}

function onKey(e: KeyboardEvent) {
  if (e.key === "Escape") {
    e.preventDefault();
    emit("close");
    return;
  }
  if (isGallery.value && (e.key === "ArrowRight" || e.key === "ArrowLeft")) {
    e.preventDefault();
    go(index.value + (e.key === "ArrowRight" ? 1 : -1));
    return;
  }
  if (e.key === "Tab" && root.value) {
    const f = Array.from(root.value.querySelectorAll<HTMLElement>("button:not([disabled])"));
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

function show() {
  returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  visible.value = true;
  sfx("open");
  index.value = 0;
  ui.lightboxOpen = true;
  stopScroll();
  window.addEventListener("keydown", onKey);
  nextTick(() => {
    closeBtn.value?.focus();
    strip.value?.addEventListener("wheel", onWheel, { passive: false });
    if (!root.value) return;
    tl?.kill();
    const stage = root.value.querySelector(".stage");
    if (reducedMotion) {
      tl = gsap.timeline().fromTo(root.value, { opacity: 0 }, { opacity: 1, duration: 0.2 });
      return;
    }
    tl = gsap
      .timeline()
      .fromTo(root.value, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "expo.out" })
      .fromTo(
        stage,
        isGallery.value ? { x: 40, opacity: 0 } : { scale: 0.96, opacity: 0 },
        isGallery.value ? { x: 0, opacity: 1, duration: 0.6, ease: "expo.out" } : { scale: 1, opacity: 1, duration: 0.35, ease: "expo.out" },
        0,
      );
  });
}

function hide() {
  sfx("close");
  window.removeEventListener("keydown", onKey);
  strip.value?.removeEventListener("wheel", onWheel);
  const finish = () => {
    visible.value = false;
    ui.lightboxOpen = false;
    startScroll();
    returnFocus?.focus();
  };
  if (!root.value || reducedMotion) return finish();
  tl?.kill();
  const stage = root.value.querySelector(".stage");
  tl = gsap
    .timeline({ onComplete: finish })
    .to(stage, { scale: 0.96, opacity: 0, duration: 0.25, ease: "expo.out" }, 0)
    .to(root.value, { opacity: 0, duration: 0.3, ease: "expo.out" }, 0);
}

watch(
  () => props.open,
  (o) => {
    if (o && !visible.value) show();
    else if (!o && visible.value) hide();
  },
);

onUnmounted(() => {
  window.removeEventListener("keydown", onKey);
  tl?.kill();
  if (visible.value) {
    ui.lightboxOpen = false;
    startScroll();
  }
});
</script>

<template>
  <Teleport to="body">
    <div
      v-if="visible"
      ref="root"
      class="lb"
      role="dialog"
      aria-modal="true"
      :aria-label="title"
      data-lenis-prevent
      data-no-feed
      @click.self="emit('close')"
    >
      <p v-if="isGallery" class="counter" aria-live="polite">{{ counter }}</p>
      <button ref="closeBtn" class="x" type="button" aria-label="Close" @click="emit('close')">×</button>

      <figure v-if="!isGallery && items[0]" class="stage single" @click.self="emit('close')">
        <h2 class="title">{{ title }}</h2>
        <div class="frame">
          <img :src="items[0].src" :alt="items[0].caption" decoding="async" />
        </div>
        <figcaption class="cap">{{ items[0].caption }}</figcaption>
      </figure>

      <div v-else class="stage gallery">
        <h2 class="title">{{ title }}</h2>
        <div ref="strip" class="strip" tabindex="-1" @scroll.passive="onStripScroll">
          <figure v-for="(it, i) in items" :key="it.src" class="panel">
            <img :src="it.src" :alt="it.caption" :loading="i < 3 ? 'eager' : 'lazy'" decoding="async" />
            <figcaption class="cap">{{ it.caption }}</figcaption>
          </figure>
        </div>
        <div class="nav">
          <button class="arrow" type="button" aria-label="Previous photo" :disabled="index === 0" @click="go(index - 1)">←</button>
          <button class="arrow" type="button" aria-label="Next photo" :disabled="index === items.length - 1" @click="go(index + 1)">→</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.lb {
  position: fixed;
  inset: 0;
  z-index: 9500;
  background: rgba(2, 32, 22, 0.92);
  color: var(--ed-bg);
  display: grid;
  place-items: center;
  font-family: var(--font-body);
}
.x {
  position: absolute;
  z-index: 5; /* above the scrolling strip, which otherwise covers the corner on the last photo */
  top: 18px;
  right: 22px;
  width: 44px;
  height: 44px;
  font: 300 34px/1 var(--font-body);
  color: var(--ed-bg);
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
}
@media (hover: hover) and (pointer: fine) {
  .x:hover {
    transform: rotate(90deg);
  }
}
.counter {
  position: absolute;
  z-index: 5;
  top: 30px;
  left: 28px;
  margin: 0;
  font: 500 13px/1 var(--font-mono);
  letter-spacing: 0.06em;
}
.title {
  margin: 0 0 16px;
  font-family: var(--font-title);
  font-variation-settings: "wght" 622;
  font-stretch: 92%;
  font-weight: 400;
  font-size: 24px;
  line-height: 1.1;
  text-transform: uppercase;
  text-align: center;
}
.stage.single {
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 90vw;
}
.frame {
  background: #fff;
  border: 1px solid var(--ed-bg);
  line-height: 0;
}
.frame img {
  display: block;
  max-width: 90vw;
  max-height: min(86vh, calc(100vh - 150px));
  width: auto;
  height: auto;
  object-fit: contain;
}
.cap {
  margin-top: 10px;
  font: 400 13px/1.4 var(--font-body);
  color: rgba(247, 247, 247, 0.65);
  text-align: center;
}
.stage.gallery {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.strip {
  width: 100%;
  display: flex;
  gap: 24px;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  overscroll-behavior: contain;
  padding: 0 10vw 8px;
  scrollbar-width: thin;
  outline: none;
}
.panel {
  flex: none;
  margin: 0;
  scroll-snap-align: center;
}
.panel img {
  display: block;
  height: 70vh;
  width: auto;
  max-width: 80vw;
  object-fit: contain;
  background: #fff;
  border: 1px solid var(--ed-bg);
}
.nav {
  display: flex;
  gap: 12px;
  margin-top: 18px;
}
.arrow {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid var(--ed-bg);
  color: var(--ed-bg);
  font: 400 18px/1 var(--font-body);
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    opacity 0.2s ease,
    transform 0.16s ease-out;
}
@media (hover: hover) and (pointer: fine) {
  .arrow:not(:disabled):hover {
    background: var(--ed-bg);
    color: var(--ed-ink);
  }
}
.arrow:active:not(:disabled) {
  transform: scale(0.96);
}
.arrow:disabled {
  opacity: 0.3;
  cursor: default;
}
.x:focus-visible,
.arrow:focus-visible {
  outline: 1px solid var(--ed-bg);
  outline-offset: 3px;
}
@media (max-width: 799px) {
  .panel img {
    height: 56vh;
  }
  .strip {
    padding: 0 6vw 8px;
    gap: 12px;
  }
}
</style>
