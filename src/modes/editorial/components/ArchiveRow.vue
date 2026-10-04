<script setup lang="ts">
/**
 * Archive accordion row: N · Org · Role · Period · Place · chevron.
 * Opens to the full role + description. Hover draws a green underline and
 * the cursor pill reads DISCOVER MORE.
 */
import { computed, nextTick, onUnmounted, ref } from "vue";
import { EASE_REVEAL, ScrollTrigger, gsap, reducedMotion } from "../lib/motion";
import type { ArchiveItem } from "../lib/types";
import { sfx } from "../lib/sfx";

const props = defineProps<{ item: ArchiveItem }>();
const open = ref(false);
/** two text columns only when there's enough text to fill them */
const twoCols = computed(() => props.item.details.join(" ").length >= 900);
/** logos and other small images sit centred at their own size instead of being stretched */
const photoSmall = ref(false);
function onPhotoLoad(e: Event) {
  const img = e.target as HTMLImageElement;
  const panelW = img.parentElement?.clientWidth ?? 0;
  // smaller than the panel both ways: show at natural size (never upscaled), capped at 70% width
  photoSmall.value = img.naturalWidth < panelW && img.naturalHeight < 320;
}
const panel = ref<HTMLElement | null>(null);
const id = `arch-${props.item.n}`;
let tw: gsap.core.Timeline | null = null;

function toggle() {
  open.value = !open.value;
  sfx(open.value ? "open" : "close");
  nextTick(() => {
    const el = panel.value;
    if (!el) return;
    tw?.kill();
    const inner = el.querySelector(".inner");
    if (reducedMotion) {
      gsap.set(el, { height: open.value ? "auto" : 0 });
      ScrollTrigger.refresh();
      return;
    }
    tw = gsap.timeline({ onComplete: () => ScrollTrigger.refresh() });
    if (open.value) {
      tw.fromTo(el, { height: el.offsetHeight }, { height: "auto", duration: 0.7, ease: EASE_REVEAL }).fromTo(
        inner,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
        0.12,
      );
    } else {
      tw.to(inner, { opacity: 0, duration: 0.2, ease: "power2.out" }).to(el, { height: 0, duration: 0.5, ease: EASE_REVEAL }, 0);
    }
  });
}

onUnmounted(() => tw?.kill());
</script>

<template>
  <li class="arow" :class="{ open }">
    <button class="head" type="button" :aria-expanded="open" :aria-controls="id" data-cursor="Discover more" @click="toggle">
      <span class="c n">{{ item.n }}</span>
      <span class="c org">
        <span class="logo" aria-hidden="true">
          <img v-if="item.logo" :src="item.logo" alt="" loading="lazy" decoding="async" />
          <span v-else>{{ item.org.charAt(0) }}</span>
        </span>
        <span class="org-name">{{ item.org }}</span>
      </span>
      <span class="c role">{{ item.role }}</span>
      <span class="c period">{{ item.period }}</span>
      <span class="c place">
        <span class="place-name">{{ item.location }}</span>
        <span class="status" :class="{ on: item.current }">{{ item.current ? "Current" : "Completed" }}</span>
      </span>
      <svg class="chev" viewBox="0 0 10 6" aria-hidden="true"><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.2" /></svg>
    </button>
    <div :id="id" ref="panel" class="panel" role="region" :aria-label="`${item.org} details`">
      <div class="inner">
        <p class="full-role">{{ item.role }}</p>
        <p class="desc">{{ item.desc }}</p>
        <div v-if="item.details.length || item.photo" class="details" :class="{ 'has-photo': !!item.photo }">
          <div class="detail-text" :class="{ cols: twoCols }">
            <p v-for="(d, i) in item.details" :key="i" class="detail">{{ d }}</p>
          </div>
          <figure v-if="item.photo" class="photo">
            <div class="photo-panel" :class="{ small: photoSmall }">
              <img :src="item.photo.src" :alt="item.photo.alt" loading="lazy" decoding="async" @load="onPhotoLoad" />
            </div>
            <figcaption>
              {{ item.photo.alt }}<template v-if="item.photo.credit"> · Photo: {{ item.photo.credit }}</template>
            </figcaption>
          </figure>
        </div>
        <div v-if="item.highlights.length" class="hl">
          <p class="label">Highlights</p>
          <ul>
            <li v-for="h in item.highlights" :key="h">{{ h }}</li>
          </ul>
        </div>
        <ul v-if="item.tags.length" class="tags" aria-label="Tags">
          <li v-for="t in item.tags" :key="t" class="tag">{{ t }}</li>
        </ul>
        <p v-if="item.links?.length" class="links">
          <a v-for="l in item.links" :key="l.href" :href="l.href" target="_blank" rel="noopener" data-sfx="pop">{{ l.label }} ↗</a>
        </p>
      </div>
    </div>
  </li>
</template>

