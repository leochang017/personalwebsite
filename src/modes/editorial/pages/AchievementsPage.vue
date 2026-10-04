<script setup lang="ts">
/**
 * Achievements: title block, domain + level filter rows (combined), and the
 * shelf grid of award cards. The featured award gets the yellow treatment.
 */
import { computed, nextTick, onMounted, onUnmounted, ref } from "vue";
import { achievements, type Achievement } from "../../../content/leo";
import TitleBlock from "../components/TitleBlock.vue";
import Lightbox from "../components/Lightbox.vue";
import type { LightboxItem } from "../lib/types";
import { ScrollTrigger, gsap, reducedMotion } from "../lib/motion";

type Domain = "ALL" | Achievement["domain"];
type Level = "ALL" | Achievement["level"];
type Kind = "domain" | "level";
const domainFilters: { key: Domain; label: string }[] = [
  { key: "ALL", label: "All" },
  { key: "STEM", label: "STEM" },
  { key: "ATHLETICS", label: "Athletics" },
  { key: "ARTS", label: "Arts" },
  { key: "ACADEMIC", label: "Academic" },
];
const levelFilters: { key: Level; label: string }[] = [
  { key: "ALL", label: "All" },
  { key: "International", label: "International" },
  { key: "National", label: "National" },
  { key: "State", label: "State" },
  { key: "Regional", label: "Regional" },
];
const domain = ref<Domain>("ALL");
const level = ref<Level>("ALL");
const shown = computed(() =>
  achievements.filter((a) => (domain.value === "ALL" || a.domain === domain.value) && (level.value === "ALL" || a.level === level.value)),
);
const cardKey = (a: Achievement) => `${a.title}|${a.year}|${a.detail}`;
const featuredLabel = (a: Achievement) => (a.medal === "1ST" ? `${a.level} champion` : `${a.level} highlight`);

const root = ref<HTMLElement | null>(null);

/* lightbox */
const lbOpen = ref(false);
const lbTitle = ref("");
const lbItems = ref<LightboxItem[]>([]);
function openPhotos(a: Achievement, which: "main" | "more" = "main") {
  if (which === "more" && a.moreGallery?.length) lbItems.value = a.moreGallery;
  else if (a.gallery?.length) lbItems.value = a.gallery;
  else if (a.photo) lbItems.value = [{ src: a.photo.src, caption: a.photo.alt }];
  else return;
  lbTitle.value = a.title;
  lbOpen.value = true;
}
function photoLabel(a: Achievement) {
  return a.gallery?.length ? `View photos (${a.gallery.length})` : "View photo";
}
let ctx: gsap.Context | null = null;
let swap: gsap.core.Tween | null = null;

