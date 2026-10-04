<script setup lang="ts">
/**
 * Four-column navbar that sits at the top of the page and scrolls away with
 * it (absolute, not fixed). It only ever overlaps the page's first section;
 * if that section says data-nav="light" (the home video hero) the text turns
 * white, otherwise it is ink. Collapses to a
 * full-screen green menu under 800px.
 */
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { person } from "../../../content/leo";
import SoundToggle from "./SoundToggle.vue";
import { ui } from "../lib/state";
import { gsap, reducedMotion } from "../lib/motion";
import { startScroll, stopScroll } from "../lib/lenis";
import { sfx } from "../lib/sfx";

const route = useRoute();
const nav = ref<HTMLElement | null>(null);
const menuPanel = ref<HTMLElement | null>(null);
const menuButton = ref<HTMLButtonElement | null>(null);

// colour: read once per page from the first section's data-nav
const light = ref(false);
function syncTheme() {
  const first = document.querySelector<HTMLElement>(".ed-main .ed-page [data-nav]");
  light.value = first?.dataset.nav === "light";
}

// the mobile menu button only exists below 800px (not just hidden)
const mobileQuery = window.matchMedia("(max-width: 799px)");
const isMobile = ref(mobileQuery.matches);
function onMobileChange(e: MediaQueryListEvent) {
  isMobile.value = e.matches;
  if (!e.matches && ui.menuOpen) closeMenu(false);
}

const links = computed(() =>
  (
    [
      ["Projects", "projects"],
      ["Experience", "experience"],
      ["Achievements", "achievements"],
      ["About", "about"],
    ] as const
  ).map(([label, name]) => ({ label, to: { name }, active: route.name === name })),
);

// entrance: fades in once the intro is done (1s, after the preloader)
const shown = ref(false);
function reveal(done: boolean) {
  {
    if (!done || shown.value || !nav.value) return;
    shown.value = true;
    if (reducedMotion) {
      gsap.to(nav.value, { autoAlpha: 1, duration: 0.4 });
      return;
    }
    gsap.fromTo(
      nav.value,
      { autoAlpha: 0, y: -10 },
      { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out", delay: 0.15 },
    );
  }
}
watch(() => ui.introDone, reveal);

function openMenu() {
  ui.menuOpen = true;
  sfx("open");
  stopScroll();
  nextTick(() => {
    if (!menuPanel.value) return;
    const items = Array.from(menuPanel.value.querySelectorAll(".m-link"));
    gsap.fromTo(menuPanel.value, { yPercent: -100 }, { yPercent: 0, duration: 0.8, ease: "expo.out" });
    gsap.fromTo(items, { yPercent: 110 }, { yPercent: 0, duration: 0.9, ease: "expo.out", stagger: 0.06, delay: 0.15 });
    menuPanel.value.querySelector<HTMLElement>(".m-close")?.focus();
  });
}
function closeMenu(restoreFocus = true) {
  if (!ui.menuOpen) return;
  sfx("close");
  const panel = menuPanel.value;
  const finish = () => {
    ui.menuOpen = false;
    startScroll();
    if (restoreFocus) menuButton.value?.focus();
  };
  if (!panel) return finish();
  gsap.to(panel, { yPercent: -100, duration: 0.55, ease: "expo.inOut", onComplete: finish });
}
function onKey(e: KeyboardEvent) {
  if (e.key === "Escape" && ui.menuOpen) closeMenu();
}

watch(
  () => route.fullPath,
  () => {
    if (ui.menuOpen) closeMenu(false);
  },
);
// the new page is in the DOM once the transition has finished
watch(
  () => ui.transitioning,
  (t) => {
    if (!t) nextTick(syncTheme);
  },
);

onMounted(() => {
  if (nav.value) gsap.set(nav.value, { autoAlpha: 0 });
  reveal(ui.introDone);
  window.addEventListener("keydown", onKey);
  mobileQuery.addEventListener("change", onMobileChange);
  nextTick(syncTheme);
});
onUnmounted(() => {
  window.removeEventListener("keydown", onKey);
  mobileQuery.removeEventListener("change", onMobileChange);
});
</script>

<template>
  <header ref="nav" class="nav" :class="{ light }">
    <RouterLink class="name" :to="{ name: 'home' }" data-sfx="tick" data-sfx-hover>{{ person.name }}</RouterLink>
    <p class="tagline">{{ person.tagline }}</p>
    <nav class="links" aria-label="Primary">
      <RouterLink
        v-for="l in links"
        :key="l.label"
        :to="l.to"
        class="link"
        data-sfx="tick"
        data-sfx-hover
        :class="{ active: l.active }"
        :aria-current="l.active ? 'page' : undefined"
      >
        <span>{{ l.label }}</span>
      </RouterLink>
      <a class="link resume" :href="person.resume" download data-sfx="pop" data-sfx-hover><span>Resume <i aria-hidden="true">↓</i></span></a>
      <SoundToggle />
    </nav>
    <div v-if="isMobile" class="mobile">
      <SoundToggle />
      <button ref="menuButton" class="menu-btn" type="button" aria-haspopup="dialog" :aria-expanded="ui.menuOpen" @click="openMenu">
        Menu
      </button>
    </div>
  </header>

  <div v-if="ui.menuOpen" ref="menuPanel" class="menu" role="dialog" aria-modal="true" aria-label="Menu">
    <button class="m-close" type="button" aria-label="Close menu" @click="closeMenu()">Close</button>
    <nav class="m-links" aria-label="Mobile">
      <span v-for="l in links" :key="l.label" class="m-mask">
        <RouterLink :to="l.to" class="m-link" data-sfx="tick" @click="closeMenu(false)">{{ l.label }}</RouterLink>
      </span>
    </nav>
    <a class="m-resume" :href="person.resume" download data-sfx="pop">Resume ↓</a>
    <p class="m-foot">{{ person.tagline }}</p>
  </div>
</template>

<style scoped>
.nav {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: grid;
  grid-template-columns: 17.8vw 1fr auto;
  align-items: center;
  padding: calc(2.86rem - 12px + env(safe-area-inset-top)) var(--pad-x) 0;
  font: 400 clamp(12px, 0.97vw, 28px) / 1.2 var(--font-body);
  color: var(--ed-ink);
  pointer-events: none;
}
.nav > * {
  pointer-events: auto;
}
.nav.light {
  color: #fff;
  text-shadow: 0 1px 12px rgba(2, 32, 22, 0.25);
}
.name {
  justify-self: start;
}
.tagline {
  margin: 0;
  justify-self: start;
}
.links {
  display: flex;
  align-items: center;
  gap: 1.39vw;
}
.link {
  position: relative;
  padding: 4px 0;
}
.link span {
  position: relative;
  display: inline-block;
}
.link span::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -3px;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: 100% 50%;
  transition: transform 0.5s cubic-bezier(0.6, 0, 0.25, 1);
}
.link.active span::after {
  transform: scaleX(1);
}
@media (hover: hover) and (pointer: fine) {
  .link:hover span::after {
    transform: scaleX(1);
    transform-origin: 0% 50%;
  }
}
.resume {
  font-size: 0.86em;
  opacity: 0.75;
  margin-left: 0.4vw;
}
.resume i {
  font-style: normal;
  display: inline-block;
  transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}