<style scoped>
.arow {
  position: relative;
  border-bottom: 1px solid #e4e4e4;
}
.head {
  position: relative;
  isolation: isolate;
  width: 100%;
  display: grid;
  grid-template-columns: 3vw 21.6vw 24.7vw 24.65vw 1fr 16px;
  align-items: center;
  min-height: 45px;
  padding: 12px 0;
  text-align: left;
  cursor: pointer;
  font: 400 clamp(12px, 0.97vw, 28px) / 1.25 var(--font-body);
}
.head::before {
  content: "";
  position: absolute;
  inset: 0 calc(-1 * 1.4vw);
  background: #efefef;
  opacity: 0;
  transition: opacity 0.35s ease;
  z-index: -1;
}
.head::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 1px;
  background: var(--ed-green);
  transform: scaleX(0);
  transform-origin: 100% 50%;
  transition: transform 0.7s cubic-bezier(0.6, 0, 0.25, 1);
}
@media (hover: hover) and (pointer: fine) {
  .head:hover::before {
    opacity: 1;
  }
  .head:hover::after {
    transform: scaleX(1);
    transform-origin: 0% 50%;
  }
}
.open .head::after {
  transform: scaleX(1);
}
.head:focus-visible {
  outline: 1px solid var(--ed-ink);
  outline-offset: -1px;
}
.c {
  padding-right: 1.4vw;
}
.role {
  color: rgba(2, 32, 22, 0.4);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.chev {
  width: 9px;
  height: 6px;
  justify-self: end;
  transition: transform 0.5s cubic-bezier(0.6, 0, 0.25, 1);
}
.open .chev {
  transform: rotate(180deg);
}
.panel {
  height: 0;
  overflow: hidden;
}
.inner {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 10px 0 44px 4.4vw;
}
.inner p {
  margin: 0;
}
.full-role {
  font-size: clamp(12px, 0.97vw, 28px);
  color: rgba(2, 32, 22, 0.45);
}
.desc {
  font: 500 clamp(16px, 1.18vw, 30px) / 1.55 var(--font-body);
}
.details.has-photo {
  display: grid;
  grid-template-columns: 1fr 38%;
  column-gap: 40px;
  align-items: start;
}
.detail-text.cols {
  columns: 2;
  column-gap: 40px;
}
.details:not(.has-photo) .detail-text {
  columns: 2;
  column-gap: 40px;
}
.detail {
  font: 400 15px/1.6 var(--font-body);
  color: rgba(2, 32, 22, 0.82);
}
.detail + .detail {
  margin-top: 1em !important;
}
.label {
  margin: 4px 0 10px !important;
  font: 500 12px/1 var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: rgba(2, 32, 22, 0.55);
}
.hl ul {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px 48px;
  margin: 0;
  padding-left: 1.1em;
  font: 400 15px/1.5 var(--font-body);
}
.links {
  display: flex;
  gap: 20px;
  font-size: 14px;
}
.links a {
  text-decoration: underline;
  text-underline-offset: 4px;
}
.photo {
  margin: 0;
}
.photo-panel img {
  display: block;
  width: 100%;
  height: auto;
  max-height: 360px;
  object-fit: contain;
  object-position: left top;
}
/* small images (logos): grey panel, natural size, never upscaled */
.photo-panel.small {
  display: grid;
  place-items: center;
  min-height: 180px;
  background: var(--ed-grey);
}
.photo-panel.small img {
  width: auto;
  max-width: 70%;
  object-position: center;
}
.photo figcaption {
  overflow-wrap: anywhere;
  margin-top: 8px;
  font: 400 12px/1.4 var(--font-body);
  color: rgba(2, 32, 22, 0.55);
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 4px 0 0;
  padding: 0;
  list-style: none;
}
.tag {
  padding: 6px 12px 5px;
  border: 1px solid var(--ed-ink);
  border-radius: 999px;
  font: 400 13px/1 var(--font-body);
}
.org {
  display: flex;
  align-items: center;
  gap: 12px;
}
.logo {
  flex: none;
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  background: #fff;
  border: 1px solid #e4e4e4;
  overflow: hidden;
  font: 500 12px/1 var(--font-mono);
  color: rgba(2, 32, 22, 0.5);
}
.logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 3px;
}
.place {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}
.status {
  padding: 4px 9px 3px;
  border-radius: 999px;
  font: 500 11px/1 var(--font-body);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: rgba(2, 32, 22, 0.5);
  border: 1px solid #d9d9d9;
}
.status.on {
  background: var(--ed-green);
  border-color: var(--ed-green);
  color: var(--ed-pink);
}
@media (max-width: 899px) {
  .details.has-photo {
    grid-template-columns: 1fr;
    row-gap: 20px;
  }
  .detail-text.cols,
  .details:not(.has-photo) .detail-text {
    columns: 1;
  }
  .hl ul {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 799px) {
  .head {
    grid-template-columns: 28px 1fr auto 14px;
    row-gap: 4px;
    font-size: 13px;
  }
  .role,
  .place-name {
    display: none;
  }
  .head {
    grid-template-columns: 28px 1fr auto auto 14px;
    column-gap: 8px;
  }
  .period {
    color: rgba(2, 32, 22, 0.45);
  }
  .inner {
    padding: 4px 0 28px 28px;
  }
}
</style>
