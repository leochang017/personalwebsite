<script setup lang="ts">
/**
 * Home hero background: a full-bleed looping video (no text over it) with a
 * faint ink gradient along the bottom. Plays only while in view.
 */
import { onMounted, onUnmounted, ref } from "vue";
import { reducedMotion } from "../lib/motion";

const SRC = "/video/hero-hd.mp4";
const POSTER = "/video/hero-hd-poster.jpg";

const video = ref<HTMLVideoElement | null>(null);
let io: IntersectionObserver | null = null;

/** safety net: restart if a browser stops at the end despite `loop` */
function onEnded() {
  const v = video.value;
  if (!v) return;
  v.currentTime = 0;
  v.play().catch(() => undefined);
}

onMounted(() => {
  const v = video.value;
  if (!v) return;
  io = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) {
      if (!reducedMotion && v.paused) v.play().catch(() => undefined);
    } else if (!v.paused) {
      v.pause();
    }
  });
  io.observe(v);
});

onUnmounted(() => io?.disconnect());
</script>

<template>
  <div class="hero-video">
    <video
      ref="video"
      class="vid"
      :src="SRC"
      :poster="POSTER"
      muted
      loop
      playsinline
      :autoplay="!reducedMotion"
      preload="auto"
      aria-hidden="true"
      @ended="onEnded"
    />
    <div class="fade" aria-hidden="true" />
  </div>
</template>

<style scoped>
.hero-video {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: var(--ed-ink);
}
.vid {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.fade {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 30%;
  background: linear-gradient(180deg, rgba(2, 32, 22, 0) 0%, rgba(2, 32, 22, 0.35) 100%);
  pointer-events: none;
}
</style>
