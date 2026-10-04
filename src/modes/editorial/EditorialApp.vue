<script setup lang="ts">
/**
 * Editorial mode shell (leoparpeix.com study): preloader, navbar, Lenis,
 * page wipes between routes, the crane companion, cursor follower, footer,
 * credits and grain. Pages are chosen from the shared route name.
 */
import { computed, nextTick, onMounted, onUnmounted, ref, watch, type Component } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useModeStore } from "../../stores/mode";
import Navbar from "./components/Navbar.vue";
import Preloader from "./components/Preloader.vue";
import CursorFollower from "./components/CursorFollower.vue";
import CompanionLayer from "./components/CompanionLayer.vue";
import SiteFooter from "./components/SiteFooter.vue";
import CreditsModal from "./components/CreditsModal.vue";
import HomePage from "./pages/HomePage.vue";
import AboutPage from "./pages/AboutPage.vue";
import ProjectsPage from "./pages/ProjectsPage.vue";
import ExperiencePage from "./pages/ExperiencePage.vue";
import AchievementsPage from "./pages/AchievementsPage.vue";
import ChatWidget from "./components/ChatWidget.vue";
import { ui } from "./lib/state";
import { EASE_WIPE, ScrollTrigger, coarsePointer, gsap, reducedMotion } from "./lib/motion";
import { destroyLenis, initLenis, scrollToTarget, scrollToTop, startScroll, stopScroll } from "./lib/lenis";
import { disposeAudio, startAmbient, stopAmbient } from "./lib/audio";
import { disposeSfx, isSfxName, sfx, unlockSfx } from "./lib/sfx";

const route = useRoute();
const store = useModeStore();
const { soundOn, switching } = storeToRefs(store);

const pages: Record<string, Component> = {
  home: HomePage,
  projects: ProjectsPage,
  experience: ExperiencePage,
  achievements: AchievementsPage,
  about: AboutPage,
};
const pageKey = computed(() => (typeof route.name === "string" && route.name in pages ? route.name : "home"));
const page = computed(() => pages[pageKey.value]);

const wipe = ref<HTMLElement | null>(null);
const companionEnabled = !coarsePointer && !reducedMotion;

const PRELOAD_KEY = "ed.preloaded";
function alreadyPreloaded() {
  try {
    return sessionStorage.getItem(PRELOAD_KEY) === "1";
  } catch {
    return false;
  }
}
const showPreloader = ref(!alreadyPreloaded());

function onIntroDone() {
  showPreloader.value = false;
  try {
    sessionStorage.setItem(PRELOAD_KEY, "1");
  } catch {
    /* storage blocked */
  }
  ui.introDone = true;
  startScroll();
  ScrollTrigger.refresh();
}

/* ---------------- page transitions ---------------- */

function onLeave(el: Element, done: () => void) {
  const page = el as HTMLElement;
  ui.transitioning = true;
  stopScroll();
  // freeze scroll-driven animations of the outgoing page in their current state
  ScrollTrigger.getAll().forEach((t) => t.disable(false));
  // freeze the outgoing page where it is: the router resets scroll right away
  const y = window.scrollY;
  page.style.position = "fixed";
  page.style.top = `${-y}px`;
  page.style.left = "0";
  page.style.width = "100%";
  if (reducedMotion || !wipe.value) {
    gsap.to(page, { autoAlpha: 0, duration: 0.25, onComplete: done });
    return;
  }
  gsap
    .timeline({ onComplete: done })
    .to(page, { yPercent: -8 * (window.innerHeight / Math.max(page.offsetHeight, 1)), autoAlpha: 0.4, duration: 0.9, ease: EASE_WIPE }, 0)
    // y: 0 clears the stylesheet's translateY(100%), which GSAP would otherwise keep as a px offset under yPercent
    .fromTo(wipe.value, { yPercent: 100, y: 0 }, { yPercent: 0, y: 0, duration: 0.9, ease: EASE_WIPE }, 0);
}

function onEnter(el: Element, done: () => void) {
  const page = el as HTMLElement;
  scrollToTop();
  const finish = () => {
    gsap.set(page, { clearProps: "transform,opacity,visibility" });
    ui.transitioning = false;
    startScroll();
    ScrollTrigger.refresh();
    if (route.hash) nextTick(() => scrollToTarget(route.hash));
    done();
  };
  if (reducedMotion || !wipe.value) {
    gsap.fromTo(page, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, onComplete: finish });
    return;
  }
  gsap
    .timeline({ onComplete: finish })
    .fromTo(page, { y: () => window.innerHeight * 0.04 }, { y: 0, duration: 1.1, ease: "expo.out" }, 0.05)
    .fromTo(wipe.value, { yPercent: 0, y: 0 }, { yPercent: -100, y: 0, duration: 0.9, ease: EASE_WIPE }, 0);
}