function choose(kind: Kind, key: string) {
  if (kind === "domain") {
    const f = domainFilters.find((d) => d.key === key);
    if (!f || f.key === domain.value) return;
    domain.value = f.key;
  } else {
    const f = levelFilters.find((d) => d.key === key);
    if (!f || f.key === level.value) return;
    level.value = f.key;
  }
  if (reducedMotion) return;
  nextTick(() => {
    swap?.kill();
    const cards = Array.from(root.value?.querySelectorAll<HTMLElement>(".card") ?? []);
    if (!cards.length) return;
    swap = gsap.fromTo(cards, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power2.out", stagger: 0.04, overwrite: true });
    ScrollTrigger.refresh();
  });
}

function onKey(e: KeyboardEvent, i: number, kind: Kind) {
  if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
  e.preventDefault();
  const list = kind === "domain" ? domainFilters : levelFilters;
  const n = (i + (e.key === "ArrowRight" ? 1 : list.length - 1)) % list.length;
  choose(kind, list[n].key);
  root.value?.querySelectorAll<HTMLButtonElement>(`.tabs.${kind} .tab`)[n]?.focus();
}

onMounted(() => {
  if (!root.value || reducedMotion) return;
  ctx = gsap.context(() => {
    gsap.set(".card", { opacity: 0 });
    ScrollTrigger.batch(".card", {
      start: "top 95%",
      once: true,
      onEnter: (els) => gsap.fromTo(els, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", stagger: 0.06, overwrite: true }),
    });
  }, root.value);
});
onUnmounted(() => {
  swap?.kill();
  ctx?.revert();
});
</script>

<template>
  <div ref="root" class="ach-page">
    <TitleBlock short bg="/images/baby.jpg" :sets="[['Achievements']]" subtitle="Placements, writing awards, and a publication." />
    <section class="shelf" data-nav="dark" aria-label="Achievements">
      <div class="tabs domain" role="tablist" aria-label="Filter by domain">
        <button
          v-for="(f, i) in domainFilters"
          :key="f.key"
          class="tab"
          :class="{ on: domain === f.key }"
          type="button"
          role="tab"
          data-sfx="tick"
          data-sfx-hover
          :aria-selected="domain === f.key"
          :tabindex="domain === f.key ? 0 : -1"
          aria-controls="ach-grid"
          @click="choose('domain', f.key)"
          @keydown="onKey($event, i, 'domain')"
        >
          {{ f.label }}
        </button>
      </div>
      <div class="tabs level" role="tablist" aria-label="Filter by level">
        <button
          v-for="(f, i) in levelFilters"
          :key="f.key"
          class="tab small"
          :class="{ on: level === f.key }"
          type="button"
          role="tab"
          data-sfx="tick"
          data-sfx-hover
          :aria-selected="level === f.key"
          :tabindex="level === f.key ? 0 : -1"
          aria-controls="ach-grid"
          @click="choose('level', f.key)"
          @keydown="onKey($event, i, 'level')"
        >
          {{ f.label }}
        </button>
      </div>
      <ul id="ach-grid" class="grid" role="tabpanel">
        <li v-for="a in shown" :key="cardKey(a)" class="card" :class="{ featured: a.featured }">
          <div class="top">
            <span class="medal" :class="a.tier">{{ a.medal }}</span>
            <span class="tags">
              <span class="level" :class="`lv-${a.level.toLowerCase()}`">{{ a.level }}</span>
              <span class="dot" aria-hidden="true">·</span>
              <span class="domain">{{ a.domain }}</span>
            </span>
          </div>
          <div class="logo" aria-hidden="true">
            <img v-if="a.logo" :src="a.logo" alt="" loading="lazy" decoding="async" />
            <span v-else>{{ a.title.charAt(0) }}</span>
          </div>
          <p v-if="a.featured" class="feat-label">{{ featuredLabel(a) }}</p>
          <h3 class="title">{{ a.title }}</h3>
          <p class="detail">{{ a.detail }}</p>
          <div class="foot">
            <p class="year">{{ a.year }}</p>
            <button
              v-if="a.photo || a.gallery?.length"
              class="view"
              type="button"
              data-sfx="pop"
              data-sfx-hover
              :aria-label="`${photoLabel(a)}: ${a.title}`"
              @click="openPhotos(a)"
            >
              {{ photoLabel(a) }} <span aria-hidden="true">↗</span>
            </button>
            <button
              v-if="a.moreGallery?.length"
              class="view"
              type="button"
              data-sfx="pop"
              data-sfx-hover
              :aria-label="`See other photos (${a.moreGallery.length}): ${a.title}`"
              @click="openPhotos(a, 'more')"
            >
              See other photos ({{ a.moreGallery.length }})
            </button>
          </div>
        </li>
      </ul>
    </section>
    <Lightbox :open="lbOpen" :title="lbTitle" :items="lbItems" @close="lbOpen = false" />
  </div>
</template>

<style scoped>
.ach-page {
  background: var(--ed-bg);
}
.shelf {
  padding: 1vw 9.6vw 9vw;
}
.tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 12px;
}
.tabs.level {
  margin-bottom: 2.6vw;
}
.tab.small {
  padding: 7px 13px 6px;
  font-size: 12px;
  border-color: transparent;
}
.tab {
  padding: 9px 16px 8px;
  border: 1px solid var(--ed-ink);
  border-radius: 999px;
  font: 500 14px/1 var(--font-body);
  text-transform: uppercase;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    color 0.3s ease,
    transform 0.16s ease-out;
}
.tab.on {
  background: var(--ed-ink);
  color: var(--ed-bg);
}
@media (hover: hover) and (pointer: fine) {
  .tab:not(.on):hover {
    background: rgba(2, 32, 22, 0.06);
  }
}
.tab:active {
  transform: scale(0.97);
}
.tab:focus-visible {
  outline: 1px solid var(--ed-ink);
  outline-offset: 3px;
}
.grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}
@media (min-width: 700px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 1000px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
.card {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 24px;
  background: #fff;
  border: 1px solid var(--ed-ink);
  min-height: 300px;
}
.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.medal {
  padding: 5px 10px 4px;
  border-radius: 999px;
  border: 1px solid var(--ed-ink);
  font: 600 12px/1 var(--font-mono);
  letter-spacing: 0.04em;
}
.medal.gold {
  background: var(--ed-yellow);
}
.medal.silver {
  background: var(--ed-grey);
}
.medal.bronze {
  background: var(--ed-pink);
}
.medal.plain {
  background: var(--ed-bg);
}
.tags {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.dot {
  color: rgba(2, 32, 22, 0.4);
}
.domain {
  font: 400 11px/1 var(--font-mono);
  letter-spacing: 0.06em;
  color: rgba(2, 32, 22, 0.55);
  text-align: right;
}
.level {
  padding: 4px 8px 3px;
  border: 1px solid var(--ed-ink);
  border-radius: 999px;
  font: 500 11px/1 var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.lv-international {
  background: var(--ed-ink);
  color: #fff;
}
.lv-national {
  background: var(--ed-yellow);
}
.lv-state {
  background: #ececef;
  border-color: #ececef;
}
.lv-regional {
  background: transparent;
}

/* the featured award */
.card {
  position: relative;
}
.card.featured {
  background: var(--ed-yellow);
  border: 2px solid var(--ed-ink);
  transition: transform 0.2s ease-out;
}
.card.featured .medal {
  background: var(--ed-ink);
  color: var(--ed-yellow);
  border-color: var(--ed-ink);
}
.card.featured .lv-national {
  background: var(--ed-bg);
}
.card.featured .domain,
.card.featured .detail {
  color: rgba(2, 32, 22, 0.75);
}
.feat-label {
  margin: 0 0 -6px;
  font: 600 11px/1 var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.12em;
}
@media (hover: hover) and (pointer: fine) {
  .card.featured:hover {
    transform: translateY(-3px);
  }
}
@property --shine {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}
@media (prefers-reduced-motion: no-preference) {
  .card.featured::before {
    content: "";
    position: absolute;
    inset: -7px;
    padding: 2px;
    background: conic-gradient(from var(--shine), var(--ed-ink) 0deg, transparent 90deg, transparent 270deg, var(--ed-ink) 360deg);
    -webkit-mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask:
      linear-gradient(#000 0 0) content-box exclude,
      linear-gradient(#000 0 0);
    pointer-events: none;
    animation: shine 6s linear infinite;
  }
}
@keyframes shine {
  to {
    --shine: 360deg;
  }
}
.logo {
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  background: var(--ed-grey);
  overflow: hidden;
  font: 600 18px/1 var(--font-title);
  color: rgba(2, 32, 22, 0.55);
}
.logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #fff;
}
.title {
  margin: 0;
  font-family: var(--font-title);
  font-variation-settings: "wght" 622;
  font-stretch: 92%;
  font-weight: 400;
  font-size: 20px;
  line-height: 1.1;
}
.detail {
  margin: 0;
  font: 400 14px/1.4 var(--font-body);
  color: rgba(2, 32, 22, 0.6);
}
.foot {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}
.year {
  margin: 0;
  font: 400 12px/1 var(--font-mono);
}
.year {
  margin-right: auto;
}
.view {
  padding: 7px 14px 6px;
  border: 1px solid var(--ed-ink);
  border-radius: 999px;
  font: 400 14px/1 var(--font-body);
  cursor: pointer;
  white-space: nowrap;
  transition:
    background-color 0.25s ease,
    color 0.25s ease,
    transform 0.16s ease-out;
}
@media (hover: hover) and (pointer: fine) {
  .view:hover {
    background: var(--ed-ink);
    color: #fff;
  }
}
.view:active {
  transform: scale(0.97);
}
.view:focus-visible {
  outline: 1px solid var(--ed-ink);
  outline-offset: 3px;
}
@media (max-width: 799px) {
  .shelf {
    padding: 8px 20px 72px;
  }
  .tabs {
    margin-bottom: 22px;
  }
}
</style>
