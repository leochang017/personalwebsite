<script setup lang="ts">
/**
 * Full-viewport title block: corner notes, optional centred lead paragraph,
 * the giant cycling title and a small caption, optionally over a full-bleed
 * cover photo (`bg`). Registers itself as a companion zone for the crane.
 */
import { onMounted, onUnmounted, ref } from "vue";
import TitleCycle from "./TitleCycle.vue";
import { companionBus } from "../lib/state";
import { gsap, reducedMotion } from "../lib/motion";
import { revealOnce } from "../lib/reveal";

const props = withDefaults(
  defineProps<{
    sets: string[][];
    caption?: string;
    lead?: string;
    theme?: "light" | "green" | "yellow";
    companion?: boolean;
    /** shorter page-title variant (no corners needed) */
    short?: boolean;
    subtitle?: string;
    /** full-bleed cover photo behind the block (turns the text and nav light) */
    bg?: string;
  }>(),
  { theme: "light", companion: true, short: false },
);

const root = ref<HTMLElement | null>(null);
let off: (() => void) | null = null;
let ctx: gsap.Context | null = null;
let stopNotes: (() => void) | null = null;
let stopCap: (() => void) | null = null;

onMounted(() => {
  if (!root.value) return;
  if (props.companion) off = companionBus.register(root.value);
  if (reducedMotion) return;
  ctx = gsap.context(() => {
    // only tween what exists: an empty NodeList makes GSAP warn "target not found"
    const notes = Array.from(root.value!.querySelectorAll<HTMLElement>(".note-line"));
    if (notes.length) {
      // plain fade-up (no masks, so descenders and long lines are never clipped)
      const tw = gsap.fromTo(
        notes,
        { y: 12, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.9, ease: "power2.out", stagger: 0.04, paused: true },
      );
      stopNotes = revealOnce(root.value!, () => tw.play(), () => tw.progress(1));
    }
    const cap = root.value!.querySelector(".caption, .subtitle");
    if (cap) {
      const capTw = gsap.fromTo(cap, { y: 10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, ease: "power2.out", delay: 0.5, paused: true });
      stopCap = revealOnce(root.value!, () => capTw.play(), () => capTw.progress(1));
    }
  }, root.value);
});

onUnmounted(() => {
  off?.();
  stopNotes?.();
  stopCap?.();
  ctx?.revert();
});

const navTheme = { light: "dark", green: "pink", yellow: "dark" } as const;
</script>

<template>
  <section ref="root" class="tb" :class="[`th-${theme}`, { short, 'has-bg': !!bg }]" :data-nav="bg ? 'light' : navTheme[theme]">
    <div v-if="bg" class="bg" aria-hidden="true"><img :src="bg" alt="" decoding="async" /></div>
    <div v-if="bg" class="shade" aria-hidden="true" />
    <div class="corner tl"><slot name="tl" /></div>
    <div v-if="$slots.tc" class="corner tcn"><slot name="tc" /></div>
    <div class="corner tr"><slot name="tr" /></div>
    <p v-if="lead" class="lead">{{ lead }}</p>
    <div class="center">
      <TitleCycle class="giant" :sets="sets" />
      <p v-if="subtitle" class="subtitle">{{ subtitle }}</p>
      <p v-if="caption" class="caption">{{ caption }}</p>
    </div>
  </section>
</template>

<style scoped>
.tb {
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120px var(--pad-x) 80px;
  overflow: hidden;
}
.th-light {
  background: var(--ed-bg);
  color: var(--ed-ink);
}
.th-green {
  background: var(--ed-green);
  color: var(--ed-pink);
}
.th-yellow {
  background: var(--ed-yellow);
  color: var(--ed-ink);
}
.corner {
  position: absolute;
  top: calc(2.86rem + 62px);
  font: 400 clamp(12px, 0.97vw, 28px) / 1.2 var(--font-body);
}
.tl {
  left: var(--pad-x);
}
.tr {
  right: var(--pad-x);
  text-align: right;
}
.tcn {
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}
.corner :deep(.note-mask) {
  display: block;
}
.corner :deep(.note-line) {
  display: block;
  white-space: nowrap;
  line-height: 1.25;
}
.corner :deep(.gap) {
  height: 1.2em;
}
.lead {
  position: absolute;
  top: calc(2.86rem + 58px);
  left: 50%;
  transform: translateX(-50%);
  width: min(36vw, 640px);
  margin: 0;
  text-align: center;
  font: 400 clamp(15px, 1.25vw, 36px) / 1.22 var(--font-body);
}
.center {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.giant {
  font-size: clamp(48px, 11.25vw, 324px);
}
.tb.short {
  min-height: 82vh;
  min-height: 82dvh;
  padding-top: 150px;
}
.tb.has-bg {
  min-height: 100vh;
  min-height: 100dvh;
  color: #f7f7f7;
  background: var(--ed-ink);
}
.bg,
.shade {
  position: absolute;
  inset: 0;
}
.bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.shade {
  background: linear-gradient(180deg, rgba(2, 32, 22, 0.25) 0%, rgba(2, 32, 22, 0.55) 100%);
}
.has-bg .center,
.has-bg .corner,
.has-bg .lead {
  position: relative;
  z-index: 1;
}
.has-bg .corner,
.has-bg .lead {
  position: absolute;
}
@media (prefers-reduced-motion: no-preference) {
  .bg img {
    animation: slow-zoom 10s cubic-bezier(0.23, 1, 0.32, 1) both;
  }
}
@keyframes slow-zoom {
  from {
    transform: scale(1.06);
  }
  to {
    transform: scale(1);
  }
}
.subtitle {
  margin: clamp(22px, 2.8vw, 54px) 0 0;
  font: 400 clamp(16px, 1.25vw, 34px) / 1.25 var(--font-body);
  text-align: center;
}
.subtitle + .caption {
  margin-top: 14px;
  opacity: 0.6;
}
.caption {
  margin: clamp(20px, 2.6vw, 48px) 0 0;
  font: 400 clamp(12px, 0.97vw, 28px) / 1 var(--font-body);
}
@media (max-width: 799px) {
  .tb {
    padding-top: 200px;
  }
  .giant {
    /* the longest single word (ACHIEVEMENTS) stays inside a 320px phone */
    font-size: clamp(30px, 11.4vw, 324px);
  }
  .lead {
    width: calc(100vw - 2 * var(--pad-x));
    top: 76px;
  }
  .corner {
    top: auto;
    bottom: 28px;
  }
}
</style>
