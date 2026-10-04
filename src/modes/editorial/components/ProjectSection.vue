<script setup lang="ts">
/**
 * One project as a full section: number + title header, then a two-column
 * body with the project's visual (video / logo / figures / embedded game) on
 * the left and the write-up on the right.
 */
import { computed, onMounted, onUnmounted, ref } from "vue";
import type { Project } from "../../../content/leo";
import { EASE_REVEAL, gsap, reducedMotion } from "../lib/motion";

const props = defineProps<{ project: Project; index: number }>();

const root = ref<HTMLElement | null>(null);
const video = ref<HTMLVideoElement | null>(null);
const embedOn = ref(false);

const num = computed(() => String(props.index + 1).padStart(2, "0"));
const v = computed(() => props.project.visual);
const isExternal = (href: string) => /^https?:/.test(href);

let ctx: gsap.Context | null = null;
let io: IntersectionObserver | null = null;
let vio: IntersectionObserver | null = null;

/** Safety net: some browsers stop at the end despite `loop`. */
function onEnded() {
  const vid = video.value;
  if (!vid) return;
  vid.currentTime = 0;
  vid.play().catch(() => undefined);
}

onMounted(() => {
  if (!root.value) return;
  // embeds load once the section is near the viewport
  io = new IntersectionObserver(
    ([e]) => {
      if (e.isIntersecting) {
        embedOn.value = true;
        io?.disconnect();
      }
    },
    { rootMargin: "200px 0px" },
  );
  io.observe(root.value);
  // videos play while any part is visible and pause only once fully out of view
  const vid = video.value;
  if (vid) {
    vio = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        if (!reducedMotion && vid.paused) vid.play().catch(() => undefined);
      } else if (!vid.paused) {
        vid.pause();
      }
    });
    vio.observe(vid);
  }

  if (reducedMotion) return;
  ctx = gsap.context(() => {
    gsap.from(".h-in", {
      yPercent: 110,
      duration: 1.1,
      ease: EASE_REVEAL,
      stagger: 0.06,
      scrollTrigger: { trigger: ".head", start: "top 88%", once: true },
    });
    gsap.from(".visual", {
      clipPath: "inset(8% 6% 8% 6%)",
      opacity: 0,
      duration: 1.4,
      ease: "expo.out",
      scrollTrigger: { trigger: ".visual", start: "top 88%", once: true },
    });
    gsap.from(".t", {
      y: 24,
      opacity: 0,
      duration: 0.9,
      ease: "power2.out",
      stagger: 0.06,
      scrollTrigger: { trigger: ".body", start: "top 85%", once: true },
    });
  }, root.value);
});

onUnmounted(() => {
  io?.disconnect();
  vio?.disconnect();
  ctx?.revert();
});
</script>

