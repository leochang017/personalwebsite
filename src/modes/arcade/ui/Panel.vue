<script setup lang="ts">
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import { useArcadeStore } from "../store";
import { SECTION_META, creditFor } from "../content";
import {
  aboutPhotos,
  achievements,
  education,
  experiences,
  languages,
  leadership,
  person,
  projects,
  skills,
  stats,
  type Achievement,
} from "../../../content/leo";
import { useFocusTrap, useHoverBlip } from "../context";

const store = useArcadeStore();
const { panel, workIndex, currentTrack } = storeToRefs(store);
const credit = computed(() => creditFor(currentTrack.value));
const hover = useHoverBlip();

const root = ref<HTMLElement | null>(null);
const open = computed(() => panel.value !== null);
useFocusTrap(root, open, () => store.closePanel());

const meta = computed(() => (panel.value ? SECTION_META[panel.value] : null));
const project = computed(() => projects[workIndex.value]);
const pad = (n: number) => String(n).padStart(2, "0");
const dir = ref<1 | -1>(1);

// ABOUT: the same groups the editorial About page shows
const skillGroups = [
  { label: "Languages & frameworks", items: skills.languages },
  { label: "Infrastructure & tools", items: skills.infra },
  { label: "Focus areas", items: skills.focus },
];
const photo = aboutPhotos[0];

// AWARDS: the editorial shelf, grouped by domain, featured first
const DOMAINS: Achievement["domain"][] = ["STEM", "ATHLETICS", "ARTS", "ACADEMIC"];
const shelf = computed(() =>
  DOMAINS.map((d) => ({
    domain: d,
    items: achievements.filter((a) => a.domain === d).sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false)),
  })),
);

// EXPERIENCE: work/research first, then leadership, one accordion open at a time
const openRow = ref<string | null>(null);
function toggleRow(key: string) {
  openRow.value = openRow.value === key ? null : key;
}
const rowKey = (group: string, org: string) => `${group}:${org}`;

function step(d: 1 | -1) {
  dir.value = d;
  store.setWork(workIndex.value + d);
}

// Arrow keys while focus is inside the panel (the game handles them otherwise)
function onKey(e: KeyboardEvent) {
  if (panel.value !== "works") return;
  if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
    e.preventDefault();
    e.stopPropagation();
    step(e.key === "ArrowLeft" ? -1 : 1);
  }
}

// "Scroll through all projects": wheel past the end of the content flips the project
let wheelAcc = 0;
let wheelLock = 0;
function onWheel(e: WheelEvent) {
  if (panel.value !== "works") return;
  const el = e.currentTarget;
  if (!(el instanceof HTMLElement)) return;
  const atTop = el.scrollTop <= 0;
  const atEnd = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
  // vertical wheel only: a sideways trackpad swipe must never flip the project
  if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
  const delta = e.deltaY;
  if ((delta > 0 && !atEnd) || (delta < 0 && !atTop)) {
    wheelAcc = 0;
    return;
  }
  const now = performance.now();
  if (now < wheelLock) return;
  wheelAcc += delta;
  if (Math.abs(wheelAcc) > 140) {
    step(wheelAcc > 0 ? 1 : -1);
    wheelAcc = 0;
    wheelLock = now + 550;
  }
}

// touch: horizontal flick, decided by velocity as much as distance
let sx = 0;
let sy = 0;
let st = 0;
function onTouchStart(e: TouchEvent) {
  if (e.touches.length !== 1) return;
  sx = e.touches[0].clientX;
  sy = e.touches[0].clientY;
  st = performance.now();
}
function onTouchEnd(e: TouchEvent) {
  if (panel.value !== "works" || !st) return;
  const t = e.changedTouches[0];
  const dx = t.clientX - sx;
  const dy = t.clientY - sy;
  const v = Math.abs(dx) / Math.max(1, performance.now() - st);
  st = 0;
  if (Math.abs(dx) > Math.abs(dy) * 1.4 && (Math.abs(dx) > 60 || v > 0.4)) step(dx < 0 ? 1 : -1);
}
</script>

