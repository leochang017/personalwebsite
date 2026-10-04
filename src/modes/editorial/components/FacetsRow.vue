<script setup lang="ts">
/**
 * Six facets as pill tabs; the active one's line is shown below at 2.36vw
 * with the line-mask reveal. Auto-advances every 5s, pauses on hover/focus
 * and while off-screen.
 */
import { nextTick, onMounted, onUnmounted, ref } from "vue";
import { facets } from "../../../content/leo";
import { EASE_REVEAL, ScrollTrigger, gsap, reducedMotion } from "../lib/motion";

const active = ref(0);
const shown = ref(0);
const root = ref<HTMLElement | null>(null);
const lineEl = ref<HTMLElement | null>(null);
let hovering = false;
function setHover(v: boolean) {
  hovering = v;
}
let inView = false;
let call: gsap.core.Tween | null = null;
let st: ScrollTrigger | null = null;
let outTw: gsap.core.Tween | null = null;
let inTw: gsap.core.Tween | null = null;

function schedule() {
  call?.kill();
  if (reducedMotion) return;
  call = gsap.delayedCall(5, () => {
    if (!hovering && inView) select((active.value + 1) % facets.length, false);
    else schedule();
  });
}

function select(i: number, fromUser = true) {
  if (i === active.value && fromUser) return;
  active.value = i;
  const el = lineEl.value;
  if (!el || reducedMotion) {
    shown.value = i;
    schedule();
    return;
  }
  call?.kill();
  outTw?.kill();
  inTw?.kill();
  outTw = gsap.to(el, {
    yPercent: -110,
    duration: 0.45,
    ease: EASE_REVEAL,
    onComplete: () => {
      shown.value = i;
      nextTick(() => {
        inTw = gsap.fromTo(el, { yPercent: 110 }, { yPercent: 0, duration: 0.9, ease: EASE_REVEAL, onComplete: schedule });
      });
    },
  });
}

function onKey(e: KeyboardEvent, i: number) {
  if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
  e.preventDefault();
  const n = (i + (e.key === "ArrowRight" ? 1 : facets.length - 1)) % facets.length;
  select(n);
  root.value?.querySelectorAll<HTMLButtonElement>(".tab")[n]?.focus();
}

onMounted(() => {
  if (!root.value) return;
  st = ScrollTrigger.create({
    trigger: root.value,
    start: "top bottom",
    end: "bottom top",
    onToggle: (self) => {
      inView = self.isActive;
    },
  });
  if (!reducedMotion) {
    gsap.from(Array.from(root.value.querySelectorAll(".tab")), {
      y: 16,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.05,
      scrollTrigger: { trigger: root.value, start: "top 85%", once: true },
    });
    gsap.from(lineEl.value, {
      yPercent: 110,
      duration: 1.1,
      ease: EASE_REVEAL,
      scrollTrigger: { trigger: root.value, start: "top 85%", once: true },
    });
  }
  schedule();
});
onUnmounted(() => {
  call?.kill();
  outTw?.kill();
  inTw?.kill();
  st?.kill();
});
</script>

<template>
  <section
    ref="root"
    class="facets"
    data-nav="dark"
    @pointerenter="setHover(true)"
    @pointerleave="setHover(false)"
    @focusin="setHover(true)"
    @focusout="setHover(false)"
  >
    <div class="tabs" role="tablist" aria-label="Facets">
      <button
        v-for="(f, i) in facets"
        :id="`facet-tab-${i}`"
        :key="f.label"
        class="tab"
        data-sfx="tick"
        data-sfx-hover
        :class="{ on: i === active }"
        type="button"
        role="tab"
        :aria-selected="i === active"
        aria-controls="facet-panel"
        :tabindex="i === active ? 0 : -1"
        @click="select(i)"
        @keydown="onKey($event, i)"
      >
        {{ f.label }}
      </button>
    </div>
    <div id="facet-panel" class="panel" role="tabpanel" :aria-labelledby="`facet-tab-${active}`">
      <p class="mask"><span ref="lineEl" class="line">{{ facets[shown].line }}</span></p>
    </div>
  </section>
</template>

<style scoped>
.facets {
  padding: 2vw 9.6vw 7vw;
  background: var(--ed-bg);
  color: var(--ed-ink);
}
.tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
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
.panel {
  margin-top: 2.6vw;
}
.mask {
  margin: 0;
  overflow: hidden;
  padding-bottom: 0.15em;
  max-width: 62vw;
  min-height: 2.36em; /* two lines reserved so switching facets never shifts the page */
  font: 400 clamp(22px, 2.36vw, 68px) / 1.18 var(--font-body);
  letter-spacing: -0.01em;
}
.line {
  display: block;
  will-change: transform;
}
@media (max-width: 799px) {
  .facets {
    padding: 24px 20px 64px;
  }
  .tab {
    font-size: 12px;
  }
  .mask {
    max-width: none;
  }
  .panel {
    margin-top: 24px;
  }
}
</style>
