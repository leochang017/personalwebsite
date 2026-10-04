<script setup lang="ts">
/** Four giant router-link rows into the rest of the site. */
import { onMounted, onUnmounted, ref } from "vue";
import { pathways } from "../../../content/leo";
import { ScrollTrigger, gsap, reducedMotion } from "../lib/motion";

const root = ref<HTMLElement | null>(null);
let ctx: gsap.Context | null = null;

onMounted(() => {
  if (!root.value || reducedMotion) return;
  ctx = gsap.context(() => {
    gsap.set(".pw", { opacity: 0 });
    ScrollTrigger.batch(".pw", {
      start: "top 94%",
      once: true,
      onEnter: (els) => gsap.fromTo(els, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power2.out", stagger: 0.07, overwrite: true }),
    });
  }, root.value);
});
onUnmounted(() => ctx?.revert());
</script>

<template>
  <section ref="root" class="pathways" data-nav="dark" aria-label="Explore">
    <ul class="list">
      <li v-for="p in pathways" :key="p.route" class="pw">
        <RouterLink :to="{ name: p.route }" class="row" data-sfx="thud">
          <span class="word">{{ p.word }}</span>
          <span class="chip">{{ p.count }}</span>
          <span class="desc">{{ p.desc }}</span>
          <span class="arrow" aria-hidden="true">→</span>
        </RouterLink>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.pathways {
  padding: 4vw 1.4vw 9vw;
  background: var(--ed-bg);
  color: var(--ed-ink);
}
.list {
  list-style: none;
  margin: 0;
  padding: 0;
  border-top: 1px solid #e4e4e4;
}
.pw {
  border-bottom: 1px solid #e4e4e4;
}
.row {
  position: relative;
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  align-items: center;
  column-gap: 1.6vw;
  padding: 2.2vw 0 1.9vw;
}
.row::after {
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
.word {
  font-family: var(--font-title);
  font-variation-settings: "wght" 622;
  font-stretch: 92%;
  text-transform: uppercase;
  font-size: clamp(40px, 5vw, 144px);
  line-height: 0.9;
  letter-spacing: -0.01em;
}
.chip {
  align-self: start;
  margin-top: 0.4vw;
  padding: 5px 9px 4px;
  border: 1px solid currentColor;
  border-radius: 999px;
  font: 500 12px/1 var(--font-mono);
}
.desc {
  justify-self: end;
  text-align: right;
  font: 400 15px/1.3 var(--font-body);
  color: rgba(2, 32, 22, 0.5);
}
.arrow {
  margin-left: 2vw;
  font-size: clamp(22px, 2vw, 56px);
  transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
}
@media (hover: hover) and (pointer: fine) {
  .row:hover::after {
    transform: scaleX(1);
    transform-origin: 0% 50%;
  }
  .row:hover .arrow {
    transform: translateX(12px);
  }
}
.row:focus-visible {
  outline: 1px solid var(--ed-ink);
  outline-offset: 4px;
}
@media (max-width: 799px) {
  .pathways {
    padding: 40px 20px 72px;
  }
  .row {
    grid-template-columns: auto 1fr auto;
    row-gap: 8px;
    padding: 22px 0;
  }
  .desc {
    grid-column: 1 / -1;
    grid-row: 2;
    justify-self: start;
    text-align: left;
  }
  .chip {
    justify-self: start;
  }
}
</style>