<template>
  <Transition name="drawer">
    <aside
      v-if="panel && meta"
      ref="root"
      class="panel"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="`panel-title-${panel}`"
      @keydown="onKey"
    >
      <header class="head">
        <div>
          <p class="kicker"><span aria-hidden="true">»</span> District <span class="zh" lang="zh-Hans">{{ meta.zh }}</span></p>
          <h2 :id="`panel-title-${panel}`" class="title">{{ meta.title }}</h2>
        </div>
        <button type="button" class="close" aria-label="Close panel" data-autofocus @click="store.closePanel()" @pointerenter="hover">
          <kbd>Esc</kbd><span aria-hidden="true">✕</span>
        </button>
      </header>

      <div class="scroll" @wheel.passive="onWheel" @touchstart.passive="onTouchStart" @touchend.passive="onTouchEnd">
        <!-- ABOUT -->
        <template v-if="panel === 'about'">
          <p class="lede">{{ person.bio }}</p>
          <dl class="meta-row">
            <div><dt>School</dt><dd>{{ person.school }}</dd></div>
            <div><dt>Class of</dt><dd>{{ person.classOf }}</dd></div>
            <div><dt>Based in</dt><dd>{{ person.location }}</dd></div>
          </dl>
          <figure v-if="photo" class="shot">
            <img :src="photo.src" :alt="photo.alt" loading="lazy" decoding="async" />
            <figcaption class="mono">{{ photo.caption }}</figcaption>
          </figure>

          <h3 class="label">By the numbers</h3>
          <ul class="stats-row">
            <li v-for="s in stats" :key="s.label">
              <span class="num">{{ s.value }}{{ s.suffix }}</span>
              <span class="mono">{{ s.label }}</span>
            </li>
          </ul>

          <h3 class="label">Skills</h3>
          <div v-for="g in skillGroups" :key="g.label" class="group">
            <p class="mono dim">{{ g.label }}</p>
            <ul class="chips">
              <li v-for="s in g.items" :key="s">{{ s }}</li>
            </ul>
          </div>

          <h3 class="label">Education</h3>
          <dl class="meta-row edu">
            <div><dt>School</dt><dd>{{ education.school }}</dd></div>
            <div><dt>Class of</dt><dd>{{ education.classOf }}</dd></div>
            <div>
              <dt>SAT</dt>
              <dd>{{ education.sat.total }} <span class="dim small">{{ education.sat.reading }} reading · {{ education.sat.math }} math</span></dd>
            </div>
            <div><dt>PSAT</dt><dd>{{ education.psat }}</dd></div>
          </dl>
          <div class="group">
            <p class="mono dim">Current coursework</p>
            <ul class="courses">
              <li v-for="c in education.courseworkCurrent" :key="c">{{ c }}</li>
            </ul>
          </div>
          <div class="group">
            <p class="mono dim">Completed coursework</p>
            <ul class="courses">
              <li v-for="c in education.courseworkCompleted" :key="c">{{ c }}</li>
            </ul>
          </div>
          <div class="group">
            <p class="mono dim">Independent study</p>
            <p class="body">{{ education.independentStudy }}</p>
          </div>

          <h3 class="label">Languages</h3>
          <ul class="langs">
            <li v-for="l in languages" :key="l.name"><span>{{ l.name }}</span><span class="mono">{{ l.level }}</span></li>
          </ul>
          <p class="credit-line">
            Music: "<a :href="currentTrack.url" target="_blank" rel="noopener">{{ currentTrack.title }}</a>" by {{ currentTrack.artist }} ({{ credit.host }}), licensed {{ currentTrack.license }}
          </p>
        </template>

        <!-- EXPERIENCE -->
        <template v-else-if="panel === 'experience'">
          <p class="lede">Research, internships, work, and my leadership positions.</p>
          <template v-for="grp in [{ key: 'work', title: 'Experience', items: experiences }, { key: 'lead', title: 'Leadership', items: leadership }]" :key="grp.key">
            <h3 class="label">{{ grp.title }} <span class="dim">({{ grp.items.length }})</span></h3>
            <ul class="rows">
              <li v-for="x in grp.items" :key="x.org" class="row" :class="{ open: openRow === rowKey(grp.key, x.org), active: x.status === 'active' }">
                <button
                  type="button"
                  class="row-head"
                  :aria-expanded="openRow === rowKey(grp.key, x.org)"
                  :aria-controls="`row-${grp.key}-${x.org.replace(/\W+/g, '-')}`"
                  @click="toggleRow(rowKey(grp.key, x.org))"
                  @pointerenter="hover"
                >
                  <img v-if="x.logo" class="logo" :src="x.logo" alt="" loading="lazy" decoding="async" />
                  <span class="row-text">
                    <span class="org">{{ x.org }}</span>
                    <span class="role">{{ x.role }}</span>
                    <span class="mono dim">{{ x.period }} · {{ x.location }}<template v-if="x.status === 'active'"> · <span class="red">now</span></template></span>
                  </span>
                  <span class="caret" aria-hidden="true">+</span>
                </button>
                <div v-if="openRow === rowKey(grp.key, x.org)" :id="`row-${grp.key}-${x.org.replace(/\W+/g, '-')}`" class="row-body">
                  <p class="body">{{ x.desc }}</p>
                  <ul class="stats">
                    <li v-for="h in x.highlights" :key="h" class="mono">› {{ h }}</li>
                  </ul>
                  <ul class="chips">
                    <li v-for="t in x.tags" :key="t">{{ t }}</li>
                  </ul>
                  <p v-if="'links' in x && x.links?.length" class="links">
                    <a v-for="l in x.links" :key="l.href" :href="l.href" target="_blank" rel="noopener" @pointerenter="hover">{{ l.label }} ↗</a>
                  </p>
                </div>
              </li>
            </ul>
          </template>
        </template>

        <!-- WORKS -->
        <template v-else-if="panel === 'works'">
          <div class="works-nav">
            <button type="button" class="arrow" aria-label="Previous project" @click="step(-1)" @pointerenter="hover">←</button>
            <span class="index mono" aria-live="polite">{{ pad(workIndex + 1) }}/{{ pad(projects.length) }}</span>
            <button type="button" class="arrow" aria-label="Next project" @click="step(1)" @pointerenter="hover">→</button>
            <span class="hint mono">Scroll through all projects</span>
          </div>
          <Transition :name="dir > 0 ? 'work-next' : 'work-prev'" mode="out-in">
            <article :key="project.slug" class="work">
              <p class="mono red">{{ project.category }} · {{ project.year }}</p>
              <h3 class="work-title">{{ project.title }}</h3>
              <p class="status">{{ project.status }}</p>
              <p class="mono dim">{{ project.role }} — {{ project.team }}</p>
              <p class="desc">{{ project.desc }}</p>
              <ul class="stats">
                <li v-for="s in project.stats" :key="s" class="mono">› {{ s }}</li>
              </ul>
              <ul class="chips">
                <li v-for="t in project.tech" :key="t">{{ t }}</li>
              </ul>
              <p class="links">
                <a
                  v-for="l in project.links"
                  :key="l.href"
                  :href="l.href"
                  :target="l.href.startsWith('http') ? '_blank' : undefined"
                  rel="noopener"
                  @pointerenter="hover"
                >{{ l.label }} ↗</a>
              </p>
            </article>
          </Transition>
        </template>

        <!-- AWARDS -->
        <template v-else-if="panel === 'awards'">
          <p class="lede">Placements, writing awards, and a publication.</p>
          <template v-for="g in shelf" :key="g.domain">
            <h3 class="label">{{ g.domain }} <span class="dim">({{ g.items.length }})</span></h3>
            <ol class="awards">
              <li v-for="a in g.items" :key="a.title + a.detail + a.year" :class="[a.tier, { featured: a.featured }]">
                <span class="medal">{{ a.medal }}</span>
                <span class="a-main">
                  <span class="a-title">{{ a.title }}</span>
                  <span class="a-detail">{{ a.detail }}</span>
                  <span class="mono dim">{{ a.level }}</span>
                </span>
                <span class="mono red year">{{ a.year }}</span>
              </li>
            </ol>
          </template>
        </template>

        <!-- CONTACT -->
        <template v-else-if="panel === 'contact'">
          <p class="lede">{{ person.tagline }}. {{ person.location }}.</p>
          <ul class="pills">
            <li><a class="pill" :href="`mailto:${person.email}`" @pointerenter="hover"><span class="mono">Email</span>{{ person.email }}</a></li>
            <li><a class="pill" :href="person.github" target="_blank" rel="noopener" @pointerenter="hover"><span class="mono">GitHub</span>leochang017</a></li>
            <li><a class="pill" :href="person.instagram" target="_blank" rel="noopener" @pointerenter="hover"><span class="mono">Instagram</span>@leo.c000</a></li>
            <li><a class="pill" :href="person.resume" target="_blank" rel="noopener" @pointerenter="hover"><span class="mono">Resume</span>PDF ↗</a></li>
          </ul>
        </template>
      </div>
    </aside>
  </Transition>