<template>
  <article ref="root" class="ps" :aria-labelledby="`p-${project.slug}`">
    <header class="head">
      <span class="mask num-mask"><span class="h-in num">{{ num }}</span></span>
      <h2 :id="`p-${project.slug}`" class="mask title"><span class="h-in">{{ project.title }}</span></h2>
      <p class="mask sub"><span class="h-in">{{ project.category }} · {{ project.year }} · {{ project.status }}</span></p>
    </header>

    <div class="body">
        <div class="visual" :class="`k-${v.kind}`">
          <template v-if="v.kind === 'video'">
            <img v-if="project.logo" class="v-logo" :src="project.logo" alt="" />
            <video
              ref="video"
              class="vid"
              :src="v.src"
              :poster="v.poster"
              muted
              loop
              playsinline
              :autoplay="!reducedMotion"
              preload="metadata"
              :aria-label="v.caption"
              @ended="onEnded"
            />
            <p class="caption">{{ v.caption }}</p>
          </template>

          <div v-else-if="v.kind === 'logo'" class="logo-panel" :style="{ background: v.bg ?? 'var(--ed-grey)' }">
            <img :src="v.src" :alt="v.alt" loading="lazy" decoding="async" />
          </div>

          <ul v-else-if="v.kind === 'figures'" class="figs">
            <li v-for="f in v.items" :key="f.src" class="fig">
              <img :src="f.src" :alt="f.caption" loading="lazy" decoding="async" />
              <p class="caption">{{ f.caption }}</p>
            </li>
          </ul>

          <template v-else>
            <div class="embed">
              <iframe v-if="embedOn" :src="v.src" :title="v.title" loading="lazy" allow="autoplay; fullscreen; gamepad" allowfullscreen />
              <span v-else class="embed-wait">Loading the game…</span>
            </div>
            <p class="caption embed-row">
              <span>{{ v.note }}</span>
              <a class="ulink" :href="v.fullscreenHref" target="_blank" rel="noopener" data-sfx="pop">Fullscreen ↗</a>
            </p>
          </template>
        </div>

        <p class="t tagline">{{ project.tagline }}</p>
        <p class="t who">{{ project.role }} · {{ project.team }}</p>
        <p v-for="(para, i) in project.overview" :key="i" class="t para">{{ para }}</p>
        <div v-if="project.keyFinding" class="t finding">
          <p class="label">Key finding</p>
          <p class="f-head">{{ project.keyFinding.headline }}</p>
          <p class="f-detail">{{ project.keyFinding.detail }}</p>
        </div>
        <div v-if="project.highlights.length" class="t highlights">
          <p class="label">Highlights</p>
          <ul>
            <li v-for="h in project.highlights" :key="h">{{ h }}</li>
          </ul>
        </div>
        <p class="t pstats">{{ project.stats.join(" · ") }}</p>
        <ul class="t chips" aria-label="Tech">
          <li v-for="t in project.tech" :key="t" class="chip">{{ t }}</li>
        </ul>
        <p class="t links">
          <a
            v-for="l in project.links"
            :key="l.href"
            class="ulink"
            data-sfx="thud"
            :href="l.href"
            :target="isExternal(l.href) ? '_blank' : undefined"
            :rel="isExternal(l.href) ? 'noopener' : undefined"
          >
            {{ l.label }} <span aria-hidden="true">↗</span>
          </a>
        </p>
    </div>
  </article>
</template>