// same-page hash links
watch(
  () => route.hash,
  (h) => {
    if (h && !ui.transitioning) scrollToTarget(h);
  },
);

/* ---------------- sound ---------------- */

watch(soundOn, (on) => {
  if (on) void startAmbient();
  else stopAmbient();
});

/* ---------------- interface sounds (data-sfx / data-sfx-hover) ---------------- */

function onSfxClick(e: MouseEvent) {
  const el = (e.target as Element | null)?.closest<HTMLElement>("[data-sfx]");
  const name = el?.dataset.sfx;
  if (isSfxName(name)) sfx(name);
}
let hoverEl: Element | null = null;
function onSfxOver(e: PointerEvent) {
  if (e.pointerType !== "mouse") return;
  const el = (e.target as Element | null)?.closest("[data-sfx-hover]") ?? null;
  if (el && el !== hoverEl) sfx("hover");
  hoverEl = el;
}
watch(switching, (s) => {
  if (s) sfx("switch");
});

function onFirstClick(e: MouseEvent) {
  unlockSfx();
  if (!ui.awaitingFirstClick) return;
  ui.awaitingFirstClick = false;
  const t = e.target as Element | null;
  if (t?.closest("[data-sound-toggle]")) return;
  soundOn.value = true;
}

/* ---------------- lifecycle ---------------- */

let refreshTimer = 0;
function onLoadRefresh() {
  window.clearTimeout(refreshTimer);
  refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 120);
}

onMounted(() => {
  initLenis();
  if (showPreloader.value) {
    stopScroll();
  } else {
    // returning visitor: short delay so the nav entrance still reads
    window.setTimeout(() => {
      ui.introDone = true;
    }, 120);
  }
  if (soundOn.value) {
    ui.awaitingFirstClick = false;
    void startAmbient();
  }
  window.addEventListener("click", onFirstClick, true);
  window.addEventListener("click", onSfxClick);
  document.addEventListener("pointerover", onSfxOver, { passive: true });
  window.addEventListener("load", onLoadRefresh);
  document.fonts?.ready.then(onLoadRefresh).catch(() => undefined);
  if (route.hash) window.setTimeout(() => scrollToTarget(route.hash, true), 400);
});

onUnmounted(() => {
  window.removeEventListener("click", onFirstClick, true);
  window.removeEventListener("click", onSfxClick);
  document.removeEventListener("pointerover", onSfxOver);
  window.removeEventListener("load", onLoadRefresh);
  window.clearTimeout(refreshTimer);
  ScrollTrigger.getAll().forEach((t) => t.kill());
  destroyLenis();
  disposeAudio();
  disposeSfx();
  ui.introDone = false;
  ui.transitioning = false;
  ui.creditsOpen = false;
  ui.menuOpen = false;
});
</script>

<template>
  <div class="ed-root">
    <Navbar />
    <main class="ed-main">
      <Transition :css="false" mode="out-in" @leave="onLeave" @enter="onEnter">
        <div :key="pageKey" class="ed-page">
          <component :is="page" />
          <SiteFooter />
        </div>
      </Transition>
    </main>
    <div ref="wipe" class="wipe" aria-hidden="true" />
    <CompanionLayer v-if="companionEnabled" />
    <CursorFollower v-if="!coarsePointer" />
    <CreditsModal />
    <ChatWidget />
    <Preloader v-if="showPreloader" @done="onIntroDone" />
    <div class="grain" aria-hidden="true" />
  </div>
</template>

<style scoped>
.ed-root {
  --pad-x: 2.78vw;
  position: relative;
  min-height: 100vh;
  background: var(--ed-bg);
  color: var(--ed-ink);
  font-family: var(--font-body);
}
.ed-page {
  position: relative;
  background: var(--ed-bg);
}
.wipe {
  position: fixed;
  inset: 0;
  z-index: 250;
  background: var(--ed-ink);
  transform: translateY(100%);
  pointer-events: none;
  will-change: transform;
}
.grain {
  position: fixed;
  inset: -50%;
  z-index: 600;
  pointer-events: none;
  opacity: 0.04;
  mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1.4 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
  animation: grain 0.9s steps(6) infinite;
}
@keyframes grain {
  0% {
    transform: translate(0, 0);
  }
  20% {
    transform: translate(-3%, 2%);
  }
  40% {
    transform: translate(2%, -4%);
  }
  60% {
    transform: translate(-4%, -1%);
  }
  80% {
    transform: translate(3%, 3%);
  }
  100% {
    transform: translate(0, 0);
  }
}
@media (prefers-reduced-motion: reduce) {
  .grain {
    animation: none;
  }
}
@media (max-width: 799px) {
  .ed-root {
    --pad-x: 20px;
  }
}
</style>