</template>

<style scoped>
.panel {
  position: fixed;
  top: 16px;
  right: 16px;
  bottom: 16px;
  width: min(440px, calc(100vw - 32px));
  z-index: 50;
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.92);
  border: 1px solid var(--ar-red);
  border-radius: 3px;
  box-shadow: 0 0 40px rgba(255, 0, 51, 0.18);
  color: #fff;
}
.head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  padding: 18px 20px 14px;
  border-bottom: 1px solid rgba(255, 0, 51, 0.35);
}
.kicker {
  margin: 0 0 6px;
  font: 500 11px/1 var(--font-mono);
  color: rgba(255, 0, 51, 0.8);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.kicker .zh {
  font: 700 12px/1 "Noto Sans SC", "PingFang SC", "Hiragino Sans GB", sans-serif;
  color: var(--ar-red);
  letter-spacing: 0.2em;
  margin-left: 2px;
}
.title {
  margin: 0;
  font: 800 52px/0.9 var(--font-display);
  font-stretch: 88%;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  color: var(--ar-red);
  text-shadow: 0 0 18px rgba(255, 0, 51, 0.55);
}
.close {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  color: var(--ar-red);
  font: 500 11px/1 var(--font-mono);
  border: 1px solid rgba(255, 0, 51, 0.5);
  border-radius: 2px;
  cursor: pointer;
  transition: transform 140ms cubic-bezier(0.23, 1, 0.32, 1), background-color 160ms ease;
}
.close:active {
  transform: scale(0.97);
}
@media (hover: hover) and (pointer: fine) {
  .close:hover {
    background: rgba(255, 0, 51, 0.12);
  }
}
kbd {
  font: inherit;
}
.scroll {
  flex: 1;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 18px 20px 28px;
  font: 400 14px/1.5 var(--font-body);
  scrollbar-width: thin;
  scrollbar-color: var(--ar-red) transparent;
}
.lede {
  margin: 0 0 16px;
  font-size: 15px;
}
.mono {
  font: 500 11px/1.4 var(--font-mono);
  letter-spacing: 0.02em;
}
.red {
  color: var(--ar-red);
}
.dim {
  color: rgba(255, 255, 255, 0.55);
}
.small {
  font-size: 11px;
}
.body {
  margin: 0 0 10px;
}
.label {
  margin: 22px 0 10px;
  font: 500 11px/1 var(--font-mono);
  color: var(--ar-red);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.label .dim {
  text-transform: none;
}
.group {
  margin: 0 0 12px;
}
.group > .mono {
  margin: 0 0 6px;
  text-transform: uppercase;
}
.meta-row {
  display: grid;
  grid-template-columns: repeat(3, auto);
  justify-content: start;
  gap: 4px 22px;
  margin: 0;
}
.meta-row.edu {
  margin-bottom: 14px;
}
.meta-row dt {
  font: 500 10px/1.4 var(--font-mono);
  color: var(--ar-red);
  text-transform: uppercase;
}
.meta-row dd {
  margin: 0;
  font-size: 13px;
}
.shot {
  margin: 16px 0 0;
}
.shot img {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  border: 1px solid rgba(255, 0, 51, 0.45);
  border-radius: 2px;
  filter: saturate(0.85) contrast(1.05);
}
.shot figcaption {
  margin-top: 6px;
  color: rgba(255, 255, 255, 0.55);
}
ul,
ol {
  list-style: none;
  margin: 0;
  padding: 0;
}
.stats-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(72px, 1fr));
  gap: 8px;
}
.stats-row li {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 8px 10px;
  border: 1px solid rgba(255, 0, 51, 0.3);
  border-radius: 2px;
}
.stats-row .num {
  font: 800 22px/1 var(--font-display);
  font-stretch: 88%;
  color: #fff;
  text-shadow: 0 0 12px rgba(255, 0, 51, 0.5);
}
.stats-row .mono {
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  font-size: 9px;
}
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.chips li {
  padding: 4px 9px;
  border: 1px solid rgba(255, 0, 51, 0.55);
  border-radius: 999px;
  font: 500 11px/1.2 var(--font-mono);
  color: #ffd6de;
}
.courses li {
  padding: 4px 0;
  border-top: 1px solid rgba(255, 0, 51, 0.14);
  font-size: 13px;
}
.langs li {
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  border-top: 1px solid rgba(255, 0, 51, 0.18);
}
.langs .mono {
  color: var(--ar-red);
}

