<script setup lang="ts">
/** Experience: title block, then work/research and leadership as accordion rows. */
import { onMounted, onUnmounted, ref } from "vue";
import { experiences, leadership } from "../../../content/leo";
import TitleBlock from "../components/TitleBlock.vue";
import ArchiveRow from "../components/ArchiveRow.vue";
import type { ArchiveItem } from "../lib/types";
import { EASE_REVEAL, ScrollTrigger, gsap, reducedMotion } from "../lib/motion";

const work: ArchiveItem[] = experiences.map((e, i) => ({
  n: i + 1,
  org: e.org,
  role: e.role,
  period: e.period,
  location: e.location,
  current: e.status === "active",
  desc: e.desc,
  details: e.details,
  highlights: e.highlights,
  tags: e.tags,
  logo: e.logo,
  photo: e.photo,
}));
const lead: ArchiveItem[] = leadership.map((l, i) => ({
  n: experiences.length + i + 1,
  org: l.org,
  role: l.role,
  period: l.period,
  location: l.location,
  current: l.status === "active",
  desc: l.desc,
  details: l.details,
  highlights: l.highlights,
  tags: l.tags,
  logo: l.logo,
  photo: l.photo,
  links: l.links,
}));

const root = ref<HTMLElement | null>(null);
let ctx: gsap.Context | null = null;

onMounted(() => {
  if (!root.value || reducedMotion) return;
  ctx = gsap.context(() => {
    gsap.utils.toArray<HTMLElement>(".h-mask").forEach((h) => {
      gsap.from(h.querySelector(".h-in"), {
        yPercent: 110,
        duration: 1.1,
        ease: EASE_REVEAL,
        scrollTrigger: { trigger: h, start: "top 90%", once: true },
      });
    });
    gsap.set(".arow", { opacity: 0 });
    ScrollTrigger.batch(".arow", {
      start: "top 95%",
      once: true,
      onEnter: (els) => gsap.fromTo(els, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power2.out", stagger: 0.05, overwrite: true }),
    });
  }, root.value);
});
onUnmounted(() => ctx?.revert());
</script>

<template>
  <div ref="root" class="exp-page">
    <TitleBlock short bg="/images/Leo.jpeg" :sets="[['Experience']]" subtitle="Research, internships, work, and my leadership positions." />

    <section class="group" data-nav="dark" aria-labelledby="work-head">
      <h2 id="work-head" class="group-title h-mask"><span class="h-in">Experience <span class="n">({{ work.length }})</span></span></h2>
      <ul class="rows">
        <ArchiveRow v-for="a in work" :key="a.n" :item="a" />
      </ul>
    </section>

    <section class="group" data-nav="dark" aria-labelledby="lead-head">
      <h2 id="lead-head" class="group-title h-mask"><span class="h-in">Leadership <span class="n">({{ lead.length }})</span></span></h2>
      <ul class="rows">
        <ArchiveRow v-for="a in lead" :key="a.n" :item="a" />
      </ul>
    </section>
  </div>
</template>

<style scoped>
.exp-page {
  background: var(--ed-bg);
  padding-bottom: 8vw;
}
.group {
  padding: 3vw 1.4vw 3vw;
}
.group-title {
  margin: 0 0 1.4vw;
  font-family: var(--font-title);
  font-variation-settings: "wght" 622;
  font-stretch: 92%;
  font-weight: 400;
  text-transform: uppercase;
  font-size: clamp(28px, 2.36vw, 68px);
  line-height: 1;
  letter-spacing: -0.01em;
}
.n {
  margin-left: 0.4em;
  font: 500 12px/1 var(--font-mono);
  letter-spacing: 0.04em;
  vertical-align: 0.9em;
  text-transform: none;
}
.h-mask {
  overflow: hidden;
  padding-bottom: 0.15em;
  line-height: 1.15;
}
.h-in {
  display: block;
}
.rows {
  list-style: none;
  margin: 0;
  padding: 0;
  border-top: 1px solid #e4e4e4;
}
@media (max-width: 799px) {
  .group {
    padding: 32px 20px;
  }
  .group-title {
    margin-bottom: 14px;
  }
}
</style>
