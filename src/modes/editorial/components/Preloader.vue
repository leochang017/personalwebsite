<script setup lang="ts">
/**
 * First-visit entrance (once per session). No hold and no card: the hero
 * video's first frame (public/video/hero-hd-poster.jpg) fills the viewport
 * zoomed in and eases back to 1:1 at once, then the layer dissolves into the
 * hero, which is holding that same frame and only starts playing once this
 * emits "done".
 */
import { onMounted, onUnmounted, ref } from "vue";
import { person } from "../../../content/leo";
import { gsap, reducedMotion } from "../lib/motion";

const emit = defineEmits<{ done: [] }>();

const root = ref<HTMLElement | null>(null);
const img = ref<HTMLImageElement | null>(null);

let tl: gsap.core.Timeline | null = null;

onMounted(() => {
  const el = root.value;
  if (!el || !img.value) {
    emit("done");
    return;
  }
  tl = gsap.timeline({ onComplete: () => emit("done") });
  if (reducedMotion) {
    tl.to(el, { autoAlpha: 0, duration: 0.3 });
    return;
  }
  tl.to(img.value, { scale: 1, duration: 1, ease: "expo.out" }, 0)
    // the zoom has all but settled by here, so the dissolve lands on a matching frame
    .to(el, { autoAlpha: 0, duration: 0.35, ease: "power2.out" }, 0.65);
});

onUnmounted(() => {
  tl?.kill();
});
</script>

<template>
  <div ref="root" class="preloader" aria-hidden="true">
    <div class="card">
      <img ref="img" :src="person.heroPoster" alt="" decoding="async" />
      <div class="fade" aria-hidden="true" />
    </div>
  </div>
</template>

<style scoped>
.preloader {
  position: fixed;
  inset: 0;
  z-index: 400;
  background: var(--ed-bg);
  overflow: hidden;
}
.card {
  position: absolute;
  inset: 0;
}
/* starts zoomed in so the first painted frame is already the start of the zoom-out */
.card img {
  transform: scale(1.18);
  will-change: transform;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
/* identical to HeroVideo's bottom gradient so the dissolve has nothing to change */
.card .fade {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 30%;
  background: linear-gradient(180deg, rgba(2, 32, 22, 0) 0%, rgba(2, 32, 22, 0.35) 100%);
  pointer-events: none;
}
@media (prefers-reduced-motion: reduce) {
  .card img {
    transform: none;
  }
}
</style>