.credit-line {
  margin: 26px 0 0;
  padding-top: 10px;
  border-top: 1px solid rgba(255, 0, 51, 0.18);
  font: 400 11px/1.5 var(--font-mono);
  color: rgba(255, 255, 255, 0.55);
}
.credit-line a {
  color: var(--ar-red);
  text-decoration: underline;
  text-underline-offset: 2px;
}
.credit-line a:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 2px;
}

/* experience rows */
.rows .row {
  border-top: 1px solid rgba(255, 0, 51, 0.18);
}
.row-head {
  display: grid;
  grid-template-columns: 34px 1fr 18px;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 10px 0;
  text-align: left;
  color: #fff;
  cursor: pointer;
  transition: background-color 160ms ease;
}
.row-head .logo {
  width: 34px;
  height: 34px;
  object-fit: contain;
  background: #fff;
  border-radius: 2px;
  padding: 3px;
  box-sizing: border-box;
}
.row-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}
.org {
  font-weight: 600;
}
.role {
  font-size: 13px;
  color: #ffd6de;
}
.caret {
  justify-self: end;
  color: var(--ar-red);
  font: 700 16px/1 var(--font-mono);
  transition: transform 180ms cubic-bezier(0.23, 1, 0.32, 1);
}
.row.open .caret {
  transform: rotate(45deg);
}
.row-head:active {
  transform: translateX(1px);
}
@media (hover: hover) and (pointer: fine) {
  .row-head:hover .org {
    color: #ffd6de;
  }
}
.row-body {
  padding: 2px 0 14px 46px;
  animation: row-in 220ms cubic-bezier(0.23, 1, 0.32, 1);
}
@keyframes row-in {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
}
.works-nav {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}
.arrow {
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  border: 1px solid var(--ar-red);
  border-radius: 2px;
  color: var(--ar-red);
  font: 700 15px/1 var(--font-mono);
  cursor: pointer;
  transition: transform 140ms cubic-bezier(0.23, 1, 0.32, 1), background-color 160ms ease;
}
.arrow:active {
  transform: scale(0.95);
}
@media (hover: hover) and (pointer: fine) {
  .arrow:hover {
    background: rgba(255, 0, 51, 0.15);
  }
}
.index {
  min-width: 44px;
  text-align: center;
  color: #fff;
  font-size: 13px;
}
.hint {
  margin-left: auto;
  color: rgba(255, 0, 51, 0.7);
  text-transform: uppercase;
  font-size: 10px;
}
.work-title {
  margin: 4px 0 8px;
  font: 800 30px/0.95 var(--font-display);
  font-stretch: 88%;
  letter-spacing: -0.015em;
  text-transform: uppercase;
}
.status {
  margin: 0 0 4px;
  color: #ffd6de;
}
.desc {
  margin: 12px 0;
}
.stats {
  margin: 0 0 14px;
}
.stats li {
  color: var(--ar-red);
  padding: 2px 0;
}
.links {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin: 16px 0 0;
}
.links a {
  color: var(--ar-red);
  text-decoration: underline;
  text-underline-offset: 3px;
  font: 500 12px/1.4 var(--font-mono);
}