<style scoped>
.ps {
  padding: 160px var(--pad-x) 160px 1.4vw;
  border-top: 1px solid #e4e4e4;
  background: var(--ed-bg);
  color: var(--ed-ink);
}
.head {
  display: grid;
  grid-template-columns: 3vw 1fr;
  column-gap: 0;
  align-items: baseline;
  margin-bottom: 4vw;
}
.mask {
  display: block;
  overflow: hidden;
  margin: 0;
  padding-bottom: 0.15em;
}
.h-in {
  display: block;
}
.num {
  font: 500 clamp(12px, 0.97vw, 28px) / 1 var(--font-mono);
}
.title {
  font-family: var(--font-title);
  font-variation-settings: "wght" 622;
  font-stretch: 92%;
  font-weight: 400;
  text-transform: uppercase;
  font-size: clamp(34px, 4.2vw, 120px);
  line-height: 0.92;
  letter-spacing: -0.01em;
}
.sub {
  grid-column: 2;
  margin-top: 0.9vw;
  font: 400 clamp(13px, 1.04vw, 28px) / 1.3 var(--font-body);
  color: rgba(2, 32, 22, 0.5);
}
.body {
  display: flow-root; /* contains the floated visual */
  padding-left: 3vw;
}
.visual {
  float: left;
  width: 58%;
  margin: 0 48px 24px 0;
}
/* blocks with borders or their own layout sit beside the float, then go full width below it */
.finding,
.highlights,
.chips,
.links {
  display: flow-root;
}
.t {
  margin: 0 0 1.4vw;
}
.caption {
  margin: 12px 0 0;
  font: 400 13px/1.4 var(--font-body);
  color: rgba(2, 32, 22, 0.55);
}
.v-logo {
  height: 56px;
  width: auto;
  margin-bottom: 18px;
}
.vid {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  background: var(--ed-grey);
}
.logo-panel {
  height: 36vh;
  min-height: 240px;
  display: grid;
  place-items: center;
}
.logo-panel img {
  max-width: 46%;
  max-height: 70%;
  object-fit: contain;
}
.figs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px 20px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.fig img {
  width: 100%;
  aspect-ratio: 3 / 2;
  object-fit: contain;
  background: #fff;
  border: 1px solid #e4e4e4;
}
.embed {
  position: relative;
  aspect-ratio: 16 / 10;
  border: 1px solid var(--ed-ink);
  background: #000;
  display: grid;
  place-items: center;
}
.embed iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}
.embed-wait {
  font: 400 13px/1 var(--font-mono);
  color: rgba(247, 247, 247, 0.6);
}
.embed-row {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}
.tagline {
  font: 400 clamp(20px, 1.9vw, 52px) / 1.22 var(--font-body);
  letter-spacing: -0.01em;
}
.who {
  margin-top: -0.6vw;
  font: 400 13px/1.4 var(--font-body);
  color: rgba(2, 32, 22, 0.55);
}
.para {
  font: 400 clamp(15px, 1.11vw, 28px) / 1.6 var(--font-body);
}
.finding {
  padding: 22px 24px;
  border: 1px solid var(--ed-ink);
}
.label {
  margin: 0 0 10px;
  font: 500 12px/1 var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: rgba(2, 32, 22, 0.55);
}
.f-head {
  margin: 0;
  font-family: var(--font-title);
  font-variation-settings: "wght" 622;
  font-stretch: 92%;
  font-size: clamp(20px, 1.6vw, 44px);
  line-height: 1.1;
}
.f-detail {
  margin: 12px 0 0;
  font: 400 15px/1.55 var(--font-body);
  color: rgba(2, 32, 22, 0.75);
}
.highlights ul {
  margin: 0;
  padding-left: 1.1em;
  font: 400 clamp(14px, 1.04vw, 26px) / 1.55 var(--font-body);
}
.highlights li + li {
  margin-top: 6px;
}
.pstats {
  font: 500 12px/1.4 var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: rgba(2, 32, 22, 0.6);
}
.chips {
  padding: 0;
  list-style: none;
}
.chips .chip {
  display: inline-block;
  margin: 0 8px 8px 0;
}
.chip {
  padding: 6px 12px 5px;
  border: 1px solid var(--ed-ink);
  border-radius: 999px;
  font: 400 13px/1 var(--font-body);
}
.links {
  margin-bottom: 0;
  font: 400 clamp(13px, 1.04vw, 28px) / 1.25 var(--font-body);
}
.links .ulink {
  display: inline-block;
  margin-right: 24px;
}
.ulink {
  text-decoration: underline;
  text-underline-offset: 5px;
  text-decoration-thickness: 1px;
  transition: text-decoration-color 0.25s ease;
}
@media (hover: hover) and (pointer: fine) {
  .ulink:hover {
    text-decoration-color: rgba(2, 32, 22, 0.35);
  }
}
.ulink:focus-visible {
  outline: 1px solid currentColor;
  outline-offset: 4px;
}
@media (max-width: 899px) {
  .ps {
    padding: 96px 20px;
  }
  .head {
    grid-template-columns: 40px 1fr;
    margin-bottom: 32px;
  }
  .body {
    padding-left: 0;
  }
  .visual {
    float: none;
    width: 100%;
    margin: 0 0 36px;
  }
  .t {
    margin-bottom: 18px;
  }
  .who {
    margin-top: -8px;
  }
}
@media (max-width: 560px) {
  .figs {
    grid-template-columns: 1fr;
  }
}
</style>