@media (hover: hover) and (pointer: fine) {
  .resume:hover i {
    transform: translateY(2px);
  }
}
.m-resume {
  margin-top: 28px;
  font-size: 16px;
  text-decoration: underline;
  text-underline-offset: 4px;
}
.links :deep(.sound) {
  margin-left: 0.6vw;
}
.mobile,
.menu-btn {
  display: none;
}
a:focus-visible,
button:focus-visible {
  outline: 1px solid currentColor;
  outline-offset: 4px;
}

.menu {
  position: fixed;
  inset: 0;
  z-index: 9100; /* above the fixed mode switch (9000) and chat pill (8999) */
  background: var(--ed-green);
  color: var(--ed-pink);
  display: flex;
  flex-direction: column;
  padding: calc(16px + env(safe-area-inset-top)) calc(var(--pad-x) + env(safe-area-inset-right)) calc(24px + env(safe-area-inset-bottom)) calc(var(--pad-x) + env(safe-area-inset-left));
  overflow-y: auto;
}
.m-close {
  align-self: flex-end;
  font: 400 14px/1 var(--font-body);
  padding: 15px 0;
  cursor: pointer;
}
.m-link {
  padding: 2px 0;
}
.m-links {
  margin-top: auto;
  display: flex;
  flex-direction: column;
}
.m-mask {
  display: block;
  overflow: hidden;
  padding-bottom: 0.15em;
}
.m-link {
  display: block;
  font-family: var(--font-title);
  font-variation-settings: "wght" 622;
  font-stretch: 92%;
  text-transform: uppercase;
  line-height: 0.95;
  letter-spacing: -0.01em;
  font-size: min(48px, 11.5vw); /* ACHIEVEMENTS fits a 320px phone */
}
.m-foot {
  margin: 32px 0 8px;
  font-size: 14px;
  opacity: 0.8;
}

@media (max-width: 799px) {
  .nav {
    grid-template-columns: 1fr auto;
    padding-top: calc(20px + env(safe-area-inset-top));
    font-size: 14px;
  }
  .name {
    padding: 12px 0;
    margin: -12px 0;
  }
  .tagline,
  .links {
    display: none;
  }
  .mobile {
    display: flex;
    align-items: center;
    gap: 18px;
  }
  .menu-btn {
    display: inline-block;
    cursor: pointer;
    padding: 14px 0 14px 8px; /* ~44px tap target without moving the label */
    margin: -14px 0;
  }
}
</style>