/* awards shelf */
.awards li {
  display: grid;
  grid-template-columns: 44px 1fr auto;
  gap: 2px 12px;
  align-items: start;
  padding: 10px 0;
  border-top: 1px solid rgba(255, 0, 51, 0.18);
}
.awards li.featured {
  background: linear-gradient(90deg, rgba(255, 194, 74, 0.1), transparent 70%);
  margin: 0 -8px;
  padding-left: 8px;
  padding-right: 8px;
}
.medal {
  display: inline-grid;
  place-items: center;
  height: 24px;
  padding: 0 4px;
  border-radius: 2px;
  font: 800 10px/1 var(--font-display);
  font-stretch: 88%;
  letter-spacing: 0.02em;
  border: 1px solid currentColor;
  color: rgba(255, 255, 255, 0.6);
}
.gold .medal {
  color: #ffc24a;
  background: rgba(255, 194, 74, 0.12);
  box-shadow: 0 0 10px rgba(255, 194, 74, 0.35);
}
.silver .medal {
  color: #dfe3ee;
  background: rgba(223, 227, 238, 0.08);
}
.bronze .medal {
  color: #ff9a6b;
  background: rgba(255, 154, 107, 0.1);
}
.a-main {
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 0;
}
.a-title {
  font-weight: 600;
}
.a-detail {
  color: rgba(255, 255, 255, 0.6);
  font-size: 13px;
}
.year {
  white-space: nowrap;
  padding-top: 4px;
}

