<script setup lang="ts">
/**
 * The about text set as giant pink lines on green. Every ✿ is
 * a live 3D mini dumpling drawn by one shared renderer (scissor per glyph);
 * falls back to the dumpling SVG if WebGL is unavailable. Lines reveal with
 * the clip-mask slide-up.
 */
import { onMounted, onUnmounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useModeStore } from "../../../stores/mode";
import { DumplingGlyphs } from "./DumplingGlyphs";
import { RenderLoop } from "../three/sceneKit";
import { EASE_REVEAL, gsap, reducedMotion } from "../lib/motion";

type Line = { text: string; indent?: string };

const lines: Line[] = [
  { text: "I'm a senior at" },
  { text: "Princeton ✿ Day", indent: "6vw" },
  { text: "School. I do" },
  { text: "AI research ✿", indent: "6vw" },
  { text: "and build things." },
  { text: "I write and lead," },
  { text: "fence ✿ and dance,", indent: "6vw" },
  { text: "and I teach." },
];
const spoken = lines.map((l) => l.text.replace("✿", "").replace(/\s+/g, " ")).join(" ");

const root = ref<HTMLElement | null>(null);
const canvas = ref<HTMLCanvasElement | null>(null);
const active = ref(false);
const glFailed = ref(false);
const { switching } = storeToRefs(useModeStore());

let glyphs: DumplingGlyphs | null = null;
let loop: RenderLoop | null = null;
let io: IntersectionObserver | null = null;
let ctx: gsap.Context | null = null;

function parts(t: string) {
  return t.split("✿").map((s) => s.trim());
}

const giant = ref<HTMLElement | null>(null);

/** Shrink the whole block if any line (indent + text + glyphs) would overflow. */
function fit() {
  const h = giant.value;
  if (!h) return;
  h.style.fontSize = "";
  const avail = h.clientWidth;
  let widest = 0;
  h.querySelectorAll<HTMLElement>(".w-mask").forEach((m) => {
    const inner = m.querySelector<HTMLElement>(".w-in");
    const indent = parseFloat(getComputedStyle(m).paddingLeft) || 0;
    if (inner) widest = Math.max(widest, indent + inner.scrollWidth);
  });
  if (widest > avail && avail > 0) {
    const base = parseFloat(getComputedStyle(h).fontSize);
    h.style.fontSize = `${Math.floor(base * (avail / widest) * 0.98)}px`;
  }
}

function onResize() {
  glyphs?.resize();
  fit();
}

onMounted(() => {
  if (!root.value || !canvas.value) return;
  fit();
  document.fonts?.ready.then(fit).catch(() => undefined);
  window.addEventListener("resize", onResize);
  // iOS: the visible viewport changes when the toolbar collapses; keep the glyph canvas in step
  window.visualViewport?.addEventListener("resize", onResize);
  try {
    glyphs = new DumplingGlyphs(canvas.value);
    glyphs.setSlots(Array.from(root.value.querySelectorAll<HTMLElement>(".glyph")));
  } catch {
    glFailed.value = true;
  }
  if (glyphs) {
    loop = new RenderLoop(root.value, (_dt, t) => glyphs?.render(reducedMotion ? 0 : t, window.scrollY), () => switching.value || !active.value);
    io = new IntersectionObserver(([e]) => {
      active.value = e.isIntersecting;
      if (e.isIntersecting) loop?.resume();
    });
    io.observe(root.value);
  }
  if (reducedMotion) return;
  ctx = gsap.context(() => {
    gsap.utils.toArray<HTMLElement>(".group").forEach((g) => {
      gsap.from(Array.from(g.querySelectorAll(".w-in")), {
        yPercent: 110,
        duration: 1.2,
        ease: EASE_REVEAL,
        stagger: 0.06,
        scrollTrigger: { trigger: g, start: "top 80%", once: true },
      });
    });
  }, root.value);
});

watch(switching, (s) => {
  if (!s) loop?.resume();
});

onUnmounted(() => {
  window.removeEventListener("resize", onResize);
  window.visualViewport?.removeEventListener("resize", onResize);
  io?.disconnect();
  loop?.dispose();
  glyphs?.dispose();
  ctx?.revert();
});
</script>

<template>
  <section ref="root" class="words" data-nav="light" :class="{ fallback: glFailed }">
    <canvas v-show="active" ref="canvas" class="glyph-canvas" aria-hidden="true" />
    <div class="group">
      <h2 ref="giant" class="giant" :aria-label="spoken">
        <span v-for="(l, i) in lines" :key="i" class="w-mask" :style="{ paddingLeft: l.indent }" aria-hidden="true">
          <span class="w-in">
            <template v-for="(p, j) in parts(l.text)" :key="j">
              <span v-if="j > 0" class="glyph"><img v-if="glFailed" src="/images/dumpling.svg" alt="" /></span>{{ p }}
            </template>
          </span>
        </span>
      </h2>
    </div>
  </section>
</template>

<style scoped>
.words {
  position: relative;
  overflow-x: clip; /* guard: a long line can never widen the page */
  background: var(--ed-green);
  color: var(--ed-pink);
  padding: 6vw 0 12vw;
}
.glyph-canvas {
  position: fixed;
  top: 0;
  left: 0;
  /* width/height are set by the renderer (window.innerWidth × innerHeight) */
  z-index: 3;
  pointer-events: none;
}
.group {
  position: relative;
  padding: 0 var(--pad-x) 0 9.6vw;
}
.giant {
  margin: 0;
  font-family: var(--font-title);
  font-variation-settings: "wght" 622;
  font-stretch: 92%;
  font-weight: 400;
  text-transform: uppercase;
  font-size: min(8.2vw, 118px);
  line-height: 0.9;
  letter-spacing: -0.01em;
}
.w-mask {
  display: block;
  overflow: hidden;
  padding-bottom: 0.15em;
  margin-bottom: -0.09em;
  white-space: nowrap;
}
.w-in {
  display: inline-block; /* shrink-wraps the text + glyphs so fit() can measure it */
  white-space: nowrap;
}
.glyph {
  display: inline-block;
  width: 0.78em;
  height: 0.78em;
  margin: 0 0.16em;
  vertical-align: -0.04em;
}
.glyph img {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 6px 8px rgba(0, 0, 0, 0.25));
}
/* the navbar sits over the top of this section; below the desktop width give the first line room to clear it */
@media (max-width: 1023px) {
  .words {
    padding-top: calc(96px + env(safe-area-inset-top));
  }
}
@media (max-width: 799px) {
  .group {
    padding: 0 20px;
  }
  .w-mask {
    padding-left: 0 !important;
    white-space: normal;
  }
}
</style>