.pills {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.pill {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border: 1px solid var(--ar-red);
  border-radius: 999px;
  color: #fff;
  background: rgba(255, 0, 51, 0.08);
  box-shadow: 0 0 16px rgba(255, 0, 51, 0.25), inset 0 0 10px rgba(255, 0, 51, 0.12);
  transition: transform 140ms cubic-bezier(0.23, 1, 0.32, 1), background-color 160ms ease, box-shadow 160ms ease;
  word-break: break-all;
}
.pill .mono {
  min-width: 72px;
  color: var(--ar-red);
  text-transform: uppercase;
}
.pill:active {
  transform: scale(0.98);
}
@media (hover: hover) and (pointer: fine) {
  .pill:hover {
    background: rgba(255, 0, 51, 0.18);
    box-shadow: 0 0 26px rgba(255, 0, 51, 0.45), inset 0 0 12px rgba(255, 0, 51, 0.2);
  }
}
.close:focus-visible,
.arrow:focus-visible,
.pill:focus-visible,
.row-head:focus-visible,
.links a:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 2px;
}

/* drawer: in from the right on the iOS drawer curve, out the same way, faster */
.drawer-enter-active {
  transition: transform 420ms cubic-bezier(0.32, 0.72, 0, 1), opacity 260ms ease;
}
.drawer-leave-active {
  transition: transform 240ms cubic-bezier(0.32, 0.72, 0, 1), opacity 200ms ease;
}
.drawer-enter-from,
.drawer-leave-to {
  transform: translateX(calc(100% + 24px));
  opacity: 0.4;
}

/* project change: short, direction-aware slide + fade */
.work-next-enter-active,
.work-next-leave-active,
.work-prev-enter-active,
.work-prev-leave-active {
  transition: transform 180ms cubic-bezier(0.23, 1, 0.32, 1), opacity 180ms cubic-bezier(0.23, 1, 0.32, 1);
}
.work-next-enter-from,
.work-prev-leave-to {
  transform: translateX(16px);
  opacity: 0;
}
.work-next-leave-to,
.work-prev-enter-from {
  transform: translateX(-16px);
  opacity: 0;
}

@media (max-width: 520px) {
  .panel {
    top: auto;
    left: 8px;
    right: 8px;
    bottom: 84px; /* clear of the shared mode switch */
    width: auto;
    max-height: calc(100dvh - 150px);
  }
  .drawer-enter-from,
  .drawer-leave-to {
    transform: translateY(calc(100% + 16px));
  }
  .title {
    font-size: 40px;
  }
  .meta-row {
    grid-template-columns: 1fr 1fr;
  }
  .row-body {
    padding-left: 0;
  }
}
@media (prefers-reduced-motion: reduce) {
  .drawer-enter-from,
  .drawer-leave-to,
  .work-next-enter-from,
  .work-next-leave-to,
  .work-prev-enter-from,
  .work-prev-leave-to {
    transform: none;
  }
  .drawer-enter-from,
  .drawer-leave-to {
    opacity: 0;
  }
  .row-body {
    animation: none;
  }
}
</style>
